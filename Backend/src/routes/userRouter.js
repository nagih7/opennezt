import {Router} from 'express'
import {asyncHandler} from '@/utils/helpers'
import requireAuthentication from '@/app/middleware/common/require-authentication'
import validate from '@/app/middleware/common/validate'
import * as userMiddleware from '../app/middleware/userMiddleware'
import * as userRequest from '../app/requests/userRequest'
import * as userController from '../app/controllers/userController'

const userRouter = Router()

userRouter.use(asyncHandler(requireAuthentication))

userRouter.put('/update-background', asyncHandler(userController.updateBackground))

userRouter.get(
    '/list-user',
    asyncHandler(validate(userRequest.readRoot)),
    asyncHandler(userController.readRoot)
)

userRouter.patch(
    '/reset-password',
    asyncHandler(userMiddleware.checkUserId),
    asyncHandler(validate(userRequest.resetPassword)),
    asyncHandler(userController.resetPassword)
)
// Project
userRouter.post(
    '/create-project',
    asyncHandler(validate(userRequest.createProject)),
    asyncHandler(userController.createProject)
)

userRouter.get('/get-project', asyncHandler(userController.getProject))

userRouter.put('/update-project', asyncHandler(userController.updateProject))

userRouter.delete('/delete-project', asyncHandler(userController.deleteProject))

// Founder Profile
userRouter.post(
    '/create-founder-profile',
    // asyncHandler(validate(userRequest.createFounderProfile)),
    asyncHandler(userController.createFounderProfile)
)

userRouter.get('/get-founder-profile', asyncHandler(userController.getFounderProfile))

userRouter.put('/update-founder-profile', asyncHandler(userController.updateFounderProfile))

userRouter.get('/recruit-talents', asyncHandler(userController.recuitTalents))

userRouter.get(
    '/detail-talent/:email',

    // asyncHandler(validate(userRequest.getDetailTalent)),
    asyncHandler(userController.getDetailTalent)
)

// URL dynamic
userRouter.get('/', asyncHandler(userMiddleware.checkUserId), asyncHandler(userController.readItem))

userRouter.delete(
    '/',
    asyncHandler(userMiddleware.checkUserId),
    userMiddleware.checkCanDeleteUser,
    asyncHandler(userController.removeItem)
)

userRouter.post('/', asyncHandler(validate(userRequest.createItem)), asyncHandler(userController.createItem))

userRouter.put(
    '/',
    asyncHandler(userMiddleware.checkUserId),
    asyncHandler(validate(userRequest.updateItem)),
    asyncHandler(userController.updateItem)
)

export default userRouter
