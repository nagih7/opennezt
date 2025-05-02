import { Router } from 'express'
import { asyncHandler } from '@/utils/helpers'
import requireAuthentication from '@/app/middleware/common/require-authentication'
import * as aiController from '../app/controllers/artificialIntelligenceController'

const openAIRouter = Router()

openAIRouter.use(requireAuthentication)

// ========= GET [Matching - Projects] ==============//
openAIRouter.get('/matching/projects', asyncHandler(aiController.matchingProjects))

export default openAIRouter
