import * as manageService from '../services/manageService'

export async function getTotalUsers(req, res) {
    const result = await manageService.getTotalUsers()
    res.jsonify(result)
}

export async function userReadRoot(req, res) {
    const result = await manageService.userReadRoot(req.query)
    res.jsonify(result)
}

// ROLES
export async function roleReadRoot(req, res) {
    const result = await manageService.roleReadRoot(req.query)
    res.jsonify(result)
}
export async function createRole(req, res) {
    await manageService.createRole(req.body)
    res.jsonify('Create role successfully')
}
export async function updateRole(req, res) {
    await manageService.updateRole(req.params.id, req.body)
    res.jsonify('Update role successfully')
}
export async function deleteRole(req, res) {
    await manageService.deleteRole(req.params.id)
    res.jsonify('Delete role successfully')
}

// TYPES
export async function typeReadRoot(req, res) {
    const result = await manageService.typeReadRoot(req.query)
    res.jsonify(result)
}
export async function createType(req, res) {
    await manageService.createType(req.body)
    res.jsonify('Create type successfully')
}
export async function updateType(req, res) {
    await manageService.updateType(req.params.id, req.body)
    res.jsonify('Update type successfully')
}
export async function deleteType(req, res) {
    await manageService.deleteType(req.params.id)
    res.jsonify('Delete type successfully')
}

// INDUSTRIES
export async function industryReadRoot(req, res) {
    const result = await manageService.industryReadRoot(req.query)
    res.jsonify(result)
}
export async function createIndustry(req, res) {
    await manageService.createIndustry(req.body)
    res.jsonify('Create industry successfully')
}
export async function updateIndustry(req, res) {
    await manageService.updateIndustry(req.params.id, req.body)
    res.jsonify('Update industry successfully')
}
export async function deleteIndustry(req, res) {
    await manageService.deleteIndustry(req.params.id)
    res.jsonify('Delete industry successfully')
}

// EXPERIENCE_LEVELS
export async function experienceLevelReadRoot(req, res) {
    const result = await manageService.experienceLevelReadRoot(req.query)
    res.jsonify(result)
}
export async function createExperienceLevel(req, res) {
    await manageService.createExperienceLevel(req.body)
    res.jsonify('Create experience level successfully')
}
export async function updateExperienceLevel(req, res) {
    await manageService.updateExperienceLevel(req.params.id, req.body)
    res.jsonify('Update experience level successfully')
}
export async function deleteExperienceLevel(req, res) {
    await manageService.deleteExperienceLevel(req.params.id)
    res.jsonify('Delete experience level successfully')
}

// CATEGORIES
export async function categoryReadRoot(req, res) {
    const result = await manageService.categoryReadRoot(req.query)
    res.jsonify(result)
}
export async function createCategory(req, res) {
    await manageService.createCategory(req.body)
    res.jsonify('Create category successfully')
}
export async function updateCategory(req, res) {
    await manageService.updateCategory(req.params.id, req.body)
    res.jsonify('Update category successfully')
}
export async function deleteCategory(req, res) {
    await manageService.deleteCategory(req.params.id)
    res.jsonify('Delete category successfully')
}

// SKILLS
export async function skillReadRoot(req, res) {
    const result = await manageService.skillReadRoot(req.query)
    res.jsonify(result)
}
export async function createSkill(req, res) {
    await manageService.createSkill(req.body)
    res.jsonify('Create skill successfully')
}
export async function updateSkill(req, res) {
    await manageService.updateSkill(req.params.id, req.body)
    res.jsonify('Update skill successfully')
}
export async function deleteSkill(req, res) {
    await manageService.deleteSkill(req.params.id)
    res.jsonify('Delete skill successfully')
}
