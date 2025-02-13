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
