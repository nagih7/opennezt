import * as talentService from '../services/talentService'

// =========== GET [Recruit Talents] =========== //
export async function recruitTalents(req, res) {
    const result = await talentService.recruitTalents(req.currentUser, req.query)
    res.jsonify(result)
}
