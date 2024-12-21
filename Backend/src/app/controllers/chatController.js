import Messenger from '../../models/messenger.js'
import User from '../../models/user.js'
import * as chatService from '../services/chatService.js'
import {userSockets} from '@/routes/socket/index.js'

export async function getChatList(req, res) {
    const chatList = await chatService.getChatList(req.currentUser, req.query.value)
    res.status(200).jsonify(chatList)
}

export async function getChatHistory(req, res) {
    const chatHistory = await chatService.getChatHistory(req.currentUser, req.params.user_id)
    res.status(200).jsonify(chatHistory)
}

export const saveMessage = async (data, io, socketId) => {
    const result = await chatService.saveMessage(data, socketId)
    const receiverSocketId = Object.keys(userSockets).find(
        (socketId) => userSockets[socketId] === data.receiver_id
    )
    if (receiverSocketId) {
        io.to(receiverSocketId).emit('message', result)
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
