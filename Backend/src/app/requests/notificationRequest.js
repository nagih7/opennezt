import {MAX_STRING_SIZE} from '@/configs'
import {NotificationFeed, User} from '@/models'
import {AsyncValidate} from '@/utils/classes'
import Joi from 'joi'

export const requestMessage = Joi.object({
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

    source_name: Joi.string().max(MAX_STRING_SIZE).required().label('Source Name'),

    metadata: Joi.object({
        project_id: Joi.string().required().label('Project ID'),
        project_name: Joi.string().required().label('Project Name'),
    }).required(),
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
