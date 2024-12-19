import {LINK_STATIC_URL} from '@/configs'
import {ChatInvitation, Messenger, ObjectId, Friend} from '@/models'
import {userSockets} from '@/routes/socket'

export async function getChatList(user, input_value) {
    // const chatList = await ChatInvitation.aggregate([
    //     {
    //         $match: {
    //             $or: [{sender_id: user._id}, {receiver_id: user._id}],
    //             status: 'accepted',
    //         },
    //     },
    //     {
    //         $project: {
    //             participants: {
    //                 $cond: [{$eq: ['$sender_id', user._id]}, '$receiver_id', '$sender_id'],
    //             },
    //             created_at: 1,
    //             updated_at: 1,
    //         },
    //     },
    //     {
    //         $group: {
    //             _id: null,
    //             uniqueParticipants: {$addToSet: '$participants'},
    //         },
    //     },
    //     {
    //         $match: {
    //             uniqueParticipants: {$ne: user._id},
    //         },
    //     },
    //     {
    //         $lookup: {
    //             from: 'users',
    //             localField: 'uniqueParticipants',
    //             foreignField: '_id',
    //             as: 'users',
    //         },
    //     },

    //     {
    //         $project: {
    //             chatList: {
    //                 $map: {
    //                     input: '$users',
    //                     as: 'user',
    //                     in: {
    //                         receiver_id: '$$user._id',
    //                         username: '$$user.name',
    //                         avatar: {
    //                             $cond: {
    //                                 if: {$eq: [{$ifNull: ['$$user.avatar', '']}, '']},
    //                                 then: '$$user.avatar',
    //                                 else: {$concat: [LINK_STATIC_URL, '$$user.avatar']},
    //                             },
    //                         },
    //                         created_at: '$$user.created_at',
    //                         updated_at: '$$user.updated_at',
    //                     },
    //                 },
    //             },
    //         },
    //     },
    //     {
    //         $unwind: '$chatList',
    //     },
    //     {
    //         $replaceRoot: {
    //             newRoot: '$chatList',
    //         },
    //     },
    //     {
    //         $sort: {updated_at: -1},
    //     },
    // ])
    if (!input_value || input_value === 'undefined' || input_value === null) {
        input_value = ''
    }
    const chatList = await Friend.aggregate([
        {
            $match: {
                user_id: user._id,
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'friend_id',
                foreignField: '_id',
                as: 'friend',
                pipeline: [
                    {
                        $match: {
                            name: {$regex: input_value, $options: 'i'},
                        },
                    },
                    {
                        $project: {
                            name: 1,
                            avatar: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: '$friend',
        },
        {
            $project: {
                // _id: 0,
                user_id: '$friend._id',
                user_name: '$friend.name',
                user_avatar: {
                    $cond: {
                        if: {$eq: [{$ifNull: ['$friend.avatar', '']}, '']},
                        then: '$friend.avatar',
                        else: {$concat: [LINK_STATIC_URL, '$friend.avatar']},
                    },
                },
            },
        },
        {
            $sort: {last_message_at: -1},
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

export async function createChatInvitation(user, requestBody) {
    const invitation = new ChatInvitation({
        sender_id: user._id,
        sender_name: user.name,
        user_id: new ObjectId(requestBody.user_id),
        receiver_name: requestBody.receiver_name,
    })

    await invitation.save()
}

export async function getChatInvitations(user) {
    const invitations = await ChatInvitation.find({receiver_id: user._id})
    return invitations
}

export async function getChatInvitationByReceiverId(user, receiver_id) {
    const invitation = await ChatInvitation.findOne({
        sender_id: user._id,
        receiver_id: new ObjectId(receiver_id),
        status: {$ne: 'rejected'},
    }).select('status -_id')
    return invitation ? invitation : {status: 'pending'}
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
