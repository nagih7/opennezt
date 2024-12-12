import {
    requestsProject,
    getPendingProjects,
    updateRequestStatus,
    getProjectDetails,
    checkExistRequests,
    searchProjects,
    getIndustryByFounderId,
    getRelatedIndustriesByProjectId,
    getMatchingProjects,
} from '../services/seekprojectService'

export async function handleRequestsProject(req, res) {
    try {
        const user = req.user
        if (!user || !user._id) {
            throw new Error('User không hợp lệ')
        }

        const {email, project_id, role} = req.body

        await requestsProject(user, {email, project_id, role})

        res.status(200).json({message: 'Yêu cầu đã được gửi thành công'})
    } catch (error) {
        switch (error.message) {
            case 'Không có thông tin chủ project':
                return res.status(404).json({message: error.message})
            case 'Bạn chưa cập nhật thông tin chi tiết':
                return res.status(400).json({message: error.message})
            case 'Không có thông tin dự án':
                return res.status(404).json({message: error.message})
            case 'Bạn đã tham gia project này rồi':
                return res.status(400).json({message: error.message})
            default:
                return res.status(500).json({message: 'Bạn đã gửi yêu cầu tham gia rồi'})
        }
    }
}

export async function handleCheckExistRequests(req, res) {
    try {
        const user = req.user
        if (!user || !user._id) {
            throw new Error('User không hợp lệ')
        }

        const {email, project_id, role} = req.body

        const exists = await checkExistRequests(user, {email, project_id, role})

        res.status(200).json({exists})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export async function handleGetIndustryByFounderId(req, res) {
    try {
        const {founder_id} = req.params
        const industry = await getIndustryByFounderId(founder_id)
        res.status(200).json({industry})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export async function handleGetRelatedIndustriesByProjectId(req, res) {
    try {
        const {project_id} = req.params
        const related_industries = await getRelatedIndustriesByProjectId(project_id)
        res.status(200).json({related_industries})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export async function handleGetMatchingProjects(req, res) {
    try {
        const user = req.user
        const projects = await getMatchingProjects(user._id)

        res.status(200).json({projects})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
export async function handleSearchProjects(req, res) {
    const user = req.user
    try {
        const {industry, stage, name} = req.query
        const projects = await searchProjects({industry, stage, name, user})
        res.status(200).json({projects})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
export async function handleGetProjectDetails(req, res) {
    try {
        const user = req.user
        const projectData = req.body

        if (!user) {
            return res.status(400).json({message: 'User not authenticated'})
        }

        const projectDetails = await getProjectDetails(projectData, user)
        res.status(200).json(projectDetails)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}
export async function handleGetPendingProjects(req, res) {
    try {
        const {email} = req.body

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Project email are required',
            })
        }

        const pendingRequests = await getPendingProjects(email)

        return res.status(200).json({
            success: true,
            data: pendingRequests,
        })
    } catch (error) {
        switch (error.message) {
            case 'Missing required parameters':
                return res.status(400).json({
                    success: false,
                    message: error.message,
                })
            case 'No pending requests found':
                return res.status(404).json({
                    success: false,
                    message: error.message,
                })
            default:
                return res.status(500).json({
                    success: false,
                    message: 'Error fetching pending requests',
                })
        }
    }
}

export async function handleUpdateRequestStatus(req, res) {
    try {
        const {request_id, status} = req.body

        if (!request_id) {
            return res.status(400).json({
                success: false,
                message: 'Request ID is required',
            })
        }

        if (!status || !['accepted', 'rejected', 'blocked'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status. Must be either accepted or rejected',
            })
        }

        const updatedRequest = await updateRequestStatus(request_id, status)

        return res.status(200).json({
            success: true,
            data: updatedRequest,
        })
    } catch (error) {
        switch (error.message) {
            case 'Request ID is required':
            case 'Invalid status. Must be either accepted or rejected':
                return res.status(400).json({
                    success: false,
                    message: error.message,
                })
            case 'Request not found':
                return res.status(404).json({
                    success: false,
                    message: error.message,
                })
            default:
                return res.status(500).json({
                    success: false,
                    message: 'Error updating request status',
                })
        }
    }
}
