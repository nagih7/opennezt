import * as interviewService from '../services/interviewService'

export async function startInterview(req, res) {
    const { error, result } = await interviewService.startInterview(req.currentUser, req.body.project_id)
    if (error) {
        return res.jsonify(error, 'Start interview failed', 400)
    }
    res.jsonify(result, 'Start interview successfully')
}

export async function replyInterview(req, res) {
    const { error, result } = await interviewService.replyInterview(req.currentUser, req.body)
    if (error) {
        return res.jsonify(error, 'Reply interview failed', 400)
    }
    res.jsonify(result, 'Speech to text successfully')
}

export async function closeInterview(req, res) {
    await interviewService.closeInterview(req.body)
    res.jsonify('Close interview successfully')
}
