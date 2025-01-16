import {Router} from 'express'
import {asyncHandler} from '@/utils/helpers'
import requireAuthentication from '@/app/middleware/common/require-authentication'
import adminAuthentication from '@/app/middleware/common/admin-authentication'
import * as adminController from '@/app/controllers/adminController'
// import validate from '@/app/middleware/common/validate'

const adminRouter = Router()

adminRouter.use(asyncHandler(requireAuthentication))
adminRouter.use(asyncHandler(adminAuthentication))

adminRouter.get('/total-users', asyncHandler(adminController.getTotalUsers))

export default adminRouter
