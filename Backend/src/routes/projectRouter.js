import {Router} from 'express'
import {asyncHandler} from '@/utils/helpers'
import requireAuthentication from '@/app/middleware/common/require-authentication'
import validate from '@/app/middleware/common/validate'
import * as projectMiddleware from '@/app/middleware/projectMiddleware'
import * as projectRequest from '../app/requests/projectRequest'
import * as projectController from '../app/controllers/projectController'

const projectRouter = Router()

projectRouter.use(asyncHandler(requireAuthentication))

// ========== GET [Project - Tag] ==============//
projectRouter.get('/tags', asyncHandler(projectController.getProjectsToTag))

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

// ========== POST [Project - Invite] ========== //
projectRouter.post(
    '/:id/invite-member',
    asyncHandler(validate(projectRequest.inviteMember)),
    asyncHandler(projectController.inviteMember)
)

// ========== GET [Project - Seek] ========== //
projectRouter.get(
    '/seek',
    asyncHandler(validate(projectRequest.seekProjects)),
    asyncHandler(projectController.seekProjects)
)
// ========== POST [Project - Apply to join project] ========== //
projectRouter.post(
    '/:id/apply',
    asyncHandler(validate(projectRequest.applyToJoinProject)),
    asyncHandler(projectController.applyToJoinProject)
)

// ========== GET [My Project Details] ========== //
projectRouter.get('/me/:id/details', asyncHandler(projectController.getMyProjectDetails))

// ========== POST [Project] ========== //
projectRouter.post(
    '/me/create',
    asyncHandler(projectMiddleware.decodeFormData),
    asyncHandler(validate(projectRequest.createProject)),
    asyncHandler(projectController.createProject)
)

// ========== GET [My Projects] ========== //
projectRouter.get('/me', asyncHandler(projectController.getListMyProjects))

// ========== GET [Project Details] ========== //
projectRouter.get('/:id/details', asyncHandler(projectController.getProjectDetails))

// ========== POST [Project Access] ========== //
projectRouter.post('/:id/access', asyncHandler(projectController.accessToProject))

// ========== GET [My Project Access] ========== //
projectRouter.get('/me/access', asyncHandler(projectController.getMyProjectAccess))

export default projectRouter
