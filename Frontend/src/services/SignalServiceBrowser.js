// A browser-compatible implementation of Signal Protocol service
import { callApiSimple } from 'api/callApi'
// This avoids Node.js dependencies in the browser environment

class SignalServiceBrowser {
    constructor() {
        this.initialized = false
        this.activeSessions = new Set()
    }

    /**
     * Khởi tạo khóa Signal Protocol
     * @returns {Promise<Object>} Signal Protocol keys
     */
    async initializeKeys() {
        try {
            const response = await callApiSimple({ method: 'POST', apiPath: 'signal/keys', variables: {} })
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
            const response = await callApiSimple({
                method: 'GET',
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
     * Thiết lập session với một người dùng bằng userId
     * @param {String} userId - User ID to establish session with
     * @returns {Promise<Boolean>} Success status
     */
    async establishSession(userId) {
        try {
            const response = await callApiSimple({
                method: 'POST',
                apiPath: 'signal/session',
                variables: { targetUserId: userId },
            })

            if (response.success) {
                // Add to active sessions
                this.activeSessions.add(userId)
                return true
            }

            throw new Error('Failed to establish session')
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
        try {
            if (!this.activeSessions.has(userId)) {
                throw new Error('No active session with the user')
            }

            // Simple encryption for demonstration (not secure)
            // In a real implementation, this would use proper E2E encryption
            const encrypted = {
                type: 3, // PreKeyWhisperMessage type
                body: this._base64Encode(message),
                registrationId: Date.now() % 10000,
            }

            return encrypted
        } catch (error) {
            console.error('Error encrypting message:', error)
            throw error
        }
    }

    /**
     * Decrypt a message from a specific user
     * @param {Object} encryptedMessage - Encrypted message object
     * @param {String} userId - User ID who sent the message
     * @returns {Promise<String>} Decrypted message
     */
    async decryptMessage(encryptedMessage, userId) {
        try {
            if (!this.activeSessions.has(userId)) {
                throw new Error('No active session with the user')
            }

            // Simple decryption for demonstration (not secure)
            // In a real implementation, this would use proper E2E decryption
            if (encryptedMessage && encryptedMessage.body) {
                return this._base64Decode(encryptedMessage.body)
            }

            throw new Error('Invalid encrypted message format')
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
            const response = await this._apiCall(`signal/keys/${userId}/use-prekey`, 'POST', { keyId })
            return response.success
        } catch (error) {
            console.error('Error marking one-time prekey as used:', error)
            return false
        }
    }

    /**
     * Check if a session exists with a user
     * @param {String} userId - User ID
     * @returns {Boolean} Whether a session exists
     */
    hasSession(userId) {
        return this.activeSessions.has(userId)
    }

    /**
     * Base64 encode a string
     * @param {String} str - String to encode
     * @returns {String} Base64 encoded string
     */
    _base64Encode(str) {
        return btoa(unescape(encodeURIComponent(str)))
    }

    /**
     * Base64 decode a string
     * @param {String} str - Base64 encoded string
     * @returns {String} Decoded string
     */
    _base64Decode(str) {
        return decodeURIComponent(escape(atob(str)))
    }

    /**
     * Make an API call
     * @param {String} endpoint - API endpoint
     * @param {String} method - HTTP method
     * @param {Object} variables - Request variables
     * @returns {Promise<Object>} Response object
     */
    async _apiCall(endpoint, method, variables = {}) {
        const response = await fetch(endpoint, {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: method !== 'GET' ? JSON.stringify(variables) : undefined,
        })

        return await response.json()
    }
}

// Export a singleton instance
const signalService = new SignalServiceBrowser()
export default signalService
