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
// ========== GET [Projects - Participated] ========== //
export async function getListProjectsParticipated(req, res) {
    const result = await projectService.getListProjectsParticipated(req.currentUser, req.query)
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
    const result = await projectService.updateFundingSource(req.currentUser, req.params, req.body)
    res.status(200).jsonify(result, 'Update funding source successfully.')
}

// ========== PATCH [Project - AdditionalInfo] ========== //
export async function updateAdditionalInfo(req, res) {
    const result = await projectService.updateAdditionalInfo(req.currentUser, req.params, req.body)
    res.status(200).jsonify(result, 'Update additional information successfully.')
}

// ========== PATCH [Project - Logo] ========== //
export async function updateLogo(req, res) {
    const result = await projectService.updateLogo(req.currentUser, req.params, req.body)
    res.status(200).jsonify(result, 'Update logo successfully.')
}

// ========== PATCH [Project - Background] ========== //
export async function updateBackground(req, res) {
    const result = await projectService.updateBackground(req.currentUser, req.params, req.body)
    res.status(200).jsonify(result, 'Update background successfully.')
}

// ========== POST [Project Requirement - Role ] ========== //
export async function updateRoleRequirement(req, res) {
    const result = await projectService.updateRoleRequirement(req.currentUser, req.params, req.body)
    res.status(200).jsonify(result, 'Update role requirement successfully.')
}
// ========= POST [Project Requirement - Sector ] ========== //
export async function updateSectorRequirement(req, res) {
    const result = await projectService.updateSectorRequirement(req.currentUser, req.params, req.body)
    res.status(200).jsonify(result, 'Update sector requirement successfully.')
}
// ========= POST [Project Requirement - Skill ] ========== //
export async function updateSkillRequirement(req, res) {
    const result = await projectService.updateSkillRequirement(req.currentUser, req.params, req.body)
    res.status(200).jsonify(result, 'Update skill requirement successfully.')
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

// ========== GET [My Projects - All Activities] ========== //
export async function getAllActivities(req, res) {
    const result = await projectService.getAllActivities(req.currentUser, req.params.id)
    res.jsonify(result)
}
// ========== POST [Project - Activity Basic] ========== //
export async function updateBasicActivity(req, res) {
    const result = await projectService.updateBasicActivity(req.currentUser, req.params, req.body)
    res.status(200).jsonify(result, 'Update activity basic successfully.')
}
// ========== POST [Project - Activity Sector] ========== //
export async function updateSectorActivity(req, res) {
    const result = await projectService.updateSectorActivity(req.currentUser, req.params, req.body)
    res.status(200).jsonify(result, 'Update activity sector successfully.')
}
// ========== POST [Project - Activity Revenue] ========== //
export async function updateRevenueActivity(req, res) {
    const result = await projectService.updateRevenueActivity(req.currentUser, req.params, req.body)
    res.status(200).jsonify(result, 'Update activity revenue successfully.')
}
// ========== POST [Project - Activity FundingSource] ========== //
export async function updateFundingSourceActivity(req, res) {
    const result = await projectService.updateFundingSourceActivity(req.currentUser, req.params, req.body)
    res.status(200).jsonify(result, 'Update activity funding source successfully.')
}
// ========== POST [Project - Activity AdditionalInfo] ========== //
export async function updateAdditionalInfoActivity(req, res) {
    const result = await projectService.updateAdditionalInfoActivity(req.currentUser, req.params, req.body)
    res.status(200).jsonify(result, 'Update activity additional information successfully.')
}
// ========== POST [Project - Activity Logo] ========== //
export async function updateLogoActivity(req, res) {
    const result = await projectService.updateLogoActivity(req.currentUser, req.params, req.body)
    res.status(200).jsonify(result, 'Update activity logo successfully.')
}
// ========== POST [Project - Activity Background] ========== //
export async function updateBackgroundActivity(req, res) {
    const result = await projectService.updateBackgroundActivity(req.currentUser, req.params, req.body)
    res.status(200).jsonify(result, 'Update activity background successfully.')
}
// ========== POST [Project - Activity ProjectRequirement] ========== //
export async function updateProjectRequirementActivity(req, res) {
    const result = await projectService.updateProjectRequirementActivity(req.currentUser, req.params, req.body)
    res.status(200).jsonify(result, 'Update activity project requirement successfully.')
}
// ========== POST [Project - Activity New member] ========== //
export async function updateNewMemberActivity(req, res) {
    const result = await projectService.updateNewMemberActivity(req.currentUser, req.params, req.body)
    res.status(200).jsonify(result, 'Update activity new member successfully.')
}
// ========== GET [My Projects -List Invite To Project] ========== //
export async function getListInviteToProject(req, res) {
    const result = await projectService.getListInviteToProject(req.currentUser, req.params.id)
    res.jsonify(result)
}

// ========== CANCEL [Project invitation] ========== //
export async function cancelProjectInvitation(req, res) {
    await projectService.cancelProjectInvitation(req.currentUser, req.params.id, req.body)
    res.status(200).jsonify('Cancel project invitation successfully.')
}
