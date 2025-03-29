import {
    CONFIRM_FRIEND_REQUEST_NOTIFICATION,
    CONFIRM_STATUS,
    CONVERSATION_TYPE,
    DELETE_STATUS,
    DIRECT_CONVERSATION,
    FRIEND_REQUEST_NOTIFICATION,
    LINK_STATIC_URL,
    PROJECT_APPLICATION_NOTIFICATION,
} from '@/configs'
import {CONVERSATION_ADMIN_ROLE} from '@/configs/roleConstants'
import {
    NotificationFeed,
    Friend,
    ObjectId,
    Project,
    User,
    Conversation,
    Type,
    ProjectMember,
    Role,
} from '@/models'
import {userSockets} from '@/routes'

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
            source_id: 1,
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

// ========== GET [Notification - Read] ========== //
export async function getNotifications(user) {
    const matchStage = {
        $match: {
            user_id: user._id,
        },
    }
    const lookupTypeStage = {
        $lookup: {
            from: 'types',
            localField: 'type_id',
            foreignField: '_id',
            as: 'type',
            pipeline: [
                {
                    $project: {
                        _id: 0,
                        class: 1,
                        name: 1,
                    },
                },
            ],
        },
    }
    const unwindTypeStage = {
        $unwind: '$type',
    }
    const lookupUserStage = {
        $lookup: {
            from: 'users',
            localField: 'source_id',
            foreignField: '_id',
            as: 'user',
            pipeline: [
                {
                    $addFields: {
                        avatar: {
                            $cond: {
                                if: {$eq: [{$ifNull: ['$avatar', '']}, '']},
                                then: '$avatar',
                                else: {$concat: [LINK_STATIC_URL, '$avatar']},
                            },
                        },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        name: 1,
                        avatar: 1,
                    },
                },
            ],
        },
    }
    const unwindUserStage = {
        $unwind: '$user',
    }
    const projectStage = {
        $project: {
            _id: 1,
            user: 1,
            type: 1,
            timestamp: 1,
            metadata: 1,
        },
    }
    const notifications = await NotificationFeed.aggregate([
        matchStage,
        lookupTypeStage,
        lookupUserStage,
        unwindTypeStage,
        unwindUserStage,
        {
            $sort: {
                created_at: -1,
            },
        },
        {
            $limit: 10,
        },
        projectStage,
    ])
    return notifications
}

// ========== PUT [Notification - Reply] ========== //
export async function replyNotification({notificationId}, {action}, io) {
    if (action === CONFIRM_STATUS) {
        const notification = await NotificationFeed.findOneAndUpdate(
            {
                _id: new ObjectId(notificationId),
            },
            {
                $set: {
                    'metadata.status': CONFIRM_STATUS,
                    'metadata.read': true,
                },
            },
            {
                new: true,
            }
        )
        // Check if notification exists
        if (!notification) {
            throw new Error('Notification not found!')
        }

        // GET NOTIFICATION TYPE
        const notificationType = await Type.findById(notification.type_id)
        switch (notificationType.name) {
            case FRIEND_REQUEST_NOTIFICATION:
                await replyFriendRequest(notification, io)
                break
            case PROJECT_APPLICATION_NOTIFICATION:
                await replyProjectInvitation(notificationId, action, io)
                break
            default:
                break
        }
    } else if (action === DELETE_STATUS) {
        await NotificationFeed.findByIdAndDelete(new ObjectId(notificationId))
        return
    }
}

// ========== REPLY FRIEND REQUEST ========== //
const replyFriendRequest = async (notification, io) => {
    const {user_id, source_id} = notification

    const existingFriendship = await Friend.findOne({user_id: user_id, friend_id: source_id})

    // CHECK IF THE USER IS ALREADY FRIENDS
    if (!existingFriendship) {
        await Friend.create({user_id: user_id, friend_id: source_id})
        await Friend.create({user_id: source_id, friend_id: user_id})
    }

    // DIRECT CHAT TYPE
    const directChatType = await Type.findOne({class: CONVERSATION_TYPE, name: DIRECT_CONVERSATION})
    // CHECK IF THE CONVERSATION ALREADY EXISTS
    const conversation = await Conversation.findOne({
        type_id: directChatType._id,
        members: {
            $all: [{$elemMatch: {user_id: user_id}}, {$elemMatch: {user_id: source_id}}],
        },
    })

    // console.log('Query:', {
    //     type_id: directChatType._id,
    //     members: {
    //         $all: [{user_id: user_id}, {user_id: source_id}],
    //     },
    // })

    if (!conversation) {
        // GET CONVERSATION ADMIN ROLE
        const conversationAdminRole = await Role.findOne({
            name: CONVERSATION_ADMIN_ROLE,
            type_id: directChatType._id,
        })
        if (!conversationAdminRole) {
            throw new Error('Conversation admin role not found!')
        }
        // CREATE A NEW CONVERSATION
        const newConversation = new Conversation({
            members: [
                {
                    user_id: user_id,
                    role_id: conversationAdminRole._id,
                },
                {
                    user_id: source_id,
                    role_id: conversationAdminRole._id,
                },
            ],
            type_id: directChatType._id,
        })

        await newConversation.save()
    }

    // GET USER INFORMATION
    const user = await User.aggregate([
        {
            $match: {
                _id: new ObjectId(user_id),
            },
        },
        {
            $addFields: {
                avatar: {
                    $cond: {
                        if: {$eq: [{$ifNull: ['$avatar', '']}, '']},
                        then: '$avatar',
                        else: {$concat: [LINK_STATIC_URL, '$avatar']},
                    },
                },
            },
        },
        {
            $project: {
                _id: 1,
                name: 1,
                avatar: 1,
            },
        },
    ])

    // SEND NOTIFICATION TO THE USER
    if (user && user.length > 0) {
        const receiverSocketId = Object.keys(userSockets).find(
            (socketId) => userSockets[socketId] === source_id.toString()
        )
        // SEND NOTIFICATION TO THE USER
        if (receiverSocketId) {
            io.to(receiverSocketId).emit(CONFIRM_FRIEND_REQUEST_NOTIFICATION, user[0])
        }
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
