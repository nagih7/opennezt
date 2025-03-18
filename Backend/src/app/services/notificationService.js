import {NotificationFeed, Friend, ObjectId, Project, User, Conversation, Type, ProjectMember} from '@/models'
import {userSockets} from '@/routes/socket'

export async function filter(user, {q = '', page = 1, per_page = 20, order = 1}) {
    order = order === '-1' ? -1 : 1

    // Chuyển user._id thành ObjectId nếu cần
    const userId = user._id

    // Tạo bộ lọc
    const matchStage = {
        $match: {user_id: userId},
    }

    if (q.trim().length > 0) {
        matchStage.$match.$or = [
            {
                type: {$exists: true, $regex: q, $options: 'i'},
            },
        ]
    }

    // Các bước trong pipeline
    const orderStage = {
        $sort: {created_at: order},
    }
    const skipStage = {
        $skip: (page - 1) * per_page,
    }
    const limitStage = {
        $limit: per_page,
    }
    const lookupTypeStage = {
        $lookup: {
            from: 'types',
            localField: 'type_id',
            foreignField: '_id',
            as: 'type_info',
        },
    }
    const lookupUserStage = {
        $lookup: {
            from: 'users',
            localField: 'source_id',
            foreignField: '_id',
            as: 'source_info',
        },
    }
    const projectStage = {
        $project: {
            _id: 1,
            type_id: 1,
            type_name: {$ifNull: [{$arrayElemAt: ['$type_info.name', 0]}, 'Unknown Type']},
            source_name: {$ifNull: [{$arrayElemAt: ['$source_info.name', 0]}, 'Unknown User']},
            created_at: 1,
            updated_at: 1,
            metadata: 1,
        },
    }

    // Lấy dữ liệu
    const notifications = await NotificationFeed.aggregate([
        matchStage,
        lookupTypeStage, // Thêm bước lookup type
        lookupUserStage, // Thêm bước lookup user
        orderStage,
        skipStage,
        limitStage,
        projectStage,
    ])

    // Đếm số lượng chính xác
    const total = await NotificationFeed.countDocuments(matchStage.$match)

    return {total, page, per_page, notifications}
}

export async function getNotifications(user) {
    const lookupTypeStage = {
        $lookup: {
            from: 'types',
            localField: 'type_id',
            foreignField: '_id',
            as: 'type_info',
        },
    }
    const lookupUserStage = {
        $lookup: {
            from: 'users',
            localField: 'source_id',
            foreignField: '_id',
            as: 'source_info',
        },
    }
    const projectStage = {
        $project: {
            _id: 1,
            type_id: 1,
            type_name: {$ifNull: [{$arrayElemAt: ['$type_info.name', 0]}, 'Unknown Type']},
            source_name: {$ifNull: [{$arrayElemAt: ['$source_info.name', 0]}, 'Unknown User']},
            created_at: 1,
            updated_at: 1,
            metadata: 1,
        },
    }
    const notifications = await NotificationFeed.aggregate([
        {
            $match: {
                user_id: user._id,
            },
        },
        lookupTypeStage,
        lookupUserStage,
        {
            $sort: {
                created_at: -1,
            },
        },
        {
            $limit: 10,
        },
        {
            $skip: 0,
        },
        projectStage,
    ])
    return notifications
}

export async function replyNotification(requestBody, io) {
    const {notification_id, type_id, status} = requestBody
    const type = await Type.findOne({_id: type_id})
    switch (type.name) {
        case 'Friend Request':
            await replyFriendRequest(notification_id, status, io)
            console.log('replyFriendRequest')
            break
        case 'Project Invitation':
            await replyProjectInvitation(notification_id, status, io)
            break
        default:
            break
    }
}

export async function replyFriendRequest(notification_id, io, reject = false) {
    // Get information notification
    const notification = await NotificationFeed.findById(notification_id)
    const type = await Type.findOne({name: 'Reply Friend'})
    if (!notification) {
        console.log('Notification not found!')
        return
    }

    // Check status notification
    if (notification.metadata.status === 'waiting') {
        const {user_id, source_id} = notification

        if (reject) {
            // If reject is true, handle rejection of the friend request
            // Update notification status to 'rejected'
            await NotificationFeed.updateOne(
                {_id: notification_id},
                {
                    $set: {
                        'metadata.status': 'rejected',
                        'metadata.read': true,
                    },
                }
            )

            // Notify the sender that the friend request has been rejected
            const user = await User.findById(user_id).select('name')
            const senderSocketId = Object.keys(userSockets).find(
                (socketId) => userSockets[socketId] === source_id.toString()
            )

            console.log('senderSocketId:', senderSocketId)
            if (senderSocketId) {
                io.to(senderSocketId).emit('reject_add_friend', user.name)
            }

            console.log(`Friend request rejected: ${user_id} and ${source_id} are not friends.`)
        } else {
            // If reject is false, handle acceptance of the friend request

            // Check if the user is already friends
            const existingFriendship = await Friend.findOne({user_id: user_id, friend_id: source_id})

            if (!existingFriendship) {
                // Create new friend relationship
                await Friend.create({user_id: user_id, friend_id: source_id, status: 'accepted'})
                await Friend.create({user_id: source_id, friend_id: user_id, status: 'accepted'})
            }

            // Create new conversation
            const conversation = new Conversation({
                members: [
                    {user_id: user_id, role: 'user'},
                    {user_id: source_id, role: 'user'},
                ],
                type_id: type._id,
                metadata: {
                    type: 'Reply Friend',
                    status: 'accepted',
                    read: true,
                    data: {},
                },
            })
            await conversation.save()

            // Update notification status to 'accepted'
            await NotificationFeed.updateOne(
                {_id: notification_id},
                {
                    $set: {
                        'metadata.status': 'accepted',
                        'metadata.read': true,
                    },
                }
            )

            // Send notification to the user
            const user = await User.findById(user_id).select('name')
            const receiverSocketId = Object.keys(userSockets).find(
                (socketId) => userSockets[socketId] === source_id.toString()
            )
            console.log('receiverSocketId:', receiverSocketId)
            if (receiverSocketId) {
                io.to(receiverSocketId).emit('confirm_add_friend', user.name)
            }

            console.log(`Friend request accepted: ${user_id} and ${source_id} are now friends.`)
        }
    } else {
        console.log('Notification is not in waiting state.')
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

export async function requestAddFriend(user, requestBody, io) {
    const {user_id, metadata} = requestBody
    const type = await Type.findOne({name: 'Friend Request'})

    // Kiểm tra user_id có tồn tại trong database không
    const targetUser = await User.findById(user_id)
    if (!targetUser) {
        throw new Error('Người dùng không tồn tại.')
    }

    // Kiểm tra type_id có hợp lệ không
    if (!type) {
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
        console.log('Notification:', type._id)
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
            project_name: requestBody.project_name,
        },
        metadata: {
            read: false,
            status: 'waiting',
            source_name: user.name,
            avatar: user.avatar ? user.avatar : '',
        },
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

// ========== PUT [Notification - Reply Invitation Member] ========== //
export async function replyInvitationMember(user, requestBody, io) {
    const {notification_id, action} = requestBody
    const notification = await NotificationFeed.findById(notification_id)

    if (notification.metadata.status === 'waiting') {
        const {user_id, source_id, additional_info} = notification
        notification.metadata.status = action.toLowerCase()
        notification.metadata.read = true
        notification.markModified('metadata')
        await notification.save()

        if (action.toLowerCase() === 'confirm') {
            // THÊM THÀNH VIÊN VÀO DỰ ÁN
            await addProjectMember(
                additional_info.project_id,
                user_id,
                additional_info.team_role_id,
                additional_info.role_id
            )
        }

        // const userSocketId = Object.keys(userSockets).find((socketId) => userSockets[socketId] === source_id)
        // if (userSocketId) {
        //     io.to(userSocketId).emit('confirm_project_invitation', user.name)
        // }
    } else if (action.toLowerCase() === 'delete') {
        // XÓA THÔNG BÁO
        await NotificationFeed.deleteOne({_id: notification_id})
    }

    // THÊM THÀNH VIÊN VÀO DỰ ÁN
    const addProjectMember = async (project_id, user_id, team_role_id, role_id) => {
        const member = new ProjectMember({
            project_id: project_id,
            user_id: user_id,
            team_role_id,
            role_id,
        })
        await member.save()
    }
}
