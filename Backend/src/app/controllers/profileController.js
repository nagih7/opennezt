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
    await profileService.createProfileEducation(req.currentUser, req.body)
    res.status(201).jsonify('Create education successfully.')
}
// ========== PUT [Education] ========== //
export async function updateProfileEducation(req, res) {
    await profileService.updateProfileEducation(req.currentUser, req.body)
    res.jsonify('Update education successfully.')
}
// ========== DELETE [Education] ========== //
export async function deleteProfileEducation(req, res) {
    await profileService.deleteProfileEducation(req.currentUser, req.params.id)
    res.jsonify('Delete education successfully.')
}
// ========== POST [Certification] ========== //
export async function createProfileCertifications(req, res) {
    await profileService.createProfileCertifications(req.currentUser, req.body)
    res.status(201).jsonify('Create certification successfully.')
}
// ========== PUT [Certification] ========== //
export async function updateProfileCertification(req, res) {
    await profileService.updateProfileCertification(req.currentUser, req.body)
    res.jsonify('Update certification successfully.')
}
// ========== DELETE [Certification] ========== //
export async function deleteProfileCertification(req, res) {
    await profileService.deleteProfileCertification(req.currentUser, req.params.id)
    res.jsonify('Delete certification successfully.')
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
    await profileService.createProfileAdditionalInfos(req.currentUser, req.body)
    res.status(201).jsonify('Create profile additional info successfully.')
}
// ========== PUT [Additional Info] ========== //
export async function updateProfileAdditionalInfo(req, res) {
    await profileService.updateProfileAdditionalInfo(req.currentUser, req.body)
    res.jsonify('Update profile additional info successfully.')
}
