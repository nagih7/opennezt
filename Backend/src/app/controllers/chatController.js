import Messenger from '../../models/messenger.js'
import User from '../../models/user.js'
import * as chatService from '../services/chatService.js'
import {userSockets} from '@/routes/socket/index.js'

export const saveMessage = async (data, io) => {
    await chatService.saveMessage(data)
    const receiverSocketId = userSockets[data.receiver_id]
    if (receiverSocketId) {
        io.to(receiverSocketId).emit('message', data)
    }
}

export const getReceiverIds = async (userId) => {
    try {
        const senderIds = await Messenger.find({
            $or: [{sender_id: userId}, {receiver_id: userId}],
        }).distinct('sender_id')

        const receiverIds = await Messenger.find({
            $or: [{sender_id: userId}, {receiver_id: userId}],
        }).distinct('receiver_id')

        const distinctIds = [...new Set([...senderIds, ...receiverIds])]
        const filteredReceiverIds = distinctIds.filter((id) => id.toString() !== userId.toString())
        if (filteredReceiverIds.length === 0) {
            return []
        }

        const users = await User.find({
            _id: {$in: filteredReceiverIds},
        })

        return users.map((user) => {
            return {
                receiver_id: userId,
                userId: user._id,
                username: user.name,
                avatar: user.avatar,
            }
        })
    } catch (error) {
        console.error('Error getting receiver names:', error)
        throw error
    }
}

export async function chatInvitation(req, res) {
    await chatService.chatInvitation(req.currentUser, req.body)
    res.status(201).jsonify('Mời trò chuyện thành công.')
}

export async function getChatInvitations(req, res) {
    const invitations = await chatService.getChatInvitations(req.currentUser)
    res.status(200).json(invitations)
}

export async function getChatInvitation(req, res) {
    const invitation = await chatService.getChatInvitation(req.currentUser, req.params.receiver_id)
    res.status(200).json(invitation)
}
