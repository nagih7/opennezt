import libsignal from 'libsignal'
import { callApi } from '@/api/callApi'

/**
 * Signal Protocol service for secure end-to-end encrypted messaging
 */
class SignalService {
    constructor() {
        this.store = new libsignal.SignalProtocolStore()
        this.sessionCipher = null
        this.initialized = false
        this.activeSessions = new Set()
    }

    /**
     * Initialize Signal Protocol keys for the current user
     * @returns {Promise<Object>} Signal Protocol keys
     */
    async initializeKeys() {
        try {
            const response = await callApi({
                method: 'post',
                apiPath: 'signal/keys',
                variables: {},
            })

            if (response.success) {
                this.initialized = true
                return response.data
            }

            throw new Error('Failed to initialize Signal Protocol keys')
        } catch (error) {
            console.error('Error initializing Signal Protocol keys:', error)
            throw error
        }
    }

    /**
     * Get a user's public Signal Protocol keys
     * @param {String} userId - User ID
     * @returns {Promise<Object>} User's public Signal Protocol keys
     */
    async getUserPublicKeys(userId) {
        try {
            const response = await callApi({
                method: 'get',
                apiPath: `signal/keys/${userId}`,
                variables: {},
            })

            if (response.success) {
                return response.data
            }

            throw new Error("Failed to get user's public Signal Protocol keys")
        } catch (error) {
            console.error('Error getting user public keys:', error)
            throw error
        }
    }

    /**
     * Establish a session with another user
     * @param {String} userId - User ID to establish session with
     * @returns {Promise<Boolean>} Success status
     */
    async establishSession(userId) {
        try {
            // First get the initial session data from the backend
            const response = await callApi({
                method: 'post',
                apiPath: 'signal/session',
                variables: { targetUserId: userId },
            })

            if (!response.success) {
                throw new Error('Failed to get initial session data')
            }

            const { ourKeys, theirKeys } = response.data

            // Process identity key
            const identityKey = this._base64ToArrayBuffer(theirKeys.identityKey)

            // Process signed prekey
            const signedPreKey = {
                keyId: theirKeys.signedPreKey.keyId,
                publicKey: this._base64ToArrayBuffer(theirKeys.signedPreKey.public),
                signature: this._base64ToArrayBuffer(theirKeys.signedPreKey.signature),
            }

            // Process one-time prekey if available
            let oneTimePreKey = null
            if (theirKeys.oneTimePreKey) {
                oneTimePreKey = {
                    keyId: theirKeys.oneTimePreKey.keyId,
                    publicKey: this._base64ToArrayBuffer(theirKeys.oneTimePreKey.public),
                }
            }

            // Create address for session
            const address = new libsignal.SignalProtocolAddress(userId, 1)

            // Create session builder
            const sessionBuilder = new libsignal.SessionBuilder(this.store, address)

            // Create bundle
            const bundle = {
                registrationId: theirKeys.registrationId,
                identityKey: identityKey,
                signedPreKey: signedPreKey,
                preKey: oneTimePreKey,
            }

            // Process bundle
            await sessionBuilder.processPreKey(bundle)

            // Create session cipher
            this.sessionCipher = new libsignal.SessionCipher(this.store, address)

            // Add to active sessions
            this.activeSessions.add(userId)

            // If we used a one-time prekey, mark it as used
            if (oneTimePreKey) {
                await this._markOneTimePreKeyAsUsed(userId, oneTimePreKey.keyId)
            }

            return true
        } catch (error) {
            console.error('Error establishing session:', error)
            throw error
        }
    }

    /**
     * Encrypt a message for a specific user
     * @param {String} message - Message to encrypt
     * @param {String} userId - User ID to encrypt for
     * @returns {Promise<Object>} Encrypted message
     */
    async encryptMessage(message, userId) {
        // If no userId provided, use the current session cipher
        if (!userId && !this.sessionCipher) {
            throw new Error('Session not established')
        }

        try {
            let cipher

            if (userId) {
                // Create a session cipher for this specific user
                if (!this.hasSession(userId)) {
                    await this.establishSession(userId)
                }

                const address = new libsignal.SignalProtocolAddress(userId, 1)
                cipher = new libsignal.SessionCipher(this.store, address)
            } else {
                cipher = this.sessionCipher
            }

            const ciphertext = await cipher.encrypt(this._stringToArrayBuffer(message))

            return {
                type: ciphertext.type,
                body: this._arrayBufferToBase64(ciphertext.body),
            }
        } catch (error) {
            console.error('Error encrypting message:', error)
            throw error
        }
    }

    /**
     * Decrypt a message
     * @param {Object} encryptedMessage - Encrypted message
     * @param {String} userId - User ID who sent the message (optional, only if different from current session)
     * @returns {Promise<String>} Decrypted message
     */
    async decryptMessage(encryptedMessage, userId) {
        try {
            let cipher

            if (userId) {
                // Create a session cipher for this specific user
                if (!this.hasSession(userId)) {
                    await this.establishSession(userId)
                }

                const address = new libsignal.SignalProtocolAddress(userId, 1)
                cipher = new libsignal.SessionCipher(this.store, address)
            } else if (this.sessionCipher) {
                cipher = this.sessionCipher
            } else {
                throw new Error('Session not established')
            }

            let plaintext

            // Decrypt based on message type
            if (encryptedMessage.type === 3) {
                // PreKeyWhisperMessage
                plaintext = await cipher.decryptPreKeyWhisperMessage(
                    this._base64ToArrayBuffer(encryptedMessage.body),
                    'binary'
                )
            } else if (encryptedMessage.type === 1) {
                // WhisperMessage
                plaintext = await cipher.decryptWhisperMessage(
                    this._base64ToArrayBuffer(encryptedMessage.body),
                    'binary'
                )
            } else {
                throw new Error('Unknown message type')
            }

            return this._arrayBufferToString(plaintext)
        } catch (error) {
            console.error('Error decrypting message:', error)
            throw error
        }
    }

    /**
     * Mark a oneTimePreKey as used
     * @param {String} userId - User ID
     * @param {Number} keyId - Key ID
     * @returns {Promise<Boolean>} Success status
     */
    async _markOneTimePreKeyAsUsed(userId, keyId) {
        try {
            const response = await callApi({
                method: 'post',
                apiPath: `signal/keys/${userId}/use-prekey`,
                variables: { keyId },
            })

            return response.success
        } catch (error) {
            console.error('Error marking one-time prekey as used:', error)
            return false
        }
    }

    /**
     * Convert String to ArrayBuffer
     * @param {String} str - String to convert
     * @returns {ArrayBuffer} ArrayBuffer
     */
    _stringToArrayBuffer(str) {
        const buf = new ArrayBuffer(str.length)
        const bufView = new Uint8Array(buf)
        for (let i = 0; i < str.length; i++) {
            bufView[i] = str.charCodeAt(i)
        }
        return buf
    }

    /**
     * Convert ArrayBuffer to String
     * @param {ArrayBuffer} buffer - ArrayBuffer to convert
     * @returns {String} String
     */
    _arrayBufferToString(buffer) {
        return String.fromCharCode.apply(null, new Uint8Array(buffer))
    }

    /**
     * Convert ArrayBuffer to Base64 string
     * @param {ArrayBuffer} buffer - ArrayBuffer to convert
     * @returns {String} Base64 string
     */
    _arrayBufferToBase64(buffer) {
        let binary = ''
        const bytes = new Uint8Array(buffer)
        const len = bytes.byteLength
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i])
        }
        return window.btoa(binary)
    }

    /**
     * Convert Base64 string to ArrayBuffer
     * @param {String} base64 - Base64 string to convert
     * @returns {ArrayBuffer} ArrayBuffer
     */
    _base64ToArrayBuffer(base64) {
        const binary = window.atob(base64)
        const len = binary.length
        const bytes = new Uint8Array(len)
        for (let i = 0; i < len; i++) {
            bytes[i] = binary.charCodeAt(i)
        }
        return bytes.buffer
    }

    /**
     * Check if a session exists with a user
     * @param {String} userId - User ID
     * @returns {Boolean} Whether a session exists
     */
    hasSession(userId) {
        return this.activeSessions.has(userId)
    }
}

// Export a singleton instance
const signalService = new SignalService()
export default signalService
