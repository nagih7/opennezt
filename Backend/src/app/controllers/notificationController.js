import * as notificationService from '../services/notificationService'

export async function updateChatInvitation(req, res) {
    console.log('updateChatInvitation', req.body)
    await notificationService.updateChatInvitation(req.body)
    res.jsonify('Cập nhật lời mời trò chuyện thành công.')
}

export async function requestMessage(req, res) {
    await notificationService.requestMessage(req.currentUser, req.body, req.io)
    res.status(201).jsonify('Gửi yêu cầu thành công.')
}
