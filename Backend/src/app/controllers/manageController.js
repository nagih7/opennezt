import * as manageService from '../services/manageService'

export async function getTotalUsers(req, res) {
    const result = await manageService.getTotalUsers()
    res.jsonify(result)
}

export async function userReadRoot(req, res) {
    const result = await manageService.userReadRoot(req.query)
    res.jsonify(result)
}

export async function roleReadRoot(req, res) {
    const result = await manageService.roleReadRoot(req.query)
    res.jsonify(result)
}

export async function typeReadRoot(req, res) {
    const result = await manageService.typeReadRoot(req.query)
    res.jsonify(result)
}
