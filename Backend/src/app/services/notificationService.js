import {NotificationFeed, Friend, ObjectId, Project, User, Conversation, Type} from '@/models'
import {userSockets} from '@/routes/socket'
import { me } from '../controllers/authController'

// export async function filter(user, {q, page, per_page, order}) {
//     q = q ? q : ''
//     order = order === '-1' ? -1 : 1
//     const matchStage = {
//         $match: {
//             user_id: user._id,
//             $or: [{type: {$regex: q, $options: 'i'}}],
//         },
//     }

//     // const sortStage = {
//     //     $sort: {[field]: order},
//     // }
//     const skipStage = {
//         $skip: (page - 1) * per_page,
//     }
//     const limitStage = {
//         $limit: per_page,
//     }
//     const orderStage = {
//         $sort: {created_at: order},
//     }

//     const notifications = await NotificationFeed.aggregate([
//         matchStage,
//         // sortStage,
//         skipStage,
//         limitStage,
//         // addSetStage,
//         orderStage,
//     ])

//     // const filter = {
//     //     ...(q && {$or: [{name: q}, {email: q}, {phone: q}]}),
//     // }

//     const total = await NotificationFeed.countDocuments({user_id: user._id})
//     console.log(total, notifications)
//     return {total, page, per_page, notifications}
// }

export async function filter(user, {q = '', page = 1, per_page = 20, order = 1}) {
    order = order === '-1' ? -1 : 1

    // Chuyển user._id thành ObjectId nếu cần
    const userId = user._id

    // Tạo bộ lọc
    const matchStage = {$match: {user_id: userId}}

    if (q.trim().length > 0) {
        matchStage.$match.$or = [{type: {$exists: true, $regex: q, $options: 'i'}}]
    }

    // Các bước trong pipeline
    const orderStage = {$sort: {created_at: order}}
    const skipStage = {$skip: (page - 1) * per_page}
    const limitStage = {$limit: per_page}

    // Lấy dữ liệu
    const notifications = await NotificationFeed.aggregate([matchStage, orderStage, skipStage, limitStage])

    // Đếm số lượng chính xác
    const total = await NotificationFeed.countDocuments(matchStage.$match)

    console.log('Total:', total, 'Notifications:', notifications)

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

export async function replyNotification(requestBody, io) {
    const {notification_id, type, status} = requestBody
    switch (type) {
        case 'friend_request':
            await replyFriendRequest(notification_id, status, io)
            break
        case 'project_invitation':
            await replyProjectInvitation(notification_id, status, io)
            break
        default:
            break
    }
}

export async function replyFriendRequest(notification_id, status, io) {
    if (status === 'accepted') {
        // THAY ĐỔI TRẠNG THÁI THÔNG BÁO (TYPE)
        const notification = await NotificationFeed.findOne({_id: notification_id})
        const {user_id, source_id} = notification
        const friend = await Friend.findOne({user_id: user_id, friend_id: source_id})
        if (!friend) {
            await Friend.create({user_id: user_id, friend_id: source_id})
            await Friend.create({user_id: source_id, friend_id: user_id})
        }
        // TẠO CONVERSATION MỚI
        const conversation = new Conversation({
            members: [
                {
                    user_id: user_id,
                    role: 'user',
                },
                {
                    user_id: source_id,
                    role: 'user',
                },
            ],
            metadata: {
                type: 'direct',
                data: {},
            },
        })
        await conversation.save()
        notification.metadata.status = status
        notification.metadata.read = true
        notification.markModified('metadata')

        const user = await User.findById(user_id).select('name')

        const receiverSocketId = Object.keys(userSockets).find(
            (socketId) => userSockets[socketId] === source_id.toString()
        )
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('confirm_add_friend', user.name)
        }

        await notification.save()
    } else if (status === 'rejected') {
        await NotificationFeed.deleteOne({_id: notification_id})
    }
}

export async function replyProjectInvitation(notification_id, status, io) {
    if (status === 'accepted') {
        // THAY ĐỔI TRẠNG THÁI THÔNG BÁO (TYPE)
        const notification = await NotificationFeed.findById({_id: notification_id})
        const {user_id, source_id, metadata} = notification
        const user = await User.findById(user_id).select('name avatar _id')
        if (status === 'accepted') {
            const project = await Project.findById(metadata.project_id)
            project.metadata.members.push({
                _id: user_id,
                name: user.name,
                avatar: user.avatar,
                team_role: metadata.team_role,
                role: metadata.role,
            })
            await project.save()
        }
        notification.metadata.status = status
        notification.metadata.read = true
        notification.markModified('metadata')
        await notification.save()

        // TẠO CONVERSATION MỚI HOẶC CẬP NHẬT CONVERSATION CŨ
        const conversation = await Conversation.findOne({
            'metadata.data.project_id': metadata.project_id,
            'metadata.type': 'group',
        })
        if (conversation) {
            // THÊM THÀNH VIÊN VÀO CONVERSATION
            conversation.members.push({
                user_id: user_id,
                role: 'member',
            })
            await conversation.save()
        } else {
            // TẠO CONVERSATION MỚI
            const newConversation = new Conversation({
                members: [
                    {
                        user_id: source_id,
                        role: 'admin',
                    },
                    {
                        user_id: user_id,
                        role: 'member',
                    },
                ],
                metadata: {
                    type: 'group',
                    data: {
                        project_id: metadata.project_id,
                    },
                },
            })

            await newConversation.save()
        }

        // GỬI THÔNG BÁO ĐẾN USER
        const userSocketId = Object.keys(userSockets).find(
            (socketId) => userSockets[socketId] === source_id.toString()
        )
        if (userSocketId) {
            io.to(userSocketId).emit('confirm_project_invitation', user.name)
        }
    } else if (status === 'rejected') {
        await NotificationFeed.delete({_id: notification_id})
    }
}

// Fix according to database
// export async function requestAddFriend(user, requestBody, type, io) {
//     const {user_id, metadata} = requestBody

//     const notification = new NotificationFeed({
//         user_id: user_id,
//         source_id: user._id,
//         type_id: type._id,
//         metadata: {
//             ...metadata,
//             source_name: user.name,
//             status: 'waiting',
//             avatar: user.avatar ? user.avatar : '',
//         },
//     })

//     await notification.save()
//     const userSocketId = Object.keys(userSockets).find((socketId) => userSockets[socketId] === user_id)

//     io.to(userSocketId).emit('new_notification', notification)
// }
export async function requestAddFriend(user, requestBody, type_id, io) {
    const {user_id, metadata} = requestBody
    const type = await Type.findOne({name: 'Friend Request'})

    // Kiểm tra user_id có tồn tại trong database không
    const targetUser = await User.findById(user_id)
    if (!targetUser) {
        throw new Error('Người dùng không tồn tại.')
    }

    // Kiểm tra type_id có hợp lệ không
    if (!type_id || !type._id) {
        throw new Error('Loại thông báo không hợp lệ.')
    }
    // Tạo notification mới
    const notification = new NotificationFeed({
        user_id: user_id,
        source_id: user._id,
        type_id: type._id,
        metadata: {
            ...metadata,
            read: false,
            status: 'waiting',
            source_name: user.name,
            avatar: user.avatar || '',
        },
    })

    await notification.save()
    const userSocketId = Object.keys(userSockets).find((socketId) => userSockets[socketId] === user_id)

    if (!userSocketId) {
        console.error('Không tìm thấy userSocketId cho user_id:', user_id)
        console.log('Danh sách userSockets:', userSockets)
        return
    }

    io.to(userSocketId).emit('new_notification', notification)
}

export async function getTotalFriends(user) {
    const totalFriends = await Friend.countDocuments({user_id: user._id})
    return totalFriends
}

export async function projectInvitation(user, requestBody, type_id, io) {
    const {project_id, user_id} = requestBody
    const type = await Type.findOne({name: 'Project Invitation'})

    if (!type_id || !type._id) {
        throw new Error('Loại thông báo không hợp lệ.')
    }

    const notification = new NotificationFeed({
        user_id: user_id,
        source_id: user._id,
        type_id: type._id,
        notification_additional_info: {
            project_id: new ObjectId(project_id),
            team_role: requestBody.team_role,
            role: requestBody.role,
            project_name: requestBody.project_name
        },
        metadata: {
            read: false,
            status: 'waiting',
            source_name: user.name,
            avatar: user.avatar ? user.avatar : '',

        }
    })

    await notification.save()
    const userSocketId = Object.keys(userSockets).find((socketId) => userSockets[socketId] === user_id)

    io.to(userSocketId).emit('new_notification', notification)
}

// Get request add friend
export async function getRequestAddFriend(user, user_id) {
    const request = await NotificationFeed.findOne({
        $or: [
            {user_id: user_id, source_id: user._id},
            {user_id: user._id, source_id: user_id},
        ],
        type: 'friend_request',
    })

    return request
}
