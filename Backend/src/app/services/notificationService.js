import {ChatInvitation, NotificationFeed} from '@/models'
import {userSockets} from '@/routes/socket'

export async function updateChatInvitation(requestBody) {
    const {notification_id, status} = requestBody
    const chatInvitation = await ChatInvitation.findOne({_id: notification_id, status: 'waiting'})
    chatInvitation.status = status
    await chatInvitation.save()
}

export async function requestMessage(user, requestBody, io) {
    const {user_id, source_name, metadata} = requestBody

    const notification = new NotificationFeed({
        user_id: user_id,
        source_id: user._id,
        type: 'message_request',
        message: `${source_name} wants to chat with you about ${metadata.project_name}`,
        metadata: {
            ...metadata,
            status: 'waiting',
        },
    })
    await notification.save()
    const userSocketId = Object.keys(userSockets).find((socketId) => userSockets[socketId] === user_id)

    console.log('userSocketId', userSocketId)
    io.to(userSocketId).emit('new_notification')
}
