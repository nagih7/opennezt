import * as userService from '../services/userService'

export async function readRoot(req, res) {
    const result = await userService.filter(req.query)
    res.jsonify(result)
}

export async function readItem(req, res) {
    const result = await userService.details(req.currentUser.id)
    res.jsonify(result)
}

export async function createItem(req, res) {
    await userService.create(req.body)
    res.status(201).jsonify('Create user successfully.')
}

export async function updateItem(req, res) {
    await userService.update(req.user, req.body)
    res.status(201).jsonify('Update user successfully.')
}

export async function removeItem(req, res) {
    await userService.remove(req.user)
    res.jsonify('Delete user successfully.')
}

export async function resetPassword(req, res) {
    await userService.resetPassword(req.user, req.body.new_password)
    res.status(201).jsonify('Reset password successfully.')
}

export async function createProject(req, res) {
    await userService.createProject(req.currentUser, req.body)
    res.status(201).jsonify('Create project successfully.')
}

export async function getProjects(req, res) {
    const result = await userService.getProjects(req.currentUser._id)
    res.jsonify(result)
}

export async function getProject(req, res) {
    const result = await userService.getProject(req.params.id)
    res.jsonify(result)
}

export async function updateProject(req, res) {
    await userService.updateProject(req.currentUser, req.body)
    // res.status(200).jsonify('Cập nhật dự án thành công.')
    res.status(200).jsonify('Update project successfully.')
}

export async function deleteProject(req, res) {
    await userService.deleteProject(req.currentUser, req.body)
    res.jsonify('Delete project successfully.')
}

export async function recuitTalents(req, res) {
    const result = await userService.recuitTalents(req.currentUser, req.query)
    res.jsonify(result)
}

export async function getTalentDetails(req, res) {
    const result = await userService.getTalentDetails(req.currentUser, req.params.id)
    res.jsonify(result)
}

export async function updateBackground(req, res) {
    await userService.updateBackground(req.currentUser, req.body)
    res.status(200).jsonify('Update background successfully.')
}

export async function updateAvatar(req, res) {
    await userService.updateAvatar(req.currentUser, req.body)
    res.status(200).jsonify('Update avatar successfully.')
}

// Industry framework
export async function getIndustries(req, res) {
    const result = await userService.getIndustries()
    res.jsonify(result)
}

// Experience level framework
export async function getExperienceLevels(req, res) {
    const result = await userService.getExperienceLevels()
    res.jsonify(result)
}

// Category framework
export async function getCategories(req, res) {
    const result = await userService.getCategories()
    res.jsonify(result)
}

// Subcategory framework
export async function getSubCategories(req, res) {
    const result = await userService.getSubCategories(req.params.id)
    res.jsonify(result)
}

// Skill framework
export async function getSkills(req, res) {
    const result = await userService.getSkills(req.params.id)
    res.jsonify(result)
}

// Stage framework
export async function getStages(req, res) {
    const result = await userService.getStages()
    res.jsonify(result)
}

// Project role framework
export async function getProjectRoles(req, res) {
    const result = await userService.getProjectRoles()
    res.jsonify(result)
}

// ========== POST [User - Request Add Friend] ========== //
export async function sendFriendRequest(req, res) {
    const result = await userService.sendFriendRequest(req.currentUser, req.params, req.body, req.io)
    res.status(201).jsonify(result, 'Send friend request successfully.')
}
