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
    await projectService.updateBasic(req.currentUser, req.body)
    res.status(200).jsonify('Update basic information successfully.')
}

// ========== PATCH [Project - Sector] ========== //
export async function updateSector(req, res) {
    await projectService.updateSector(req.currentUser, req.body)
    res.status(200).jsonify('Update sector successfully.')
}

// ========== PATCH [Project - Revenue] ========== //
export async function updateRevenue(req, res) {
    await projectService.updateRevenue(req.currentUser, req.body)
    res.status(200).jsonify('Update revenue successfully.')
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

// ========== POST [Project - Invite] ========== //
export async function inviteMember(req, res) {
    await projectService.inviteMember(req.currentUser, req.params.id, req.body)
    res.status(200).jsonify('Invite member successfully.')
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
