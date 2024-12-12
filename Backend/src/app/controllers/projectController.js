import * as projectService from '../services/projectService'

export async function seekProjects(req, res) {
    const result = await projectService.seekProjects(req.currentUser._id, req.query)
    res.jsonify(result)
}

export async function requestToJoinProject(req, res) {
    await projectService.requestToJoinProject(req.currentUser, req.body)
    res.status(201).jsonify('Yêu cầu tham gia dự án thành công.')
}

export async function getRequestsToJoinProject(req, res) {
    const result = await projectService.getRequestsToJoinProject(req.currentUser._id)
    res.jsonify(result)
}

export async function responseRequest(req, res) {
    await projectService.responseRequest(req.body)
    res.status(200).jsonify('Phản hồi yêu cầu thành công.')
}
