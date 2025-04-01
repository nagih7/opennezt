import { Router } from 'express'
import { asyncHandler } from '@/utils/helpers'
import requireAuthentication from '@/app/middleware/common/require-authentication'
import validate from '@/app/middleware/common/validate'
import * as userMiddleware from '../app/middleware/userMiddleware'
import * as userRequest from '../app/requests/userRequest'
import * as userController from '../app/controllers/userController'

const userRouter = Router()

userRouter.use(asyncHandler(requireAuthentication))

userRouter.put('/avatar', asyncHandler(validate(userRequest.updateAvatar)), asyncHandler(userController.updateAvatar))

userRouter.put(
    '/background',
    asyncHandler(validate(userRequest.updateBackground)),
    asyncHandler(userController.updateBackground)
)

userRouter.get('/users', asyncHandler(validate(userRequest.readRoot)), asyncHandler(userController.readRoot))

userRouter.patch(
    '/reset-password',
    asyncHandler(userMiddleware.checkUserId),
    asyncHandler(validate(userRequest.resetPassword)),
    asyncHandler(userController.resetPassword)
)

// ========== GET [User - Framework] ========== //
// Industry framework
userRouter.get('/industries', asyncHandler(userController.getIndustries))
// Experience Level framework
userRouter.get('/experience-levels', asyncHandler(userController.getExperienceLevels))
// Category framework
userRouter.get('/categories', asyncHandler(userController.getCategories))
// Sub Category framework
userRouter.get('/categories/:id', asyncHandler(userController.getSubCategories))
// Skill framework
userRouter.get('/skills/:id', asyncHandler(userController.getSkills))
// Stage framework
userRouter.get('/stages', asyncHandler(userController.getStages))
// Project role framework
userRouter.get('/roles/project', asyncHandler(userController.getProjectRoles))

// ========== POST [User - Request Add Friend] ========== //
userRouter.post(
    '/:userId/friend-request',
    asyncHandler(validate(userRequest.sendFriendRequest)),
    asyncHandler(userController.sendFriendRequest)
)

// =========== URL dynamic ============= //
userRouter.get('/', asyncHandler(userMiddleware.checkUserId), asyncHandler(userController.readItem))

userRouter.delete(
    '/:id',
    asyncHandler(userMiddleware.checkUserIdDelete),
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
