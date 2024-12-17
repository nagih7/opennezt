import {MAX_STRING_SIZE} from '@/configs'
import {User} from '@/models'
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
