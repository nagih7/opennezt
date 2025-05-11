import { LINK_STATIC_URL, MESSAGE_TYPE, TEXT_MESSAGE } from '@/configs'
import { Message, ObjectId, Conversation, Type, User } from '@/models'

// Create reusable pipeline stages
const createCommonPipelineStages = (user) => {
    return {
        lookupUserStage: {
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
        },
        lookupTypeStage: {
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
        unwindTypeStage: {
            $unwind: '$type',
        },
        lookupProjectStage: {
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
        },
        unwindProjectStage: {
            $unwind: {
                path: '$data.project',
                preserveNullAndEmptyArrays: true,
            },
        },
    }
}

// ========== GET [CONVERSATIONS] ========== //
export async function getConversations(user) {
    const stages = createCommonPipelineStages(user)

    const pipeline = [
        {
            $match: {
                members: { $elemMatch: { user_id: user._id } },
            },
        },
        stages.lookupUserStage,
        stages.lookupTypeStage,
        stages.unwindTypeStage,
        {
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
        },
        {
            $unwind: {
                path: '$last_message',
                preserveNullAndEmptyArrays: true,
            },
        },
        stages.lookupProjectStage,
        stages.unwindProjectStage,
        {
            $sort: {
                updated_at: -1,
            },
        },
        {
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
                type: 1,
                last_message: 1,
                updated_at: 1,
                encryption_enabled: 1,
            },
        },
    ]

    return await Conversation.aggregate(pipeline)
}

// ========== GET [CONVERSATION] ========== //
export async function getConversation(user, { conversationId }) {
    const stages = createCommonPipelineStages(user)

    const pipeline = [
        {
            $match: {
                _id: new ObjectId(conversationId),
                members: { $elemMatch: { user_id: user._id } },
            },
        },
        stages.lookupUserStage,
        stages.lookupTypeStage,
        stages.unwindTypeStage,
        stages.lookupProjectStage,
        stages.unwindProjectStage,
        {
            $project: {
                _id: 1,
                members: 1,
                metadata: {
                    type: 1,
                    data: 1,
                },
                type: 1,
                last_message: 1,
                data: {
                    project: 1,
                },
                created_at: 1,
                updated_at: 1,
                encryption_enabled: 1,
            },
        },
    ]

    const conversation = await Conversation.aggregate(pipeline)
    return conversation[0]
}

// ========== GET [MESSAGES] ========== //
export async function getMessages(user, { conversationId }) {
    // Check conversation access first to avoid expensive aggregation if not needed
    const conversationExists = await Conversation.exists({
        _id: conversationId,
        members: { $elemMatch: { user_id: user._id } },
    })

    if (!conversationExists) {
        return []
    }

    return await Message.aggregate([
        {
            $match: {
                conversation_id: new ObjectId(conversationId),
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
                is_encrypted: 1,
                encryption_metadata: 1,
            },
        },
        {
            $sort: {
                timestamp: 1,
            },
        },
    ])
}

// ========== SEND [MESSAGE -- NO SOCKET] ========== //
export async function sendMessage(user, { conversationId }, { content, isEncrypted, encryptionMetadata }) {
    // Using findOne to get all necessary data in one query
    const [conversation, typeMessage] = await Promise.all([
        Conversation.findOne({
            _id: conversationId,
            members: { $elemMatch: { user_id: user._id } },
        }),
        Type.findOne({ class: MESSAGE_TYPE, name: TEXT_MESSAGE }),
    ])

    if (!conversation || !typeMessage) {
        throw new Error('Conversation not found or message type invalid')
    }

    // Check if this is an encrypted message in an encryption-enabled conversation
    if (isEncrypted && !conversation.encryption_enabled) {
        throw new Error('Cannot send encrypted message in a non-encrypted conversation')
    }

    // Create and save message in one operation
    const message = await Message.create({
        conversation_id: conversation._id,
        user_id: user._id,
        content,
        type_id: typeMessage._id,
        read_by: [user._id], // Mark as read by sender
        is_encrypted: isEncrypted || false,
        encryption_metadata: encryptionMetadata || null,
        status: 'sent',
    })

    // Update conversation in background without waiting
    Conversation.updateOne(
        { _id: conversation._id },
        {
            $set: {
                updated_at: new Date(),
                last_message_id: message._id,
            },
        }
    ).exec()

    // Get user info for response
    const userInfo = await User.findById(user._id).select('_id name avatar').lean()

    // Format avatar URL if needed
    if (userInfo.avatar) {
        userInfo.avatar = LINK_STATIC_URL + userInfo.avatar
    }

    return {
        _id: message._id,
        user: userInfo,
        conversation_id: message.conversation_id,
        content: message.content,
        read_by: message.read_by,
        pinned: message.pinned,
        status: message.status,
        timestamp: message.timestamp,
        is_encrypted: message.is_encrypted,
    }
}
