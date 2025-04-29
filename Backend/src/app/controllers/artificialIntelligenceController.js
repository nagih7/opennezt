import * as aiService from '../services/artificialIntelligenceService'

export async function matchingProjects(req, res) {
    const result = await aiService.matchingProjects(req.currentUser, req.query.linkedin_username)
    res.jsonify(result, 'Get matching projects successfully')
}
