import { requestsProject, checkExistRequests, searchProjects, getIndustryByFounderId, getRelatedIndustriesByProjectId, getMatchingProjects } from '../services/seekprojectService'

export async function handleRequestsProject(req, res) {
    try {
        const user = req.user
        if (!user || !user._id) {
            throw new Error('User không hợp lệ')
        }

        const { email, project_id, role_project } = req.body

        await requestsProject(user, { email, project_id, role_project })

        res.status(200).json({ message: 'Yêu cầu đã được gửi thành công' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export async function handleCheckExistRequests(req, res) {
    try {
        const user = req.user
        if (!user || !user._id) {
            throw new Error('User không hợp lệ')
        }

        const { email, project_id, role_project } = req.body

        const exists = await checkExistRequests(user, { email, project_id, role_project })

        res.status(200).json({ exists })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export async function handleGetIndustryByFounderId(req, res) {
    try {
        const { founder_id } = req.params
        const industry = await getIndustryByFounderId(founder_id)
        res.status(200).json({ industry })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export async function handleGetRelatedIndustriesByProjectId(req, res) {
    try {
        const { project_id } = req.params
        const related_industries = await getRelatedIndustriesByProjectId(project_id)
        res.status(200).json({ related_industries })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export async function handleGetMatchingProjects(req, res) {
    try {
        const user = req.user
        const projects = await getMatchingProjects(user._id)
        res.status(200).json({ projects })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
export async function handleSearchProjects(req, res) {
    try {
        const { industry, name } = req.query
        const projects = await searchProjects({ industry, name })
        res.status(200).json({ projects })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}