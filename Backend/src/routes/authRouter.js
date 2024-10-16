import {Router} from 'express'
import {asyncHandler} from '@/utils/helpers'
import requireAuthentication from '@/app/middleware/common/require-authentication'
import validate from '@/app/middleware/common/validate'
import * as authMiddleware from '../app/middleware/authMiddleware'
import * as authRequest from '../app/requests/authRequest'
import * as authController from '../app/controllers/authController'

const authRouter = Router()

authRouter.post('/login', asyncHandler(validate(authRequest.login)), asyncHandler(authController.login))

authRouter.post(
    '/register',
    asyncHandler(validate(authRequest.register)),
    asyncHandler(authController.register)
)

authRouter.post('/logout', asyncHandler(requireAuthentication), asyncHandler(authController.logout))

authRouter.get('/me', asyncHandler(requireAuthentication), asyncHandler(authController.me))

authRouter.put(
    '/me',
    asyncHandler(requireAuthentication),
    asyncHandler(validate(authRequest.updateProfile)),
    asyncHandler(authController.updateProfile)
)

authRouter.patch(
    '/change-password',
    asyncHandler(requireAuthentication),
    asyncHandler(validate(authRequest.changePassword)),
    asyncHandler(authController.changePassword)
)

authRouter.post(
    '/forgot-password',
    asyncHandler(validate(authRequest.forgotPassword)),
    authController.forgotPassword
)

authRouter.post(
    '/reset-password/:token',
    asyncHandler(authMiddleware.verifyForgotPasswordToken),
    asyncHandler(validate(authRequest.resetPassword)),
    asyncHandler(authController.resetPassword)
)

export default authRouter
