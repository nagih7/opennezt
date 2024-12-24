import {LINK_STATIC_URL} from '@/configs'
import {Message, ObjectId, Conversation, Project} from '@/models'

export async function getChatList(user, input_value) {
    if (!input_value || input_value === 'undefined' || input_value === null) {
        input_value = ''
    }
    const chatList = await Conversation.aggregate([
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
                            name: {$regex: input_value, $options: 'i'},
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
            $match: {
                members: {$ne: null},
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
        {
            $sort: {updated_at: -1},
        },
    ])

    return chatList
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
