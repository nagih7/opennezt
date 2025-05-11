import signalService from './SignalServiceBrowser'
import callSocket from '../api/callSocket'
import { callApiSimple } from 'api/callApi'

/**
 * Service for handling encrypted chat functionality
 */
class EncryptedChatService {
    /**
     * Initialize a secure session with another user
     * @param {String} userId - The ID of the user to establish a session with
     * @returns {Promise<Boolean>} - Whether the session was established successfully
     */ async initSecureSession(userId) {
        try {
            // Kiểm tra xem đã có khóa hay chưa, nếu chưa thì khởi tạo
            if (!signalService.initialized) {
                await signalService.initializeKeys()
            }

            // Nếu đã có session với người dùng này thì không cần thiết phải khởi tạo lại
            if (signalService.hasSession(userId)) {
                return true
            }

            // Thiết lập session với người dùng này
            const success = await signalService.establishSession(userId)

            // Verify that the session was actually established
            if (success && signalService.hasSession(userId)) {
                return true
            } else {
                return false
            }
        } catch (error) {
            console.error('Error initializing secure session:', error)
            return false
        }
    }

    /**
     * Send an encrypted message to a conversation
     * @param {String} conversationId - The ID of the conversation
     * @param {String} content - The content of the message
     * @param {String} recipientId - The ID of the recipient
     * @param {Object} socket - The socket connection (optional)
     * @returns {Promise<Object>} - The sent message
     */
    async sendEncryptedMessage(conversationId, content, recipientId, socket = null) {
        try {
            // Ensure we have a secure session
            if (!signalService.hasSession(recipientId)) {
                const sessionInitialized = await this.initSecureSession(recipientId)
                if (!sessionInitialized) {
                    throw new Error(`Failed to initialize secure session with user ${recipientId}`)
                }
            }

            // Encrypt the message
            const encrypted = await signalService.encryptMessage(content, recipientId)

            // Prepare the message data
            const messageData = {
                content: encrypted.type === 3 ? encrypted.body : '', // For PreKeyWhisperMessage
                isEncrypted: true,
                encryptionMetadata: encrypted,
            }

            // Send the message
            if (socket) {
                // Using socket if provided
                return callSocket({
                    event: 'message-encrypted',
                    payload: {
                        conversation_id: conversationId,
                        ...messageData,
                    },
                    socket,
                })
            } else {
                // Using API otherwise
                const response = await callApiSimple({
                    method: 'post',
                    apiPath: `chat/conversations/${conversationId}/messages`,
                    variables: messageData,
                })

                return response.data
            }
        } catch (error) {
            console.error('Error sending encrypted message:', error)
            throw error
        }
    }

    /**
     * @param {Array} messages - Array of messages
     * @returns {Promise<Array>} - Processed messages with decrypted content
     */ async processMessages(messages) {
        try {
            // First, initialize sessions for all unique senders of encrypted messages
            const uniqueSenderIds = new Set()
            messages.forEach((message) => {
                if (message.is_encrypted && message.encryption_metadata) {
                    const senderId = message.user_id || message.user._id
                    if (senderId) uniqueSenderIds.add(senderId)
                }
            })

            // Initialize sessions for all unique senders who don't have one yet
            const sessionInitPromises = []
            for (const senderId of uniqueSenderIds) {
                if (!signalService.hasSession(senderId)) {
                    sessionInitPromises.push(this.initSecureSession(senderId))
                }
            }

            // Wait for all session initializations to complete
            if (sessionInitPromises.length > 0) {
                const results = await Promise.all(sessionInitPromises)
                // Check if any session initialization failed
                if (results.includes(false)) {
                    console.warn('Some session initializations failed')
                }
            }

            // Now process all messages
            const processedMessages = await Promise.all(
                messages.map(async (message) => {
                    if (message.is_encrypted && message.encryption_metadata) {
                        try {
                            const senderId = message.user_id || message.user._id

                            // Check if we have a session now
                            if (!signalService.hasSession(senderId)) {
                                console.error(`No session available for sender: ${senderId}`)
                                return {
                                    ...message,
                                    content: 'No secure session available',
                                    decryptError: true,
                                }
                            }

                            // Decrypt the message
                            const decryptedContent = await signalService.decryptMessage(
                                message.encryption_metadata,
                                senderId
                            )

                            return {
                                ...message,
                                content: decryptedContent,
                                decrypted: true,
                            }
                        } catch (decryptError) {
                            console.error('Error decrypting message:', decryptError)
                            return {
                                ...message,
                                content: 'Message could not be decrypted',
                                decryptError: true,
                            }
                        }
                    }
                    return message
                })
            )

            return processedMessages
        } catch (error) {
            console.error('Error processing messages:', error)
            return messages // Return original messages on error
        }
    }

    /**
     * Check if encryption is enabled for a conversation
     * @param {String} conversationId - The ID of the conversation
     * @returns {Promise<Boolean>} - Whether encryption is enabled
     */
    async isEncryptionEnabled(conversationId) {
        try {
            const response = await callApiSimple({
                method: 'GET',
                apiPath: `chat/conversations/${conversationId}`,
                variables: {},
            })

            return response.data.data && response.data.data.encryption_enabled
        } catch (error) {
            console.error('Error checking encryption status:', error)
            return false
        }
    }
}

// Export a singleton instance
const encryptedChatService = new EncryptedChatService()
export default encryptedChatService
