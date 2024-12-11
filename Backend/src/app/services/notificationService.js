import {ChatInvitation} from '@/models'

export async function updateChatInvitation(requestBody) {
    const {notification_id, status} = requestBody
    const chatInvitation = await ChatInvitation.findOne({_id: notification_id, status: 'waiting'})
    chatInvitation.status = status
    await chatInvitation.save()
}
