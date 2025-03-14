import {Router} from 'express'
import {asyncHandler} from '@/utils/helpers'
import requireAuthentication from '@/app/middleware/common/require-authentication'
import validate from '@/app/middleware/common/validate'
import * as userMiddleware from '../app/middleware/userMiddleware'
import * as userRequest from '../app/requests/userRequest'
import * as userController from '../app/controllers/userController'

const userRouter = Router()

userRouter.use(asyncHandler(requireAuthentication))

userRouter.put(
    '/avatar',
    asyncHandler(validate(userRequest.updateAvatar)),
    asyncHandler(userController.updateAvatar)
)

userRouter.put(
    '/background',
    asyncHandler(validate(userRequest.updateBackground)),
    asyncHandler(userController.updateBackground)
)

userRouter.get('/check-steps', asyncHandler(userController.checkSteps))

userRouter.get('/users', asyncHandler(validate(userRequest.readRoot)), asyncHandler(userController.readRoot))

userRouter.patch(
    '/reset-password',
    asyncHandler(userMiddleware.checkUserId),
    asyncHandler(validate(userRequest.resetPassword)),
    asyncHandler(userController.resetPassword)
)
// Project
userRouter.post(
    '/project',
    asyncHandler(userMiddleware.validateProject),
    asyncHandler(validate(userRequest.createProject)),
    asyncHandler(userController.createProject)
)

userRouter.get('/projects', asyncHandler(userController.getProjects))

userRouter.get('/project/:id', asyncHandler(userController.getProject))

userRouter.put('/project', asyncHandler(userController.updateProject))

userRouter.delete('/project', asyncHandler(userController.deleteProject))

// Founder Profile
userRouter.post(
    '/founder-profile',
    asyncHandler(validate(userRequest.createProfile)),
    asyncHandler(userController.createProfile)
)

userRouter.get('/get-founder-profile', asyncHandler(userController.getFounderProfile))

userRouter.put('/founder-profile', asyncHandler(userController.updateFounderProfile))

userRouter.get(
    '/recruit-talents',
    asyncHandler(validate(userRequest.recuitTalents)),
    asyncHandler(userController.recuitTalents)
)

userRouter.get('/talent-details/:id', asyncHandler(userController.getTalentDetails))

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
