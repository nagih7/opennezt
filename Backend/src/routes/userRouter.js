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
    asyncHandler(validate(userRequest.createProject)),
    asyncHandler(userController.createProject)
)

userRouter.put('/pitch-deck-project', (req, res) => {
    console.log('pitch-deck-project', req.body)
    res.json('success')
})

userRouter.put('/background-project', (req, res) => {
    console.log('background-project', req.body)
    res.json('success')
})

userRouter.get('/projects', asyncHandler(userController.getProject))

userRouter.put('/project', asyncHandler(userController.updateProject))

userRouter.delete('/project', asyncHandler(userController.deleteProject))

// Founder Profile
userRouter.post(
    '/founder-profile',
    asyncHandler(validate(userRequest.createFounderProfile)),
    asyncHandler(userController.createFounderProfile)
)

userRouter.get('/get-founder-profile', asyncHandler(userController.getFounderProfile))

userRouter.put('/founder-profile', asyncHandler(userController.updateFounderProfile))

userRouter.get(
    '/recruit-talents',
    asyncHandler(validate(userRequest.recuitTalents)),
    asyncHandler(userController.recuitTalents)
)

userRouter.get('/talent-details/:id', asyncHandler(userController.getTalentDetails))

// Invite member
userRouter.post(
    '/invite-member',
    asyncHandler(validate(userRequest.inviteMember)),
    asyncHandler(userController.inviteMember)
)

// Invite member
userRouter.post(
    '/invite-member',
    asyncHandler(validate(userRequest.inviteMember)),
    asyncHandler(userController.inviteMember)
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
