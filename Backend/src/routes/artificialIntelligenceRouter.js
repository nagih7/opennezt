import { Router } from 'express'
import { asyncHandler } from '@/utils/helpers'
import requireAuthentication from '@/app/middleware/common/require-authentication'
import * as aiController from '../app/controllers/artificialIntelligenceController'

const openAIRouter = Router()

openAIRouter.use(requireAuthentication)

// Scrap linkedin
openAIRouter.post('/scrap/linkedin', asyncHandler(aiController.scrapLinkedIn))

// Matching projects
openAIRouter.get('/matching/projects', asyncHandler(aiController.matchingProjects))

export default openAIRouter
