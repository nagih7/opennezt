import {Router} from 'express'
import {asyncHandler} from '@/utils/helpers'
import requireAuthentication from '@/app/middleware/common/require-authentication'
import validate from '@/app/middleware/common/validate'
import * as profileRequest from '../app/requests/profileRequest'
import * as profileController from '../app/controllers/profileController'

const profileRouter = Router()

profileRouter.use(asyncHandler(requireAuthentication))

// ===================== Profile ===================== ///
profileRouter.put(
    '/professional',
    asyncHandler(validate(profileRequest.updateProfessionalProfile)),
    asyncHandler(profileController.updateProfessionalProfile)
)

// ========== Education ========== //
profileRouter.post(
    '/education',
    asyncHandler(validate(profileRequest.createProfileEducation)),
    asyncHandler(profileController.createProfileEducation)
)
// ========== Certification ========== //
profileRouter.post(
    '/certification',
    asyncHandler(validate(profileRequest.createProfileCertification)),
    asyncHandler(profileController.createProfileCertification)
)

// ========== Organization ========== //
profileRouter.get('/organizations', asyncHandler(profileController.getOrganizationFramework))

// ========== Dynamic Routes Profile ========== //
profileRouter.post(
    '/',
    asyncHandler(validate(profileRequest.createProfile)),
    asyncHandler(profileController.createProfile)
)
profileRouter.get('/', asyncHandler(profileController.getProfile))

export default profileRouter
