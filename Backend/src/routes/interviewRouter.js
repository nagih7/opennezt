import { Router } from 'express'
import { asyncHandler } from '@/utils/helpers'
import requireAuthentication from '@/app/middleware/common/require-authentication'
import validate from '@/app/middleware/common/validate'
import * as interviewRequest from '../app/requests/interviewRequest'
import * as interviewController from '../app/controllers/interviewController'

const interviewRouter = Router()

interviewRouter.use(requireAuthentication)

// ========= POST [Interview - Start interview] ==============//
interviewRouter.post(
    '/start',
    asyncHandler(validate(interviewRequest.startInterview)),
    asyncHandler(interviewController.startInterview)
)

// Reply interview with audio
interviewRouter.post(
    '/reply',
    asyncHandler(validate(interviewRequest.replyInterview)),
    interviewController.replyInterview
)

interviewRouter.delete('/audio', interviewController.clearAIAudio)

// KẾT THÚC CUỘC PHỎNG VẤN
interviewRouter.post(
    '/close',
    asyncHandler(validate(interviewRequest.closeInterview)),
    asyncHandler(interviewController.closeInterview)
)

export default interviewRouter
