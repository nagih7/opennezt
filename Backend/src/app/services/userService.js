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

export async function update(user, {name, email, phone}) {
    user.name = name
    user.email = email
    user.phone = phone
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

export async function createProject(user, requestBody) {
    const project = new Project(requestBody)
    project.user_id = user._id
    await project.save()
    // Create project
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
