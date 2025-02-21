import * as profileService from '../services/profileService'

export async function createProfile(req, res) {
    await profileService.createProfile(req.currentUser, req.body)
    res.status(201).jsonify('Create profile successfully.')
}
export async function getProfile(req, res) {
    const profile = await profileService.getProfile(req.currentUser)
    res.jsonify(profile)
}
