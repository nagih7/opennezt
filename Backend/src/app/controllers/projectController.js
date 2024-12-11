import * as projectService from '../services/projectService'

export async function seekProjects(req, res) {
    const result = await projectService.seekProjects(req.currentUser._id, req.query)
    res.jsonify(result)
}

export async function requestToJoinProject(req, res) {
    await projectService.requestToJoinProject(req.currentUser, req.body)
    res.status(201).jsonify('Yêu cầu tham gia dự án thành công.')
}
