import {MAX_STRING_SIZE} from '@/configs'
import {NotificationFeed, Project, User} from '@/models'
import {AsyncValidate} from '@/utils/classes'
import {tryValidateOrDefault} from '@/utils/helpers'
import Joi from 'joi'

export const readRoot = Joi.object({
    q: tryValidateOrDefault(Joi.string().trim(), ''),
    page: tryValidateOrDefault(Joi.number().integer().min(1), 1),
    per_page: tryValidateOrDefault(Joi.number().integer().min(1).max(100), 20),
    order: tryValidateOrDefault(Joi.valid('1', '-1'), '-1'),
})

export const requestAddFriend = Joi.object({
    user_id: Joi.string()
        .required()
        .label('User_ID')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async () => {
                    const user = await User.findById(value)
                    return user ? value : helpers.error('any.empty')
                })
        ),
    metadata: Joi.object().label('Metadata'),
})

export const replyNotification = Joi.object({
    notification_id: Joi.string()
        .required()
        .label('Notification_ID')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async () => {
                    const notification = await NotificationFeed.findById(value)
                    return notification ? value : helpers.error('any.empty')
                })
        ),

    type: Joi.string().required().label('Type'),
    status: Joi.string().required().label('Status'),
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

    user_id: Joi.string()
        .required()
        .label('User_ID')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async () => {
                    const user = await User.findById(value)
                    return user ? value : helpers.error('any.empty')
                })
        ),
})
