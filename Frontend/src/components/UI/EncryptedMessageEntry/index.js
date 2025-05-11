import React, { useState, useEffect } from 'react'
import { decryptMessage } from '@/utils/messageEncryption'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faLockOpen, faSpinner } from '@fortawesome/free-solid-svg-icons'
import './style.scss'

const EncryptedMessageEntry = ({ message, currentUserId }) => {
    const [decryptedContent, setDecryptedContent] = useState(null)
    const [isDecrypting, setIsDecrypting] = useState(false)
    const [decryptionError, setDecryptionError] = useState(null)

    const isEncrypted = message.is_encrypted && message.encryption_metadata
    const isSentByCurrentUser = message.user_id === currentUserId

    useEffect(() => {
        // Only attempt to decrypt if the message is encrypted and not sent by the current user
        if (isEncrypted && !isSentByCurrentUser) {
            handleDecryption()
        } else if (isEncrypted && isSentByCurrentUser) {
            // For messages sent by the current user, we already have the decrypted content
            setDecryptedContent(message.content)
        } else {
            // Not encrypted, just show the content
            setDecryptedContent(message.content)
        }
    }, [message])

    const handleDecryption = async () => {
        try {
            setIsDecrypting(true)
            setDecryptionError(null)

            const content = await decryptMessage(message)
            setDecryptedContent(content)
        } catch (error) {
            console.error('Failed to decrypt message:', error)
            setDecryptionError('Unable to decrypt message')
            setDecryptedContent('🔒 [Encrypted message]')
        } finally {
            setIsDecrypting(false)
        }
    }

    return (
        <div className={`message-entry ${isSentByCurrentUser ? 'sent' : 'received'}`}>
            <div className="message-content">
                {isDecrypting ? (
                    <div className="decrypting-indicator">
                        <FontAwesomeIcon icon={faSpinner} spin />
                        <span>Decrypting...</span>
                    </div>
                ) : (
                    <>
                        {decryptedContent}
                        {isEncrypted && (
                            <span className="encryption-indicator" title="This message is encrypted">
                                <FontAwesomeIcon icon={faLock} />
                            </span>
                        )}
                    </>
                )}

                {decryptionError && <div className="decryption-error">{decryptionError}</div>}
            </div>
            <div className="message-metadata">
                <span className="message-timestamp">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>
        </div>
    )
}

export default EncryptedMessageEntry
