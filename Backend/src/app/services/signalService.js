import libsignal from 'libsignal'
import SignalProtocol from '@/utils/classes/signal-protocol'
import { User } from '@/models'

// Public key cache (TTL: 2 minutes)
const publicKeyCache = new Map()
const CACHE_TTL = 2 * 60 * 1000 // 2 minutes in milliseconds

/**
 * Generate Signal Protocol keys for a user
 * @param {Object} user - User object
 * @returns {Object} Updated user with Signal Protocol keys
 */
export async function generateUserSignalKeys(user) {
    // Generate a new key bundle
    const keyBundle = SignalProtocol.generateKeyBundle()

    // Update user with new keys
    user.signal_keys = keyBundle
    await user.save()

    // Clear any cached keys for this user
    clearUserFromCache(user._id.toString())

    return user
}

/**
 * Clear user from caches
 * @param {String} userId - User ID to clear
 */
function clearUserFromCache(userId) {
    // Clear from public key cache
    publicKeyCache.delete(userId)

    // Clear from any capability cache that might include this user
    // This is a bit more complex since we need to check all keys
    for (const key of encryptionCapabilityCache.keys()) {
        if (key.includes(userId)) {
            encryptionCapabilityCache.delete(key)
        }
    }
}

/**
 * Get a user's public Signal Protocol keys with caching
 * @param {String} userId - User ID
 * @returns {Object} User's public Signal Protocol keys
 */
export async function getUserPublicKeys(userId) {
    // Check cache first
    const now = Date.now()
    if (publicKeyCache.has(userId)) {
        const cached = publicKeyCache.get(userId)
        if (now - cached.timestamp < CACHE_TTL) {
            return cached.keys
        }
    }

    // Cache miss, fetch from database
    const user = await User.findById(userId).select('signal_keys').lean()

    if (!user || !user.signal_keys || !user.signal_keys.identityKey) {
        throw new Error('User has no Signal Protocol keys')
    }

    // Extract public keys
    const publicKeys = {
        identityKey: user.signal_keys.identityKey.public,
        signedPreKey: {
            keyId: user.signal_keys.signedPreKey.keyId,
            public: user.signal_keys.signedPreKey.public,
            signature: user.signal_keys.signedPreKey.signature,
        },
        oneTimePreKey:
            user.signal_keys.oneTimePreKeys.length > 0
                ? {
                    keyId: user.signal_keys.oneTimePreKeys[0].keyId,
                    public: user.signal_keys.oneTimePreKeys[0].public,
                }
                : null,
        registrationId: user.signal_keys.registrationId,
    }

    // Cache the result
    publicKeyCache.set(userId, {
        keys: publicKeys,
        timestamp: now,
    })

    return publicKeys
}

/**
 * Rotate a user's oneTimePreKeys when they're running low
 * @param {String} userId - User ID
 * @returns {Boolean} Success status
 */
export async function rotateOneTimePreKeys(userId) {
    const user = await User.findById(userId)

    if (!user || !user.signal_keys) {
        throw new Error('User has no Signal Protocol keys')
    }

    // If we have less than 5 one-time prekeys remaining, generate 10 more
    if (!user.signal_keys.oneTimePreKeys || user.signal_keys.oneTimePreKeys.length < 5) {
        const newKeys = Array(10)
            .fill()
            .map(() => SignalProtocol.generateOneTimePreKey())

        user.signal_keys.oneTimePreKeys = [...(user.signal_keys.oneTimePreKeys || []), ...newKeys]

        await user.save()

        // Clear cached keys since they've changed
        clearUserFromCache(userId)
    }

    return true
}

/**
 * Mark a oneTimePreKey as used
 * @param {String} userId - User ID
 * @param {Number} keyId - Key ID of the oneTimePreKey
 * @returns {Boolean} Success status
 */
export async function markOneTimePreKeyAsUsed(userId, keyId) {
    const user = await User.findById(userId)

    if (!user || !user.signal_keys || !user.signal_keys.oneTimePreKeys) {
        throw new Error('User has no Signal Protocol keys')
    }

    // Remove the used one-time pre key
    const initialLength = user.signal_keys.oneTimePreKeys.length
    user.signal_keys.oneTimePreKeys = user.signal_keys.oneTimePreKeys.filter((key) => key.keyId !== keyId)

    // If we actually removed a key, save changes
    if (initialLength !== user.signal_keys.oneTimePreKeys.length) {
        await user.save()

        // Clear cached keys since they've changed
        clearUserFromCache(userId)
    }

    // Check if we need to generate more keys
    if (user.signal_keys.oneTimePreKeys.length < 5) {
        await rotateOneTimePreKeys(userId)
    }

    return true
}

/**
 * Rotate a user's signedPreKey (should be done periodically for security)
 * @param {String} userId - User ID
 * @returns {Object} New signedPreKey
 */
export async function rotateSignedPreKey(userId) {
    const user = await User.findById(userId)

    if (!user || !user.signal_keys || !user.signal_keys.identityKey) {
        throw new Error('User has no Signal Protocol keys')
    }

    // We need to convert back to the format libsignal expects
    const identityKeyPair = {
        pubKey: SignalProtocol.base64ToArrayBuffer(user.signal_keys.identityKey.public),
        privKey: SignalProtocol.base64ToArrayBuffer(user.signal_keys.identityKey.private),
    }

    // Generate a new signed prekey
    const signedPreKeyId = Math.floor(Math.random() * 1000)
    const signedPreKey = libsignal.KeyHelper.generateSignedPreKey(identityKeyPair, signedPreKeyId)

    // Update the user's signed prekey
    user.signal_keys.signedPreKey = {
        keyId: signedPreKey.keyId,
        public: SignalProtocol.arrayBufferToBase64(signedPreKey.keyPair.pubKey),
        private: SignalProtocol.arrayBufferToBase64(signedPreKey.keyPair.privKey),
        signature: SignalProtocol.arrayBufferToBase64(signedPreKey.signature),
    }

    await user.save()

    // Clear cached keys since they've changed
    clearUserFromCache(userId)

    return {
        keyId: user.signal_keys.signedPreKey.keyId,
        public: user.signal_keys.signedPreKey.public,
        signature: user.signal_keys.signedPreKey.signature,
    }
}

// Import from chatEncryptionService.js for cache management
const encryptionCapabilityCache = new Map()
