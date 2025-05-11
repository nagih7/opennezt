import React, { useState, useEffect } from 'react'
import { callApi } from '@/api/callApi'
import signalService from '@/services/SignalServiceBrowser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'
import './style.scss'

const ChatEncryptionToggle = ({ conversationId, onStatusChange }) => {
    const [isEnabled, setIsEnabled] = useState(false)
    const [isPossible, setIsPossible] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (conversationId) {
            fetchEncryptionStatus()
        }
    }, [conversationId])

    const fetchEncryptionStatus = async () => {
        try {
            setIsLoading(true)
            const response = await callApi({
                method: 'get',
                apiPath: `chat/conversations/${conversationId}/encryption`,
                variables: {},
            })

            if (response.success) {
                setIsEnabled(response.data.encryptionEnabled)
                setIsPossible(response.data.encryptionPossible)
                if (onStatusChange) {
                    onStatusChange(response.data.encryptionEnabled)
                }
            }
        } catch (error) {
            console.error('Error fetching encryption status:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const toggleEncryption = async () => {
        if (!isPossible) return

        try {
            setIsLoading(true)

            if (!isEnabled) {
                // Enable encryption
                const response = await callApi({
                    method: 'post',
                    apiPath: `chat/conversations/${conversationId}/encryption`,
                    variables: {},
                })

                if (response.success) {
                    setIsEnabled(true)
                    if (onStatusChange) {
                        onStatusChange(true)
                    }

                    // Initialize keys if necessary
                    if (!signalService.initialized) {
                        await signalService.initializeKeys()
                    }

                    // Get encryption keys for the conversation members
                    const keysResponse = await callApi({
                        method: 'get',
                        apiPath: `chat/conversations/${conversationId}/encryption/keys`,
                        variables: {},
                    })

                    if (keysResponse.success && keysResponse.data.memberKeys) {
                        // Establish sessions with other members
                        const memberKeys = keysResponse.data.memberKeys
                        for (const userId in memberKeys) {
                            try {
                                await signalService.establishSession(userId)
                            } catch (sessionError) {
                                console.error(`Error establishing session with user ${userId}:`, sessionError)
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error toggling encryption:', error)
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return <div className="encryption-toggle-loading">Loading...</div>
    }

    return (
        <div
            className={`encryption-toggle ${isEnabled ? 'enabled' : 'disabled'} ${!isPossible ? 'not-possible' : ''}`}
            onClick={toggleEncryption}
            title={
                isPossible
                    ? isEnabled
                        ? 'Encryption is enabled'
                        : 'Enable encryption'
                    : 'Encryption is not available for this conversation'
            }
        >
            <FontAwesomeIcon icon={isEnabled ? faLock : faLockOpen} />
            <span className="encryption-label">{isEnabled ? 'Encrypted' : 'Not Encrypted'}</span>
        </div>
    )
}

export default ChatEncryptionToggle
