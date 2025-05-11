import { callApi } from '@/api/callApi'

// Constants
const SIGNED_PREKEY_ROTATION_DAYS = 7 // Rotate signed prekeys every week
const ONE_TIME_PREKEY_THRESHOLD = 10 // Regenerate one-time prekeys when fewer than this many remain

/**
 * Check if keys need rotation and perform rotation if necessary
 * @returns {Promise<Object>} Status of rotation operations
 */
export const checkAndRotateKeys = async () => {
    try {
        // Get the current key information from localStorage
        const lastRotation = localStorage.getItem('signalKeyLastRotation')
        const lastRotationDate = lastRotation ? new Date(lastRotation) : null
        const now = new Date()

        // Initialize results object
        const results = {
            signedPreKeyRotated: false,
            oneTimePreKeysRotated: false,
        }

        // Check if signed prekey needs rotation (once a week)
        if (!lastRotationDate || daysBetween(lastRotationDate, now) >= SIGNED_PREKEY_ROTATION_DAYS) {
            // Rotate signed prekey
            const response = await callApi({
                method: 'post',
                apiPath: 'signal/keys/rotate-signed-prekey',
                variables: {},
            })

            if (response.success) {
                results.signedPreKeyRotated = true
                localStorage.setItem('signalKeyLastRotation', now.toISOString())
            }
        }

        // Check if we need to generate more one-time prekeys
        const keyStatus = await callApi({
            method: 'get',
            apiPath: 'signal/keys/status',
            variables: {},
        })

        if (keyStatus.success && keyStatus.data.oneTimePreKeysCount < ONE_TIME_PREKEY_THRESHOLD) {
            // Rotate one-time prekeys
            const response = await callApi({
                method: 'post',
                apiPath: 'signal/keys/rotate-one-time-prekeys',
                variables: {},
            })

            if (response.success) {
                results.oneTimePreKeysRotated = true
            }
        }

        return {
            success: true,
            results,
        }
    } catch (error) {
        console.error('Error during key rotation:', error)
        return {
            success: false,
            error: error.message,
        }
    }
}

/**
 * Calculate days between two dates
 * @param {Date} date1 - First date
 * @param {Date} date2 - Second date
 * @returns {Number} Number of days between dates
 */
function daysBetween(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000 // hours*minutes*seconds*milliseconds
    const diffDays = Math.round(Math.abs((date1 - date2) / oneDay))
    return diffDays
}

/**
 * Setup scheduled key rotation
 * This should be called when the app initializes
 */
export const setupScheduledKeyRotation = () => {
    // Check for key rotation on app startup
    checkAndRotateKeys()

    // Schedule checks every 24 hours
    setInterval(checkAndRotateKeys, 24 * 60 * 60 * 1000)
}
