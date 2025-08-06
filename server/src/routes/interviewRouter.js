import { Router } from 'express'
import { asyncHandler } from '@/utils/helpers'
import requireAuthentication from '@/app/middleware/common/require-authentication'
import validate from '@/app/middleware/common/validate'
import * as interviewRequest from '../app/requests/interviewRequest'
import * as interviewController from '../app/controllers/interviewController'

const interviewRouter = Router()

interviewRouter.use(requireAuthentication)

// BẮT ĐẦU CUỘC PHỎNG VẤN
interviewRouter.post(
    '/start',
    asyncHandler(validate(interviewRequest.startInterview)),
    asyncHandler(interviewController.startInterview)
)

// TRẢ LỜI PHỎNG VẤN
interviewRouter.post(
    '/reply',
    asyncHandler(validate(interviewRequest.replyInterview)),
    interviewController.replyInterview
)

// KẾT THÚC CUỘC PHỎNG VẤN
interviewRouter.post(
    '/close',
    asyncHandler(validate(interviewRequest.closeInterview)),
    asyncHandler(interviewController.closeInterview)
)

// LẤY DANH SÁCH PROJECTS LUYỆN TẬP PHỎNG VẤN
interviewRouter.get('/practice-projects', asyncHandler(interviewController.getPracticeProjects))

export default interviewRouter
