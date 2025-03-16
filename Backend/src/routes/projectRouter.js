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

// ========== DELETE [Project] ========== //
projectRouter.delete('/:id', asyncHandler(projectController.deleteProject))

export default projectRouter
