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

// ROLES
manageRouter.get(
    '/roles',
    asyncHandler(validate(manageRequest.readRoot)),
    asyncHandler(manageController.roleReadRoot)
)
manageRouter.post(
    '/roles',
    asyncHandler(validate(manageRequest.createRole)),
    asyncHandler(manageController.createRole)
)
manageRouter.put(
    '/roles/:id',
    asyncHandler(validate(manageRequest.updateRole)),
    asyncHandler(manageController.updateRole)
)
manageRouter.delete('/roles/:id', asyncHandler(manageController.deleteRole))

// TYPES
manageRouter.get(
    '/types',
    asyncHandler(validate(manageRequest.readRoot)),
    asyncHandler(manageController.typeReadRoot)
)
manageRouter.post(
    '/types',
    asyncHandler(validate(manageRequest.createType)),
    asyncHandler(manageController.createType)
)
manageRouter.put(
    '/types/:id',
    asyncHandler(validate(manageRequest.updateType)),
    asyncHandler(manageController.updateType)
)
manageRouter.delete('/types/:id', asyncHandler(manageController.deleteType))

// INDUSTRIES
manageRouter.get(
    '/industries',
    validate(manageRequest.readRoot),
    asyncHandler(manageController.industryReadRoot)
)
manageRouter.post(
    '/industries',
    validate(manageRequest.createIndustry),
    asyncHandler(manageController.createIndustry)
)
manageRouter.put(
    '/industries/:id',
    validate(manageRequest.updateIndustry),
    asyncHandler(manageController.updateIndustry)
)
manageRouter.delete('/industries/:id', asyncHandler(manageController.deleteIndustry))

export default manageRouter
