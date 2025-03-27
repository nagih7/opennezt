import Message from '../../models/message.js'
import User from '../../models/user.js'
import * as chatService from '../services/chatService.js'
import {userSockets} from '@/routes/socket/index.js'

// ========== GET [CONVERSATIONS] ========== //
export async function getConversations(req, res) {
    const conversations = await chatService.getConversations(req.currentUser)
    res.status(200).jsonify(conversations)
}

export async function getChatHistory(req, res) {
    const chatHistory = await chatService.getChatHistory(req.currentUser, req.params)
    res.status(200).jsonify(chatHistory)
}

export const saveMessage = async (data, io, socketId) => {
    const {message, members} = await chatService.saveMessage(data, userSockets[socketId])

    members.forEach((member) => {
        const receiverSocketId = Object.keys(userSockets).find(
            (socketId) => userSockets[socketId] === member.user_id.toString()
        )
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('message', message)
        }
    })
}

export const getReceiverIds = async (userId) => {
    try {
        const senderIds = await Message.find({
            $or: [{sender_id: userId}, {receiver_id: userId}],
        }).distinct('sender_id')

        const receiverIds = await Message.find({
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
