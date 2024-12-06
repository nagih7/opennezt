import express from 'express'
import { handleRequestsProject, handleCheckExistRequests, handleSearchProjects ,handleGetIndustryByFounderId, handleGetRelatedIndustriesByProjectId, handleGetMatchingProjects } from '../app/controllers/seekprojectController'
import { authMiddleware } from '@/app/middleware/authMiddleware'

const router = express.Router()

router.post('/requests-project', authMiddleware, handleRequestsProject)
router.post('/check-exist-requests', authMiddleware, handleCheckExistRequests)
router.get('/founder/:founder_id/industry', authMiddleware, handleGetIndustryByFounderId)
router.get('/project/:project_id/related-industries', authMiddleware, handleGetRelatedIndustriesByProjectId)
router.get('/founder/matching-projects', authMiddleware, handleGetMatchingProjects)
router.get('/search-projects',authMiddleware, handleSearchProjects)

export default router