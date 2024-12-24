import * as notificationService from '../services/notificationService'

export async function readRoot(req, res) {
    const result = await notificationService.filter(req.currentUser, req.query)
    res.jsonify(result)
}

export async function getNotifications(req, res) {
    const result = await notificationService.getNotifications(req.currentUser)
    res.jsonify(result)
}

export async function replyNotification(req, res) {
    await notificationService.replyNotification(req.body, req.io)
    res.jsonify('Reply notification successfully.')
}

export async function requestAddFriend(req, res) {
    await notificationService.requestAddFriend(req.currentUser, req.body, req.io)
    res.status(201).jsonify('Request message successfully.')
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
