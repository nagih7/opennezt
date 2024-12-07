import { User, FounderProfile, Project, SeekProject } from '@/models'

export async function requestsProject(user, { email, project_id, role_project }) {
    const receiver_user = await User.findOne({ email }, { _id: 1, email: 1 })
    
    const user_id = user._id.toString()
    // const user_id = '672d77c4a98a959cb514c853'
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
    const founder_profile = await FounderProfile.findOne({ user_id: user_id }, { industry: 1 })
    if (!founder_profile) {
        throw new Error('Hãy cập nhật thông tin chi tiết trong about')
    }

    const matchingProjects = new Set()
    const industries = founder_profile.industry

    for (const industry of industries) {
        const projects = await Project.find({ related_industries: industry }, { problem: 1, solution: 1 , background: 1, updated_at:1, name:1 })
        projects.forEach(project => matchingProjects.add(project))
    }

    return Array.from(matchingProjects)
}
export async function searchProjects({ industry, name }) {
    const query = {}

    if (industry) {
        query.related_industries = industry
    }

    if (name) {
        query.name = { $regex: name, $options: 'i' } 
    }

    const projects = await Project.find(query, { problem: 1, solution: 1, name: 1, related_industries: 1 })
    return projects
}