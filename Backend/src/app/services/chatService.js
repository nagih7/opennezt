import {LINK_STATIC_URL} from '@/configs'
import {Message, ObjectId, Conversation} from '@/models'

// ========== GET [CONVERSATIONS] ========== //
export async function getConversations(user) {
    const conversations = await Conversation.aggregate([
        {
            $match: {
                members: {$elemMatch: {user_id: user._id}},
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'members.user_id',
                foreignField: '_id',
                as: 'members',
                pipeline: [
                    {
                        $match: {
                            _id: {$ne: user._id},
                        },
                    },
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            avatar: {
                                $cond: {
                                    if: {$eq: [{$ifNull: ['$avatar', '']}, '']},
                                    then: '$avatar',
                                    else: {$concat: [LINK_STATIC_URL, '$avatar']},
                                },
                            },
                        },
                    },
                ],
            },
        },
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
        {
            $lookup: {
                from: 'messages',
                localField: 'last_message_id',
                foreignField: '_id',
                as: 'last_message',
            },
        },
        {
            $unwind: {
                path: '$last_message',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $unwind: '$type',
        },
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
                updated_at: 1,
            },
        },
    ])

    return conversations
}

// ========== GET [CONVERSATION] ========== //
export async function getConversation(user, {conversationId}) {
    const conversation = await Conversation.aggregate([
        {
            $match: {
                _id: new ObjectId(conversationId),
                members: {$elemMatch: {user_id: user._id}},
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'members.user_id',
                foreignField: '_id',
                as: 'members',
                pipeline: [
                    {
                        $match: {
                            _id: {$ne: user._id},
                        },
                    },
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            avatar: {
                                $cond: {
                                    if: {$eq: [{$ifNull: ['$avatar', '']}, '']},
                                    then: '$avatar',
                                    else: {$concat: [LINK_STATIC_URL, '$avatar']},
                                },
                            },
                        },
                    },
                ],
            },
        },
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
        {
            $unwind: '$type',
        },
        {
            $project: {
                _id: 1,
                members: 1,
                metadata: {
                    type: 1,
                    data: 1,
                },
                type: 1,
                updated_at: 1,
            },
        },
    ])

    return conversation[0]
}

export async function getChatHistory(user, requestParams) {
    const result = {
        conversation: {},
        messages: [],
    }
    const conversation = await Conversation.aggregate([
        {
            $match: {
                _id: new ObjectId(requestParams.conversation_id),
                member_ids: {$elemMatch: {user_id: user._id}},
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'member_ids.user_id',
                foreignField: '_id',
                as: 'members',
                pipeline: [
                    {
                        $match: {
                            _id: {$ne: user._id},
                        },
                    },
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            avatar: {
                                $cond: {
                                    if: {$eq: [{$ifNull: ['$avatar', '']}, '']},
                                    then: '$avatar',
                                    else: {$concat: [LINK_STATIC_URL, '$avatar']},
                                },
                            },
                        },
                    },
                ],
            },
        },
        {
            $lookup: {
                from: 'projects',
                localField: 'metadata.data.project_id',
                foreignField: '_id',
                as: 'metadata.data.project',
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: '$metadata.data.project',
                preserveNullAndEmptyArrays: true, // giữ lại các bản ghi không có project
            },
        },
        {
            $project: {
                _id: 1,
                members: 1,
                metadata: {
                    type: 1,
                    data: {
                        project: 1,
                    },
                },
                project: 1,
                updated_at: 1,
            },
        },
    ])
    const messages = await Message.find({conversation_id: requestParams.conversation_id}).sort({
        created_at: 1,
    })

    result.conversation = conversation[0]
    result.messages = messages
    return result
}

export async function saveMessage(newMessage, user_id) {
    const message = new Message({
        conversation_id: newMessage.conversation_id,
        user_id: user_id,
        content: newMessage.content,
        metadata: {
            type: 'text',
            data: {},
            read_by: [],
        },
    })
    await message.save()
    const conversation = await Conversation.findById({_id: newMessage.conversation_id})
    conversation.updated_at = new Date()
    conversation.save()

    const members = await conversation.members.filter(
        (member) => member.user_id.toString() !== user_id.toString()
    )

    return {message, members}
}
