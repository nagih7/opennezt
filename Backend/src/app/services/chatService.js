import {ChatInvitation, ObjectId} from '@/models'

export async function chatInvitation(user, requestBody) {
    const invitation = new ChatInvitation({
        sender_id: user._id,
        receiver_id: new ObjectId(requestBody.receiver_id),
    })

    await invitation.save()
}

export async function getChatInvitations(user) {
    const invitations = await ChatInvitation.find({receiver_id: user._id})
    return invitations
}

export async function getChatInvitation(user, receiver_id) {
    const invitation = await ChatInvitation.findOne({
        sender_id: user._id,
        receiver_id: new ObjectId(receiver_id),
        // status !== 'rejected',
        status: {$ne: 'rejected'},
    }).select('status -_id')
    return invitation
}
