import {Router} from 'express'
import {asyncHandler} from '@/utils/helpers'
import requireAuthentication from '@/app/middleware/common/require-authentication'
import validate from '@/app/middleware/common/validate'
import * as userMiddleware from '../app/middleware/userMiddleware'
import * as userRequest from '../app/requests/userRequest'
import * as adminController from '../app/controllers/adminController'

const adminRouter = Router()

// Middleware to check if the user is authenticated
adminRouter.use(asyncHandler(requireAuthentication))

adminRouter.get('/all-users', asyncHandler(requireAuthentication), asyncHandler(adminController.getAllUsers))

adminRouter.get(
    '/total-users',
    asyncHandler(requireAuthentication),
    asyncHandler(adminController.getTotalUsers)
)

export default adminRouter
