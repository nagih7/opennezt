import {MAX_STRING_SIZE} from '@/configs'
import {NotificationFeed, Project, User, Type} from '@/models'
import {AsyncValidate} from '@/utils/classes'
import {tryValidateOrDefault} from '@/utils/helpers'
import Joi from 'joi'

export const readRoot = Joi.object({
    q: tryValidateOrDefault(Joi.string().trim(), ''),
    page: tryValidateOrDefault(Joi.number().integer().min(1), 1),
    per_page: tryValidateOrDefault(Joi.number().integer().min(1).max(100), 20),
    order: tryValidateOrDefault(Joi.valid('1', '-1'), '-1'),
})

// export const requestAddFriend = Joi.object({
//     user_id: Joi.string()
//         .required()
//         .label('User ID')
//         .custom(
//             (value, helpers) =>
//                 new AsyncValidate(value, async () => {
//                     const user = await User.findById(value)
//                     return user ? value : helpers.error('any.empty')
//                 })
//         ),
//     metadata: Joi.object().label('Metadata'),
// })

export const requestAddFriend = Joi.object({
    user_id: Joi.string()
        .required()
        .label('User ID')
        .external(async (value) => {
            const user = await User.findById(value)
            if (!user) {
                throw new Error('User ID invalid.')
            }
            return value
        }),
    metadata: Joi.object({
        read: Joi.boolean().default(false),
        status: Joi.string().valid('waiting', 'accepted', 'rejected')
    }).label('Metadata'),
})

// export const replyNotification = Joi.object({
//     notification_id: Joi.string()
//         .required()
//         .label('Notification_ID')
//         .custom(
//             (value, helpers) =>
//                 new AsyncValidate(value, async () => {
//                     const notification = await NotificationFeed.findById(value)
//                     return notification ? value : helpers.error('any.empty')
//                 })
//         ),

//     type: Joi.string().required().label('Type'),
//     status: Joi.string().required().label('Status'),
// })

export const replyNotification = Joi.object({
    notification_id: Joi.string()
        .required()
        .label('Notification_ID')
        .custom(async (value, helpers) => {
            const notification = await NotificationFeed.findById(value)
            if (!notification) {
                return helpers.error('any.empty', { message: 'Notification not found' })
            }
            return value
        }),

    type_id: Joi.string()
        .required()
        .label('Type_ID')
        .custom(async (value, helpers) => {
            const type = await Type.findById(value)
            if (!type) {
                return helpers.error('any.empty', { message: 'Type not found' })
            }
            return value
        }),

    status: Joi.string().valid('waiting', 'accepted', 'rejected').required().label('Status'),
})


export const projectInvitation = Joi.object({
    project_id: Joi.string()
        .required()
        .label('Project_ID')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async () => {
                    const project = await Project.findById(value)
                    return project ? value : helpers.error('any.empty')
                })
        ),

    project_name: Joi.string().max(MAX_STRING_SIZE).required().label('Project_Name'),
    team_role: Joi.string().max(MAX_STRING_SIZE).required().label('Team_Role'),
    role: Joi.string().max(MAX_STRING_SIZE).required().label('Role'),

    user_id: Joi.string()
        .required()
        .label('User ID')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async () => {
                    const user = await User.findById(value)
                    return user ? value : helpers.error('any.empty')
                })
        ),
})
