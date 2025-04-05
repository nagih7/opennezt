import {
    CONFIRM_FRIEND_REQUEST_NOTIFICATION,
    CONFIRM_PROJECT_INVITATION_NOTIFICATION,
    CONFIRM_STATUS,
    CONVERSATION_TYPE,
    DELETE_STATUS,
    DIRECT_CONVERSATION,
    FRIEND_REQUEST_NOTIFICATION,
    GROUP_CONVERSATION,
    LINK_STATIC_URL,
    NOTIFICATION_TYPE,
    PROJECT_INVITATION_NOTIFICATION,
} from '@/configs'
import { CONVERSATION_ADMIN_ROLE, CONVERSATION_MEMBER_ROLE } from '@/configs/roleConstants'
import { NotificationFeed, Friend, ObjectId, Conversation, Type, ProjectMember, Role, Subscription } from '@/models'
import { userSockets } from '@/routes'
import webpush from 'web-push'

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
export async function replyNotification(user, { notificationId }, { action }, io) {
    if (action === CONFIRM_STATUS) {
        const notification = await NotificationFeed.findOne({
            _id: new ObjectId(notificationId),
        })
        // Check if notification exists
        if (!notification) {
            throw new Error('Notification not found!')
        }

        // ========== GET NOTIFICATION TYPE ========== //
        const notificationType = await Type.findById(notification.type_id)
        switch (notificationType.name) {
            case FRIEND_REQUEST_NOTIFICATION:
                // ========== REPLY FRIEND REQUEST ========== //
                await replyFriendRequest(user, notification, io)
                break
            case PROJECT_INVITATION_NOTIFICATION:
                // ========== REPLY PROJECT INVITATION ========== //
                await replyProjectInvitation(user, notification, io)
                break
            default:
                break
        }
        notification.metadata.status = CONFIRM_STATUS
        notification.metadata.read = true
        notification.markModified('metadata')
        await notification.save()

        return notification
    } else if (action === DELETE_STATUS) {
        await NotificationFeed.findByIdAndDelete(new ObjectId(notificationId))
        return
    }
}

// ========== REPLY FRIEND REQUEST ========== //
export const replyFriendRequest = async (user, notification, io) => {
    const { source_id } = notification

    // ========== CHECK IF THE USER IS ALREADY FRIENDS ========== //
    const existingFriendship = await Friend.findOne({ user_id: user._id, friend_id: source_id })
    if (!existingFriendship) {
        await Friend.create({ user_id: user._id, friend_id: source_id })
        await Friend.create({ user_id: source_id, friend_id: user._id })
    }
    // ========== DIRECT CHAT TYPE ========= //
    const directChatType = await Type.findOne({ class: CONVERSATION_TYPE, name: DIRECT_CONVERSATION })
    // CHECK IF THE CONVERSATION ALREADY EXISTS
    const conversation = await Conversation.findOne({
        type_id: directChatType._id,
        members: {
            $all: [{ $elemMatch: { user_id: user._id } }, { $elemMatch: { user_id: source_id } }],
        },
    })

    if (!conversation) {
        // ========== CREATE A NEW CONVERSATION IF IT DOESN'T EXIST ========== //
        const conversationAdminRole = await Role.findOne({
            name: CONVERSATION_ADMIN_ROLE,
            type_id: directChatType._id,
        })
        if (!conversationAdminRole) {
            throw new Error('Conversation admin role not found!')
        }
        const newConversation = new Conversation({
            members: [
                {
                    user_id: user._id,
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
    // ========== SEND NOTIFICATION ========== //
    const receiverSocketId = Object.keys(userSockets).find((socketId) => userSockets[socketId] === source_id.toString())
    // SEND NOTIFICATION TO THE USER
    const confirmType = await Type.findOne({
        class: FRIEND_REQUEST_NOTIFICATION,
        name: CONFIRM_FRIEND_REQUEST_NOTIFICATION,
    })
    await NotificationFeed.create({
        user_id: source_id,
        type_id: confirmType._id,
        source_id: user._id,
        metadata: {
            status: CONFIRM_STATUS,
            read: false,
        },
    })
    const notificationData = await NotificationFeed.aggregate([
        { $match: { user_id: source_id, type_id: confirmType._id, source_id: user._id } },
        {
            $lookup: {
                from: 'users',
                localField: 'source_id',
                foreignField: '_id',
                as: 'user',
                pipeline: [
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
                ],
            },
        },
        { $unwind: '$user' },
        {
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
        },
        { $unwind: '$type' },
        { $project: { _id: 1, type: 1, user: 1, timestamp: 1, metadata: 1, data: 1 } },
    ])

    if (receiverSocketId) {
        io.to(receiverSocketId).emit(CONFIRM_FRIEND_REQUEST_NOTIFICATION, notificationData[0])
    }
    // ========== [WEBPUSH] ========== //
    const subscription = await Subscription.findOne({ user_id: source_id })
    if (subscription) {
        const payload = JSON.stringify({
            title: 'OpenNezt',
            body: `${user.name} has accepted your friend request!`,
            icon: user.avatar ? user.avatar : null,
            tag: CONFIRM_FRIEND_REQUEST_NOTIFICATION,
            data: {
                url: '',
                type: CONFIRM_FRIEND_REQUEST_NOTIFICATION,
            },
        })
        webpush.sendNotification(subscription, payload).catch(async (err) => {
            console.error('Error sending notification:', err)
            await Subscription.deleteOne({ user_id: source_id })
        })
    }
}

// ========== PUT [Notification - Reply Invitation Member] ========== //
export async function replyProjectInvitation(user, notification, io) {
    const { source_id } = notification
    const { project_id, team_role_id, role_id } = notification.data
    // ========== CHECK IF THE USER IS ALREADY IN THE PROJECT ========== //
    const existingMember = await ProjectMember.findOne({ user_id: user._id, project_id: project_id })
    if (!existingMember) {
        await ProjectMember.create({
            user_id: user._id,
            project_id: project_id,
            team_role_id: team_role_id,
            role_id: role_id,
        })
    }
    // ========== GROUP CHAT TYPE ========= //
    const groupChatType = await Type.findOne({ class: CONVERSATION_TYPE, name: GROUP_CONVERSATION })
    // CHECK IF THE CONVERSATION ALREADY EXISTS
    const conversation = await Conversation.findOne({
        type_id: groupChatType._id,
        data: {
            project_id: project_id,
        },
    })
    // ========== CREATE A NEW CONVERSATION IF IT DOESN'T EXIST ========== //
    if (!conversation) {
        // GET CONVERSATION ADMIN ROLE
        const conversationAdminRole = await Role.findOne({
            name: CONVERSATION_ADMIN_ROLE,
            type_id: groupChatType._id,
        })
        if (!conversationAdminRole) {
            throw new Error('Conversation admin role not found!')
        }
        // GET CONVERSATION MEMBER ROLE
        const conversationMemberRole = await Role.findOne({
            name: CONVERSATION_MEMBER_ROLE,
            type_id: groupChatType._id,
        })
        if (!conversationMemberRole) {
            throw new Error('Conversation member role not found!')
        }
        const newConversation = new Conversation({
            members: [
                {
                    user_id: source_id,
                    role_id: conversationAdminRole._id,
                },
                {
                    user_id: source_id,
                    role_id: conversationMemberRole._id,
                },
            ],
            type_id: groupChatType._id,
            data: {
                project_id: project_id,
            },
        })
        await newConversation.save()
    } else {
        // ========== ADD USER TO THE CONVERSATION ========== //
        const existingMember = conversation.members.find((member) => member.user_id.toString() === user._id.toString())
        if (!existingMember) {
            const conversationMemberRole = await Role.findOne({
                name: CONVERSATION_MEMBER_ROLE,
                type_id: groupChatType._id,
            })
            if (!conversationMemberRole) {
                throw new Error('Conversation member role not found!')
            }
            conversation.members.push({
                user_id: user._id,
                role_id: conversationMemberRole._id,
            })
            await conversation.save()
        }
    }

    // ========== CREATE NOTIFICATION ========== //
    const confirmProjectInvitationType = await Type.findOne({
        class: NOTIFICATION_TYPE,
        name: CONFIRM_PROJECT_INVITATION_NOTIFICATION,
    })
    const newNotifcation = await NotificationFeed.create({
        user_id: source_id,
        type_id: confirmProjectInvitationType._id,
        source_id: user._id,
        data: {
            project_id: project_id,
            team_role_id: team_role_id,
            role_id: role_id,
        },
        metadata: {
            status: CONFIRM_STATUS,
            read: false,
        },
    })
    await newNotifcation.save()

    // ========== SEND NOTIFICATION ========== //

    const notificationData = await NotificationFeed.aggregate([
        { $match: { _id: newNotifcation._id } },
        {
            $lookup: {
                from: 'users',
                localField: 'source_id',
                foreignField: '_id',
                as: 'user',
                pipeline: [
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
                ],
            },
        },
        { $unwind: '$user' },
        {
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
        },
        { $unwind: '$type' },
        {
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
                        },
                    },
                ],
            },
        },
        { $unwind: '$data.project' },
        { $project: { _id: 1, type: 1, user: 1, timestamp: 1, metadata: 1, data: 1 } },
    ])
    // ========= SEND NOTIFICATION TO THE USER ========= //
    const receiverSocketId = Object.keys(userSockets).find((socketId) => userSockets[socketId] === source_id.toString())
    if (receiverSocketId) {
        io.to(receiverSocketId).emit(CONFIRM_PROJECT_INVITATION_NOTIFICATION, notificationData[0])
    }
    // ========== [WEBPUSH] ========== //
    const subscription = await Subscription.findOne({ user_id: source_id })
    if (subscription) {
        const payload = JSON.stringify({
            title: 'OpenNezt',
            body: `${user.name} has accepted your project invitation!`,
            icon: user.avatar ? user.avatar : null,
            tag: confirmProjectInvitationType._id,
            data: {
                url: '',
                type: CONFIRM_PROJECT_INVITATION_NOTIFICATION,
            },
        })
        webpush.sendNotification(subscription, payload).catch(async (err) => {
            console.error('Error sending notification:', err)
            await Subscription.deleteOne({ user_id: source_id })
        })
    }
}
