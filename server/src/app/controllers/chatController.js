import Message from '../../models/message.js'
import User from '../../models/user.js'
import * as chatService from '../services/chatService.js'

// ========== GET [CONVERSATIONS] ========== //
export async function getConversations(req, res) {
    const conversations = await chatService.getConversations(req.currentUser)
    res.status(200).jsonify(conversations)
}

// ========== GET [CONVERSATION] ========== //
export async function getConversation(req, res) {
    const conversation = await chatService.getConversation(req.currentUser, req.params)
    res.status(200).jsonify(conversation)
}

// ========== GET [MESSAGES] ========== //
export async function getMessages(req, res) {
    const messages = await chatService.getMessages(req.currentUser, req.params)
    res.status(200).jsonify(messages)
}

export const getReceiverIds = async (userId) => {
    try {
        const senderIds = await Message.find({
            $or: [{ sender_id: userId }, { receiver_id: userId }],
        }).distinct('sender_id')

        const receiverIds = await Message.find({
            $or: [{ sender_id: userId }, { receiver_id: userId }],
        }).distinct('receiver_id')

        const distinctIds = [...new Set([...senderIds, ...receiverIds])]
        const filteredReceiverIds = distinctIds.filter((id) => id.toString() !== userId.toString())
        if (filteredReceiverIds.length === 0) {
            return []
        }

        const users = await User.find({
            _id: { $in: filteredReceiverIds },
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
