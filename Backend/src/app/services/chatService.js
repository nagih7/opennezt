import {LINK_STATIC_URL} from '@/configs'
import {Messenger, ObjectId, Conversation} from '@/models'
import {userSockets} from '@/routes/socket'

export async function getChatList(user, input_value) {
    if (!input_value || input_value === 'undefined' || input_value === null) {
        input_value = ''
    }
    // const chatList = await Friend.aggregate([
    //     {
    //         $match: {
    //             user_id: user._id,
    //         },
    //     },
    //     {
    //         $lookup: {
    //             from: 'users',
    //             localField: 'friend_id',
    //             foreignField: '_id',
    //             as: 'friend',
    //             pipeline: [
    //                 {
    //                     $match: {
    //                         name: {$regex: input_value, $options: 'i'},
    //                     },
    //                 },
    //                 {
    //                     $project: {
    //                         name: 1,
    //                         avatar: 1,
    //                     },
    //                 },
    //             ],
    //         },
    //     },
    //     {
    //         $unwind: '$friend',
    //     },
    //     {
    //         $project: {
    //             // _id: 0,
    //             user_id: '$friend._id',
    //             user_name: '$friend.name',
    //             user_avatar: {
    //                 $cond: {
    //                     if: {$eq: [{$ifNull: ['$friend.avatar', '']}, '']},
    //                     then: '$friend.avatar',
    //                     else: {$concat: [LINK_STATIC_URL, '$friend.avatar']},
    //                 },
    //             },
    //         },
    //     },
    //     {
    //         $sort: {last_message_at: -1},
    //     },
    // ])

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
            $unwind: {
                path: '$members',
                preserveNullAndEmptyArrays: true, // Nếu không muốn giữ lại các bản ghi không có data
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
                metadata: 1,
            },
        },
        {
            $sort: {updated_at: -1},
        },
    ])

    return chatList
}

export async function getChatHistory(user, user_id) {
    const result = {
        messages: [],
        receiver_id: user_id,
    }
    const messages = await Messenger.find({
        $or: [
            {sender_id: user._id, receiver_id: new ObjectId(user_id)},
            {sender_id: new ObjectId(user_id), receiver_id: user._id},
        ],
    }).sort({date: 1})
    result.messages = messages

    return result
}

export async function saveMessage(messages, socketId) {
    const message = new Messenger({
        sender_id: userSockets[socketId],
        receiver_id: messages.receiver_id,
        content: messages.content,
        date: new Date().toISOString(),
    })
    await message.save()
    return message
}
