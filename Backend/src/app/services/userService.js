import {User, FounderProfile, Project} from '@/models'
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

export async function createProject(user, {pitch_deck, ...requestBody}) {
    if (pitch_deck instanceof FileUpload) {
        requestBody.pitch_deck = pitch_deck.save('pitch_decks')
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
                'user_data.isActive': true,
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

export async function getDetailTalent(email) {
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
            $project: {
                _id: 0,
                password: 0,
                role: 0,
                isActive: 0,
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
