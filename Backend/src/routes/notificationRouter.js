import {Router} from 'express'
import {asyncHandler} from '@/utils/helpers'
import requireAuthentication from '@/app/middleware/common/require-authentication'
import validate from '@/app/middleware/common/validate'
import * as notificationRequest from '@/app/requests/notificationRequest'
import * as notificationController from '@/app/controllers/notificationController'

const notificationRouter = Router()

notificationRouter.use(asyncHandler(requireAuthentication))

// Get notifications
notificationRouter.get(
    '/notifications',
    asyncHandler(validate(notificationRequest.readRoot)),
    asyncHandler(notificationController.readRoot)
)

// Reply notification
notificationRouter.put(
    '/reply',
    asyncHandler(validate(notificationRequest.replyNotification)),
    asyncHandler(notificationController.replyNotification)
)

// Request add friend
notificationRouter.post(
    '/request-add-friend',
    asyncHandler(validate(notificationRequest.requestAddFriend)),
    asyncHandler(notificationController.requestAddFriend)
)

// Request project invitation
notificationRouter.post(
    '/project-invitation',
    asyncHandler(validate(notificationRequest.projectInvitation)),
    asyncHandler(notificationController.projectInvitation)
)

// Get request add friend
notificationRouter.get(
    '/request-add-friend/:user_id',
    asyncHandler(notificationController.getRequestAddFriend)
)

// Get total friends
notificationRouter.get('/total-friends', asyncHandler(notificationController.getTotalFriends))

notificationRouter.get('/', asyncHandler(notificationController.getNotifications))

export default notificationRouter
