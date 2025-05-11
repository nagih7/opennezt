import { Router } from 'express'
import { asyncHandler } from '@/utils/helpers'
import requireAuthentication from '@/app/middleware/common/require-authentication'
import * as signalController from '@/app/controllers/signalController'
import * as sessionController from '@/app/controllers/sessionController'

const signalRouter = Router()

signalRouter.use(asyncHandler(requireAuthentication))

// Initialize Signal Protocol keys for the current user
signalRouter.post('/keys', asyncHandler(signalController.initializeSignalKeys))

// Get a user's public Signal Protocol keys
signalRouter.get('/keys/:userId', asyncHandler(signalController.getPublicKeys))

// Mark a oneTimePreKey as used
signalRouter.post(
    '/keys/:userId/use-prekey',

    asyncHandler(signalController.useOneTimePreKey)
)

// Rotate a user's signedPreKey
signalRouter.post(
    '/keys/rotate-signed-prekey',

    asyncHandler(signalController.rotateSignedPreKeyHandler)
)

// Manually rotate one-time prekeys
signalRouter.post(
    '/keys/rotate-one-time-prekeys',

    asyncHandler(signalController.rotateOneTimePreKeysHandler)
)

// Create a session between two users
signalRouter.post('/session', asyncHandler(sessionController.createSession))

// Get session info for a specific user
signalRouter.get('/session/:userId', asyncHandler(sessionController.getSession))

// Get key status
signalRouter.get('/keys/status', asyncHandler(signalController.getKeyStatus))

export default signalRouter
