import * as talentService from '../services/talentService'

// =========== GET [Recruit Talents] =========== //
export async function recruitTalents(req, res) {
    const result = await talentService.recruitTalents(req.currentUser, req.query)
    res.jsonify(result)
}

// =========== GET [Talent Details] =========== //
export async function getTalentDetails(req, res) {
    const result = await talentService.getTalentDetails(req.params)
    res.jsonify(result)
}

// =========== POST [Access to Talent] =========== //
export async function accessToTalent(req, res) {
    const result = await talentService.accessToTalent(req.currentUser, req.params)
    res.jsonify(result)
}
