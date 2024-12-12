import express from 'express'
import {
    handleRequestsProject,
    handleGetProjectDetails,
    handleCheckExistRequests,
    handleSearchProjects,
    handleGetIndustryByFounderId,
    handleGetRelatedIndustriesByProjectId,
    handleGetMatchingProjects,
    handleGetPendingProjects,
    handleUpdateRequestStatus,
} from '../app/controllers/seekprojectController'
import {authMiddleware} from '@/app/middleware/authMiddleware'

const router = express.Router()

router.post('/requests-project', authMiddleware, handleRequestsProject)
router.post('/check-exist-requests', authMiddleware, handleCheckExistRequests)
router.get('/founder/:founder_id/industry', authMiddleware, handleGetIndustryByFounderId)
router.get('/project/:project_id/related-industries', authMiddleware, handleGetRelatedIndustriesByProjectId)
router.get('/founder/matching-projects', authMiddleware, handleGetMatchingProjects)
router.get('/search-projects', authMiddleware, handleSearchProjects)
router.post('/project-details', authMiddleware, handleGetProjectDetails)
router.get('/pending-projects', authMiddleware, handleGetPendingProjects)
router.put('/update-request-status', authMiddleware, handleUpdateRequestStatus)

export default router
