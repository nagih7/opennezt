import {User, FounderProfile, Project, Invitation} from '@/models'
import {FileUpload} from '@/utils/classes'
import {LINK_STATIC_URL} from '@/configs'

export async function create(requestBody) {
    const user = new User(requestBody)
    await user.save()
    return user
}

export async function filter({q, page, per_page, field, sort_order}) {
    q = q ? {$regex: q, $options: 'i'} : null

    const filter = {
        ...(q && {$or: [{name: q}, {email: q}, {phone: q}]}),
    }

    const users = await User.find(filter)
        .skip((page - 1) * per_page)
        .limit(per_page)
        .sort({[field]: sort_order})

    users.forEach(function (user) {
        user.avatar = user.avatar && LINK_STATIC_URL + user.avatar
    })

    const total = await User.countDocuments(filter)
    return {total, page, per_page, users}
}

export async function details(userId) {
    const user = await User.findById(userId)
    user.avatar = user.avatar && LINK_STATIC_URL + user.avatar
    return user
}

export async function update(user, {name, email, phone, avatar, linkedIn, region, city, language}) {
    user.name = name ? name : user.name
    user.email = email ? email : user.email
    user.phone = phone ? phone : user.phone
    user.avatar = avatar ? avatar : user.avatar
    user.linkedIn = linkedIn ? linkedIn : user.linkedIn
    user.region = region ? region : user.region
    user.city = city ? city : user.city
    user.language = language ? language : user.language
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

export async function createFounderProfile(user, requestBody) {
    requestBody.user_id = user._id
    const founder = new FounderProfile(requestBody)
    await founder.save()
}

export async function getFounderProfile(userId) {
    const founder = await FounderProfile.findOne({user_id: userId})
    return founder
}

export async function updateFounderProfile(user, requestBody) {
    const founder = await FounderProfile.findOne({user_id: user._id})
    founder.set(requestBody)
    await founder.save()
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

export async function getProject(userId) {
    const projects = await Project.find({user_id: userId})
    return projects
}

export async function updateProject(user, requestBody) {
    const project = await Project.findOne({user_id: user._id, _id: requestBody._id})
    project.set(requestBody)
    await project.save()
}

export async function deleteProject(user, requestBody) {
    await Project.deleteOne({user_id: user._id, _id: requestBody._id})
}

export async function recuitTalents(requestRecuitTalents) {
    const query = {}
    // Thêm điều kiện cho query
    if (requestRecuitTalents.expertise_area) {
        query.industry = {
            $regex: requestRecuitTalents.expertise_area,
            $options: 'i',
        }
    }

    if (requestRecuitTalents.experience_level) {
        query.experience_level = {
            $regex: requestRecuitTalents.experience_level,
            $options: 'i',
        }
    }

    const talents = await FounderProfile.aggregate([
        {
            $match: query,
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user_id',
                foreignField: '_id',
                as: 'user_data',
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
                        'user_data.city': {
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
            },
        },
        {
            $addFields: {
                'user_data.avatar': {
                    $cond: {
                        if: {$ifNull: ['$user_data.avatar', false]}, // Kiểm tra nếu avatar tồn tại
                        then: {$concat: [LINK_STATIC_URL, '$user_data.avatar']}, // Nối LINK_STATIC_URL với avatar
                        else: '$user_data.avatar', // Nếu không có avatar, giữ nguyên
                    },
                },
            },
        },
        {
            $skip: (requestRecuitTalents.page - 1) * 10,
        },
        {
            $limit: 10,
        },
        {
            $project: {
                _id: 0,
                experience_level: 1,
                industry: 1,
                user_data: {
                    name: 1,
                    email: 1,
                    avatar: 1,
                    linkedIn: 1,
                    region: 1,
                },
            },
        },
    ])
    return talents
}

export async function getTalentDetails(email) {
    const detailTalent = await User.aggregate([
        {$match: {email}},
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
                preserveNullAndEmptyArrays: false, // Nếu không muốn giữ lại các bản ghi không có founder_profiles
            },
        },
        {
            $addFields: {
                avatar: {
                    $cond: {
                        if: {$ifNull: ['$avatar', false]}, // Kiểm tra nếu avatar tồn tại
                        then: {$concat: [LINK_STATIC_URL, '$avatar']}, // Nối LINK_STATIC_URL với avatar
                        else: '$avatar', // Nếu không có avatar, giữ nguyên
                    },
                },
                background: {
                    $cond: {
                        if: {$ifNull: ['$background', false]}, // Kiểm tra nếu background tồn tại
                        then: {$concat: [LINK_STATIC_URL, '$background']}, // Nối LINK_STATIC_URL với background
                        else: '$background', // Nếu không có background, giữ nguyên
                    },
                },
            },
        },
        {
            $project: {
                _id: 0,
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

export async function checkSteps(user) {
    const founderProfile = await FounderProfile.findOne(
        {user_id: user._id},
        {user_id: 0, created_at: 0, updated_at: 0}
    )
    const project = await Project.findOne({user_id: user._id}, {user_id: 0, created_at: 0, updated_at: 0})

    return {
        founderProfile: founderProfile ? founderProfile : false,
        project: project ? project : false,
    }
}

export async function inviteMember(user, {email, project_id, role_project}) {
    const receiver_user = await User.findOne({email}, {_id: 1, email: 1})
    const invitation = new Invitation({
        sender_id: user._id,
        sender_email: user.email,
        receiver_id: receiver_user._id,
        receiver_email: receiver_user.email,
        role_project,
        project_id,
    })

    await invitation.save()
}

export async function checkExistInvitation(user, {email, project_id, role_project}) {
    const isExist = await Invitation.findOne({
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
