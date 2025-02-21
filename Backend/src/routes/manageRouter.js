import {Router} from 'express'
import {asyncHandler} from '@/utils/helpers'
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

// EXPERIENCE_LEVELS
manageRouter.get(
    '/experience-levels',
    validate(manageRequest.readRoot),
    asyncHandler(manageController.experienceLevelReadRoot)
)
manageRouter.post(
    '/experience-levels',
    validate(manageRequest.createExperienceLevel),
    asyncHandler(manageController.createExperienceLevel)
)
manageRouter.put(
    '/experience-levels/:id',
    validate(manageRequest.updateExperienceLevel),
    asyncHandler(manageController.updateExperienceLevel)
)
manageRouter.delete('/experience-levels/:id', asyncHandler(manageController.deleteExperienceLevel))

// CATEGORIES
manageRouter.get(
    '/categories',
    validate(manageRequest.readRoot),
    asyncHandler(manageController.categoryReadRoot)
)
manageRouter.post(
    '/categories',
    validate(manageRequest.createCategory),
    asyncHandler(manageController.createCategory)
)
manageRouter.put(
    '/categories/:id',
    validate(manageRequest.updateCategory),
    asyncHandler(manageController.updateCategory)
)
manageRouter.delete('/categories/:id', asyncHandler(manageController.deleteCategory))

// SKILLS
manageRouter.get('/skills', validate(manageRequest.readRoot), asyncHandler(manageController.skillReadRoot))
manageRouter.post('/skills', validate(manageRequest.createSkill), asyncHandler(manageController.createSkill))
manageRouter.put(
    '/skills/:id',
    validate(manageRequest.updateSkill),
    asyncHandler(manageController.updateSkill)
)
manageRouter.delete('/skills/:id', asyncHandler(manageController.deleteSkill))
manageRouter.get('/skills/categories', asyncHandler(manageController.skillCategories))

// ORGANIZATIONS
manageRouter.get(
    '/organizations',
    validate(manageRequest.readRoot),
    asyncHandler(manageController.organizationReadRoot)
)
manageRouter.post(
    '/organizations',
    validate(manageRequest.createOrganization),
    asyncHandler(manageController.createOrganization)
)
manageRouter.put(
    '/organizations/:id',
    validate(manageRequest.updateOrganization),
    asyncHandler(manageController.updateOrganization)
)
manageRouter.delete('/organizations/:id', asyncHandler(manageController.deleteOrganization))

export default manageRouter
