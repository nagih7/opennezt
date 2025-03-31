import {
    CONFIRM_FRIEND_REQUEST_NOTIFICATION,
    CONFIRM_STATUS,
    CONVERSATION_TYPE,
    DELETE_STATUS,
    DIRECT_CONVERSATION,
    FRIEND_REQUEST_NOTIFICATION,
    GROUP_CONVERSATION,
    LINK_STATIC_URL,
    PROJECT_APPLICATION_NOTIFICATION,
    PROJECT_INVITATION_NOTIFICATION,
} from '@/configs'
import { CONVERSATION_ADMIN_ROLE, CONVERSATION_MEMBER_ROLE } from '@/configs/roleConstants'
import { NotificationFeed, Friend, ObjectId, Project, User, Conversation, Type, ProjectMember, Role } from '@/models'
import { userSockets } from '@/routes'

export async function filter(user, { q = '', page = 1, per_page = 20, order = 1 }) {
    order = order === '-1' ? -1 : 1

    // Chuyển user._id thành ObjectId nếu cần
    const userId = user._id

    // Tạo bộ lọc
    const matchStage = {
        $match: { user_id: userId },
    }

    if (q.trim().length > 0) {
        matchStage.$match.$or = [
            {
                type: { $exists: true, $regex: q, $options: 'i' },
            },
        ]
    }

    // Các bước trong pipeline
    const orderStage = {
        $sort: { created_at: order },
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
            type_name: { $ifNull: [{ $arrayElemAt: ['$type_info.name', 0] }, 'Unknown Type'] },
            source_name: { $ifNull: [{ $arrayElemAt: ['$source_info.name', 0] }, 'Unknown User'] },
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

    return { total, page, per_page, notifications }
}

// ========== GET [Notification - Read] ========== //
export async function getNotifications(user) {
    const matchStage = {
        $match: {
            user_id: user._id,
        },
    }
    // TYPE
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
    // USER
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
                                if: { $eq: [{ $ifNull: ['$avatar', ''] }, ''] },
                                then: '$avatar',
                                else: { $concat: [LINK_STATIC_URL, '$avatar'] },
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
    // PROJECT
    const lookupProjectStage = {
        $lookup: {
            from: 'projects',
            localField: 'data.project_id',
            foreignField: '_id',
            as: 'data.project',
            pipeline: [
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
    const unwindProjectStage = {
        $unwind: {
            path: '$data.project',
            preserveNullAndEmptyArrays: true,
        },
    }

    const projectStage = {
        $project: {
            _id: 1,
            user: 1,
            type: 1,
            data: {
                project: 1,
            },
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
        lookupProjectStage,
        unwindProjectStage,
        // {
        //     $addFields: {
        //         created_at: {
        //             $dateToString: {
        //                 format: '%Y-%m-%d %H:%M:%S',
        //                 date: '$created_at',
        //                 timezone: 'Asia/Ho_Chi_Minh',
        //             },
        //         },
        //     },
        // },
        // {
        //     $addFields: {
        //         updated_at: {
        //             $dateToString: {
        //                 format: '%Y-%m-%d %H:%M:%S',
        //                 date: '$updated_at',
        //                 timezone: 'Asia/Ho_Chi_Minh',
        //             },
        //         },
        //     },
        // },
        {
            $sort: {
                timestamp: -1,
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
export async function replyNotification({ notificationId }, { action }, io) {
    if (action === CONFIRM_STATUS) {
        const notification = await NotificationFeed.findOne({
            _id: new ObjectId(notificationId),
        })
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
            case PROJECT_INVITATION_NOTIFICATION:
                await replyProjectInvitation(notification, io)
                break
            default:
                break
        }
        notification.metadata.status = CONFIRM_STATUS
        notification.metadata.read = true
        notification.markModified('metadata')
        await notification.save()
        return { notification_id: notification._id, status: CONFIRM_STATUS }
    } else if (action === DELETE_STATUS) {
        await NotificationFeed.findByIdAndDelete(new ObjectId(notificationId))
        return
    }
}

// ========== REPLY FRIEND REQUEST ========== //
const replyFriendRequest = async (notification, io) => {
    const { user_id, source_id } = notification

    const existingFriendship = await Friend.findOne({ user_id: user_id, friend_id: source_id })

    // CHECK IF THE USER IS ALREADY FRIENDS
    if (!existingFriendship) {
        await Friend.create({ user_id: user_id, friend_id: source_id })
        await Friend.create({ user_id: source_id, friend_id: user_id })
    }

    // DIRECT CHAT TYPE
    const directChatType = await Type.findOne({ class: CONVERSATION_TYPE, name: DIRECT_CONVERSATION })
    // CHECK IF THE CONVERSATION ALREADY EXISTS
    const conversation = await Conversation.findOne({
        type_id: directChatType._id,
        members: {
            $all: [{ $elemMatch: { user_id: user_id } }, { $elemMatch: { user_id: source_id } }],
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
                        if: { $eq: [{ $ifNull: ['$avatar', ''] }, ''] },
                        then: '$avatar',
                        else: { $concat: [LINK_STATIC_URL, '$avatar'] },
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

// ========== REPLY PROJECT INVITATION ========== //
const replyProjectInvitation = async (notification, io) => {
    const { user_id, source_id } = notification
    const { project_id, team_role_id, role_id } = notification.data
    // PROJECT MEMBER
    const projectMember = await ProjectMember.findOne({
        user_id: user_id,
        project_id: project_id,
    })
    // CHECK IF THE USER IS ALREADY A MEMBER OF THE PROJECT
    if (!projectMember) {
        await ProjectMember.create({
            user_id: user_id,
            project_id: project_id,
            team_role_id,
            role_id,
        })
    }
    // CONVERSATION
    const conversationType = await Type.findOne({ class: CONVERSATION_TYPE, name: GROUP_CONVERSATION })
    const conversation = await Conversation.findOne({
        type_id: conversationType._id,
        data: {
            project_id: new ObjectId(project_id),
        },
    })

    // ADD MEMBER TO CONVERSATION
    if (conversation) {
        const existingMember = conversation.members.find((member) => member.user_id.toString() === user_id.toString())
        if (!existingMember) {
            const memberRole = await Role.findOne({
                name: CONVERSATION_MEMBER_ROLE,
                type_id: conversationType._id,
            })
            if (!memberRole) {
                throw new Error('Conversation member role not found!')
            }
            conversation.members.push({
                user_id: user_id,
                role_id: memberRole._id,
            })
            await conversation.save()
            return
        }
    } else {
        // CREATE A NEW CONVERSATION IF IT DOESN'T EXIST
        const adminRole = await Role.findOne({
            name: CONVERSATION_ADMIN_ROLE,
            type_id: conversationType._id,
        })
        if (!adminRole) {
            throw new Error('Conversation admin role not found!')
        }
        const memberRole = await Role.findOne({
            name: CONVERSATION_MEMBER_ROLE,
            type_id: conversationType._id,
        })
        if (!memberRole) {
            throw new Error('Conversation member role not found!')
        }
        await Conversation.create({
            members: [
                {
                    user_id: source_id,
                    role_id: adminRole._id,
                },
                {
                    user_id: user_id,
                    role_id: memberRole._id,
                },
            ],
            type_id: conversationType._id,
            data: {
                project_id: new ObjectId(project_id),
            },
        })

        return
    }
}

export async function getTotalFriends(user) {
    const totalFriends = await Friend.countDocuments({ user_id: user._id })
    return totalFriends
}

export async function projectInvitation(user, requestBody, type_id, io) {
    const { project_id, user_id } = requestBody
    const type = await Type.findOne({ name: 'Project Invitation' })

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
            { user_id: user_id, source_id: user._id },
            { user_id: user._id, source_id: user_id },
        ],
        type: 'friend_request',
    })

    return request
}

// ========== PUT [Notification - Reply Invitation Member] ========== //
export async function replyInvitationMember(user, requestBody, io) {
    const { notification_id, action } = requestBody
    const notification = await NotificationFeed.findById(notification_id)

    if (notification.metadata.status === 'waiting') {
        const { user_id, source_id, additional_info } = notification
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
        await NotificationFeed.deleteOne({ _id: notification_id })
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
