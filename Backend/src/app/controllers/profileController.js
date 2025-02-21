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
