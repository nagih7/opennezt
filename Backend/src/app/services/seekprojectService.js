import { User, FounderProfile, Project, SeekProject } from '@/models'
import { LINK_STATIC_URL} from '@/configs'

export async function requestsProject(user, { email, project_id, role_project }) {
    const receiver_user = await User.findOne({ email }, { _id: 1, email: 1 })
    
    const user_id = user._id.toString()
    const sender_profile = await FounderProfile.findOne({ user_id: user_id })

    
    const project = await Project.findOne({ _id: project_id })
    if (!receiver_user) {
        throw new Error('Không có thông tin chủ project')

    }
    if (!sender_profile ) {
        throw new Error('Bạn chưa cập nhật thông tin chi tiết')
    }
    if (!project) {
        throw new Error('Không có thông tin dự án')
    }

    const isExist = await SeekProject.findOne({
        sender_id: user._id,
        sender_email: user.email,
        receiver_email: email,
        project_id,
        
    })

    if (isExist) {
        throw new Error('Bạn đã gửi request ')
    }
    else {
        const seek = new SeekProject({
            sender_id: user._id,
            sender_email: user.email,
            receiver_id: receiver_user._id,
            receiver_email: receiver_user.email,
            role_project,
            project_id,
        })

        await seek.save()
    }}


export async function checkExistRequests(user, { email, project_id, role_project }) {
    const sender_profile = await FounderProfile.findOne({ user_id: user._id })
    const project = await Project.findOne({ _id: project_id })

    if (!sender_profile || !project) {
        throw new Error('Dữ liệu không hợp lệ')
    }

    const isExist = await SeekProject.findOne({
        sender_id: user._id,
        sender_email: user.email,
        receiver_email: email,
        project_id,
        role_project,
    })

    if (isExist) {
        return true
    }
    return false
}

export async function getIndustryByFounderId(founder_id) {
    const founder_profile = await FounderProfile.findOne({ user_id: founder_id }, { industry: 1 })
    if (!founder_profile) {
        throw new Error('Founder không tồn tại')
    }
    return founder_profile.industry
}

export async function getRelatedIndustriesByProjectId(project_id) {
    const project = await Project.findOne({ _id: project_id }, { related_industries: 1 })
    if (!project) {
        throw new Error('Project không tồn tại')
    }
    console.log(project.related_industries)
    return project.related_industries
}

export async function getMatchingProjects(user) {
    const user_id = user._id.toString()
    console.log(user_id)
    
    const founder_profile = await FounderProfile.findOne(
        { user_id: user_id }, 
        { industry: 1 }
    )
    
    if (!founder_profile) {
        throw new Error('Hãy cập nhật thông tin chi tiết trong about')
    }

    const projects = await Project.find(
        { 
            related_industries: { $in: founder_profile.industry },
            user_id: { $ne: user_id }
        },
        { 
            problem: 1, 
            solution: 1, 
            background: 1, 
            updated_at: 1, 
            name: 1 
        }
    )

    return projects.map(project => ({
        ...project.toObject(),
        background: project.background ? LINK_STATIC_URL + project.background : project.background
    }))
}
export async function searchProjects({ industry, name, user }) {
    const user_id = user._id.toString()
    const query = {}

    if (industry) {
        query.related_industries = industry
    }

    if (name) {
        query.name = { $regex: name, $options: 'i' }
    }

    query.user_id = { $ne: user_id }

    const projects = await Project.find(query, { 
        problem: 1, 
        solution: 1, 
        name: 1, 
        related_industries: 1, 
        background: 1, 
        updated_at: 1, 
        user_id: 1 
    })

    projects.forEach(project => {
        project.background = project.background ? LINK_STATIC_URL + project.background : project.background
    })

    return projects
}
export async function getProjectDetails(data, user) {
    try {
        const user_id = user._id.toString()
        const { project_id } = data
        
        if (!project_id) {
            throw new Error('Project ID is required')
        }
        
        const project = await Project.findOne(
            { 
                _id: project_id,
                user_id: { $ne: user_id }
            },
            {
                
                name :1,
                background:1,
                related_industries:1,
                stage:1,
                problem:1,
                solution:1,
                team_intro_url:1,
                pitch_deck:1,
                statistics:1,

                revenues:1,
                funding_sources:1,
                target_money:1,
                target_audience:1,
                competitors:1,
                competitive_advantage:1,
                why_now:1,
                strategy:1,
                milestones:1,
                about_opennezt:1
            }
        )

        if (!project) {
            throw new Error('Project not found or unauthorized')
        }

        const projectData = project.toObject()
        projectData.background = projectData.background ? LINK_STATIC_URL + projectData.background : projectData.background

        return projectData

    } catch (error) {
        throw new Error(error.message || 'Error fetching project details')
    }
}