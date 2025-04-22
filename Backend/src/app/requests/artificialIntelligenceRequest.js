import Joi from 'joi'
import { ObjectId, Project, User } from '../../models'
import { MAX_STRING_SIZE, VALIDATE_FULL_NAME_REGEX, VALIDATE_PASSWORD_REGEX, VALIDATE_PHONE_REGEX } from '@/configs'
import { AsyncValidate, FileUpload } from '@/utils/classes'

export const startInterview = Joi.object({
    projectId: Joi.string()
        .required()
        .label('Project')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function () {
                    const project = await Project.findById(new ObjectId(value))
                    return project ? value : helpers.error('any.exists')
                })
        ),
})

export const updateProfile = Joi.object({
    name: Joi.string()
        .trim()
        .max(MAX_STRING_SIZE)
        .pattern(VALIDATE_FULL_NAME_REGEX)
        .required()
        .label('Full name')
        .messages({ 'string.pattern.base': '{{#label}} do not include numbers or special characters.' }),
    email: Joi.string()
        .trim()
        .lowercase()
        .email()
        .max(MAX_STRING_SIZE)
        .required()
        .label('Email')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function (req) {
                    const user = await User.findOne({ email: value, _id: { $ne: req.currentUser._id } })
                    return !user ? value : helpers.error('any.exists')
                })
        ),
    phone: Joi.string()
        .trim()
        .pattern(VALIDATE_PHONE_REGEX)
        .allow('')
        // .required()
        .label('Số điện thoại')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function (req) {
                    const user = await User.findOne({ phone: value, _id: { $ne: req.currentUser._id } })
                    return !user ? value : helpers.error('any.exists')
                })
        ),
    avatar: Joi.object({
        mimetype: Joi.valid('image/jpeg', 'image/png', 'image/svg+xml', 'image/webp').required().label('Image format'),
    })
        .unknown(true)
        .instance(FileUpload)
        .allow('')
        .label('Ảnh đại diện'),
})
