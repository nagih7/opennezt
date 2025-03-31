import { Router } from 'express'
import { asyncHandler } from '@/utils/helpers'
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

// ========== GET [Notification - Read] ========== //
notificationRouter.get('/read', asyncHandler(notificationController.getNotifications))

// ========== PUT [Notification - Reply] ========== //
notificationRouter.put(
    '/:notificationId/reply',
    // asyncHandler(validate(notificationRequest.replyNotification)),
    asyncHandler(notificationController.replyNotification)
)

// ========== PUT [Notification - Reply Invitation Member] ========== //
notificationRouter.put(
    '/reply/invite-member',
    asyncHandler(validate(notificationRequest.replyInvitationMember)),
    asyncHandler(notificationController.replyInvitationMember)
)

export default notificationRouter
