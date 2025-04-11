import { Router } from 'express'
import { asyncHandler } from '@/utils/helpers'
import requireAuthentication from '@/app/middleware/common/require-authentication'
// import validate from '@/app/middleware/common/validate'
import * as artificialIntelligenceController from '../app/controllers/artificialIntelligenceController'

const openAIRouter = Router()

openAIRouter.use(requireAuthentication)

openAIRouter.get('/matching/projects', asyncHandler(artificialIntelligenceController.matchingProjects))

openAIRouter.get('/matching/talents', asyncHandler(artificialIntelligenceController.matchingTalents))

export default openAIRouter
