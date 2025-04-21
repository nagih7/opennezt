import { Router } from 'express'
import { asyncHandler } from '@/utils/helpers'
import requireAuthentication from '@/app/middleware/common/require-authentication'
import validate from '@/app/middleware/common/validate'
import * as projectMiddleware from '@/app/middleware/projectMiddleware'
import * as projectRequest from '../app/requests/projectRequest'
import * as projectController from '../app/controllers/projectController'

const projectRouter = Router()

projectRouter.use(asyncHandler(requireAuthentication))

// ========== GET [Project - Tag] ==============//
projectRouter.get('/tags', asyncHandler(projectController.getProjectsToTag))

// ========== PATCH [Project - Basic] ========== //
projectRouter.patch(
    '/me/:id/basic',
    asyncHandler(validate(projectRequest.updateBasic)),
    asyncHandler(projectController.updateBasic)
)

// ========== PATCH [Project - Sector] ========== //
projectRouter.patch(
    '/me/:id/sector',
    asyncHandler(validate(projectRequest.updateSector)),
    asyncHandler(projectController.updateSector)
)

// ========== PATCH [Project - Revenues] ========== //
projectRouter.patch(
    '/me/:id/revenues',
    asyncHandler(validate(projectRequest.updateRevenue)),
    asyncHandler(projectController.updateRevenue)
)

// ========== PATCH [Project - FundingSource] ========== //
projectRouter.patch(
    '/me/:id/funding-sources',
    asyncHandler(validate(projectRequest.updateFundingSource)),
    asyncHandler(projectController.updateFundingSource)
)

// ========== PATCH [Project - AdditionalInfo] ========== //
projectRouter.patch(
    '/me/:id/additional-infos',
    asyncHandler(validate(projectRequest.updateAdditionalInfo)),
    asyncHandler(projectController.updateAdditionalInfo)
)

// ========== PATCH [Project - Logo] ========== //
projectRouter.patch(
    '/me/:id/logo',
    asyncHandler(projectMiddleware.decodeLogo),
    asyncHandler(validate(projectRequest.updateLogo)),
    asyncHandler(projectController.updateLogo)
)

// ========= PATCH [Project - Background] ========== //
projectRouter.patch(
    '/me/:id/background',
    asyncHandler(projectMiddleware.decodeBackground),
    asyncHandler(validate(projectRequest.updateBackground)),
    asyncHandler(projectController.updateBackground)
)

// ========== PATCH [Project Requirement - Role ] ========== //
projectRouter.patch(
    '/me/:id/requirements/role',
    asyncHandler(validate(projectRequest.updateRoleRequirement)),
    asyncHandler(projectController.updateRoleRequirement)
)
// ========== PATCH [Project Requirement - Sector ] ========== //
projectRouter.patch(
    '/me/:id/requirements/sector',
    asyncHandler(validate(projectRequest.updateSectorRequirement)),
    asyncHandler(projectController.updateSectorRequirement)
)
// ========== PATCH [Project Requirement - Skill ] ========== //
projectRouter.patch(
    '/me/:id/requirements/skill',
    asyncHandler(validate(projectRequest.updateSkillRequirement)),
    asyncHandler(projectController.updateSkillRequirement)
)

// ========== DELETE [Project] ========== //
projectRouter.delete('/:id/delete', asyncHandler(projectController.deleteProject))

// ========== GET [Project - Seek] ========== //
projectRouter.get(
    '/seek',
    asyncHandler(validate(projectRequest.seekProjects)),
    asyncHandler(projectController.seekProjects)
)
// ========== POST [Project - Apply to join project] ========== //
projectRouter.post(
    '/:id/apply',
    asyncHandler(validate(projectRequest.applyToJoinProject)),
    asyncHandler(projectController.applyToJoinProject)
)

// ========== GET [My Project Details] ========== //
projectRouter.get('/me/:id/details', asyncHandler(projectController.getMyProjectDetails))

// ========== POST [Project] ========== //
projectRouter.post(
    '/me/create',
    asyncHandler(projectMiddleware.decodeFormData),
    asyncHandler(validate(projectRequest.createProject)),
    asyncHandler(projectController.createProject)
)

// ========== GET [Project Details] ========== //
projectRouter.get('/:id/details', asyncHandler(projectController.getProjectDetails))

// ========== POST [Project Access] ========== //
projectRouter.post('/:id/access', asyncHandler(projectController.accessToProject))

// ========== GET [My Project Access] ========== //
projectRouter.get('/access/me', asyncHandler(projectController.getMyProjectAccess))

// ========== GET [Access To My Projects] ========== //
projectRouter.get('/me/access', asyncHandler(projectController.getAccessToMyProjects))

// ========== GET [Project - Search] ========== //
projectRouter.get('/me/search', asyncHandler(projectController.searchMyProjects))

// ========= POST [Project - Invite member] ========== //
projectRouter.post(
    '/me/:id/invite',
    asyncHandler(validate(projectRequest.inviteMember)),
    asyncHandler(projectController.inviteMember)
)

// ========= GET [Projects - Participated] ========== //
projectRouter.get(
    '/me/participated',
    // asyncHandler(validate(projectRequest.getListProjectsParticipated)),
    asyncHandler(projectController.getListProjectsParticipated)
)

// ========== GET [My Projects] ========== //
projectRouter.get('/me', asyncHandler(projectController.getListMyProjects))

// ========== GET [My Projects - All Activity] ========== //
projectRouter.get('/me/:id/activities', asyncHandler(projectController.getAllActivities))

// ========== ACTIVITY UPDATE PROJECT BASIC ========== //
projectRouter.post(
    '/me/:id/basic/activity',
    asyncHandler(validate(projectRequest.updateBasicActivity)),
    asyncHandler(projectController.updateBasicActivity)
)
// ========== ACTIVITY UPDATE PROJECT SECTOR ========== //
projectRouter.post(
    '/me/:id/sector/activity',
    asyncHandler(validate(projectRequest.updateSectorActivity)),
    asyncHandler(projectController.updateSectorActivity)
)
// ========== ACTIVITY UPDATE PROJECT REVENUE ========== //
projectRouter.post(
    '/me/:id/revenues/activity',
    asyncHandler(validate(projectRequest.updateRevenueActivity)),
    asyncHandler(projectController.updateRevenueActivity)
)
// ========== ACTIVITY UPDATE PROJECT FUNDING SOURCE ========== //
projectRouter.post(
    '/me/:id/funding-sources/activity',
    asyncHandler(validate(projectRequest.updateFundingSourceActivity)),
    asyncHandler(projectController.updateFundingSourceActivity)
)
// ========== ACTIVITY UPDATE PROJECT ADDITIONAL INFO ========== //
projectRouter.post(
    '/me/:id/additional-infos/activity',
    asyncHandler(validate(projectRequest.updateAdditionalInfoActivity)),
    asyncHandler(projectController.updateAdditionalInfoActivity)
)
// ========== ACTIVITY UPDATE PROJECT LOGO ========== //
projectRouter.post(
    '/me/:id/logo/activity',
    asyncHandler(validate(projectRequest.updateLogoActivity)),
    asyncHandler(projectController.updateLogoActivity)
)
// ========== ACTIVITY UPDATE PROJECT BACKGROUND ========== //
projectRouter.post(
    '/me/:id/background/activity',
    asyncHandler(validate(projectRequest.updateBackgroundActivity)),
    asyncHandler(projectController.updateBackgroundActivity)
)
// ========== POST [Project - Activity ProjectRequirement] ========== //
projectRouter.post('/me/:id/requirements/activity', asyncHandler(projectController.updateProjectRequirementActivity))

// ========== POST [Project - Activity New member] ========== //
projectRouter.post(
    '/me/new-member/activity/:invitationId',
    asyncHandler(projectMiddleware.decodeNewMemberActivity),
    asyncHandler(projectController.updateNewMemberActivity)
)

// =========== POST [Project - Bookmark] =========== //
projectRouter.post('/bookmark', asyncHandler(projectController.bookmarkProject))

// =========== GET [Project - Bookmarks] =========== //
projectRouter.get('/bookmarks-status/:target_ids', asyncHandler(projectController.getUserBookmarksStatus))

// =========== GET [Project - Bookmarks List] =========== //
projectRouter.get('/bookmarks', asyncHandler(projectController.getUserProjectBookmarks))

export default projectRouter
