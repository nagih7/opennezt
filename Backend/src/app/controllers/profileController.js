import * as profileService from '../services/profileService'

// ========== GET [Profile] ========== //
export async function getProfile(req, res) {
    const profile = await profileService.getProfile(req.currentUser)
    res.jsonify(profile)
}
// ========== PUT [Professional] ========== //
export async function updateProfessionalProfile(req, res) {
    await profileService.updateProfessionalProfile(req.currentUser, req.body)
    res.jsonify('Update professional profile successfully.')
}

// ========== POST [Education] ========== //
export async function createProfileEducation(req, res) {
    const result = await profileService.createProfileEducation(req.currentUser, req.body)
    res.status(201).jsonify(result, 'Create education successfully.')
}
// ========== PUT [Education] ========== //
export async function updateProfileEducation(req, res) {
    const result = await profileService.updateProfileEducation(req.currentUser, req.body)
    res.jsonify(result, 'Update education successfully.')
}
// ========== DELETE [Education] ========== //
export async function deleteProfileEducation(req, res) {
    const result = await profileService.deleteProfileEducation(req.currentUser, req.params.id)
    res.jsonify(result, 'Delete education successfully.')
}
// ========== POST [Certification] ========== //
export async function createProfileCertifications(req, res) {
    const result = await profileService.createProfileCertifications(req.currentUser, req.body)
    res.status(201).jsonify(result, 'Create certification successfully.')
}
// ========== PUT [Certification] ========== //
export async function updateProfileCertification(req, res) {
    const result = await profileService.updateProfileCertification(req.currentUser, req.body)
    res.jsonify(result, 'Update certification successfully.')
}
// ========== DELETE [Certification] ========== //
export async function deleteProfileCertification(req, res) {
    const result = await profileService.deleteProfileCertification(req.currentUser, req.params.id)
    res.jsonify(result, 'Delete certification successfully.')
}

// ========== PUT [Skills] ========== //
export async function updateProfileSkills(req, res) {
    await profileService.updateProfileSkills(req.currentUser, req.body)
    res.jsonify('Update skills successfully.')
}

// ========== GET [Organization] ========== //
export async function getOrganizationFramework(req, res) {
    const organizations = await profileService.getOrganizationFramework()
    res.jsonify(organizations)
}
// ========== POST [Additional Info] ========== //
export async function createProfileAdditionalInfos(req, res) {
    const result = await profileService.createProfileAdditionalInfos(req.currentUser, req.body)
    res.status(201).jsonify(result, 'Create profile additional info successfully.')
}
// ========== PUT [Additional Info] ========== //
export async function updateProfileAdditionalInfo(req, res) {
    const result = await profileService.updateProfileAdditionalInfo(req.currentUser, req.body)
    res.jsonify(result, 'Update profile additional info successfully.')
}

// ========== DELETE [Additional Info] ========== //
export async function deleteProfileAdditionalInfo(req, res) {
    const result = await profileService.deleteProfileAdditionalInfo(req.currentUser, req.params.id)
    res.jsonify(result, 'Delete profile additional info successfully.')
}

// ========== GET [Profile Access] ========== //
export async function getAccessToMyProfile(req, res) {
    const access = await profileService.getAccessToMyProfile(req.currentUser)
    res.jsonify(access)
}

// ========== GET [Friends] ========== //
export async function getMyFriends(req, res) {
    const result = await profileService.getMyFriends(req.currentUser, req.query)
    res.jsonify(result, 'Get friends successfully.')
}
