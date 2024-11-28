import * as userService from '../services/userService'

export async function readRoot(req, res) {
    const result = await userService.filter(req.query)
    res.jsonify(result)
}

export async function readItem(req, res) {
    const result = await userService.details(req.currentUser.id)
    res.jsonify(result)
}

export async function createItem(req, res) {
    await userService.create(req.body)
    res.status(201).jsonify('Tạo mới người dùng thành công.')
}

export async function updateItem(req, res) {
    console.log('updateItem', req.body)
    await userService.update(req.user, req.body)
    res.status(201).jsonify('Cập nhật người dùng thành công.')
}

export async function removeItem(req, res) {
    await userService.remove(req.user)
    res.jsonify('Xoá người dùng thành công.')
}

export async function resetPassword(req, res) {
    await userService.resetPassword(req.user, req.body.new_password)
    res.status(201).jsonify('Đặt lại mật khẩu thành công.')
}

export async function createFounderProfile(req, res) {
    await userService.createFounderProfile(req.currentUser, req.body)
    res.status(201).jsonify('Tạo hồ sơ người sáng lập thành công.')
}

export async function getFounderProfile(req, res) {
    const result = await userService.getFounderProfile(req.currentUser._id)
    res.jsonify(result)
}

export async function updateFounderProfile(req, res) {
    await userService.updateFounderProfile(req.currentUser, req.body)
    res.status(201).jsonify('Cập nhật hồ sơ người sáng lập thành công.')
}

export async function createProject(req, res) {
    await userService.createProject(req.currentUser, req.body)
    res.status(201).jsonify('Tạo dự án thành công.')
}

export async function getProject(req, res) {
    const result = await userService.getProject(req.currentUser._id)
    res.jsonify(result)
}

export async function updateProject(req, res) {
    await userService.updateProject(req.currentUser, req.body)
    res.status(201).jsonify('Cập nhật dự án thành công.')
}

export async function deleteProject(req, res) {
    await userService.deleteProject(req.currentUser, req.body)
    res.jsonify('Xoá dự án thành công.')
}

export async function recuitTalents(req, res) {
    const result = await userService.recuitTalents(req.query)
    res.jsonify(result)
}

export async function getDetailTalent(req, res) {
    const result = await userService.getDetailTalent(req.params.email)
    res.jsonify(result)
}

export async function updateBackground(req, res) {
    await userService.updateBackground(req.currentUser, req.body)
    res.status(201).jsonify('Cập nhật ảnh nền thành công.')
}
