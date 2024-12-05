import {FounderProfile} from '@/models'
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
    const isExist = await FounderProfile.findOne({user_id: req.currentUser._id})
    if (isExist) {
        res.status(200).jsonify('Hồ sơ người sáng lập đã tồn tại.')
    } else {
        const result = await userService.createFounderProfile(req.currentUser, req.body)
        res.status(201).jsonify(result)
    }
}

export async function getFounderProfile(req, res) {
    const result = await userService.getFounderProfile(req.currentUser._id)
    res.jsonify(result)
}

export async function updateFounderProfile(req, res) {
    const result = await userService.updateFounderProfile(req.currentUser, req.body)
    res.status(201).jsonify(result)
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

export async function getTalentDetails(req, res) {
    const result = await userService.getTalentDetails(req.params.id)
    res.jsonify(result)
}

export async function updateBackground(req, res) {
    await userService.updateBackground(req.currentUser, req.body)
    res.status(201).jsonify('Cập nhật ảnh nền thành công.')
}

export async function checkSteps(req, res) {
    const result = await userService.checkSteps(req.currentUser)
    res.jsonify(result)
}

export async function inviteMember(req, res) {
    const isExist = await userService.checkExistInvitation(req.currentUser, req.body)
    if (isExist) {
        res.status(200).jsonify('Lời mời thành viên đã tồn tại.')
    } else {
        await userService.inviteMember(req.currentUser, req.body)
        res.status(201).jsonify('Mời thành viên thành công.')
    }
}
