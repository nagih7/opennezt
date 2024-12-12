import * as notificationService from '../services/notificationService'

export async function updateChatInvitation(req, res) {
    console.log('updateChatInvitation', req.body)
    await notificationService.updateChatInvitation(req.body)
    res.jsonify('Cập nhật lời mời trò chuyện thành công.')
}
