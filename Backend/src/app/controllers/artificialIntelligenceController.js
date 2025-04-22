import * as aiService from '../services/artificialIntelligenceService'

export async function matchingProjects(req, res) {
    const result = await aiService.matchingProjects(req.currentUser)
    res.jsonify(result, 'Get matching projects successfully')
}

export async function startInterview(req, res) {
    const result = await aiService.startInterview(req.currentUser, req.body.project_id)
    res.jsonify(result, 'Start interview successfully')
}
