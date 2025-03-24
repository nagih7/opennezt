import {LINK_STATIC_URL} from '@/configs'
import {
    Project,
    NotificationFeed,
    ObjectId,
    Revenue,
    FundingSource,
    ProjectAdditionalInfo,
    Type,
    ProjectMember,
    Role,
} from '@/models'
import {FileUpload} from '@/utils/classes'
import delay from '@/utils/classes/delay'

// ========== POST [Project] ========== //
export async function createProject(user, requestBody) {
    const {revenues, funding_sources, additional_infos, logo, background} = requestBody
    // Project
    if (logo instanceof FileUpload) {
        requestBody.logo = logo.save('project_logos')
    }
    if (background instanceof FileUpload) {
        requestBody.background = background.save('project_backgrounds')
    }
    const project = new Project({
        user_id: user._id,
        industry_ids: requestBody.industries || [],
        stage_id: requestBody.stage || '',
        ...requestBody,
    })
    await project.save()
    // Revenue
    if (revenues?.length > 0) {
        const revenueBulk = revenues.map((revenue) => ({
            ...revenue,
            project_id: project._id,
        }))
        await Revenue.insertMany(revenueBulk)
    }
    // Funding Source
    if (funding_sources?.length > 0) {
        project.funding_sources = funding_sources.map((funding_source) => ({
            ...funding_source,
            project_id: project._id,
        }))
        await FundingSource.insertMany(project.funding_sources)
    }
    // Additional Info
    if (additional_infos?.length > 0) {
        project.additional_infos = additional_infos.map((additional_info) => ({
            ...additional_info,
            project_id: project._id,
        }))
        await ProjectAdditionalInfo.insertMany(project.additional_infos)
    }

    const roleType = await Type.findOne({class: 'role', name: 'project_role'})
    const teamRoleType = await Type.findOne({class: 'role', name: 'project_team_role'})
    const founderRole = await Role.findOne({type_id: roleType._id, name: 'Founder'})
    const founderTeamRole = await Role.findOne({type_id: teamRoleType._id, name: 'Founder'})

    const owner = new ProjectMember({
        project_id: project._id,
        user_id: user._id,
        role_id: founderRole._id,
        team_role_id: founderTeamRole._id,
    })
    await owner.save()

    return {project_id: project._id}
}

// ========== GET [My Projects] ========== //
export async function getListMyProjects(user, {q, page, per_page, field, order}) {
    page = parseInt(page)
    per_page = parseInt(per_page)
    q = q ? q : ''
    order = order === '-1' ? -1 : 1

    const matchStage = {
        $match: {
            $and: [{user_id: user._id}, {name: {$regex: q, $options: 'i'}}],
        },
    }
    const sortStage = {
        $sort: {[field]: order},
    }
    const skipStage = {
        $skip: (page - 1) * per_page,
    }
    const limitStage = {
        $limit: per_page,
    }
    const projectStage = {
        $project: {
            _id: 1,
            user_id: 0,
            description: 0,
            industry_ids: 0,
            stage_id: 0,
            created_at: 0,
            updated_at: 0,
        },
    }

    const addFieldsStage = {
        $addFields: {
            logo: {
                $cond: {
                    if: {$eq: [{$ifNull: ['$logo', '']}, '']},
                    then: '$logo',
                    else: {$concat: [LINK_STATIC_URL, '$logo']},
                },
            },
            background: {
                $cond: {
                    if: {$eq: [{$ifNull: ['$background', '']}, '']},
                    then: '$background',
                    else: {$concat: [LINK_STATIC_URL, '$background']},
                },
            },
        },
    }

    const projects = await Project.aggregate([
        matchStage,
        sortStage,
        skipStage,
        limitStage,
        addFieldsStage,
        projectStage,
    ])

    const filter = {user_id: user._id, name: {$regex: q, $options: 'i'}}
    const total = await Project.countDocuments(filter)
    const last_page = Math.ceil(total / per_page)
    return {total, page, per_page, last_page, projects}
}

// ========== GET [My Project Details] ========== //
export async function getMyProjectDetails(user, projectId) {
    const project = await Project.aggregate([
        {
            $match: {
                _id: new ObjectId(projectId),
                user_id: user._id,
            },
        },
        {
            $lookup: {
                from: 'industries',
                localField: 'industry_ids',
                foreignField: '_id',
                as: 'industries',
                pipeline: [
                    {
                        $project: {
                            // _id: 0,
                            // name: 1,
                            created_at: 0,
                            updated_at: 0,
                        },
                    },
                ],
            },
        },
        {
            $lookup: {
                from: 'stages',
                localField: 'stage_id',
                foreignField: '_id',
                as: 'stage',
                pipeline: [
                    {
                        $project: {
                            // _id: 0,
                            // name: 1,
                            created_at: 0,
                            updated_at: 0,
                        },
                    },
                ],
            },
        },
        {
            $lookup: {
                from: 'revenues',
                localField: '_id',
                foreignField: 'project_id',
                as: 'revenues',
                pipeline: [
                    {
                        $project: {
                            // _id: 0,
                            // name: 1,
                            created_at: 0,
                            updated_at: 0,
                        },
                    },
                ],
            },
        },
        {
            $lookup: {
                from: 'funding_sources',
                localField: '_id',
                foreignField: 'project_id',
                as: 'funding_sources',
                pipeline: [
                    {
                        $project: {
                            // _id: 0,
                            // name: 1,
                            created_at: 0,
                            updated_at: 0,
                        },
                    },
                ],
            },
        },
        {
            $lookup: {
                from: 'project_additional_infos',
                localField: '_id',
                foreignField: 'project_id',
                as: 'additional_infos',
                pipeline: [
                    {
                        $project: {
                            // _id: 0,
                            // name: 1,
                            created_at: 0,
                            updated_at: 0,
                        },
                    },
                ],
            },
        },
        {
            $addFields: {
                logo: {
                    $cond: {
                        if: {$eq: [{$ifNull: ['$logo', '']}, '']},
                        then: '$logo',
                        else: {$concat: [LINK_STATIC_URL, '$logo']},
                    },
                },
                background: {
                    $cond: {
                        if: {$eq: [{$ifNull: ['$background', '']}, '']},
                        then: '$background',
                        else: {$concat: [LINK_STATIC_URL, '$background']},
                    },
                },
                stage: {$arrayElemAt: ['$stage', 0]},
            },
        },
        {
            $project: {
                user_id: 0,
                created_at: 0,
                updated_at: 0,
                industry_ids: 0,
                stage_id: 0,
            },
        },
    ])

    return project[0]
}

// ========== GET [Project Details] ========== //
export async function getProjectDetails(user, projectId) {
    const typeNotification = await Type.findOne({class: 'notification', name: 'project_application'})
    const project = await Project.aggregate([
        {
            $match: {
                _id: new ObjectId(projectId),
                user_id: {$ne: user._id},
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user_id',
                foreignField: '_id',
                as: 'user',
                pipeline: [
                    {
                        $addFields: {
                            avatar: {
                                $cond: {
                                    if: {$eq: [{$ifNull: ['$avatar', '']}, '']},
                                    then: '$avatar',
                                    else: {$concat: [LINK_STATIC_URL, '$avatar']},
                                },
                            },
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            name: 1,
                            avatar: 1,
                        },
                    },
                ],
            },
        },
        {
            $lookup: {
                from: 'industries',
                localField: 'industry_ids',
                foreignField: '_id',
                as: 'industries',
                pipeline: [
                    {
                        $project: {
                            // _id: 0,
                            // name: 1,
                            created_at: 0,
                            updated_at: 0,
                        },
                    },
                ],
            },
        },
        {
            $lookup: {
                from: 'stages',
                localField: 'stage_id',
                foreignField: '_id',
                as: 'stage',
                pipeline: [
                    {
                        $project: {
                            // _id: 0,
                            // name: 1,
                            created_at: 0,
                            updated_at: 0,
                        },
                    },
                ],
            },
        },
        {
            $lookup: {
                from: 'revenues',
                localField: '_id',
                foreignField: 'project_id',
                as: 'revenues',
                pipeline: [
                    {
                        $project: {
                            // _id: 0,
                            // name: 1,
                            created_at: 0,
                            updated_at: 0,
                        },
                    },
                ],
            },
        },
        {
            $lookup: {
                from: 'funding_sources',
                localField: '_id',
                foreignField: 'project_id',
                as: 'funding_sources',
                pipeline: [
                    {
                        $project: {
                            // _id: 0,
                            // name: 1,
                            created_at: 0,
                            updated_at: 0,
                        },
                    },
                ],
            },
        },
        {
            $lookup: {
                from: 'project_additional_infos',
                localField: '_id',
                foreignField: 'project_id',
                as: 'additional_infos',
                pipeline: [
                    {
                        $project: {
                            // _id: 0,
                            // name: 1,
                            created_at: 0,
                            updated_at: 0,
                        },
                    },
                ],
            },
        },
        {
            $lookup: {
                from: 'project_members',
                localField: '_id',
                foreignField: 'project_id',
                as: 'members',
            },
        },
        {
            $lookup: {
                from: 'articles',
                localField: '_id',
                foreignField: 'project_id',
                as: 'articles',
            },
        },
        {
            $lookup: {
                from: 'notifications_feed',
                localField: '_id',
                foreignField: 'additional_info.project_id',
                as: 'applied',
                pipeline: [
                    {
                        $match: {
                            source_id: user._id,
                            type_id: typeNotification._id,
                        },
                    },
                ],
            },
        },
        {
            $addFields: {
                logo: {
                    $cond: {
                        if: {$eq: [{$ifNull: ['$logo', '']}, '']},
                        then: '$logo',
                        else: {$concat: [LINK_STATIC_URL, '$logo']},
                    },
                },
                background: {
                    $cond: {
                        if: {$eq: [{$ifNull: ['$background', '']}, '']},
                        then: '$background',
                        else: {$concat: [LINK_STATIC_URL, '$background']},
                    },
                },
                stage: {$arrayElemAt: ['$stage', 0]},
            },
        },
        {
            $unwind: '$user',
        },
        {
            $unwind: {
                path: '$applied',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $project: {
                user_id: 0,
                created_at: 0,
                updated_at: 0,
                industry_ids: 0,
                stage_id: 0,
            },
        },
    ])

    if (project[0]?.applied) {
        project[0].applied = true
    } else {
        project[0].applied = false
    }

    return project[0]
}

// ========== PATCH [Project - Basic] ========== //
export async function updateBasic(user, requestBody) {
    await Project.updateOne(
        {user_id: user._id, _id: requestBody.project_id},
        {name: requestBody.name, description: requestBody.description}
    )
}

// ========== PATCH [Project - Sector] ========== //
export async function updateSector(user, requestBody) {
    await Project.updateOne(
        {user_id: user._id, _id: requestBody.project_id},
        {industry_ids: requestBody.industries, stage_id: requestBody.stage}
    )
}

// ========== PATCH [Project - Revenue] ========== //
export async function updateRevenue(user, requestBody) {
    const project = await Project.findOne({user_id: user._id, _id: requestBody.project_id})

    const {revenues} = requestBody
    await Revenue.deleteMany({project_id: project._id}).exec()
    if (revenues?.length > 0) {
        const revenueBulk = revenues.map((revenue) => ({
            ...revenue,
            project_id: project._id,
        }))
        await Revenue.insertMany(revenueBulk)
    }
}

// ========== PATCH [Project - FundingSource] ========== //
export async function updateFundingSource(user, requestBody) {
    const project = await Project.findOne({user_id: user._id, _id: requestBody.project_id})

    const {funding_sources} = requestBody
    await FundingSource.deleteMany({project_id: project._id}).exec()
    if (funding_sources?.length > 0) {
        project.funding_sources = funding_sources.map((funding_source) => ({
            ...funding_source,
            project_id: project._id,
        }))
        await FundingSource.insertMany(project.funding_sources)
    }
}

// ========== PATCH [Project - AdditionalInfo] ========== //
export async function updateAdditionalInfo(user, requestBody) {
    const project = await Project.findOne({user_id: user._id, _id: requestBody.project_id})

    const {additional_infos} = requestBody
    await ProjectAdditionalInfo.deleteMany({project_id: project._id}).exec()
    if (additional_infos?.length > 0) {
        project.additional_infos = additional_infos.map((additional_info) => ({
            ...additional_info,
            project_id: project._id,
        }))
        await ProjectAdditionalInfo.insertMany(project.additional_infos)
    }
}

// ========== DELETE [Project] ========== //
export async function deleteProject(user, projectId) {
    await Project.deleteOne({user_id: user._id, _id: projectId})
    await Revenue.deleteMany({project_id: projectId}).exec()
    await FundingSource.deleteMany({project_id: projectId}).exec()
    await ProjectAdditionalInfo.deleteMany({project_id: projectId}).exec()
}

// ========== POST [Project - Invite] ========== //
export async function inviteMember(user, projectId, requestBody) {
    const {user_id, team_role_id, role_id} = requestBody
    const typeNotification = await Type.findOne({class: 'notification', name: 'Project Invitation'})

    const notification = new NotificationFeed({
        source_id: user._id,
        user_id: new ObjectId(user_id),
        type_id: typeNotification._id,
        additional_info: {
            project_id: projectId,
            team_role_id,
            role_id,
        },
        metadata: {
            status: 'waiting',
            read: false,
        },
    })
    await notification.save()
}

// ========== GET [Project - TAGS] ========== //
export async function getProjectsToTag(user, requestQuery) {
    const key = requestQuery.keySearch || ''
    const projects = await Project.find({
        user_id: user._id,
        name: {$regex: key, $options: 'i'},
    })
        .select({name: 1, _id: 1})
        .limit(5)

    return projects
}

// ========== GET [Project - Seek] ========== //
export async function seekProjects(user, {q, page, per_page, field, order, industry, stage}) {
    q = q ? q : ''
    industry = industry ? industry : ''
    stage = stage ? stage : ''
    order = order === '-1' ? -1 : 1

    const matchStage = {
        $match: {
            $and: [
                {name: {$regex: q, $options: 'i'}},
                {user_id: {$ne: user._id}},
                {industry_ids: industry ? {$in: [new ObjectId(industry)]} : {$ne: null}},
                {stage_id: stage ? new ObjectId(stage) : {$ne: null}},
            ],
        },
    }
    const sortStage = {
        $sort: {[field]: order},
    }
    const skipStage = {
        $skip: (page - 1) * per_page,
    }
    const limitStage = {
        $limit: per_page,
    }

    const projects = await Project.aggregate([
        matchStage,
        {
            $lookup: {
                from: 'users',
                localField: 'user_id',
                foreignField: '_id',
                as: 'user',
                pipeline: [
                    {
                        $project: {
                            _id: 0,
                            name: 1,
                        },
                    },
                ],
            },
        },
        {
            $lookup: {
                from: 'stages',
                localField: 'stage_id',
                foreignField: '_id',
                as: 'stage',
                pipeline: [
                    {
                        $project: {
                            _id: 0,
                            name: 1,
                        },
                    },
                ],
            },
        },
        {
            $lookup: {
                from: 'articles',
                localField: '_id',
                foreignField: 'project_id',
                as: 'articles',
            },
        },
        {
            $lookup: {
                from: 'project_members',
                localField: '_id',
                foreignField: 'project_id',
                as: 'members',
            },
        },
        {
            $unwind: '$user',
        },
        {
            $unwind: '$stage',
        },
        {
            $addFields: {
                background: {
                    $cond: {
                        if: {$eq: [{$ifNull: ['$background', '']}, '']},
                        then: '$background',
                        else: {$concat: [LINK_STATIC_URL, '$background']},
                    },
                },
            },
        },
        sortStage,
        skipStage,
        limitStage,
        {
            $project: {
                user: 1,
                stage: 1,
                articles: 1,
                members: 1,
                background: 1,
                created_at: 1,
                name: 1,
                _id: 1,
            },
        },
    ])

    const filter = {
        name: {$regex: q, $options: 'i'},
        user_id: {$ne: user._id},
    }
    const total = await Project.countDocuments(filter)

    return {total, page, per_page, projects}
}

// ========== POST [Project - Apply to join project] ========== //
export async function applyToJoinProject(user, projectId, requestBody) {
    const {teamRole, role} = requestBody
    const project = await Project.findById(new ObjectId(projectId))
    const typeNotification = await Type.findOne({class: 'notification', name: 'project_application'})
    const notification = new NotificationFeed({
        source_id: user._id,
        user_id: project.user_id,
        type_id: typeNotification._id,
        additional_info: {
            project_id: project._id,
            team_role_id: teamRole,
            role_id: role,
        },
        metadata: {
            status: 'waiting',
            read: false,
        },
    })

    await notification.save()
}
