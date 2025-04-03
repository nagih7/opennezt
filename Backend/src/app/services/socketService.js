import {
    DIRECT_CONVERSATION,
    GROUP_CONVERSATION,
    LINK_STATIC_URL,
    MESSAGE_TYPE,
    SENT_STATUS,
    TEXT_MESSAGE,
} from '@/configs'
import { Conversation, Message, Project, Subscription, Type, User } from '@/models'
import { userSockets } from '@/routes'
import webpush from 'web-push'

export async function sendMessage(user, { conversation_id, content }, io, socketId) {
    const conversation = await Conversation.findOne({
        _id: conversation_id,
        members: { $elemMatch: { user_id: user._id } },
    })
        .populate('type_id', 'name')
        .populate('data.project_id', 'name')
    const typeMessage = await Type.findOne({ class: MESSAGE_TYPE, name: TEXT_MESSAGE })
    if (!conversation || !typeMessage) {
        throw new Error('Conversation not found')
    }

    const message = new Message({
        conversation_id: conversation._id,
        user_id: user._id,
        content,
        type_id: typeMessage._id,
        read_by: [],
        status: SENT_STATUS,
    })
    await message.save()
    conversation.updated_at = new Date()
    conversation.save()

    const me = await User.aggregate([
        {
            $match: {
                _id: message.user_id,
            },
        },
        {
            $project: {
                _id: 1,
                name: 1,
                avatar: {
                    $cond: {
                        if: { $eq: [{ $ifNull: ['$avatar', ''] }, ''] },
                        then: '$avatar',
                        else: { $concat: [LINK_STATIC_URL, '$avatar'] },
                    },
                },
            },
        },
    ])

    message.user = me[0]
    const messageData = {
        _id: message._id,
        user: message.user,
        conversation_id: message.conversation_id,
        content: message.content,
        read_by: message.read_by,
        pinned: message.pinned,
        status: message.status,
        timestamp: message.timestamp,
    }

    // Send message to all connected clients in the conversation
    const members = conversation.members
        .map((member) => {
            if (member.user_id.toString() !== user._id.toString()) {
                return member.user_id.toString()
            }
            return null
        })
        .filter((member) => member !== null)

    members.forEach((member) => {
        const receiverSocketId = Object.keys(userSockets).find((socketId) => userSockets[socketId] === member)
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('message', messageData)
        }
    })

    const receiverSubscriptions = await Subscription.find({
        user_id: { $in: members },
    })

    const subscriptions = receiverSubscriptions.map((subscription) => {
        return {
            endpoint: subscription.endpoint,
            expirationTime: subscription.expirationTime,
            keys: {
                p256dh: subscription.keys.p256dh,
                auth: subscription.keys.auth,
            },
        }
    })

    let payloadBody = ''
    const project = await Project.findById(conversation.data.project_id).select('name')
    switch (conversation.type_id.name) {
        case GROUP_CONVERSATION:
            payloadBody = `${me[0].name} sent you a message in group ${project.name}: ${message.content}`
            break
        case DIRECT_CONVERSATION:
            payloadBody = `${message.user.name} sent you a message: ${message.content}`
            break
        default:
            payloadBody = `${me[0].name} sent you a message`
            break
    }

    const payload = JSON.stringify({
        title: 'OpenNezt',
        body: payloadBody,
        icon: me[0].avatar ? me[0].avatar : null,
        tag: 'message',
        data: {
            url: `/conversation/${message.conversation_id}`,
            notificationId: message._id,
            conversation_id: message.conversation_id,
            sender: message.user_id,
            type: MESSAGE_TYPE,
        },
    })
    // SEND NOTIFICATION TO ALL MEMBERS EXCEPT SENDER
    subscriptions.forEach((subscription) => {
        webpush.sendNotification(subscription, payload).catch(async (err) => {
            if (err.statusCode === 410 || err.statusCode === 404) {
                await Subscription.deleteOne({ endpoint: subscription.endpoint })
            } else {
                console.error('Error sending notification:', err)
            }
        })
    })

    return messageData
}
