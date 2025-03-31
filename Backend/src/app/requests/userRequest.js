import Joi from 'joi'
import { NotificationFeed, Type, User } from '../../models'
import {
    MAX_STRING_SIZE,
    VALIDATE_PHONE_REGEX,
    MAX_AREAS_STRING_SIZE,
    SEND_ACTION,
    CANCEL_ACTION,
    NOTIFICATION_TYPE,
    FRIEND_REQUEST_NOTIFICATION,
} from '@/configs'
import { AsyncValidate, FileUpload } from '@/utils/classes'
import { tryValidateOrDefault } from '@/utils/helpers'

export const readRoot = Joi.object({
    q: tryValidateOrDefault(Joi.string().trim(), ''),
    page: tryValidateOrDefault(Joi.number().integer().min(1), 1),
    per_page: tryValidateOrDefault(Joi.number().integer().min(1).max(100), 20),
    field: tryValidateOrDefault(Joi.valid('created_at', 'name', 'email'), 'created_at'),
    order: tryValidateOrDefault(Joi.valid('1', '-1'), '-1'),
})

export const createItem = Joi.object({
    name: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Full name'),
    email: Joi.string()
        .trim()
        .max(MAX_STRING_SIZE)
        .email()
        .required()
        .label('Email')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function () {
                    const user = await User.findOne({ email: value })
                    return !user ? value : helpers.error('any.exists')
                })
        ),
    phone: Joi.string()
        .trim()
        .pattern(VALIDATE_PHONE_REGEX)
        .allow('')
        .required()
        .label('Phone number')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function () {
                    const user = await User.findOne({ phone: value })
                    return !user ? value : helpers.error('any.exists')
                })
        ),
    password: Joi.string().min(6).max(MAX_STRING_SIZE).required().label('Password'),
})

export const updateItem = Joi.object({
    name: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Full name'),
    email: Joi.string()
        .trim()
        .max(MAX_STRING_SIZE)
        .email()
        .required()
        .label('Email')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function (req) {
                    const userId = req.currentUser._id
                    const user = await User.findOne({ email: value, _id: { $ne: userId } })
                    return !user ? value : helpers.error('any.exists')
                })
        ),
    phone: Joi.string()
        .trim()
        .pattern(VALIDATE_PHONE_REGEX)
        .allow('')
        .required()
        .label('Phone number')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function (req) {
                    const userId = req.currentUser._id
                    const user = await User.findOne({ phone: value, _id: { $ne: userId } })
                    return !user ? value : helpers.error('any.exists')
                })
        ),
    linkedin: Joi.string().trim().max(MAX_STRING_SIZE).allow('').label('LinkedIn'),
    facebook: Joi.string().trim().max(MAX_STRING_SIZE).allow('').label('Facebook'),
    region: Joi.string().trim().max(MAX_STRING_SIZE).allow('').label('Region'),
    city: Joi.string().trim().max(MAX_STRING_SIZE).allow('').label('City'),
    // avatar: Joi.object({
    //     mimetype: Joi.valid('image/jpeg', 'image/png', 'image/svg+xml', 'image/webp')
    //         .required()
    //         .label('Định dạng ảnh'),
    // })
    //     .unknown(true)
    //     .instance(FileUpload)
    //     .allow('')
    //     .label('Ảnh đại diện'),
    language: Joi.array().items(Joi.string().trim().max(MAX_STRING_SIZE)).required().label('Language'),
})

export const resetPassword = Joi.object({
    new_password: Joi.string().min(6).max(MAX_STRING_SIZE).required().label('New password'),
})

export const updateAvatar = Joi.object({
    avatar: Joi.object({
        mimetype: Joi.valid('image/jpeg', 'image/png', 'image/svg+xml', 'image/webp').required().label('Image format'),
    })
        .unknown(true)
        .instance(FileUpload)
        .required()
        .label('Ảnh đại diện'),
})

export const updateBackground = Joi.object({
    background: Joi.object({
        mimetype: Joi.valid('image/jpeg', 'image/png', 'image/svg+xml', 'image/webp').required().label('Image format'),
    })
        .unknown(true)
        .instance(FileUpload)
        .required()
        .label('Background'),
})

// ========= POST [USER - FRIEND REQUEST] ========== //
export const sendFriendRequest = Joi.object({
    action: Joi.string()
        .valid(SEND_ACTION, CANCEL_ACTION)
        .required()
        .label('Action')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function (req) {
                    const requestType = await Type.findOne({
                        class: NOTIFICATION_TYPE,
                        name: FRIEND_REQUEST_NOTIFICATION,
                    })
                    const friendRequest = await NotificationFeed.findOne({
                        user_id: req.params.id,
                        source_id: req.currentUser._id,
                        type: requestType._id,
                    })
                    return !friendRequest ? value : helpers.error('any.exists')
                })
        ),
})
