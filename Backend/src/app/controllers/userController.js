import {Profile} from '@/models'
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
    res.status(201).jsonify('Create user successfully.')
}

export async function updateItem(req, res) {
    await userService.update(req.user, req.body)
    res.status(201).jsonify('Update user successfully.')
}

export async function removeItem(req, res) {
    await userService.remove(req.user)
    res.jsonify('Delete user successfully.')
}

export async function resetPassword(req, res) {
    await userService.resetPassword(req.user, req.body.new_password)
    res.status(201).jsonify('Reset password successfully.')
}

export async function createProfile(req, res) {
    const isExist = await Profile.findOne({user_id: req.currentUser._id})
    if (isExist) {
        res.status(200).jsonify('Profile is already exist.')
    } else {
        const result = await userService.createProfile(req.currentUser, req.body)
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
    res.status(201).jsonify('Create project successfully.')
}

export async function getProjects(req, res) {
    const result = await userService.getProjects(req.currentUser._id)
    res.jsonify(result)
}

export async function getProject(req, res) {
    const result = await userService.getProject(req.params.id)
    res.jsonify(result)
}

export async function updateProject(req, res) {
    await userService.updateProject(req.currentUser, req.body)
    // res.status(200).jsonify('Cập nhật dự án thành công.')
    res.status(200).jsonify('Update project successfully.')
}

export async function deleteProject(req, res) {
    await userService.deleteProject(req.currentUser, req.body)
    res.jsonify('Delete project successfully.')
}

export async function recuitTalents(req, res) {
    const result = await userService.recuitTalents(req.currentUser, req.query)
    res.jsonify(result)
}

export async function getTalentDetails(req, res) {
    const result = await userService.getTalentDetails(req.currentUser, req.params.id)
    res.jsonify(result)
}

export async function updateBackground(req, res) {
    await userService.updateBackground(req.currentUser, req.body)
    res.status(200).jsonify('Update background successfully.')
}

export async function updateAvatar(req, res) {
    await userService.updateAvatar(req.currentUser, req.body)
    res.status(200).jsonify('Update avatar successfully.')
}

export async function checkSteps(req, res) {
    const result = await userService.checkSteps(req.currentUser)
    res.jsonify(result)
}
