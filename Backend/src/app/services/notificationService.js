import {NotificationFeed, Friend} from '@/models'
import {userSockets} from '@/routes/socket'

export async function getNotifications(user) {
    const notifications = await NotificationFeed.aggregate([
        {
            $match: {
                user_id: user._id,
            },
        },
        {
            $sort: {
                created_at: -1,
            },
        },
        {
            $limit: 10,
        },
        {
            $skip: 0, // page * limit
        },
        {
            $project: {
                _id: 1,
                user_id: 0,
                read: 0,
                updated_at: 0,
            },
        },
    ])

    return notifications
}

export async function replyNotification(requestBody) {
    const {notification_id, type, status} = requestBody
    switch (type) {
        case 'friend_request':
            await replyFriendRequest(notification_id, status)
            break
        default:
            break
    }
}

export async function replyFriendRequest(notification_id, status) {
    const notification = await NotificationFeed.findOne({_id: notification_id})
    const {user_id, source_id} = notification

    if (status === 'accepted') {
        const friend = await Friend.findOne({user_id: user_id, friend_id: source_id})
        if (!friend) {
            await Friend.create({user_id: user_id, friend_id: source_id})
            await Friend.create({user_id: source_id, friend_id: user_id})
        }
    }

    notification.metadata.status = status
    notification.read = true
    notification.markModified('metadata')
    await notification.save()
}

export async function requestMessage(user, requestBody, io) {
    const {user_id, source_name, metadata} = requestBody

    const notification = new NotificationFeed({
        user_id: user_id,
        source_id: user._id,
        type: 'friend_request',
        message: 'sent you a friend request',
        metadata: {
            ...metadata,
            source_name: source_name,
            project_name: metadata.project_name,
            status: 'waiting',
            avatar: user.avatar ? user.avatar : '',
        },
    })

    await notification.save()
    const userSocketId = Object.keys(userSockets).find((socketId) => userSockets[socketId] === user_id)

    console.log('userSocketId', userSocketId)
    io.to(userSocketId).emit('new_notification')
}
