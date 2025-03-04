import * as profileService from '../services/profileService'

export async function createProfile(req, res) {
    await profileService.createProfile(req.currentUser, req.body)
    res.status(201).jsonify('Create profile successfully.')
}
export async function getProfile(req, res) {
    const profile = await profileService.getProfile(req.currentUser)
    res.jsonify(profile)
}
// ========== Education ========== //
export async function createProfileEducation(req, res) {
    await profileService.createProfileEducation(req.currentUser, req.body)
    res.status(201).jsonify('Create education successfully.')
}
export async function updateProfileEducation(req, res) {
    await profileService.updateProfileEducation(req.currentUser, req.body)
    res.jsonify('Update education successfully.')
}
// ========== Certification ========== //
export async function createProfileCertification(req, res) {
    await profileService.createProfileCertification(req.currentUser, req.body)
    res.status(201).jsonify('Create certification successfully.')
}
export async function updateProfileCertification(req, res) {
    await profileService.updateProfileCertification(req.currentUser, req.body)
    res.jsonify('Update certification successfully.')
}

// ========== Organization ========== //
export async function getOrganizationFramework(req, res) {
    const organizations = await profileService.getOrganizationFramework()
    res.jsonify(organizations)
}
