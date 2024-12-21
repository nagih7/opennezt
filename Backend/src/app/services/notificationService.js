import {NotificationFeed, Friend, ObjectId, Project} from '@/models'
import {userSockets} from '@/routes/socket'

export async function filter(user, {q, page, per_page, order}) {
    q = q ? q : ''
    order = order === '-1' ? -1 : 1
    const matchStage = {
        $match: {
            user_id: user._id,
            $or: [{type: {$regex: q, $options: 'i'}}],
        },
    }

    // const sortStage = {
    //     $sort: {[field]: order},
    // }
    const skipStage = {
        $skip: (page - 1) * per_page,
    }
    const limitStage = {
        $limit: per_page,
    }
    const orderStage = {
        $sort: {created_at: order},
    }

    const notifications = await NotificationFeed.aggregate([
        matchStage,
        // sortStage,
        skipStage,
        limitStage,
        // addSetStage,
        orderStage,
    ])

    // const filter = {
    //     ...(q && {$or: [{name: q}, {email: q}, {phone: q}]}),
    // }

    const total = await NotificationFeed.countDocuments({user_id: user._id})
    return {total, page, per_page, notifications}
}

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
        case 'project_invitation':
            await replyProjectInvitation(notification_id, status)
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

export async function replyProjectInvitation(notification_id, status) {
    const notification = await NotificationFeed.findById({_id: notification_id})
    const {user_id, metadata} = notification
    if (status === 'accepted') {
        const project = await Project.findById(metadata.project_id)
        project.metadata.members.push({user_id: user_id, role: 'member'})
        await project.save()
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
            status: 'waiting',
            avatar: user.avatar ? user.avatar : '',
        },
    })

    await notification.save()
    const userSocketId = Object.keys(userSockets).find((socketId) => userSockets[socketId] === user_id)

    io.to(userSocketId).emit('new_notification')
}

export async function getTotalFriends(user) {
    const totalFriends = await Friend.countDocuments({user_id: user._id})
    return totalFriends
}

export async function projectInvitation(user, requestBody, io) {
    const {project_id, user_id} = requestBody
    const notification = new NotificationFeed({
        user_id: user_id,
        source_id: user._id,
        type: 'project_invitation',
        message: 'invited you to join the project',
        metadata: {
            project_id: new ObjectId(project_id),
            source_name: user.name,
            status: 'waiting',
            avatar: user.avatar ? user.avatar : '',
        },
    })

    await notification.save()
    const userSocketId = Object.keys(userSockets).find((socketId) => userSockets[socketId] === user_id)

    io.to(userSocketId).emit('new_notification')
}
