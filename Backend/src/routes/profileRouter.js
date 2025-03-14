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

// ========== POST [Education] ========== //
profileRouter.post(
    '/education',
    asyncHandler(validate(profileRequest.createProfileEducations)),
    asyncHandler(profileController.createProfileEducation)
)
// ========== PUT [Education] ========== //
profileRouter.put(
    '/education',
    asyncHandler(validate(profileRequest.updateProfileEducation)),
    asyncHandler(profileController.updateProfileEducation)
)
// ========== DELETE [Education] ========== //
profileRouter.delete('/education/:id', asyncHandler(profileController.deleteProfileEducation))

// ========== POST [Certification] ========== //
profileRouter.post(
    '/certification',
    asyncHandler(validate(profileRequest.createProfileCertifications)),
    asyncHandler(profileController.createProfileCertifications)
)
// ========== PUT [Certification] ========== //
profileRouter.put(
    '/certification',
    asyncHandler(validate(profileRequest.updateProfileCertification)),
    asyncHandler(profileController.updateProfileCertification)
)
// ========== DELETE [Certification] ========== //
profileRouter.delete('/certification/:id', asyncHandler(profileController.deleteProfileCertification))

// ========== PUT [Skills] ========== //
profileRouter.put(
    '/skills',
    asyncHandler(validate(profileRequest.updateProfileSkills)),
    asyncHandler(profileController.updateProfileSkills)
)

// ========== Organization ========== //
profileRouter.get('/organizations', asyncHandler(profileController.getOrganizationFramework))

// ========== PATCH [Additional Info] ========== //
profileRouter.post(
    '/additional-infos',
    asyncHandler(validate(profileRequest.createProfileAdditionalInfos)),
    asyncHandler(profileController.createProfileAdditionalInfos)
)
// ========== PUT [Additional Info] ========== //
profileRouter.put(
    '/additional-info',
    asyncHandler(validate(profileRequest.updateProfileAdditionalInfo)),
    asyncHandler(profileController.updateProfileAdditionalInfo)
)

// ========== GET [Profile] ========== //
profileRouter.get('/', asyncHandler(profileController.getProfile))

export default profileRouter
