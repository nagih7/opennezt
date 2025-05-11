import { generateUserSignalKeys, getUserPublicKeys } from '@/app/services/signalService'
import { User } from '@/models'

// Helper for consistent error handling
const handleError = (res, error, message, status = 500) => {
    console.error(`${message}:`, error)
    return res.status(status).json({
        success: false,
        message,
        error: error.message,
    })
}

/**
 * Create a session between two users
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export async function createSession(req, res) {
    try {
        const currentUser = req.currentUser
        const { targetUserId } = req.body

        if (!targetUserId) {
            return handleError(res, new Error('Target user ID is required'), 'Missing required field', 400)
        }

        // Verify target user exists
        const targetUser = await User.findById(targetUserId).select('_id signal_keys.identityKey')
        if (!targetUser) {
            return handleError(res, new Error('Target user not found'), 'Target user not found', 404)
        }

        // Generate keys in parallel if needed
        const keysPromises = []

        if (!currentUser.signal_keys?.identityKey) {
            keysPromises.push(generateUserSignalKeys(currentUser))
        }

        if (!targetUser.signal_keys?.identityKey) {
            keysPromises.push(generateUserSignalKeys(targetUser))
        }

        if (keysPromises.length > 0) {
            await Promise.all(keysPromises)
        }

        // Get public keys of the target user
        const theirKeys = await getUserPublicKeys(targetUserId)

        // Return the keys needed to establish a session
        res.status(200).json({
            success: true,
            data: {
                ourKeys: {
                    registrationId: currentUser.signal_keys.registrationId,
                },
                theirKeys,
            },
        })
    } catch (error) {
        handleError(res, error, 'Failed to create a session')
    }
}

/**
 * Get session information for a specific user
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export async function getSession(req, res) {
    try {
        const targetUserId = req.params.userId

        // Get user and check if they have keys in one operation
        const targetUser = await User.findById(targetUserId).select('signal_keys.identityKey')

        if (!targetUser) {
            return handleError(res, new Error('Target user not found'), 'Target user not found', 404)
        }

        if (!targetUser.signal_keys?.identityKey) {
            return handleError(
                res,
                new Error('Target user has no Signal Protocol keys'),
                'Target user has no Signal Protocol keys',
                400
            )
        }

        // Get public keys of the target user
        const theirKeys = await getUserPublicKeys(targetUserId)

        res.status(200).json({
            success: true,
            data: { theirKeys },
        })
    } catch (error) {
        handleError(res, error, 'Failed to get session information')
    }
}
