import * as projectService from '../services/projectService'

export async function seekProjects(req, res) {
    const result = await projectService.seekProjects(req.currentUser, req.query)
    res.jsonify(result)
}

export async function updateBackground(req, res) {
    await projectService.updateBackground(req.currentUser, req.body)
    res.status(200).jsonify('Update background successfully.')
}

export async function getInvitations(req, res) {
    const result = await projectService.getInvitations(req.currentUser._id, req.params.user_id)
    res.jsonify(result)
}

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
