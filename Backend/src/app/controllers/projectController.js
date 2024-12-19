import * as projectService from '../services/projectService'

export async function seekProjects(req, res) {
    const result = await projectService.seekProjects(req.currentUser._id, req.query)
    res.jsonify(result)
}

export async function getRequestsToJoinProject(req, res) {
    const result = await projectService.getRequestsToJoinProject(req.currentUser._id)
    res.jsonify(result)
}

export async function responseRequest(req, res) {
    await projectService.responseRequest(req.body)
    res.status(200).jsonify('Phản hồi yêu cầu thành công.')
}

export async function updateBackground(req, res) {
    await projectService.updateBackground(req.currentUser, req.body)
    res.status(200).jsonify('Cập nhật nền dự án thành công.')
}
