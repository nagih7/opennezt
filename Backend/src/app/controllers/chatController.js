import Message from '../../models/message.js'
import User from '../../models/user.js'
import * as chatService from '../services/chatService.js'
import * as chatEncryptionService from '../services/chatEncryptionService.js'
import { ObjectId } from '@/models/base.js'

// Helper for consistent error responses
const handleError = (res, error, message = 'An error occurred') => {
    return res.status(500).json({
        success: false,
        message,
        error: error.message,
    })
}

// ========== GET [CONVERSATIONS] ========== //
export async function getConversations(req, res) {
    try {
        const conversations = await chatService.getConversations(req.currentUser)
        res.status(200).jsonify(conversations)
    } catch (error) {
        handleError(res, error, 'Failed to get conversations')
    }
}

// ========== GET [CONVERSATION] ========== //
export async function getConversation(req, res) {
    try {
        const conversation = await chatService.getConversation(req.currentUser, req.params)
        if (!conversation) {
            return res.status(404).json({
                success: false,
                message: 'Conversation not found',
            })
        }
        res.status(200).jsonify(conversation)
    } catch (error) {
        handleError(res, error, 'Failed to get conversation')
    }
}

// ========== GET [MESSAGES] ========== //
export async function getMessages(req, res) {
    try {
        const messages = await chatService.getMessages(req.currentUser, req.params)
        res.status(200).jsonify(messages)
    } catch (error) {
        handleError(res, error, 'Failed to get messages')
    }
}

// ========== SEND [MESSAGE] ========== //
export async function sendMessage(req, res) {
    try {
        const message = await chatService.sendMessage(req.currentUser, req.params, req.body)
        res.status(200).jsonify(message)
    } catch (error) {
        handleError(res, error, 'Failed to send message')
    }
}

// ========== ENABLE [ENCRYPTION] ========== //
export async function enableEncryption(req, res) {
    try {
        const { conversationId } = req.params
        const success = await chatEncryptionService.setupConversationEncryption(conversationId)

        if (success) {
            res.status(200).json({
                success: true,
                message: 'Encryption enabled for conversation',
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Failed to enable encryption for conversation',
            })
        }
    } catch (error) {
        handleError(res, error, 'Error enabling encryption')
    }
}

// ========== CHECK [ENCRYPTION STATUS] ========== //
export async function checkEncryptionStatus(req, res) {
    try {
        const { conversationId } = req.params
        const conversation = await chatService.getConversation(req.currentUser, { conversationId })

        if (!conversation) {
            return res.status(404).json({
                success: false,
                message: 'Conversation not found',
            })
        }

        // Check if encryption is possible (only for 2-person conversations)
        let encryptionPossible = false
        if (conversation.members?.length === 2) {
            const userId1 = conversation.members[0]._id.toString()
            const userId2 = conversation.members[1]._id.toString()
            encryptionPossible = await chatEncryptionService.isEncryptionPossible(userId1, userId2)
        }

        res.status(200).json({
            success: true,
            data: {
                encryptionEnabled: Boolean(conversation.encryption_enabled),
                encryptionPossible,
            },
        })
    } catch (error) {
        handleError(res, error, 'Error checking encryption status')
    }
}

// ========== GET [ENCRYPTION KEYS] ========== //
export async function getEncryptionKeys(req, res) {
    try {
        const { conversationId } = req.params
        const currentUserId = req.currentUser._id.toString()

        // Get member keys
        const memberKeys = await chatEncryptionService.getConversationMemberKeys(conversationId, currentUserId)

        res.status(200).json({
            success: true,
            data: { memberKeys },
        })
    } catch (error) {
        handleError(res, error, 'Error getting encryption keys')
    }
}

export const getReceiverIds = async (userId) => {
    try {
        // Find all unique conversation partners in one query
        const uniqueUserIds = await Message.aggregate([
            {
                $match: {
                    $or: [{ sender_id: new ObjectId(userId) }, { receiver_id: new ObjectId(userId) }],
                },
            },
            {
                $project: {
                    otherUser: {
                        $cond: {
                            if: { $eq: ['$sender_id', new ObjectId(userId)] },
                            then: '$receiver_id',
                            else: '$sender_id',
                        },
                    },
                },
            },
            { $group: { _id: '$otherUser' } },
        ])

        if (uniqueUserIds.length === 0) {
            return []
        }

        // Get user details in one query
        const users = await User.find({
            _id: { $in: uniqueUserIds.map((u) => u._id) },
        })
            .select('_id name avatar')
            .lean()

        return users.map((user) => ({
            receiver_id: userId,
            userId: user._id,
            username: user.name,
            avatar: user.avatar,
        }))
    } catch (error) {
        console.error('Error getting receiver IDs:', error)
        throw error
    }
}
