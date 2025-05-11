import { useState, useEffect, useCallback } from 'react'
import encryptedChatService from '../services/EncryptedChatService'
import { callApiSimple } from 'api/callApi'

/**
 * Hook for handling encrypted chat functionality
 * @param {String} conversationId - The ID of the conversation
 * @param {String} recipientId - The ID of the recipient
 * @param {Object} socket - Optional socket connection
 * @returns {Object} - Chat methods and state
 */
const useEncryptedChat = (conversationId, recipientId, socket = null) => {
    const [messages, setMessages] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [encryptionEnabled, setEncryptionEnabled] = useState(false)

    // Check if encryption is enabled for this conversation
    useEffect(() => {
        const checkEncryption = async () => {
            try {
                const enabled = await encryptedChatService.isEncryptionEnabled(conversationId)
                setEncryptionEnabled(enabled)

                // If encryption is enabled, initialize a secure session
                if (enabled && recipientId) {
                    await encryptedChatService.initSecureSession(recipientId)
                }
            } catch (err) {
                console.error('Error checking encryption:', err)
            }
        }

        if (conversationId) {
            checkEncryption()
        }
    }, [conversationId, recipientId])

    // Load messages
    const loadMessages = useCallback(async () => {
        if (!conversationId) return

        setIsLoading(true)
        setError(null)

        try {
            const response = await callApiSimple({
                method: 'GET',
                apiPath: `chat/conversations/${conversationId}/messages`,
                variables: {},
            })

            if (response.success && response.data) {
                // Process and decrypt messages if needed
                const processedMessages = await encryptedChatService.processMessages(response.data.data)
                setMessages(processedMessages)
            } else {
                setError('Failed to load messages')
            }
        } catch (err) {
            setError('Error loading messages: ' + err.message)
            console.error('Error loading messages:', err)
        } finally {
            setIsLoading(false)
        }
    }, [conversationId])

    // Initial load of messages
    useEffect(() => {
        loadMessages()
    }, [loadMessages])

    // Send a message
    const sendMessage = useCallback(
        async (content) => {
            if (!conversationId || !content.trim()) return null

            try {
                if (encryptionEnabled && recipientId) {
                    // Send encrypted message
                    const message = await encryptedChatService.sendEncryptedMessage(
                        conversationId,
                        content,
                        recipientId,
                        socket
                    )

                    // Add the message to the local state
                    if (message) {
                        // For UI purposes, we want to see the decrypted content
                        const newMessage = {
                            ...message,
                            content: content, // Store the original content for display
                        }

                        setMessages((prev) => [...prev, newMessage])
                        return message
                    }
                } else {
                    // Send regular unencrypted message
                    const method = socket ? 'socket' : 'api'
                    let message

                    if (method === 'socket') {
                        // Using socket
                        socket.emit('message', {
                            conversation_id: conversationId,
                            content,
                        })

                        // Create a temporary message for UI purposes
                        message = {
                            _id: Date.now().toString(), // Temporary ID
                            content,
                            is_encrypted: false,
                            timestamp: new Date(),
                            // Add other necessary fields
                        }
                    } else {
                        // Using API
                        const response = await callApiSimple({
                            method: 'post',
                            apiPath: `chat/conversations/${conversationId}/messages`,
                            variables: { content },
                        })

                        if (response.success) {
                            message = response.data
                        } else {
                            throw new Error('Failed to send message')
                        }
                    }

                    if (message) {
                        setMessages((prev) => [...prev, message])
                        return message
                    }
                }

                return null
            } catch (err) {
                setError('Error sending message: ' + err.message)
                console.error('Error sending message:', err)
                return null
            }
        },
        [conversationId, encryptionEnabled, recipientId, socket]
    )

    // Add a new message to the list (for real-time updates)
    const addMessage = useCallback(async (message) => {
        if (!message) return

        try {
            // Process the message if it's encrypted
            if (message.is_encrypted && message.encryption_metadata) {
                const processedMessages = await encryptedChatService.processMessages([message])
                if (processedMessages && processedMessages.length > 0) {
                    setMessages((prev) => [...prev, processedMessages[0]])
                }
            } else {
                setMessages((prev) => [...prev, message])
            }
        } catch (err) {
            console.error('Error adding new message:', err)
        }
    }, [])

    return {
        messages,
        isLoading,
        error,
        sendMessage,
        addMessage,
        loadMessages,
        encryptionEnabled,
    }
}

export default useEncryptedChat
