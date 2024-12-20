import {Router} from 'express'
import {asyncHandler} from '@/utils/helpers'
import requireAuthentication from '@/app/middleware/common/require-authentication'
import validate from '@/app/middleware/common/validate'
import * as notificationRequest from '@/app/requests/notificationRequest'
import * as notificationController from '@/app/controllers/notificationController'

const notificationRouter = Router()

notificationRouter.use(asyncHandler(requireAuthentication))

notificationRouter.get(
    '/notifications',
    asyncHandler(validate(notificationRequest.readRoot)),
    asyncHandler(notificationController.readRoot)
)

notificationRouter.put(
    '/reply',
    asyncHandler(validate(notificationRequest.replyNotification)),
    asyncHandler(notificationController.replyNotification)
)

notificationRouter.post(
    '/request-message',
    asyncHandler(validate(notificationRequest.requestMessage)),
    asyncHandler(notificationController.requestMessage)
)

notificationRouter.post(
    '/project-invitation',
    asyncHandler(validate(notificationRequest.projectInvitation)),
    asyncHandler(notificationController.projectInvitation)
)

notificationRouter.get('/total-friends', asyncHandler(notificationController.getTotalFriends))

notificationRouter.get('/', asyncHandler(notificationController.getNotifications))

export default notificationRouter
