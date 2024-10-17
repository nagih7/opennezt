import * as adminService from '../services/adminService'

export async function getAllUsers(req, res) {
    const users = await adminService.getAllUsers()
    res.json(users)
}

export async function getTotalUsers(req, res) {
    const totalUsers = await adminService.getTotalUsers()
    res.json(totalUsers)
}
