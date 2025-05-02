import { Router } from 'express'
import { asyncHandler } from '@/utils/helpers'
import requireAuthentication from '@/app/middleware/common/require-authentication'
import validate from '@/app/middleware/common/validate'
// import * as authMiddleware from '../app/middleware/authMiddleware'
import * as talentRequest from '../app/requests/talentRequest'
import * as talentController from '../app/controllers/talentController'

const talentRouter = Router()

talentRouter.use(asyncHandler(requireAuthentication))

// =========== GET [Recruit Talents] =========== //
talentRouter.get(
    '/recruit',
    asyncHandler(validate(talentRequest.recruitTalents)),
    asyncHandler(talentController.recruitTalents)
)

// =========== GET [Talent Details] =========== //
talentRouter.get('/:id/details', asyncHandler(talentController.getTalentDetails))

// =========== POST [Access to Talent] =========== //
talentRouter.post('/:id/access', asyncHandler(talentController.accessToTalent))

export default talentRouter
