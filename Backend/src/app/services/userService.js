import {User, FounderProfile, Project, Invitation, ObjectId, ChatInvitation, ProjectRequest} from '@/models'
import {FileUpload} from '@/utils/classes'
import {LINK_STATIC_URL} from '@/configs'
import status from 'statuses'

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

export async function createFounderProfile(user, requestBody) {
    requestBody.user_id = user._id
    const founder = new FounderProfile(requestBody)
    await founder.save()
    return founder
}

export async function getFounderProfile(userId) {
    const founder = await FounderProfile.findOne({user_id: userId})
    return founder
}

export async function updateFounderProfile(user, requestBody) {
    const founder = await FounderProfile.findOne({user_id: user._id})
    founder.set(requestBody)
    await founder.save()
    return founder
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
                from: 'project_requests',
                localField: '_id',
                foreignField: 'project_id',
                as: 'project_requests',
                pipeline: [
                    {
                        $match: {
                            status: 'accepted',
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            sender_id: 1,
                            sender_name: 1,
                            role: 1,
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
            $lookup: {
                from: 'users',
                localField: 'project_requests.sender_id',
                foreignField: '_id',
                as: 'members',
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
    console.log(requestBody)
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
}

export async function recuitTalents(user, requestRecuitTalents) {
    const query = {}
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
        query.education_level = {
            $regex: requestRecuitTalents.education_level,
            $options: 'i',
        }
    }
    if (requestRecuitTalents.commitment) {
        query.commitment = {
            $regex: requestRecuitTalents.commitment,
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
            $skip: (requestRecuitTalents.page - 1) * requestRecuitTalents.per_page,
        },
        {
            $limit: requestRecuitTalents.per_page,
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
    return talents
}

export async function getTalentDetails(id) {
    const detailTalent = await User.aggregate([
        {$match: {_id: new ObjectId(id)}},
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

export async function checkSteps(user) {
    const founderProfile = await FounderProfile.findOne(
        {user_id: user._id},
        {user_id: 0, created_at: 0, updated_at: 0}
    )
    const project = await Project.findOne({user_id: user._id}, {user_id: 0, created_at: 0, updated_at: 0})

    return {
        founderProfile: founderProfile ? true : false,
        project: project ? true : false,
    }
}

export async function inviteMember(user, {email, project_id, role}) {
    const receiver_user = await User.findOne({email}, {_id: 1, email: 1})
    const invitation = new Invitation({
        sender_id: user._id,
        sender_email: user.email,
        receiver_id: receiver_user._id,
        receiver_email: receiver_user.email,
        role,
        project_id,
    })

    await invitation.save()
}

export async function checkExistInvitation(user, {email, project_id, role}) {
    const isExist = await Invitation.findOne({
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

// NOTIFICATIONS
export async function getNotifications(user) {
    const chatInvitations = await ChatInvitation.aggregate([
        {
            $match: {receiver_id: user._id},
        },

        {
            $addFields: {
                type: 'chat_invitation',
            },
        },
        {
            $project: {
                _id: 1,
                type: 1,
                sender_id: 1,
                sender_name: 1,
                created_at: 1,
                status: 1,
            },
        },
    ])
    return chatInvitations
}
export async function getIdByEmail(emailData) {
    try {
        const email = typeof emailData === 'object' ? emailData.email : emailData

        if (!email || typeof email !== 'string') {
            throw new Error('Invalid email format')
        }

        const user = await User.findOne({email})

        if (!user) {
            throw new Error('User not found')
        }

        return {
            success: true,
            data: user._id,
        }
    } catch (error) {
        return {
            success: false,
            message: error.message,
        }
    }
}
