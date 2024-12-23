import Joi from 'joi'
import {MAX_STRING_SIZE} from '@/configs'
import {AsyncValidate} from '@/utils/classes'
import {User} from '@/models'

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

    source_name: Joi.string().max(MAX_STRING_SIZE).required().label('Source Name'),

    metadata: Joi.object({
        project_id: Joi.string().required().label('Project ID'),
        project_name: Joi.string().required().label('Project Name'),
    }).required(),
})

export const seekProjects = Joi.object({
    industry: Joi.string().trim().max(MAX_STRING_SIZE).allow('').label('Industry'),
    stage: Joi.string().trim().max(MAX_STRING_SIZE).allow('').label('Stage'),
    name: Joi.string().trim().max(MAX_STRING_SIZE).allow('').label('Name'),
    page: Joi.number().integer().min(0).default(0).label('Page'),
})
