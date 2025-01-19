import * as projectService from '../services/projectService'

export async function seekProjects(req, res) {
    const result = await projectService.seekProjects(req.currentUser, req.query)
    res.jsonify(result)
}

export async function updateBackground(req, res) {
    await projectService.updateBackground(req.currentUser, req.body)
    res.status(200).jsonify('Update background successfully.')
}

export async function getInvitations(req, res) {
    const result = await projectService.getInvitations(req.currentUser._id, req.params.user_id)
    res.jsonify(result)
}
