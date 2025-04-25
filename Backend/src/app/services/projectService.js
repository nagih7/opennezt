import {
    ACCESS_TYPE,
    LINK_STATIC_URL,
    NOTIFICATION_TYPE,
    PROJECT_ACCESS,
    PROJECT_APPLICATION_NOTIFICATION,
    WAITING_STATUS,
    PROJECT_INVITATION_NOTIFICATION,
    PROJECT_LOGO_PATH,
    PROJECT_BACKGROUND_PATH,
    PROJECT_ACTIVITY,
    PROJECT_ACTIVITY_BASIC,
    PROJECT_ACTIVITY_SECTOR,
    PROJECT_ACTIVITY_REVENUE,
    PROJECT_ACTIVITY_FUNDING,
    PROJECT_ACTIVITY_LOGO,
    PROJECT_ACTIVITY_BACKGROUND,
    PROJECT_ACTIVITY_ADDITIONAL,
    PROJECT_ACTIVITY_REQUIREMENT,
    PROJECT_ACTIVITY_NEW_MEMBER,
} from '@/configs'
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
    ActivityLog,
    ProjectRequirement,
    Subscription,
    Bookmark,
} from '@/models'
import { FileUpload } from '@/utils/classes'
import { userSockets } from '@/routes'
import webpush from 'web-push'

// ========== POST [Project] ========== //
export async function createProject(user, requestBody) {
    const { revenues, funding_sources, additional_infos, logo, background } = requestBody
    // Project
    if (logo instanceof FileUpload) {
        requestBody.logo = logo.save(PROJECT_LOGO_PATH)
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

    const roleType = await Type.findOne({ class: 'role', name: 'project_role' })
    const teamRoleType = await Type.findOne({ class: 'role', name: 'project_team_role' })
    const founderRole = await Role.findOne({ type_id: roleType._id, name: 'Founder' })
    const founderTeamRole = await Role.findOne({ type_id: teamRoleType._id, name: 'Founder' })

    const owner = new ProjectMember({
        project_id: project._id,
        user_id: user._id,
        role_id: founderRole._id,
        team_role_id: founderTeamRole._id,
    })
    await owner.save()

    return { project_id: project._id }
}

// ========== GET [My Projects] ========== //
export async function getListMyProjects(user, { q, page, per_page, field, order }) {
    page = parseInt(page)
    per_page = parseInt(per_page)
    q = q ? q : ''
    order = order === '-1' ? -1 : 1

    const matchStage = {
        $match: {
            $and: [{ user_id: user._id }, { name: { $regex: q, $options: 'i' } }],
        },
    }
    const lookupMemberStage = {
        $lookup: {
            from: 'project_members',
            localField: '_id',
            foreignField: 'project_id',
            as: 'members',
            pipeline: [
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
                                    avatar: {
                                        $cond: {
                                            if: { $eq: [{ $ifNull: ['$avatar', ''] }, ''] },
                                            then: '$avatar',
                                            else: { $concat: [LINK_STATIC_URL, '$avatar'] },
                                        },
                                    },
                                },
                            },
                        ],
                    },
                },
                { $unwind: '$user' },
                { $project: { _id: 0, user: 1 } },
            ],
        },
    }
    const lookupArticleStage = {
        $lookup: {
            from: 'articles',
            localField: '_id',
            foreignField: 'project_id',
            as: 'articles',
        },
    }
    const sortStage = {
        $sort: { [field]: order },
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
            name: 1,
            logo: {
                $cond: {
                    if: { $eq: [{ $ifNull: ['$logo', ''] }, ''] },
                    then: '$logo',
                    else: { $concat: [LINK_STATIC_URL, '$logo'] },
                },
            },
            background: {
                $cond: {
                    if: { $eq: [{ $ifNull: ['$background', ''] }, ''] },
                    then: '$background',
                    else: { $concat: [LINK_STATIC_URL, '$background'] },
                },
            },
            members: 1,
            articles: 1,
        },
    }

    const projects = await Project.aggregate([
        matchStage,
        lookupMemberStage,
        lookupArticleStage,
        sortStage,
        skipStage,
        limitStage,
        projectStage,
    ])

    const filter = { user_id: user._id, name: { $regex: q, $options: 'i' } }
    const total = await Project.countDocuments(filter)
    const last_page = Math.ceil(total / per_page)
    return { total, page, per_page, last_page, projects }
}

// ========== GET [Projects - Participated] ========== //
export async function getListProjectsParticipated(user, { q, page, per_page, field, order }) {
    page = parseInt(page)
    per_page = parseInt(per_page)
    q = q ? q : ''
    order = order === '-1' ? -1 : 1

    const participated = await ProjectMember.aggregate([
        { $match: { user_id: user._id } },
        {
            $lookup: {
                from: 'projects',
                localField: 'project_id',
                foreignField: '_id',
                as: 'project',
                pipeline: [
                    {
                        $match: {
                            user_id: { $ne: user._id },
                        },
                    },
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                        },
                    },
                ],
            },
        },
        { $unwind: '$project' },
        { $replaceRoot: { newRoot: '$project' } },
        { $match: { name: { $regex: q, $options: 'i' } } },
    ])

    const matchStage = {
        $match: {
            _id: { $in: participated.map((item) => item._id) },
        },
    }
    const lookupMemberStage = {
        $lookup: {
            from: 'project_members',
            localField: '_id',
            foreignField: 'project_id',
            as: 'members',
            pipeline: [
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
                                    avatar: {
                                        $cond: {
                                            if: { $eq: [{ $ifNull: ['$avatar', ''] }, ''] },
                                            then: '$avatar',
                                            else: { $concat: [LINK_STATIC_URL, '$avatar'] },
                                        },
                                    },
                                },
                            },
                        ],
                    },
                },
                { $unwind: '$user' },
                { $project: { _id: 0, user: 1 } },
            ],
        },
    }
    const lookupArticleStage = {
        $lookup: {
            from: 'articles',
            localField: '_id',
            foreignField: 'project_id',
            as: 'articles',
        },
    }
    const sortStage = {
        $sort: { [field]: order },
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
            name: 1,
            logo: {
                $cond: {
                    if: { $eq: [{ $ifNull: ['$logo', ''] }, ''] },
                    then: '$logo',
                    else: { $concat: [LINK_STATIC_URL, '$logo'] },
                },
            },
            background: {
                $cond: {
                    if: { $eq: [{ $ifNull: ['$background', ''] }, ''] },
                    then: '$background',
                    else: { $concat: [LINK_STATIC_URL, '$background'] },
                },
            },
            members: 1,
            articles: 1,
        },
    }

    const projects = await Project.aggregate([
        matchStage,
        lookupMemberStage,
        lookupArticleStage,
        sortStage,
        skipStage,
        limitStage,
        projectStage,
    ])

    const total = participated.length
    const last_page = Math.ceil(total / per_page)
    return { total, page, per_page, last_page, projects }
}

// ========== GET [My Project Details] ========== //
export async function getMyProjectDetails(user, projectId) {
    const matchStage = {
        $match: {
            _id: new ObjectId(projectId),
            user_id: user._id,
        },
    }
    const industriesStage = {
        $lookup: {
            from: 'industries',
            localField: 'industry_ids',
            foreignField: '_id',
            as: 'industries',
            pipeline: [{ $project: { created_at: 0, updated_at: 0 } }],
        },
    }
    const stagesStage = {
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
                        success_rate: 0,
                        avg_funding: 0,
                    },
                },
            ],
        },
    }
    const revenuesStage = {
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
                        project_id: 0,
                    },
                },
            ],
        },
    }
    const fundingSourcesStage = {
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
    }
    const additionalInfosStage = {
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
    }
    const requirementStage = {
        $lookup: {
            from: 'project_requirements',
            localField: '_id',
            foreignField: 'project_id',
            as: 'requirements',
            pipeline: [
                {
                    $lookup: {
                        from: 'skills',
                        localField: 'skill_ids',
                        foreignField: '_id',
                        as: 'skills',
                        pipeline: [{ $project: { _id: 1, name: 1 } }],
                    },
                },
                {
                    $project: {
                        _id: 0,
                        project_id: 0,
                        skill_ids: 0,
                        create_at: 0,
                        update_at: 0,
                    },
                },
            ],
        },
    }
    const unwindRequirementStage = {
        $unwind: {
            path: '$requirements',
            preserveNullAndEmptyArrays: true,
        },
    }
    const membersStage = {
        $lookup: {
            from: 'project_members',
            localField: '_id',
            foreignField: 'project_id',
            as: 'members',
            pipeline: [
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
                                    avatar: {
                                        $cond: {
                                            if: { $eq: [{ $ifNull: ['$avatar', ''] }, ''] },
                                            then: '$avatar',
                                            else: { $concat: [LINK_STATIC_URL, '$avatar'] },
                                        },
                                    },
                                },
                            },
                        ],
                    },
                },
                {
                    $lookup: {
                        from: 'roles',
                        localField: 'role_id',
                        foreignField: '_id',
                        as: 'role',
                        pipeline: [
                            {
                                $match: { type_id: { $ne: null } },
                            },
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
                        from: 'roles',
                        localField: 'team_role_id',
                        foreignField: '_id',
                        as: 'team_role',
                        pipeline: [
                            {
                                $match: { type_id: { $ne: null } },
                            },
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
                        from: 'friends',
                        localField: 'user_id',
                        foreignField: 'friend_id',
                        as: 'friend',
                        pipeline: [
                            {
                                $match: { user_id: user._id },
                            },
                        ],
                    },
                },
                { $unwind: '$user' },
                { $unwind: '$role' },
                { $unwind: '$team_role' },
                { $unwind: { path: '$friend', preserveNullAndEmptyArrays: true } },
                {
                    $addFields: {
                        role: '$role.name',
                        team_role: '$team_role.name',
                        friend: {
                            $cond: {
                                if: { $eq: [{ $ifNull: ['$friend', ''] }, ''] },
                                then: false,
                                else: true,
                            },
                        },
                    },
                },
                { $project: { _id: 0, user: 1, role: 1, team_role: 1, friend: 1 } },
            ],
        },
    }
    const articlesStage = {
        $lookup: {
            from: 'articles',
            localField: '_id',
            foreignField: 'project_id',
            as: 'articles',
        },
    }
    const addFieldsStage = {
        $addFields: {
            logo: {
                $cond: {
                    if: { $eq: [{ $ifNull: ['$logo', ''] }, ''] },
                    then: '$logo',
                    else: { $concat: [LINK_STATIC_URL, '$logo'] },
                },
            },
            background: {
                $cond: {
                    if: { $eq: [{ $ifNull: ['$background', ''] }, ''] },
                    then: '$background',
                    else: { $concat: [LINK_STATIC_URL, '$background'] },
                },
            },
            stage: { $arrayElemAt: ['$stage', 0] },
        },
    }
    const projectStage = {
        $project: {
            user_id: 0,
            updated_at: 0,
            industry_ids: 0,
            stage_id: 0,
        },
    }
    const project = await Project.aggregate([
        matchStage,
        industriesStage,
        stagesStage,
        revenuesStage,
        fundingSourcesStage,
        additionalInfosStage,
        requirementStage,
        unwindRequirementStage,
        membersStage,
        articlesStage,
        addFieldsStage,
        projectStage,
    ])

    return project[0]
}

// ========== GET [Project Details] ========== //
export async function getProjectDetails(user, projectId) {
    const typeNotification = await Type.findOne({ class: 'notification', name: 'project_application' })
    const project = await Project.aggregate([
        {
            $match: {
                _id: new ObjectId(projectId),
                user_id: { $ne: user._id },
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
                                    if: { $eq: [{ $ifNull: ['$avatar', ''] }, ''] },
                                    then: '$avatar',
                                    else: { $concat: [LINK_STATIC_URL, '$avatar'] },
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
                        if: { $eq: [{ $ifNull: ['$logo', ''] }, ''] },
                        then: '$logo',
                        else: { $concat: [LINK_STATIC_URL, '$logo'] },
                    },
                },
                background: {
                    $cond: {
                        if: { $eq: [{ $ifNull: ['$background', ''] }, ''] },
                        then: '$background',
                        else: { $concat: [LINK_STATIC_URL, '$background'] },
                    },
                },
                stage: { $arrayElemAt: ['$stage', 0] },
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

    if (project[0]?.applied) project[0].applied = true
    else project[0].applied = false

    return project[0]
}

// ========== PATCH [Project - Basic] ========== //
export async function updateBasic(user, { id }, requestBody) {
    await Project.updateOne(
        { user_id: user._id, _id: id },
        { name: requestBody.name, description: requestBody.description }
    )
    return requestBody
}

// ========== PATCH [Project - Sector] ========== //
export async function updateSector(user, { id }, requestBody) {
    await Project.updateOne(
        { user_id: user._id, _id: id },
        { industry_ids: requestBody.industries.map((item) => item._id), stage_id: requestBody.stage._id }
    )

    return {
        industries: requestBody.industries.map((item) => {
            return { _id: item._id, name: item.name, description: item.description }
        }),
        stage: { _id: requestBody.stage._id, name: requestBody.stage.name, description: requestBody.stage.description },
    }
}

// ========== PATCH [Project - Revenue] ========== //
export async function updateRevenue(user, { id }, requestBody) {
    const project = await Project.findOne({ user_id: user._id, _id: id })

    const { revenues } = requestBody
    await Revenue.deleteMany({ project_id: project._id }).exec()
    if (revenues?.length > 0) {
        const revenueBulk = revenues.map((revenue) => ({
            ...revenue,
            project_id: project._id,
        }))
        const newRevenues = await Revenue.insertMany(revenueBulk)
        return {
            revenues: newRevenues.map((item) => ({
                _id: item._id,
                amount: item.amount,
                currency: item.currency,
                date: item.date,
            })),
        }
    }
}

// ========== PATCH [Project - FundingSource] ========== //
export async function updateFundingSource(user, { id }, requestBody) {
    const project = await Project.findOne({ user_id: user._id, _id: id })

    const { funding_sources } = requestBody
    await FundingSource.deleteMany({ project_id: project._id }).exec()
    if (funding_sources?.length > 0) {
        const fundingSourceBulk = funding_sources.map((funding_source) => ({
            ...funding_source,
            project_id: project._id,
        }))
        const newFundingSources = await FundingSource.insertMany(fundingSourceBulk)
        return {
            funding_sources: newFundingSources.map((item) => ({
                _id: item._id,
                name: item.name,
                amount: item.amount,
                currency: item.currency,
            })),
        }
    }
}

// ========== PATCH [Project - AdditionalInfo] ========== //
export async function updateAdditionalInfo(user, { id }, requestBody) {
    const project = await Project.findOne({ user_id: user._id, _id: id })

    const { additional_infos } = requestBody
    await ProjectAdditionalInfo.deleteMany({ project_id: project._id }).exec()
    if (additional_infos?.length > 0) {
        const additionalInfoBulk = additional_infos.map((additional_info) => ({
            ...additional_info,
            project_id: project._id,
        }))
        await ProjectAdditionalInfo.insertMany(additionalInfoBulk)
        return {
            additional_infos: additional_infos.map((item) => ({
                _id: item._id,
                name: item.name,
                content: item.content,
                description: item.description,
            })),
        }
    }
}

// ========== PATCH [Project - Logo] ========== //
export async function updateLogo(user, { id }, requestBody) {
    const project = await Project.findOne({ user_id: user._id, _id: id })
    const { logo } = requestBody

    if (logo instanceof FileUpload) {
        if (project.logo) {
            FileUpload.remove(project.logo)
        }
        project.logo = logo.save(PROJECT_LOGO_PATH)
    }
    await project.save()
    return { logo: `${LINK_STATIC_URL}${project.logo}` }
}

// ========= PATCH [Project - Background] ========== //
export async function updateBackground(user, { id }, requestBody) {
    const project = await Project.findOne({ user_id: user._id, _id: id })
    const { background } = requestBody
    if (background instanceof FileUpload) {
        if (project.background) {
            FileUpload.remove(project.background)
        }
        project.background = background.save(PROJECT_BACKGROUND_PATH)
    }
    await project.save()
    return { background: `${LINK_STATIC_URL}${project.background}` }
}

// ========= POST [Project Requirement - Role ] ========== //
export async function updateRoleRequirement(user, { id }, requestBody) {
    const project = await Project.findOne({ user_id: user._id, _id: id })
    if (!project) {
        throw new Error('Project not found')
    }
    const { teamRoles, roles } = requestBody

    const projectRequirement = await ProjectRequirement.findOne({ project_id: project._id })
    if (!projectRequirement) {
        const requirement = new ProjectRequirement({
            project_id: project._id,
            team_role_ids: teamRoles,
            role_ids: roles,
        })
        await requirement.save()
    } else {
        await ProjectRequirement.updateOne({ project_id: project._id }, { team_role_ids: teamRoles, role_ids: roles })
    }
    return { teamRoles, roles }
}
// ========= PATCH [Project Requirement - Sector ] ========== //
export async function updateSectorRequirement(user, { id }, requestBody) {
    const project = await Project.findOne({ user_id: user._id, _id: id })
    if (!project) {
        throw new Error('Project not found')
    }
    const { industries, experienceLevels } = requestBody
    const projectRequirement = await ProjectRequirement.findOne({ project_id: project._id })
    if (!projectRequirement) {
        const requirement = new ProjectRequirement({
            project_id: project._id,
            industry_ids: industries,
            experience_level_ids: experienceLevels,
        })
        await requirement.save()
    } else {
        await ProjectRequirement.updateOne(
            { project_id: project._id },
            { industry_ids: industries, experience_level_ids: experienceLevels }
        )
    }
    return { industries, experienceLevels }
}
// ========= PATCH [Project Requirement - Skill] ========== //
export async function updateSkillRequirement(user, { id }, requestBody) {
    const project = await Project.findOne({ user_id: user._id, _id: id })
    if (!project) {
        throw new Error('Project not found')
    }
    const { skills } = requestBody
    const projectRequirement = await ProjectRequirement.findOne({ project_id: project._id })
    if (!projectRequirement) {
        const requirement = new ProjectRequirement({
            project_id: project._id,
            skill_ids: skills,
        })
        await requirement.save()
    } else {
        await ProjectRequirement.updateOne({ project_id: project._id }, { skill_ids: skills })
    }
    return { skills }
}

// ========== DELETE [Project] ========== //
export async function deleteProject(user, projectId) {
    const project = await Project.findOne({ user_id: user._id, _id: projectId })
    if (project.logo) {
        FileUpload.remove(project.logo)
    }
    if (project.background) {
        FileUpload.remove(project.background)
    }
    // Remove project from user sockets
    await Project.deleteOne({ user_id: user._id, _id: projectId })
    await Revenue.deleteMany({ project_id: projectId }).exec()
    await FundingSource.deleteMany({ project_id: projectId }).exec()
    await ProjectAdditionalInfo.deleteMany({ project_id: projectId }).exec()
    await ProjectMember.deleteMany({ project_id: projectId }).exec()
    await ProjectRequirement.deleteOne({ project_id: projectId }).exec()
}

// ========== GET [Project - TAGS] ========== //
export async function getProjectsToTag(user, requestQuery) {
    const key = requestQuery.keySearch || ''
    const projects = await Project.find({
        user_id: user._id,
        name: { $regex: key, $options: 'i' },
    })
        .select({ name: 1, _id: 1 })
        .limit(5)

    return projects
}

// ========== GET [Project - Seek] ========== //
export async function seekProjects(user, { q, page, per_page, field, order, industry, stage }) {
    q = q ? q : ''
    industry = industry ? industry : ''
    stage = stage ? stage : ''
    order = order === '-1' ? -1 : 1

    const matchStage = {
        $match: {
            $and: [
                { name: { $regex: q, $options: 'i' } },
                { user_id: { $ne: user._id } },
                { industry_ids: industry ? { $in: [new ObjectId(industry)] } : { $ne: null } },
                { stage_id: stage ? new ObjectId(stage) : { $ne: null } },
            ],
        },
    }
    const sortStage = {
        $sort: { [field]: order },
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
                pipeline: [
                    {
                        $project: {
                            _id: 0,
                            title: 1,
                            content: 1,
                            created_at: 1,
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
                pipeline: [
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
                                        avatar: {
                                            $cond: {
                                                if: { $eq: [{ $ifNull: ['$avatar', ''] }, ''] },
                                                then: '$avatar',
                                                else: { $concat: [LINK_STATIC_URL, '$avatar'] },
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                    },
                    { $unwind: '$user' },
                    { $project: { _id: 0, user: 1 } },
                ],
            },
        },
        {
            $unwind: '$user',
        },
        {
            $unwind: '$stage',
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
                background: {
                    $cond: {
                        if: { $eq: [{ $ifNull: ['$background', ''] }, ''] },
                        then: '$background',
                        else: { $concat: [LINK_STATIC_URL, '$background'] },
                    },
                },
                created_at: 1,
                name: 1,
                _id: 1,
            },
        },
    ])

    const filter = {
        name: { $regex: q, $options: 'i' },
        user_id: { $ne: user._id },
    }
    const total = await Project.countDocuments(filter)

    return { total, page, per_page, projects }
}

// ========== POST [Project - Apply to join project] ========== //
export async function applyToJoinProject(user, projectId, requestBody) {
    const { teamRole, role } = requestBody
    const project = await Project.findById(new ObjectId(projectId))
    const typeNotification = await Type.findOne({
        class: NOTIFICATION_TYPE,
        name: PROJECT_APPLICATION_NOTIFICATION,
    })
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

// ========== POST [Project Access] ========== //
export async function accessToProject(user, projectId) {
    const project = await Project.findById(new ObjectId(projectId))
    const accessType = await Type.findOne({ class: ACCESS_TYPE, name: PROJECT_ACCESS })
    const oldActivity = await ActivityLog.findOne({
        user_id: user._id,
        'data.project_id': project._id,
        type_id: accessType._id,
    })
    if (oldActivity) {
        // Update timestamp
        oldActivity.timestamp = new Date()
        await oldActivity.save()
    } else {
        // Create new activity
        const activity = new ActivityLog({
            user_id: user._id,
            type_id: accessType._id,
            data: { project_id: project._id, owner_id: project.user_id },
            metadata: {},
        })
        await activity.save()
    }
}

// ========== GET [My Project Access] ========== //
export async function getMyProjectAccess(user) {
    const accessType = await Type.findOne({ class: ACCESS_TYPE, name: PROJECT_ACCESS })
    const activities = await ActivityLog.aggregate([
        {
            $match: {
                user_id: user._id,
                type_id: accessType._id,
            },
        },
        {
            $lookup: {
                from: 'projects',
                localField: 'data.project_id',
                foreignField: '_id',
                as: 'project',
                pipeline: [
                    {
                        $addFields: {
                            logo: {
                                $cond: {
                                    if: { $eq: [{ $ifNull: ['$logo', ''] }, ''] },
                                    then: '$logo',
                                    else: { $concat: [LINK_STATIC_URL, '$logo'] },
                                },
                            },
                            background: {
                                $cond: {
                                    if: { $eq: [{ $ifNull: ['$background', ''] }, ''] },
                                    then: '$background',
                                    else: { $concat: [LINK_STATIC_URL, '$background'] },
                                },
                            },
                        },
                    },
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            logo: 1,
                            background: 1,
                            created_at: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: '$project',
        },
        // {
        //     $addFields: {
        //         timestamp: '$created_at',
        //     },
        // },
        {
            $limit: 10,
        },
        {
            $sort: { timestamp: -1 },
        },
        {
            $project: {
                timestamp: 1,
                project: 1,
            },
        },
    ])

    return activities
}

// ========== GET [Access to My Projects] ========== //
export async function getAccessToMyProjects(user) {
    const accessType = await Type.findOne({ class: ACCESS_TYPE, name: PROJECT_ACCESS })
    const activities = await ActivityLog.aggregate([
        {
            $match: {
                'data.owner_id': user._id,
                type_id: accessType._id,
            },
        },
        {
            $lookup: {
                from: 'projects',
                localField: 'data.project_id',
                foreignField: '_id',
                as: 'project',
                pipeline: [
                    {
                        $addFields: {
                            logo: {
                                $cond: {
                                    if: { $eq: [{ $ifNull: ['$logo', ''] }, ''] },
                                    then: '$logo',
                                    else: { $concat: [LINK_STATIC_URL, '$logo'] },
                                },
                            },
                            background: {
                                $cond: {
                                    if: { $eq: [{ $ifNull: ['$background', ''] }, ''] },
                                    then: '$background',
                                    else: { $concat: [LINK_STATIC_URL, '$background'] },
                                },
                            },
                        },
                    },
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            logo: 1,
                            background: 1,
                            created_at: 1,
                        },
                    },
                ],
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
                                    if: { $eq: [{ $ifNull: ['$avatar', ''] }, ''] },
                                    then: '$avatar',
                                    else: { $concat: [LINK_STATIC_URL, '$avatar'] },
                                },
                            },
                        },
                    },
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            avatar: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: '$project',
        },
        {
            $unwind: '$user',
        },
        {
            $limit: 10,
        },
        {
            $sort: { timestamp: -1 },
        },
        {
            $project: {
                timestamp: 1,
                project: 1,
                user: 1,
            },
        },
    ])

    return activities
}

// ========== POST [My Project - Search] ========== //
export async function searchMyProjects(user, { q }) {
    const projects = await Project.aggregate([
        {
            $match: {
                $and: [{ user_id: user._id }, { name: { $regex: q, $options: 'i' } }],
            },
        },
        {
            $project: {
                _id: 1,
                name: 1,
                logo: {
                    $cond: {
                        if: { $eq: [{ $ifNull: ['$logo', ''] }, ''] },
                        then: '$logo',
                        else: { $concat: [LINK_STATIC_URL, '$logo'] },
                    },
                },
            },
        },
    ])

    return projects
}

// ========= POST [My project - Invite member] ========== //
export async function inviteMember(user, projectId, requestBody, io) {
    const { userId, teamRole, role } = requestBody

    const project = await Project.findOne({
        user_id: user._id,
        _id: new ObjectId(projectId),
    })
    const typeNotification = await Type.findOne({
        class: NOTIFICATION_TYPE,
        name: PROJECT_INVITATION_NOTIFICATION,
    })

    const noti = new NotificationFeed({
        source_id: user._id,
        user_id: new ObjectId(userId),
        type_id: typeNotification._id,
        data: {
            project_id: project._id,
            team_role_id: new ObjectId(teamRole),
            role_id: new ObjectId(role),
        },
        metadata: {
            status: WAITING_STATUS,
            read: false,
        },
    })
    await noti.save()

    const notification = await NotificationFeed.aggregate([
        { $match: { _id: noti._id } },
        {
            $lookup: {
                from: 'users',
                localField: 'source_id',
                foreignField: '_id',
                as: 'user',
                pipeline: [
                    {
                        $project: {
                            _id: 0,
                            name: 1,
                            avatar: {
                                $cond: {
                                    if: { $eq: [{ $ifNull: ['$avatar', ''] }, ''] },
                                    then: '$avatar',
                                    else: { $concat: [LINK_STATIC_URL, '$avatar'] },
                                },
                            },
                        },
                    },
                ],
            },
        },
        { $unwind: '$user' },
        {
            $lookup: {
                from: 'types',
                localField: 'type_id',
                foreignField: '_id',
                as: 'type',
                pipeline: [{ $project: { _id: 0, class: 1, name: 1 } }],
            },
        },
        { $unwind: '$type' },
        {
            $lookup: {
                from: 'projects',
                localField: 'data.project_id',
                foreignField: '_id',
                as: 'data.project',
                pipeline: [
                    {
                        $project: {
                            _id: 0,
                            name: 1,
                            logo: {
                                $cond: {
                                    if: { $eq: [{ $ifNull: ['$logo', ''] }, ''] },
                                    then: '$logo',
                                    else: { $concat: [LINK_STATIC_URL, '$logo'] },
                                },
                            },
                        },
                    },
                ],
            },
        },
        { $unwind: '$data.project' },
        { $project: { _id: 1, user: 1, data: { project: 1 }, type: 1, timestamp: 1, metadata: 1 } },
    ])
    const userSocketId = Object.keys(userSockets).find((socketId) => userSockets[socketId] === userId.toString())
    if (userSocketId) {
        io.to(userSocketId).emit(PROJECT_INVITATION_NOTIFICATION, notification[0])
    }

    // ========== [WEBPUSH] ========== //
    const subscription = await Subscription.findOne({ user_id: userId })
    const payload = JSON.stringify({
        title: 'OpenNezt',
        body: `${user.name} invited you to join the ${project.name} project`,
        icon: user.avatar ? user.avatar : null,
        tag: typeNotification._id,
        data: {
            url: '',
            type: PROJECT_INVITATION_NOTIFICATION,
        },
    })
    webpush.sendNotification(subscription, payload).catch(async (err) => {
        if (err.statusCode === 410 || err.statusCode === 404) {
            await Subscription.deleteOne({ endpoint: subscription.endpoint })
        } else {
            console.error('Error sending notification:', err)
        }
    })
}

// ========== GET [My Projects - All Activities] ========== //
export async function getAllActivities(user, projectId) {
    const project = await Project.findOne(new ObjectId(projectId))
    const activityTypes = [
        { name: PROJECT_ACTIVITY_BASIC, key: 'basic' },
        { name: PROJECT_ACTIVITY_SECTOR, key: 'sector' },
        { name: PROJECT_ACTIVITY_REVENUE, key: 'revenue' },
        { name: PROJECT_ACTIVITY_FUNDING, key: 'funding' },
        { name: PROJECT_ACTIVITY_ADDITIONAL, key: 'additional' },
        { name: PROJECT_ACTIVITY_LOGO, key: 'logo' },
        { name: PROJECT_ACTIVITY_BACKGROUND, key: 'background' },
        { name: PROJECT_ACTIVITY_REQUIREMENT, key: 'requirement' },
        { name: PROJECT_ACTIVITY_NEW_MEMBER, key: 'new_member' },
    ]

    const activities = {}

    for (const activityType of activityTypes) {
        const typeNotification = await Type.findOne({ class: PROJECT_ACTIVITY, name: activityType.name })
        const activityLogs = await ActivityLog.aggregate([
            {
                $match: {
                    type_id: typeNotification._id,
                    'data.project_id': project._id,
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
                            $project: {
                                _id: 0,
                                name: 1,
                                avatar: {
                                    $cond: {
                                        if: { $eq: [{ $ifNull: ['$avatar', ''] }, ''] },
                                        then: '$avatar',
                                        else: { $concat: [LINK_STATIC_URL, '$avatar'] },
                                    },
                                },
                            },
                        },
                    ],
                },
            },
            { $unwind: '$user' },
            {
                $lookup: {
                    from: 'types',
                    localField: 'type_id',
                    foreignField: '_id',
                    as: 'type',
                    pipeline: [{ $project: { _id: 0, class: 1, name: 1 } }],
                },
            },
            { $unwind: '$type' },
            {
                $lookup: {
                    from: 'projects',
                    localField: 'data.project_id',
                    foreignField: '_id',
                    as: 'data.project',
                    pipeline: [
                        {
                            $project: {
                                _id: 0,
                                name: 1,
                                logo: {
                                    $cond: {
                                        if: { $eq: [{ $ifNull: ['$logo', ''] }, ''] },
                                        then: '$logo',
                                        else: { $concat: [LINK_STATIC_URL, '$logo'] },
                                    },
                                },
                            },
                        },
                    ],
                },
            },
            { $unwind: '$data.project' },
            {
                $lookup: {
                    from: 'users',
                    localField: 'data.user_joined_id',
                    foreignField: '_id',
                    as: 'data.new_member',
                    pipeline: [
                        {
                            $project: {
                                _id: 0,
                                name: 1,
                                avatar: {
                                    $cond: {
                                        if: { $eq: [{ $ifNull: ['$avatar', ''] }, ''] },
                                        then: '$avatar',
                                        else: { $concat: [LINK_STATIC_URL, '$avatar'] },
                                    },
                                },
                            },
                        },
                    ],
                },
            },
            {
                $project: {
                    _id: 1,
                    user: 1,
                    type: 1,
                    data: {
                        project: 1,
                        new_member: { $arrayElemAt: ['$data.new_member', 0] },
                    },
                    members: 1,
                    timestamp: 1,
                    metadata: 1,
                },
            },
            { $sort: { timestamp: -1 } },
            { $limit: 10 },
        ])

        activities[activityType.key] = activityLogs
    }

    return activities
}
// ========== POST [Project - Activity Basic] ========== //
export async function updateBasicActivity(user, projectId) {
    const project = await Project.findOne(new ObjectId(projectId))
    const typeNotification = await Type.findOne({ class: PROJECT_ACTIVITY, name: PROJECT_ACTIVITY_BASIC })
    const oldActivity = await ActivityLog.findOne({
        user_id: user._id,
        'data.project_id': project._id,
        type_id: typeNotification._id,
    })
    if (oldActivity) {
        // Update timestamp
        oldActivity.timestamp = new Date()
        await oldActivity.save()
    } else {
        // Create new activity
        const activity = new ActivityLog({
            user_id: user._id,
            type_id: typeNotification._id,
            data: { project_id: project._id },
            metadata: {},
        })
        await activity.save()
    }
}
// ========== POST [Project - Activity Sector] ========== //
export async function updateSectorActivity(user, projectId) {
    const project = await Project.findOne(new ObjectId(projectId))
    const typeNotification = await Type.findOne({ class: PROJECT_ACTIVITY, name: PROJECT_ACTIVITY_SECTOR })
    const oldActivity = await ActivityLog.findOne({
        user_id: user._id,
        'data.project_id': project._id,
        type_id: typeNotification._id,
    })
    if (oldActivity) {
        // Update timestamp
        oldActivity.timestamp = new Date()
        await oldActivity.save()
    } else {
        // Create new activity
        const activity = new ActivityLog({
            user_id: user._id,
            type_id: typeNotification._id,
            data: { project_id: project._id },
            metadata: {},
        })
        await activity.save()
    }
}
// ========== POST [Project - Activity Revenue] ========== //
export async function updateRevenueActivity(user, projectId) {
    const project = await Project.findOne(new ObjectId(projectId))
    const typeNotification = await Type.findOne({ class: PROJECT_ACTIVITY, name: PROJECT_ACTIVITY_REVENUE })
    const oldActivity = await ActivityLog.findOne({
        user_id: user._id,
        'data.project_id': project._id,
        type_id: typeNotification._id,
    })
    if (oldActivity) {
        // Update timestamp
        oldActivity.timestamp = new Date()
        await oldActivity.save()
    } else {
        // Create new activity
        const activity = new ActivityLog({
            user_id: user._id,
            type_id: typeNotification._id,
            data: { project_id: project._id },
            metadata: {},
        })
        await activity.save()
    }
}
// ========== POST [Project - Activity FundingSource] ========== //
export async function updateFundingSourceActivity(user, projectId) {
    const project = await Project.findOne(new ObjectId(projectId))
    const typeNotification = await Type.findOne({ class: PROJECT_ACTIVITY, name: PROJECT_ACTIVITY_FUNDING })
    const oldActivity = await ActivityLog.findOne({
        user_id: user._id,
        'data.project_id': project._id,
        type_id: typeNotification._id,
    })
    if (oldActivity) {
        // Update timestamp
        oldActivity.timestamp = new Date()
        await oldActivity.save()
    } else {
        // Create new activity
        const activity = new ActivityLog({
            user_id: user._id,
            type_id: typeNotification._id,
            data: { project_id: project._id },
            metadata: {},
        })
        await activity.save()
    }
}
// ========== POST [Project - Activity AdditionalInfo] ========== //
export async function updateAdditionalInfoActivity(user, projectId) {
    const project = await Project.findOne(new ObjectId(projectId))
    const typeNotification = await Type.findOne({ class: PROJECT_ACTIVITY, name: PROJECT_ACTIVITY_ADDITIONAL })
    const oldActivity = await ActivityLog.findOne({
        user_id: user._id,
        'data.project_id': project._id,
        type_id: typeNotification._id,
    })
    if (oldActivity) {
        // Update timestamp
        oldActivity.timestamp = new Date()
        await oldActivity.save()
    } else {
        // Create new activity
        const activity = new ActivityLog({
            user_id: user._id,
            type_id: typeNotification._id,
            data: { project_id: project._id },
            metadata: {},
        })
        await activity.save()
    }
}
// ========== POST [Project - Activity Logo] ========== //
export async function updateLogoActivity(user, projectId) {
    const project = await Project.findOne(new ObjectId(projectId))
    const typeNotification = await Type.findOne({ class: PROJECT_ACTIVITY, name: PROJECT_ACTIVITY_LOGO })
    const oldActivity = await ActivityLog.findOne({
        user_id: user._id,
        'data.project_id': project._id,
        type_id: typeNotification._id,
    })
    if (oldActivity) {
        // Update timestamp
        oldActivity.timestamp = new Date()
        await oldActivity.save()
    } else {
        // Create new activity
        const activity = new ActivityLog({
            user_id: user._id,
            type_id: typeNotification._id,
            data: { project_id: project._id },
            metadata: {},
        })
        await activity.save()
    }
}
// ========== POST [Project - Activity Background] ========== //
export async function updateBackgroundActivity(user, projectId) {
    const project = await Project.findOne(new ObjectId(projectId))
    const typeNotification = await Type.findOne({ class: PROJECT_ACTIVITY, name: PROJECT_ACTIVITY_BACKGROUND })
    const oldActivity = await ActivityLog.findOne({
        user_id: user._id,
        'data.project_id': project._id,
        type_id: typeNotification._id,
    })
    if (oldActivity) {
        // Update timestamp
        oldActivity.timestamp = new Date()
        await oldActivity.save()
    } else {
        // Create new activity
        const activity = new ActivityLog({
            user_id: user._id,
            type_id: typeNotification._id,
            data: { project_id: project._id },
            metadata: {},
        })
        await activity.save()
    }
}
// ========== POST [Project - Activity ProjectRequirement] ========== //
export async function updateProjectRequirementActivity(user, projectId) {
    const project = await Project.findOne(new ObjectId(projectId))
    const typeNotification = await Type.findOne({ class: PROJECT_ACTIVITY, name: PROJECT_ACTIVITY_REQUIREMENT })
    const oldActivity = await ActivityLog.findOne({
        user_id: user._id,
        'data.project_id': project._id,
        type_id: typeNotification._id,
    })
    if (oldActivity) {
        // Update timestamp
        oldActivity.timestamp = new Date()
        await oldActivity.save()
    } else {
        // Create new activity
        const activity = new ActivityLog({
            user_id: user._id,
            type_id: typeNotification._id,
            data: { project_id: project._id },
            metadata: {},
        })
        await activity.save()
    }
}
// ========== POST [Project - Activity New member] ========== //
export async function updateNewMemberActivity(user, { invitationId }) {
    const invitation = await NotificationFeed.findOne({
        _id: new ObjectId(invitationId),
    })

    if (!invitation) {
        throw new Error('Không tìm thấy lời mời')
    }

    const projectId = invitation.data?.project_id

    if (!projectId) {
        throw new Error('Không tìm thấy thông tin dự án trong lời mời')
    }

    const project = await Project.findOne({ _id: projectId })
    if (!project) {
        throw new Error('Không tìm thấy dự án')
    }

    if (invitation.metadata?.status === 'confirm') {
        const typeNotification = await Type.findOne({
            class: PROJECT_ACTIVITY,
            name: PROJECT_ACTIVITY_NEW_MEMBER,
        })

        // Lấy thông tin người đã chấp nhận lời mời
        const memberId = invitation.user_id
        const teamRoleId = invitation.data.team_role_id
        const roleId = invitation.data.role_id

        // Tạo activity mới
        const activity = new ActivityLog({
            user_id: memberId,
            type_id: typeNotification._id,
            data: {
                project_id: projectId,
                invitation_id: invitationId,
                team_role_id: teamRoleId,
                role_id: roleId,
            },
            metadata: {},
        })
        await activity.save()
        return activity
    } else {
        throw new Error(
            `Lời mời chưa được xác nhận. Trạng thái hiện tại: ${invitation.metadata?.status || 'không có trạng thái'}`
        )
    }
}

export const bookmarkProject = async (requestBody, user) => {
    const { project_id, marked } = requestBody
    const user_id = user._id.toString()

    const existingBookmark = await Bookmark.findOne({
        target_id: project_id,
        target_type: 'project',
        user_id: user_id,
    })

    if (existingBookmark) {
        existingBookmark.marked = marked
        await existingBookmark.save()
        return existingBookmark
    } else {
        const newBookmark = new Bookmark({
            user_id: user_id,
            target_id: project_id,
            target_type: 'project',
            marked: marked,
        })
        await newBookmark.save()
        return newBookmark
    }
}

export const getUserBookmarksStatus = async (user, target_ids) => {
    const user_id = user._id
    const projectIdsArray = target_ids.split(',').map((id) => new Object(id))

    const bookMarks = await Bookmark.find({
        user_id: user_id,
        target_id: { $in: projectIdsArray },
        target_type: 'project',
    })

    return bookMarks
}



export const getUserProjectBookmarks = async (user, requestQuery) => {

    const { limit = 6, page = 1 } = requestQuery
    const user_id = user._id

    const bookmarkLimit = parseInt(limit)

    const pageNumber = parseInt(page)

    const skip = (pageNumber - 1) * bookmarkLimit


    try {
        const bookmarks = await Bookmark.aggregate([
            {
                $match: {
                    user_id: user_id,
                    target_type: 'project',
                    marked: 'yes',
                },
            },
            {
                $lookup: {
                    from: 'projects',
                    localField: 'target_id',
                    foreignField: '_id',
                    as: 'projectInfo',
                    pipeline: [

                        {
                            $lookup: {
                                from: 'users',
                                localField: 'user_id',
                                foreignField: '_id',
                                as: 'user',
                                pipeline: [
                                    { $project: { _id: 1, name: 1, avatar: 1 } }
                                ]
                            }
                        },
                        {
                            $unwind: { path: '$user', preserveNullAndEmptyArrays: true }
                        },

                        {
                            $lookup: {
                                from: 'stages',
                                localField: 'stage_id',
                                foreignField: '_id',
                                as: 'stage',
                                pipeline: [
                                    { $project: { _id: 1, name: 1 } }
                                ]
                            }
                        },
                        {
                            $unwind: { path: '$stage', preserveNullAndEmptyArrays: true }
                        },

                        {
                            $lookup: {
                                from: 'articles',
                                localField: '_id',
                                foreignField: 'project_id',
                                as: 'articles'
                            }
                        },
                        {
                            $lookup: {
                                from: 'project_members',
                                localField: '_id',
                                foreignField: 'project_id',
                                as: 'members'
                            }
                        },
                        {
                            $project: {
                                _id: 1,
                                name: 1,
                                user: 1,
                                stage: 1,
                                articles: { $size: '$articles' },
                                members: { $size: '$members' },
                                logo: {
                                    $cond: {
                                        if: { $eq: [{ $ifNull: ['$logo', ''] }, ''] },
                                        then: '$logo',
                                        else: { $concat: [LINK_STATIC_URL, '$logo'] },
                                    },
                                },
                                background: {
                                    $cond: {
                                        if: { $eq: [{ $ifNull: ['$background', ''] }, ''] },
                                        then: '$background',
                                        else: { $concat: [LINK_STATIC_URL, '$background'] },
                                    },
                                },

                            },
                        },
                    ],
                },
            },
            {

                $unwind: {
                    path: '$projectInfo',
                    preserveNullAndEmptyArrays: false
                }
            },

            { $sort: { updated_at: -1 } },
            { $skip: skip },
            { $limit: bookmarkLimit },
            {

                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: [
                            '$projectInfo',
                            { bookmark_id: '$_id', marked: '$marked', bookmarked_at: '$updated_at' }
                        ]
                    }
                }
            }

        ])


        console.log('User Project Bookmarks Result:', JSON.stringify(bookmarks, null, 2))
        return bookmarks

    } catch (error) {

        console.error('Error fetching user project bookmarks:', error)

        throw error
    }
}

