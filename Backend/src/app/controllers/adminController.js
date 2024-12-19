import * as adminService from '../services/adminService'

export async function getTotalUsers(req, res) {
    const result = await adminService.getTotalUsers()
    res.jsonify(result)
}
