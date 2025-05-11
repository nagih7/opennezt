import {
    generateUserSignalKeys,
    getUserPublicKeys,
    rotateOneTimePreKeys,
    markOneTimePreKeyAsUsed,
    rotateSignedPreKey,
} from '@/app/services/signalService'

// Helper for consistent error handling
const handleError = (res, error, message) => {
    console.error(`${message}:`, error)
    return res.status(500).json({
        success: false,
        message,
        error: error.message,
    })
}

/**
 * Initialize Signal Protocol keys for a user
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export async function initializeSignalKeys(req, res) {
    try {
        const user = req.currentUser

        // Skip generation if user already has keys
        if (user.signal_keys?.identityKey) {
            return res.status(200).json({
                success: true,
                message: 'User already has Signal Protocol keys',
                data: {
                    identityKey: user.signal_keys.identityKey.public,
                    signedPreKey: {
                        keyId: user.signal_keys.signedPreKey.keyId,
                        public: user.signal_keys.signedPreKey.public,
                        signature: user.signal_keys.signedPreKey.signature,
                    },
                    registrationId: user.signal_keys.registrationId,
                },
            })
        }

        const updatedUser = await generateUserSignalKeys(user)

        // Only return the public part of the keys
        res.status(200).json({
            success: true,
            data: {
                identityKey: updatedUser.signal_keys.identityKey.public,
                signedPreKey: {
                    keyId: updatedUser.signal_keys.signedPreKey.keyId,
                    public: updatedUser.signal_keys.signedPreKey.public,
                    signature: updatedUser.signal_keys.signedPreKey.signature,
                },
                registrationId: updatedUser.signal_keys.registrationId,
            },
        })
    } catch (error) {
        handleError(res, error, 'Failed to initialize Signal Protocol keys')
    }
}

/**
 * Get a user's public Signal Protocol keys
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export async function getPublicKeys(req, res) {
    try {
        const userId = req.params.userId
        const publicKeys = await getUserPublicKeys(userId)

        res.status(200).json({
            success: true,
            data: publicKeys,
        })
    } catch (error) {
        handleError(res, error, "Failed to get user's public Signal Protocol keys")
    }
}

/**
 * Mark a oneTimePreKey as used and optionally generate new keys
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export async function useOneTimePreKey(req, res) {
    try {
        const userId = req.params.userId
        const { keyId } = req.body

        if (!keyId) {
            return res.status(400).json({
                success: false,
                message: 'Key ID is required',
            })
        }

        await markOneTimePreKeyAsUsed(userId, keyId)

        res.status(200).json({
            success: true,
            message: 'One-time prekey marked as used',
        })
    } catch (error) {
        handleError(res, error, 'Failed to mark one-time prekey as used')
    }
}

/**
 * Rotate a user's signedPreKey
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export async function rotateSignedPreKeyHandler(req, res) {
    try {
        const user = req.currentUser
        const newSignedPreKey = await rotateSignedPreKey(user._id)

        res.status(200).json({
            success: true,
            data: newSignedPreKey,
        })
    } catch (error) {
        handleError(res, error, 'Failed to rotate signed prekey')
    }
}

/**
 * Manually rotate one-time prekeys
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export async function rotateOneTimePreKeysHandler(req, res) {
    try {
        const user = req.currentUser
        await rotateOneTimePreKeys(user._id)

        res.status(200).json({
            success: true,
            message: 'One-time prekeys rotated successfully',
        })
    } catch (error) {
        handleError(res, error, 'Failed to rotate one-time prekeys')
    }
}

/**
 * Get key status (count of one-time prekeys, etc.)
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export async function getKeyStatus(req, res) {
    try {
        const user = await req.currentUser

        if (!user.signal_keys) {
            return res.status(200).json({
                success: true,
                data: {
                    keysInitialized: false,
                    oneTimePreKeysCount: 0,
                },
            })
        }

        res.status(200).json({
            success: true,
            data: {
                keysInitialized: Boolean(user.signal_keys.identityKey),
                oneTimePreKeysCount: user.signal_keys.oneTimePreKeys?.length || 0,
                lastRotation: user.signal_keys.lastKeyRotation || null,
            },
        })
    } catch (error) {
        handleError(res, error, 'Failed to get key status')
    }
}
