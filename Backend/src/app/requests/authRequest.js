import Joi from 'joi'
import {User} from '../../models'
import {
    MAX_STRING_SIZE,
    VALIDATE_FULL_NAME_REGEX,
    VALIDATE_PASSWORD_REGEX,
    VALIDATE_PHONE_REGEX,
} from '@/configs'
import {AsyncValidate, FileUpload} from '@/utils/classes'

export const login = Joi.object({
    email: Joi.string().trim().max(MAX_STRING_SIZE).lowercase().email().required().label('Email'),
    password: Joi.string().max(MAX_STRING_SIZE).required().label('Password'),
})

export const register = Joi.object({
    name: Joi.string()
        .trim()
        .max(MAX_STRING_SIZE)
        .pattern(VALIDATE_FULL_NAME_REGEX)
        .required()
        .label('Full name')
        .messages({'string.pattern.base': '{{#label}} do not include numbers or special characters.'}),
    email: Joi.string()
        .trim()
        .max(MAX_STRING_SIZE)
        .lowercase()
        .email()
        .required()
        .label('Email')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function () {
                    const user = await User.findOne({email: value})
                    return !user || (user && user.is_active === false) ? value : helpers.error('any.exists')
                })
        ),
    password: Joi.string()
        .min(6)
        .max(MAX_STRING_SIZE)
        .pattern(VALIDATE_PASSWORD_REGEX)
        .required()
        .label('Password')
        .messages({
            'string.pattern.base':
                '{{#label}} must contain at least one lowercase letter, one uppercase letter, one number and one special character.',
        }),
    // phone: Joi.string()
    //     .trim()
    //     .pattern(VALIDATE_PHONE_REGEX)
    //     .allow('')
    //     .required()
    //     .label('Số điện thoại')
    //     .custom(
    //         (value, helpers) =>
    //             new AsyncValidate(value, async function () {
    //                 const user = await User.findOne({phone: value})
    //                 return !user ? value : helpers.error('any.exists')
    //             })
    //     ),

    // avatar: Joi.object({
    //     mimetype: Joi.valid('image/jpeg', 'image/png', 'image/svg+xml', 'image/webp')
    //         .required()
    //         .label('Định dạng ảnh'),
    // })
    //     .unknown(true)
    //     .instance(FileUpload)
    //     .allow('')
    //     .label('Ảnh đại diện'),
})

export const updateProfile = Joi.object({
    name: Joi.string()
        .trim()
        .max(MAX_STRING_SIZE)
        .pattern(VALIDATE_FULL_NAME_REGEX)
        .required()
        .label('Full name')
        .messages({'string.pattern.base': '{{#label}} do not include numbers or special characters.'}),
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
                    const user = await User.findOne({email: value, _id: {$ne: req.currentUser._id}})
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
                    const user = await User.findOne({phone: value, _id: {$ne: req.currentUser._id}})
                    return !user ? value : helpers.error('any.exists')
                })
        ),
    avatar: Joi.object({
        mimetype: Joi.valid('image/jpeg', 'image/png', 'image/svg+xml', 'image/webp')
            .required()
            .label('Image format'),
    })
        .unknown(true)
        .instance(FileUpload)
        .allow('')
        .label('Ảnh đại diện'),
})

export const changePassword = Joi.object({
    current_password: Joi.string()
        .required()
        .label('Current password')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, (req) =>
                    req.currentUser.verifyPassword(value)
                        ? value
                        : helpers.message('{#label} không chính xác.')
                )
        ),
    password: Joi.string()
        .min(6)
        .max(MAX_STRING_SIZE)
        .pattern(VALIDATE_PASSWORD_REGEX)
        .required()
        .label('New password')
        .messages({
            'string.pattern.base':
                '{{#label}} must contain at least one lowercase letter, one uppercase letter, one number and one special character.',
        })
        .custom(function (value, helpers) {
            const {data} = helpers.prefs.context
            return data.password === data.new_password
                ? helpers.message('{{#label}} must be different from the current password.')
                : value
        }),
    password_confirmation: Joi.string()
        .required()
        .valid(Joi.ref('password'))
        .label('Password confirmation')
        .messages({'any.only': '{{#label}} does not match the new password.'}),
})

export const forgotPassword = Joi.object({
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
                    const user = await User.findOne({email: value})
                    if (user && user.is_active) {
                        req.currentUser = user
                    }
                    return user && user.is_active ? value : helpers.message('{{#label}} does not exist.')
                })
        ),
})

export const resetPassword = Joi.object({
    password: Joi.string()
        .min(6)
        .max(MAX_STRING_SIZE)
        .pattern(VALIDATE_PASSWORD_REGEX)
        .required()
        .label('New password')
        .messages({
            'string.pattern.base':
                '{{#label}} must contain at least one lowercase letter, one uppercase letter, one number and one special character.',
        }),
})
