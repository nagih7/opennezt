import * as aiService from '../services/artificialIntelligenceService'

export async function matchingProjects(req, res) {
    const result = await aiService.matchingProjects(req.currentUser, req.query.linkedin_username)
    res.jsonify(result, 'Get matching projects successfully')
}

export async function startInterview(req, res) {
    const result = await aiService.startInterview(req.currentUser, req.body.project_id)
    res.jsonify(result, 'Start interview successfully')
}

export async function replyInterview(req, res) {
    const result = await aiService.replyInterview(req.currentUser, req.body)
    res.jsonify(result, 'Reply interview successfully')
}

export async function closeInterview(req, res) {
    await aiService.closeInterview(req.currentUser, req.body.conversation_id)
    res.jsonify('Close interview successfully')
}
