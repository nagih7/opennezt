import * as adminService from '../services/adminService'

export async function getAllUsers(req, res) {
    const users = await adminService.getAllUsers()
    res.jsonify(users)
}

export async function getTotalUsers(req, res) {
    const totalUsers = await adminService.getTotalUsers()
    res.jsonify(totalUsers)
}
