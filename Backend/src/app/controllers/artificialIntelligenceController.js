import * as artificialIntelligenceService from '../services/artificialIntelligenceService'

export async function matchingProjects(req, res) {
    const result = await artificialIntelligenceService.matchingProjects(req.currentUser)
    res.jsonify(result)
}

export async function matchingTalents(req, res) {
    const result = await artificialIntelligenceService.matchingTalents(req.currentUser)
    res.jsonify(result)
}
