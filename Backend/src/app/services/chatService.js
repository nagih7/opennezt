import { LINK_STATIC_URL } from '@/configs'
import { Message, ObjectId, Conversation } from '@/models'

// ========== GET [CONVERSATIONS] ========== //
export async function getConversations(user) {
    const matchStage = {
        $match: {
            members: { $elemMatch: { user_id: user._id } },
        },
    }
    const lookupUserStage = {
        $lookup: {
            from: 'users',
            localField: 'members.user_id',
            foreignField: '_id',
            as: 'members',
            pipeline: [
                {
                    $match: {
                        _id: { $ne: user._id },
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
            ],
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
    const lookupMessageStage = {
        $lookup: {
            from: 'messages',
            localField: 'last_message_id',
            foreignField: '_id',
            as: 'last_message',
            pipeline: [
                {
                    $lookup: {
                        from: 'users',
                        localField: 'user_id',
                        foreignField: '_id',
                        as: 'user',
                        pipeline: [
                            {
                                $project: {
                                    name: 1,
                                },
                            },
                        ],
                    },
                },
                {
                    $unwind: '$user',
                },
                {
                    $project: {
                        _id: 0,
                        user: 1,
                        content: 1,
                        timestamp: 1,
                    },
                },
            ],
        },
    }
    const unwindLastMessageStage = {
        $unwind: {
            path: '$last_message',
            preserveNullAndEmptyArrays: true,
        },
    }
    const lookupProjectStage = {
        $lookup: {
            from: 'projects',
            localField: 'data.project_id',
            foreignField: '_id',
            as: 'data.project',
            pipeline: [
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        logo: {
                            $cond: {
                                if: { $eq: [{ $ifNull: ['$logo', ''] }, ''] },
                                then: '$logo',
                                else: { $concat: [LINK_STATIC_URL, '$logo'] },
                            },
                        },
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
    const sortStage = {
        $sort: {
            updated_at: -1,
        },
    }
    const projectStage = {
        $project: {
            _id: 1,
            members: 1,
            data: {
                project: 1,
            },
            metadata: {
                type: 1,
                data: 1,
            },
            type: '$type.name',
            last_message: 1,
            updated_at: 1,
        },
    }

    const conversations = await Conversation.aggregate([
        matchStage,
        lookupUserStage,
        lookupTypeStage,
        unwindTypeStage,
        lookupMessageStage,
        unwindLastMessageStage,
        lookupProjectStage,
        unwindProjectStage,
        sortStage,
        projectStage,
    ])

    return conversations
}

// ========== GET [CONVERSATION] ========== //
export async function getConversation(user, { conversationId }) {
    const matchStage = {
        $match: {
            _id: new ObjectId(conversationId),
            members: { $elemMatch: { user_id: user._id } },
        },
    }
    const lookupUserStage = {
        $lookup: {
            from: 'users',
            localField: 'members.user_id',
            foreignField: '_id',
            as: 'members',
            pipeline: [
                {
                    $match: {
                        _id: { $ne: user._id },
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
            ],
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
                        name: 1,
                    },
                },
            ],
        },
    }
    const unwindTypeStage = {
        $unwind: '$type',
    }
    const lookupProjectStage = {
        $lookup: {
            from: 'projects',
            localField: 'data.project_id',
            foreignField: '_id',
            as: 'data.project',
            pipeline: [
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        logo: {
                            $cond: {
                                if: { $eq: [{ $ifNull: ['$logo', ''] }, ''] },
                                then: '$logo',
                                else: { $concat: [LINK_STATIC_URL, '$logo'] },
                            },
                        },
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
    const messageLookupStage = {
        $lookup: {
            from: 'messages',
            localField: '_id',
            foreignField: 'conversation_id',
            as: 'messages',
            pipeline: [
                {
                    $lookup: {
                        from: 'users',
                        localField: 'user_id',
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
                {
                    $unwind: '$user',
                },
                {
                    $project: {
                        _id: 1,
                        user: 1,
                        content: 1,
                        read_by: 1,
                        pinned: 1,
                        status: 1,
                        timestamp: 1,
                    },
                },
            ],
        },
    }
    const projectStage = {
        $project: {
            _id: 1,
            members: 1,
            metadata: {
                type: 1,
                data: 1,
            },
            type: '$type.name',
            last_message: 1,
            data: {
                project: 1,
            },
            messages: 1,
            created_at: 1,
            updated_at: 1,
        },
    }

    const conversation = await Conversation.aggregate([
        matchStage,
        lookupUserStage,
        lookupTypeStage,
        unwindTypeStage,
        lookupProjectStage,
        unwindProjectStage,
        messageLookupStage,
        projectStage,
    ])

    return conversation[0]
}

// ========== GET [MESSAGES] ========== //
export async function getMessages(user, { conversationId }) {
    const conversation = await Conversation.findOne({
        _id: conversationId,
        members: { $elemMatch: { user_id: user._id } },
    })
    if (!conversation) {
        return []
    }
    const messages = await Message.aggregate([
        {
            $match: {
                conversation_id: conversation._id,
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user_id',
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
        {
            $unwind: '$user',
        },
        {
            $project: {
                _id: 1,
                user: 1,
                conversation_id: 1,
                content: 1,
                read_by: 1,
                pinned: 1,
                status: 1,
                timestamp: 1,
            },
        },
        {
            $sort: {
                timestamp: 1,
            },
        },
    ])
    return messages
}
