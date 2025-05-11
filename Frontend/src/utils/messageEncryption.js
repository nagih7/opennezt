import signalService from '@/services/SignalService'

/**
 * Encrypt a message for a specific conversation if encryption is enabled
 * @param {String} message - Plain text message to encrypt
 * @param {String} conversationId - ID of the conversation
 * @param {Array} participants - Array of participant IDs in the conversation
 * @param {Object} encryptionStatus - Object containing encryption status of the conversation
 * @returns {Object} Object with content and encryption metadata
 */
export const encryptMessage = async (message, conversationId, participants, encryptionStatus) => {
    // If encryption is not enabled, return plain text
    if (!encryptionStatus || !encryptionStatus.encryptionEnabled) {
        return {
            content: message,
            isEncrypted: false,
            encryptionMetadata: null,
        }
    }

    try {
        // Get the other participants (excluding current user)
        const otherParticipants = participants.filter((userId) => userId !== localStorage.getItem('userId'))

        // For each participant, establish a session and encrypt the message
        const encryptedMessages = {}

        for (const participantId of otherParticipants) {
            // Establish session if needed
            if (!signalService.hasSession(participantId)) {
                await signalService.establishSession(participantId)
            }

            // Encrypt message for this participant
            const encrypted = await signalService.encryptMessage(message, participantId)
            encryptedMessages[participantId] = encrypted
        }

        // Return encrypted content
        return {
            content: message, // We store the unencrypted message for the sender's reference
            isEncrypted: true,
            encryptionMetadata: {
                encryptedForRecipients: encryptedMessages,
                conversationId,
            },
        }
    } catch (error) {
        console.error('Error encrypting message:', error)
        throw error
    }
}

/**
 * Decrypt a message if it's encrypted
 * @param {Object} message - Message object from the API
 * @returns {String} Decrypted message content
 */
export const decryptMessage = async (message) => {
    // If message is not encrypted, return as is
    if (!message.is_encrypted || !message.encryption_metadata) {
        return message.content
    }

    try {
        const currentUserId = localStorage.getItem('userId')
        const metadata = message.encryption_metadata

        // Check if message is encrypted for current user
        if (!metadata.encryptedForRecipients || !metadata.encryptedForRecipients[currentUserId]) {
            // This is likely a message the current user sent, so return the content
            return message.content
        }

        // Get the encrypted data for current user
        const encryptedData = metadata.encryptedForRecipients[currentUserId]

        // Establish session with sender if needed
        if (!signalService.hasSession(message.user_id)) {
            await signalService.establishSession(message.user_id)
        }

        // Decrypt the message
        const decrypted = await signalService.decryptMessage(encryptedData)

        return decrypted
    } catch (error) {
        console.error('Error decrypting message:', error)
        return '🔒 [Encrypted message could not be decrypted]'
    }
}
