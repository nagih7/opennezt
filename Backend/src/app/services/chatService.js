import {LINK_STATIC_URL} from '@/configs'
import {ChatInvitation, Messenger, ObjectId} from '@/models'
import {userSockets} from '@/routes/socket'

export async function getChatList(user) {
    // const chatList = await Messenger.aggregate([
    //     // Bước 1: Lọc tin nhắn ngay từ đầu
    //     {
    //         $match: {
    //             $or: [{sender_id: user._id}, {receiver_id: user._id}],
    //         },
    //     },
    //     // Bước 2: Lấy danh sách người tham gia
    //     {
    //         $project: {
    //             participants: {$cond: [{$eq: ['$sender_id', user._id]}, '$receiver_id', '$sender_id']},
    //         },
    //     },
    //     // Bước 3: Chỉ lấy các user_id duy nhất
    //     {
    //         $group: {
    //             _id: null,
    //             uniqueParticipants: {$addToSet: '$participants'},
    //         },
    //     },
    //     // Bước 4: Lọc lại các user_id không phải của người dùng hiện tại
    //     {
    //         $match: {
    //             uniqueParticipants: {$ne: user._id},
    //         },
    //     },
    //     // Bước 5: Lookup vào collection User để lấy thông tin
    //     {
    //         $lookup: {
    //             from: 'users',
    //             localField: 'uniqueParticipants',
    //             foreignField: '_id',
    //             as: 'users',
    //         },
    //     },
    //     // Bước 6: Chỉ lấy các trường cần thiết
    //     {
    //         $project: {
    //             chatList: {
    //                 $map: {
    //                     input: '$users',
    //                     as: 'user',
    //                     in: {
    //                         receiver_id: '$$user._id',
    //                         username: '$$user.name',
    //                         avatar: '$$user.avatar',
    //                     },
    //                 },
    //             },
    //         },
    //     },
    //     // Bước 7: Flatten kết quả
    //     {
    //         $unwind: '$chatList',
    //     },
    //     {
    //         $replaceRoot: {
    //             newRoot: '$chatList',
    //         },
    //     },
    // ])

    const chatList = await ChatInvitation.aggregate([
        {
            $match: {
                $or: [{sender_id: user._id}, {receiver_id: user._id}],
                status: 'accepted',
            },
        },
        {
            $project: {
                participants: {
                    $cond: [{$eq: ['$sender_id', user._id]}, '$receiver_id', '$sender_id'],
                },
            },
        },
        {
            $group: {
                _id: null,
                uniqueParticipants: {$addToSet: '$participants'},
            },
        },
        {
            $match: {
                uniqueParticipants: {$ne: user._id},
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'uniqueParticipants',
                foreignField: '_id',
                as: 'users',
            },
        },
        {
            $project: {
                chatList: {
                    $map: {
                        input: '$users',
                        as: 'user',
                        in: {
                            receiver_id: '$$user._id',
                            username: '$$user.name',
                            avatar: {
                                $cond: {
                                    if: {$eq: [{$ifNull: ['$$user.avatar', '']}, '']},
                                    then: '$$user.avatar',
                                    else: {$concat: [LINK_STATIC_URL, '$$user.avatar']},
                                },
                            },
                        },
                    },
                },
            },
        },
        {
            $unwind: '$chatList',
        },
        {
            $replaceRoot: {
                newRoot: '$chatList',
            },
        },
    ])

    return chatList
}

export async function getChatHistory(user, receiver_id) {
    const result = {
        messages: [],
        receiver_id: receiver_id,
    }
    const messages = await Messenger.find({
        $or: [
            {sender_id: user._id, receiver_id: new ObjectId(receiver_id)},
            {sender_id: new ObjectId(receiver_id), receiver_id: user._id},
        ],
    }).sort({date: 1})
    result.messages = messages

    return result
}

export async function createChatInvitation(user, requestBody) {
    const invitation = new ChatInvitation({
        sender_id: user._id,
        sender_name: user.name,
        receiver_id: new ObjectId(requestBody.receiver_id),
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
