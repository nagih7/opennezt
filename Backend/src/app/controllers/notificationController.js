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
    await notificationService.replyNotification(req.params, req.body, req.io)
    res.jsonify('Reply notification successfully.')
}

export async function getTotalFriends(req, res) {
    const result = await notificationService.getTotalFriends(req.currentUser)
    res.jsonify(result)
}

export async function projectInvitation(req, res) {
    await notificationService.projectInvitation(req.currentUser, req.body, req.io)
    res.status(201).jsonify('Project invitation successfully.')
}

// Get request add friend
export async function getRequestAddFriend(req, res) {
    const result = await notificationService.getRequestAddFriend(req.currentUser, req.params.user_id)
    res.jsonify(result)
}

// ========== PUT [Notification - Reply Invitation Member] ========== //
export async function replyInvitationMember(req, res) {
    await notificationService.replyInvitationMember(req.currentUser, req.body, req.io)
    res.jsonify('Reply invitation member successfully.')
}
