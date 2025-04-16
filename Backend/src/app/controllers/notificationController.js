import * as notificationService from '../services/notificationService'

export async function readRoot(req, res) {
    const result = await notificationService.filter(req.currentUser, req.query)
    res.jsonify(result)
}

// ========== GET [Notification - Read Notification] ========== //
export async function getNotifications(req, res) {
    const result = await notificationService.getNotifications(req.currentUser)
    res.jsonify(result)
}

// ========== PUT [Notification - Reply Notification] ========== //
export async function replyNotification(req, res) {
    const result = await notificationService.replyNotification(req.currentUser, req.params, req.body, req.io)
    res.jsonify(result, 'Reply notification successfully.')
}

// ========== PUT [Notification - Mark as Read] ========== //
export async function markAsRead(req, res) {
    const result = await notificationService.markAsRead(req.currentUser, req.params)
    res.jsonify(result, 'Mark as read successfully.')
}
