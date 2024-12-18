import * as notificationService from '../services/notificationService'

export async function getNotifications(req, res) {
    const result = await notificationService.getNotifications(req.currentUser)
    res.jsonify(result)
}

export async function replyNotification(req, res) {
    await notificationService.replyNotification(req.body)
    res.jsonify('Reply notification successfully.')
}

export async function requestMessage(req, res) {
    await notificationService.requestMessage(req.currentUser, req.body, req.io)
    res.status(201).jsonify('Request message successfully.')
}
