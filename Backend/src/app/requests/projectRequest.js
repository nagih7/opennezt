import Joi from 'joi'
import {MAX_STRING_SIZE} from '@/configs'
import {ProjectRequest} from '@/models'

export const requestToJoinProject = Joi.object({
    project_id: Joi.string().max(MAX_STRING_SIZE).required(),
    project_name: Joi.string().max(MAX_STRING_SIZE).required(),
    owner_id: Joi.string().max(MAX_STRING_SIZE).required(),
    role: Joi.string().max(MAX_STRING_SIZE).required(),
})
