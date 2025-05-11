import React, { useState, useEffect } from 'react'
import { callApi } from '@/api/callApi'
import signalService from '@/services/SignalService'
import { encryptMessage } from '@/utils/messageEncryption'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faLockOpen, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import './style.scss'

const EncryptedMessageComposer = ({
    conversationId,
    currentUserId,
    isEncryptionEnabled = false,
    onMessageSent,
    participants = [],
}) => {
    const [messageText, setMessageText] = useState('')
    const [isSending, setIsSending] = useState(false)
    const [error, setError] = useState(null)

    const handleInputChange = (e) => {
        setMessageText(e.target.value)
        setError(null)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    }

    const sendMessage = async () => {
        const trimmedMessage = messageText.trim()
        if (!trimmedMessage) return

        try {
            setIsSending(true)
            setError(null)

            let messageData = {
                content: trimmedMessage,
                isEncrypted: false,
            }

            // If encryption is enabled, encrypt the message
            if (isEncryptionEnabled) {
                try {
                    const { encryptedContent, metadata } = await encryptMessage(
                        trimmedMessage,
                        conversationId,
                        participants,
                        true
                    )

                    messageData = {
                        content: encryptedContent,
                        isEncrypted: true,
                        encryptionMetadata: metadata,
                    }
                } catch (encryptionError) {
                    console.error('Failed to encrypt message:', encryptionError)
                    setError('Failed to encrypt message. Sending as plaintext.')

                    // Fall back to plaintext if encryption fails
                    messageData = {
                        content: trimmedMessage,
                        isEncrypted: false,
                    }
                }
            }

            // Send the message to the API
            const response = await callApi({
                method: 'post',
                apiPath: `chat/conversations/${conversationId}/messages`,
                variables: messageData,
            })

            if (response.success) {
                // Clear the input
                setMessageText('')

                // Notify parent component
                if (onMessageSent) {
                    onMessageSent(response.data)
                }
            } else {
                setError('Failed to send message')
            }
        } catch (error) {
            console.error('Error sending message:', error)
            setError('Failed to send message')
        } finally {
            setIsSending(false)
        }
    }

    return (
        <div className="encrypted-message-composer">
            {error && <div className="message-error">{error}</div>}

            <div className="composer-container">
                <div className="encryption-status">
                    <FontAwesomeIcon
                        icon={isEncryptionEnabled ? faLock : faLockOpen}
                        title={isEncryptionEnabled ? 'Messages are encrypted' : 'Messages are not encrypted'}
                    />
                </div>

                <textarea
                    value={messageText}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder={isEncryptionEnabled ? 'Type an encrypted message...' : 'Type a message...'}
                    disabled={isSending}
                />

                <button className="send-button" onClick={sendMessage} disabled={isSending || !messageText.trim()}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                </button>
            </div>
        </div>
    )
}

export default EncryptedMessageComposer
