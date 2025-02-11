import {Router} from 'express'
import {asyncHandler} from '@/utils/helpers'
import requireAuthentication from '@/app/middleware/common/require-authentication'
import superAdminAuthentication from '@/app/middleware/common/admin-authentication'
import * as manageRequest from '@/app/requests/manageRequest'
import * as manageController from '@/app/controllers/manageController'
import validate from '@/app/middleware/common/validate'

const manageRouter = Router()

manageRouter.use(asyncHandler(superAdminAuthentication))

manageRouter.get('/total-users', asyncHandler(manageController.getTotalUsers))
manageRouter.get(
    '/users',
    asyncHandler(validate(manageRequest.readRoot)),
    asyncHandler(manageController.userReadRoot)
)
manageRouter.get(
    '/roles',
    asyncHandler(validate(manageRequest.readRoot)),
    asyncHandler(manageController.roleReadRoot)
)
manageRouter.get(
    '/types',
    asyncHandler(validate(manageRequest.readRoot)),
    asyncHandler(manageController.typeReadRoot)
)

manageRouter.get(
    '/industries',
    validate(manageRequest.readRoot),
    asyncHandler(manageController.industryReadRoot)
)

export default manageRouter
