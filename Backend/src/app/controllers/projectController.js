import * as projectService from '../services/projectService'

// ========== POST [Project] ========== //
export async function createProject(req, res) {
    const result = await projectService.createProject(req.currentUser, req.body)
    res.status(201).jsonify(result)
}
// ========== GET [My Projects] ========== //
export async function getListMyProjects(req, res) {
    const result = await projectService.getListMyProjects(req.currentUser, req.query)
    res.jsonify(result)
}

// ========== GET [My Project Details] ========== //
export async function getMyProjectDetails(req, res) {
    const result = await projectService.getMyProjectDetails(req.currentUser, req.params.id)
    res.jsonify(result)
}

// ========== GET [Project Details] ========== //
export async function getProjectDetails(req, res) {
    const result = await projectService.getProjectDetails(req.currentUser, req.params.id)
    res.jsonify(result)
}

// ========== PATCH [Project - Basic] ========== //
export async function updateBasic(req, res) {
    const result = await projectService.updateBasic(req.currentUser, req.params, req.body)
    res.status(200).jsonify(result, 'Update basic information successfully.')
}

// ========== PATCH [Project - Sector] ========== //
export async function updateSector(req, res) {
    const result = await projectService.updateSector(req.currentUser, req.params, req.body)
    res.status(200).jsonify(result, 'Update sector successfully.')
}

// ========== PATCH [Project - Revenue] ========== //
export async function updateRevenue(req, res) {
    const result = await projectService.updateRevenue(req.currentUser, req.params, req.body)
    res.status(200).jsonify(result, 'Update revenue successfully.')
}

// ========== PATCH [Project - FundingSource] ========== //
export async function updateFundingSource(req, res) {
    await projectService.updateFundingSource(req.currentUser, req.body)
    res.status(200).jsonify('Update funding source successfully.')
}

// ========== PATCH [Project - AdditionalInfo] ========== //
export async function updateAdditionalInfo(req, res) {
    await projectService.updateAdditionalInfo(req.currentUser, req.body)
    res.status(200).jsonify('Update additional information successfully.')
}

// ========== DELETE [Project] ========== //
export async function deleteProject(req, res) {
    await projectService.deleteProject(req.currentUser, req.params.id)
    res.status(200).jsonify('Delete project successfully.')
}

// ========== GET [Project - TAGS] ========== //
export async function getProjectsToTag(req, res) {
    const result = await projectService.getProjectsToTag(req.currentUser, req.query)
    res.jsonify(result)
}

// ========== GET [Project - Seek] ========== //
export async function seekProjects(req, res) {
    const result = await projectService.seekProjects(req.currentUser, req.query)
    res.jsonify(result)
}

// ========== POST [Project - Apply to join project] ========== //
export async function applyToJoinProject(req, res) {
    await projectService.applyToJoinProject(req.currentUser, req.params.id, req.body)
    res.status(200).jsonify('Apply to join project successfully.')
}

// ========== POST [Project - Access] ========== //
export async function accessToProject(req, res) {
    await projectService.accessToProject(req.currentUser, req.params.id)
    res.status(200).jsonify('Access to project successfully.')
}

// ========== POST [Project - Requirement] ========== //
export async function addProjectRequirement(req, res) {
    await projectService.addProjectRequirement(req.currentUser, req.params.id, req.body)
    res.status(200).jsonify('Add requirement successfully.')
}
// ========== GET [My Project Access] ========== //
export async function getMyProjectAccess(req, res) {
    const result = await projectService.getMyProjectAccess(req.currentUser)
    res.jsonify(result)
}

// ========== GET [Access to My Projects] ========== //
export async function getAccessToMyProjects(req, res) {
    const result = await projectService.getAccessToMyProjects(req.currentUser)
    res.jsonify(result)
}

// ========== POST [My Project - Search] ========== //
export async function searchMyProjects(req, res) {
    const result = await projectService.searchMyProjects(req.currentUser, req.query)
    res.jsonify(result)
}

// ========= POST [My project - Invite member] ========== //
export async function inviteMember(req, res) {
    await projectService.inviteMember(req.currentUser, req.params.id, req.body, req.io)
    res.status(200).jsonify('Invite member to my project successfully.')
}
