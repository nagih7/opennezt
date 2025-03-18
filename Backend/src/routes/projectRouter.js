import {Router} from 'express'
import {asyncHandler} from '@/utils/helpers'
import requireAuthentication from '@/app/middleware/common/require-authentication'
import validate from '@/app/middleware/common/validate'
import * as projectMiddleware from '@/app/middleware/projectMiddleware'
import * as projectRequest from '../app/requests/projectRequest'
import * as projectController from '../app/controllers/projectController'

const projectRouter = Router()

projectRouter.use(asyncHandler(requireAuthentication))

projectRouter.get(
    '/seek-projects',
    asyncHandler(validate(projectRequest.seekProjects)),
    asyncHandler(projectController.seekProjects)
)

projectRouter.put('/background', asyncHandler(projectController.updateBackground))

projectRouter.get('/invitations/:user_id', asyncHandler(projectController.getInvitations))

// ========== POST [Project] ========== //
projectRouter.post(
    '/',
    asyncHandler(projectMiddleware.decodeFormData),
    asyncHandler(validate(projectRequest.createProject)),
    asyncHandler(projectController.createProject)
)
// ========== GET [My Projects] ========== //
projectRouter.get('/', asyncHandler(projectController.getListMyProjects))

// ========== GET [Project Details] ========== //
projectRouter.get('/:id', asyncHandler(projectController.getProjectDetails))

// ========== PATCH [Project - Basic] ========== //
projectRouter.patch(
    '/:id/basic',
    asyncHandler(validate(projectRequest.updateBasic)),
    asyncHandler(projectController.updateBasic)
)

// ========== PATCH [Project - Sector] ========== //
projectRouter.patch(
    '/:id/sector',
    asyncHandler(validate(projectRequest.updateSector)),
    asyncHandler(projectController.updateSector)
)

// ========== PATCH [Project - Revenue] ========== //
projectRouter.patch(
    '/:id/revenue',
    asyncHandler(validate(projectRequest.updateRevenue)),
    asyncHandler(projectController.updateRevenue)
)

// ========== PATCH [Project - FundingSource] ========== //
projectRouter.patch(
    '/:id/funding-source',
    asyncHandler(validate(projectRequest.updateFundingSource)),
    asyncHandler(projectController.updateFundingSource)
)

// ========== PATCH [Project - AdditionalInfo] ========== //
projectRouter.patch(
    '/:id/additional-info',
    asyncHandler(validate(projectRequest.updateAdditionalInfo)),
    asyncHandler(projectController.updateAdditionalInfo)
)

// ========== DELETE [Project] ========== //
projectRouter.delete('/:id/delete', asyncHandler(projectController.deleteProject))

export default projectRouter
