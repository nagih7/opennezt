import { Router } from 'express'
import { asyncHandler } from '@/utils/helpers'
import requireAuthentication from '@/app/middleware/common/require-authentication'
import validate from '@/app/middleware/common/validate'
import * as aiRequest from '../app/requests/artificialIntelligenceRequest'
import * as aiController from '../app/controllers/artificialIntelligenceController'

const openAIRouter = Router()

openAIRouter.use(requireAuthentication)

// ========= GET [Matching - Projects] ==============//
openAIRouter.get('/matching/projects', asyncHandler(aiController.matchingProjects))

// ========= POST [Interview - Start interview] ==============//
openAIRouter.post(
    '/interview/start',
    asyncHandler(validate(aiRequest.startInterview)),
    asyncHandler(aiController.startInterview)
)

export default openAIRouter
