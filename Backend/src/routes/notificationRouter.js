import {Router} from 'express'
import {asyncHandler} from '@/utils/helpers'
import requireAuthentication from '@/app/middleware/common/require-authentication'
import validate from '@/app/middleware/common/validate'
import * as notificationController from '@/app/controllers/notificationController'

const notificationRouter = Router()

notificationRouter.use(asyncHandler(requireAuthentication))

notificationRouter.put('/chat-invitation', asyncHandler(notificationController.updateChatInvitation))

export default notificationRouter
