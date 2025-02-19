import {Router} from 'express'
import {asyncHandler} from '@/utils/helpers'
import requireAuthentication from '@/app/middleware/common/require-authentication'
import validate from '@/app/middleware/common/validate'
import * as profileRequest from '../app/requests/profileRequest'
import * as profileController from '../app/controllers/profileController'

const profileRouter = Router()

profileRouter.use(asyncHandler(requireAuthentication))

// ===================== Profile =====================
// Create profile
// profileRouter.post(
//     '/create',
//     asyncHandler(validate(profileRequest.createProfile)),
//     asyncHandler(profileController.createProfile)
// )

export default profileRouter
