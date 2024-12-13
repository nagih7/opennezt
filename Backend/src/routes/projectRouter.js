import {Router} from 'express'
import {asyncHandler} from '@/utils/helpers'
import requireAuthentication from '@/app/middleware/common/require-authentication'
import validate from '@/app/middleware/common/validate'
import * as projectRequest from '../app/requests/projectRequest'
import * as projectController from '../app/controllers/projectController'
import {update} from 'lodash'

const projectRouter = Router()

projectRouter.use(asyncHandler(requireAuthentication))

projectRouter.get('/seek-projects', asyncHandler(projectController.seekProjects))

projectRouter.post(
    '/request-to-join',
    asyncHandler(validate(projectRequest.requestToJoinProject)),
    asyncHandler(projectController.requestToJoinProject)
)

projectRouter.get('/request-to-join', asyncHandler(projectController.getRequestsToJoinProject))

projectRouter.put('/response-request', asyncHandler(projectController.responseRequest))

projectRouter.put('/background', asyncHandler(projectController.updateBackground))

export default projectRouter
