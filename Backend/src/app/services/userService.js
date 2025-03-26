import {
    User,
    Profile,
    Project,
    ObjectId,
    NotificationFeed,
    Conversation,
    Industry,
    ExperienceLevel,
    Skill,
    Category,
    Stage,
    Type,
    Role,
} from '@/models'
import {FileUpload} from '@/utils/classes'
import {LINK_STATIC_URL} from '@/configs'

export async function create(requestBody) {
    const user = new User(requestBody)
    await user.save()
    return user
}

export async function filter({q, page, per_page, field, order}) {
    q = q ? q : ''
    order = order === '-1' ? -1 : 1
    const matchStage = {
        $match: {
            $or: [{name: {$regex: q, $options: 'i'}}, {email: {$regex: q, $options: 'i'}}],
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

    const addSetStage = {
        $set: {
            avatar: {
                $cond: {
                    if: {$eq: [{$ifNull: ['$avatar', '']}, '']},
                    then: '$avatar',
                    else: {$concat: [LINK_STATIC_URL, '$avatar']},
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
    const users = await User.aggregate([matchStage, sortStage, skipStage, limitStage, addSetStage])

    const filter = {
        ...(q && {$or: [{name: q}, {email: q}, {phone: q}]}),
    }

    const total = await User.countDocuments(filter)
    return {total, page, per_page, users}
}

export async function details(userId) {
    const user = await User.findById(userId)
    user.avatar = user.avatar && LINK_STATIC_URL + user.avatar
    return user
}

export async function update(user, requestBody) {
    user.set(requestBody)
    await user.save()
}

export async function resetPassword(user, newPassword) {
    user.password = newPassword
    await user.save()
}

export async function remove(user) {
    if (user.avatar) {
        FileUpload.remove(user.avatar)
    }
    await User.deleteOne({_id: user._id})
}

export async function createProject(user, {pitch_deck, background, ...requestBody}) {
    if (pitch_deck instanceof FileUpload) {
        requestBody.pitch_deck = pitch_deck.save('pitch_decks')
    }
    if (background instanceof FileUpload) {
        requestBody.background = background.save('background_projects')
    }

    const project = new Project(requestBody)
    project.user_id = user._id

    await project.save()
}

export async function getProjects(userId) {
    const projects = await Project.aggregate([
        {
            $match: {user_id: userId},
        },
        {
            $set: {
                background: {
                    $cond: {
                        if: {$eq: [{$ifNull: ['$background', '']}, '']},
                        then: '$background',
                        else: {$concat: [LINK_STATIC_URL, '$background']},
                    },
                },
            },
        },
        {
            $sort: {created_at: -1},
        },
        {
            $project: {
                _id: 1,
                name: 1,
                related_industries: 1,
                stage: 1,
                background: 1,
            },
        },
    ])
    return projects
}

export async function getProject(projectId) {
    const projectDetails = await Project.aggregate([
        {
            $match: {_id: new ObjectId(projectId)},
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user_id',
                foreignField: '_id',
                as: 'owner',
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            // email: 1,
                            avatar: 1,
                        },
                    },
                    {
                        $limit: 1,
                    },
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
                ],
            },
        },
        {
            $unwind: '$owner',
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
                pitch_deck: {
                    $cond: {
                        if: {$eq: [{$ifNull: ['$pitch_deck', '']}, '']},
                        then: '$pitch_deck',
                        else: {$concat: [LINK_STATIC_URL, '$pitch_deck']},
                    },
                },
                'metadata.members': {
                    $map: {
                        input: '$metadata.members',
                        as: 'member',
                        in: {
                            $mergeObjects: [
                                '$$member',
                                {
                                    avatar: {
                                        $cond: {
                                            if: {$eq: [{$ifNull: ['$$member.avatar', '']}, '']},
                                            then: '$$member.avatar',
                                            else: {$concat: [LINK_STATIC_URL, '$$member.avatar']},
                                        },
                                    },
                                },
                            ],
                        },
                    },
                },
            },
        },
        {
            $project: {
                project_requests: 0,
            },
        },
        {
            $limit: 1,
        },
    ])

    return projectDetails[0]
}

export async function updateProject(user, requestBody) {
    if (requestBody.background) {
        // xoá LINK_STATIC_URL nếu tồn tại
        if (requestBody.background.includes(LINK_STATIC_URL)) {
            requestBody.background = requestBody.background.replace(LINK_STATIC_URL, '')
        }
    }
    if (requestBody.pitch_deck) {
        // xoá LINK_STATIC_URL nếu tồn tại
        if (requestBody.pitch_deck.includes(LINK_STATIC_URL)) {
            requestBody.pitch_deck = requestBody.pitch_deck.replace(LINK_STATIC_URL, '')
        }
    }
    const project = await Project.findOne({user_id: user._id, _id: requestBody._id})
    project.set(requestBody)
    await project.save()
}

export async function deleteProject(user, requestBody) {
    await Project.deleteOne({user_id: user._id, _id: requestBody.projectId})
    await Conversation.deleteOne({'metadata.data.project_id': requestBody.projectId})
}

export async function recuitTalents(user, {keyword, ...requestRecuitTalents}) {
    const query = {}
    const per_page = 12

    if (requestRecuitTalents.sector) {
        query.industry = {
            $regex: requestRecuitTalents.sector,
            $options: 'i',
        }
    }
    if (requestRecuitTalents.experience_level) {
        query.experience_level = {
            $regex: requestRecuitTalents.experience_level,
            $options: 'i',
        }
    }
    if (requestRecuitTalents.education_level) {
        query.degree = {
            $regex: requestRecuitTalents.education_level,
            $options: 'i',
        }
    }
    if (requestRecuitTalents.commitment) {
        query.availability = {
            $regex: requestRecuitTalents.commitment,
            $options: 'i',
        }
    }

    const talents = await Profile.aggregate([
        {
            $match: query,
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user_id',
                foreignField: '_id',
                as: 'user_data',
                pipeline: [
                    {
                        $match: {
                            name: {$regex: keyword, $options: 'i'},
                        },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: '$user_data',
                preserveNullAndEmptyArrays: false, // Nếu không muốn giữ lại các bản ghi không có user_data
            },
        },

        {
            $match: {
                ...(requestRecuitTalents.location
                    ? {
                        'user_data.region': {
                            $regex: requestRecuitTalents.location,
                            $options: 'i',
                        },
                    }
                    : {}),
                ...(requestRecuitTalents.language
                    ? {
                        'user_data.language': {
                            $regex: requestRecuitTalents.language,
                            $options: 'i',
                        },
                    }
                    : {}),
                'user_data.is_active': true,
                'user_data._id': {$ne: user._id},
            },
        },
        {
            $addFields: {
                'user_data.avatar': {
                    $cond: {
                        if: {$eq: [{$ifNull: ['$user_data.avatar', '']}, '']},
                        then: '$user_data.avatar',
                        else: {$concat: [LINK_STATIC_URL, '$user_data.avatar']},
                    },
                },
                'user_data.background': {
                    $cond: {
                        if: {$eq: [{$ifNull: ['$user_data.background', '']}, '']},
                        then: '$user_data.background',
                        else: {$concat: [LINK_STATIC_URL, '$user_data.background']},
                    },
                },
            },
        },
        {
            $skip: requestRecuitTalents.page * per_page,
        },
        {
            $limit: per_page,
        },
        {
            $project: {
                _id: 0,
                industry: 1,
                experience_level: 1,
                user_data: {
                    _id: 1,
                    avatar: 1,
                    name: 1,
                    region: 1,
                    city: 1,
                    language: 1,
                },
            },
        },
    ])
    const getFriendRequest = async (talents) => {
        const friendRequests = await NotificationFeed.find({
            type: 'friend_request',
            $or: [
                {user_id: user._id, source_id: {$in: talents.map((talent) => talent.user_data._id)}},
                {user_id: {$in: talents.map((talent) => talent.user_data._id)}, source_id: user._id},
            ],
        }).select('source_id user_id type metadata.status')

        return friendRequests
    }
    const friendRequests = await getFriendRequest(talents)
    talents.forEach((talent) => {
        const friendRequest = friendRequests.find(
            (request) =>
                request.source_id.equals(talent.user_data._id) || request.user_id.equals(talent.user_data._id)
        )
        talent.friend_request = friendRequest ? friendRequest : null
    })

    return {total: talents.length, page: requestRecuitTalents.page + 1, per_page, talents}
}

export async function getTalentDetails(user, _id) {
    // const type = await Type.findOne({name: 'Friend Request'})
    const detailTalent = await User.aggregate([
        {
            $match: {_id: _id},
        },
        {
            $lookup: {
                from: 'founder_profiles',
                localField: '_id',
                foreignField: 'user_id',
                as: 'talent_profile',
            },
        },
        {
            $unwind: {
                path: '$talent_profile',
                preserveNullAndEmptyArrays: true, // Nếu không muốn giữ lại các bản ghi không có founder_profiles
            },
        },
        {
            $lookup: {
                from: 'notifications_feed',
                as: 'friend_request',
                pipeline: [
                    {
                        $match: {
                            type: 'friend_request',
                            $and: [
                                {$or: [{user_id: user._id}, {user_id: _id}]},
                                {$or: [{source_id: user._id}, {source_id: _id}]},
                            ],
                        },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: '$friend_request',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $addFields: {
                avatar: {
                    $cond: {
                        if: {$eq: [{$ifNull: ['$avatar', '']}, '']},
                        then: '$avatar',
                        else: {$concat: [LINK_STATIC_URL, '$avatar']},
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
        },
        {
            $project: {
                password: 0,
                role: 0,
                is_active: 0,
                created_at: 0,
                updated_at: 0,
                talent_profile: {
                    _id: 0,
                    user_id: 0,
                    created_at: 0,
                    updated_at: 0,
                },
            },
        },
    ])

    return detailTalent[0]
}

export async function updateBackground(user, requestBody) {
    if (requestBody.background instanceof FileUpload) {
        if (user.background) {
            FileUpload.remove(user.background)
        }
        user.background = requestBody.background.save('background_users')
    }
    await user.save()
}

export async function updateAvatar(user, requestBody) {
    if (requestBody.avatar instanceof FileUpload) {
        if (user.avatar) {
            FileUpload.remove(user.avatar)
        }
        user.avatar = requestBody.avatar.save('avatars')
    }
    await user.save()
}

// Industry framework
export async function getIndustries() {
    const industries = await Industry.find().select('name _id description')
    return industries
}

// Experience level framework
export async function getExperienceLevels() {
    const experienceLevels = await ExperienceLevel.find().select('name _id description')
    return experienceLevels
}

// Category framework
export async function getCategories() {
    const categories = await Category.find({
        parent_id: null,
    }).select('name _id description')
    return categories
}

// Subcategory framework
export async function getSubCategories(categoryIds) {
    // Handle comma-separated string of IDs
    const idArray = Array.isArray(categoryIds) 
        ? categoryIds 
        : categoryIds.split(',').map(id => id.trim())
    
    const subCategories = await Category.find({
        parent_id: { $in: idArray }
    }).select('name _id description parent_id')
    
    return subCategories
}


// Skills framework
export async function getSkills(categoryIds) {
    // Handle comma-separated string of IDs
    const idArray = Array.isArray(categoryIds) 
        ? categoryIds 
        : categoryIds.split(',').map(id => id.trim())
    
    const skills = await Skill.find({
        category_id: { $in: idArray }
    }).select('name _id description category_id')
    
    return skills
}

// Stage framework
export async function getStages() {
    const stages = await Stage.find().select('name _id description')
    return stages
}

// Project role framework
export async function getProjectRoles() {
    const roleType = await Type.findOne({class: 'role', name: 'project_role'})
    const teamRoleType = await Type.findOne({class: 'role', name: 'project_team_role'})
    const projectRoles = await Role.find({type_id: roleType._id}).select('name _id description')
    const projectTeamRoles = await Role.find({type_id: teamRoleType._id}).select('name _id description')
    return {roles: projectRoles, teamRoles: projectTeamRoles}
}
