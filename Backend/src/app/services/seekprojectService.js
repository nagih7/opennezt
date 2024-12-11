import {User, FounderProfile, Project, ProjectRequest} from '@/models'
import {LINK_STATIC_URL} from '@/configs'

export async function requestsProject(user, {email, project_id, role}) {
    const user_receiver = await Project.findOne({_id: project_id}, {user_id: 1})
    const id_receiver = user_receiver.user_id.toString()
    const receiver_user = await User.findOne({_id: id_receiver}, {_id: 1, email: 1})
    const user_id = user._id.toString()
    const sender_profile = await FounderProfile.findOne({user_id: user_id})

    if (!receiver_user) {
        throw new Error('Không có thông tin chủ project')
    }
    if (sender_profile === null) {
        throw new Error('Bạn chưa cập nhật thông tin chi tiết')
    }

    const project = await Project.findOne({_id: project_id})
    if (!project) {
        throw new Error('Không có thông tin dự án')
    }

    const existingRequest = await ProjectRequest.findOne({
        sender_id: user._id,
        sender_email: email,
        receiver_email: receiver_user.email,
        project_id,
    })

    if (existingRequest) {
        if (existingRequest.status === 'rejected') {
            await ProjectRequest.updateOne(
                {_id: existingRequest._id},
                {
                    $set: {
                        status: 'pending',
                        role: role,
                        updatedAt: new Date(),
                    },
                }
            )
            return
        }
        throw new Error('Bạn đã gửi request')
    }

    const seek = new ProjectRequest({
        sender_id: user._id,
        sender_email: user.email,
        receiver_id: receiver_user._id,
        receiver_email: receiver_user.email,
        role,
        project_id,
        status: 'pending',
    })

    await seek.save()
}

export async function checkExistRequests(user, {email, project_id, role}) {
    const sender_profile = await FounderProfile.findOne({user_id: user._id})
    const project = await Project.findOne({_id: project_id})

    if (!sender_profile || !project) {
        throw new Error('Dữ liệu không hợp lệ')
    }

    const isExist = await ProjectRequest.findOne({
        sender_id: user._id,
        sender_email: user.email,
        receiver_email: email,
        project_id,
        role,
    })

    if (isExist) {
        return true
    }
    return false
}

export async function getIndustryByFounderId(founder_id) {
    const founder_profile = await FounderProfile.findOne({user_id: founder_id}, {industry: 1})
    if (!founder_profile) {
        throw new Error('Founder không tồn tại')
    }
    return founder_profile.industry
}

export async function getRelatedIndustriesByProjectId(project_id) {
    const project = await Project.findOne({_id: project_id}, {related_industries: 1})
    if (!project) {
        throw new Error('Project không tồn tại')
    }
    console.log(project.related_industries)
    return project.related_industries
}

export async function getMatchingProjects(user_id) {
    const founder_profile = await FounderProfile.findOne({user_id}, {industry: 1})

    if (!founder_profile) {
        throw new Error('Hãy cập nhật thông tin chi tiết trong about')
    }

    const projects = await Project.find(
        {
            related_industries: {$in: founder_profile.industry},
            user_id: {$ne: user_id},
        },
        {
            problem: 1,
            solution: 1,
            background: 1,
            updated_at: 1,
            name: 1,
            _id: 1,
        }
    )

    const projectsWithStatus = await Promise.all(
        projects.map(async (project) => {
            const seekProject = await ProjectRequest.findOne(
                {
                    project_id: project._id,
                    sender_id: user_id,
                },
                {
                    status: 1,
                    role: 1,
                }
            )

            const projectObj = project.toObject()
            return {
                ...projectObj,
                background: projectObj.background
                    ? LINK_STATIC_URL + projectObj.background
                    : projectObj.background,
                status: seekProject ? seekProject.status : null,
                role: seekProject ? seekProject.role : null,
            }
        })
    )

    return projectsWithStatus
}

export async function searchProjects({industry, stage, name, user}) {
    const user_id = user._id.toString()
    const query = {}

    if (industry) query.related_industries = industry
    if (stage) query.stage = stage
    if (name) query.name = {$regex: name, $options: 'i'}
    query.user_id = {$ne: user_id}

    const projects = await Project.find(query, {
        problem: 1,
        solution: 1,
        name: 1,
        related_industries: 1,
        background: 1,
        updated_at: 1,
        user_id: 1,
    })

    const projectsWithStatus = await Promise.all(
        projects.map(async (project) => {
            const projectObj = project.toObject()

            const seekProject = await ProjectRequest.findOne(
                {
                    project_id: project._id,
                    sender_id: user_id,
                },
                {
                    status: 1,
                    role: 1,
                }
            )

            return {
                ...projectObj,
                background: projectObj.background
                    ? LINK_STATIC_URL + projectObj.background
                    : projectObj.background,
                status: seekProject ? seekProject.status : null,
                role: seekProject ? seekProject.role : null,
            }
        })
    )

    return projectsWithStatus
}
export async function getProjectDetails(data, user) {
    try {
        const user_id = user._id.toString()
        const {project_id} = data

        if (!project_id) {
            throw new Error('Project ID is required')
        }

        const project = await Project.findOne(
            {
                _id: project_id,
                user_id: {$ne: user_id},
            },
            {
                name: 1,
                background: 1,
                related_industries: 1,
                stage: 1,
                problem: 1,
                solution: 1,
                team_intro_url: 1,
                pitch_deck: 1,
                statistics: 1,

                revenues: 1,
                funding_sources: 1,
                target_money: 1,
                target_audience: 1,
                competitors: 1,
                competitive_advantage: 1,
                why_now: 1,
                strategy: 1,
                milestones: 1,
                about_opennezt: 1,
            }
        )

        if (!project) {
            throw new Error('Project not found or unauthorized')
        }

        const projectData = project.toObject()
        projectData.background = projectData.background
            ? LINK_STATIC_URL + projectData.background
            : projectData.background

        return projectData
    } catch (error) {
        throw new Error(error.message || 'Error fetching project details')
    }
}
export async function getPendingProjects(email) {
    try {
        if (!email) {
            throw new Error('Missing required parameters')
        }

        const pendingRequests = await ProjectRequest.find({
            receiver_email: email,
        })

        if (!pendingRequests || pendingRequests.length === 0) {
            throw new Error('No pending requests found')
        }

        const projectIds = pendingRequests.map((request) => request.project_id)

        const projects = await Project.find({_id: {$in: projectIds}}, {name: 1})

        const projectMap = projects.reduce((acc, project) => {
            acc[project._id.toString()] = project.name
            return acc
        }, {})

        const enrichedRequests = pendingRequests.map((request) => ({
            ...request.toObject(),
            project_name: projectMap[request.project_id.toString()] || 'Unknown Project',
        }))

        return enrichedRequests
    } catch (error) {
        throw new Error(error.message || 'Error fetching pending requests')
    }
}

export async function updateRequestStatus(request_id, status) {
    try {
        console.log('Received parameters:', {request_id, status})

        if (!request_id) {
            throw new Error('Request ID is required')
        }

        if (!status || !['accepted', 'rejected', 'blocked'].includes(status)) {
            throw new Error('Invalid status. Must be either accepted or rejected')
        }

        console.log('Searching for request_id:', request_id)

        const existingRequest = await ProjectRequest.findOne({
            project_id: request_id,
            status: 'pending',
        })

        if (!existingRequest) {
            throw new Error('Request not found')
        }

        existingRequest.status = status
        existingRequest.updated_at = new Date()
        await existingRequest.save()

        console.log('Updated request:', existingRequest)
        return existingRequest
    } catch (error) {
        console.error('Error in updateRequestStatus:', error)
        throw error
    }
}
