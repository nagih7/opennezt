import Joi from 'joi'
import {MAX_STRING_SIZE} from '@/configs'
import {AsyncValidate, FileUpload} from '@/utils/classes'
import {tryValidateOrDefault} from '@/utils/helpers'
// import {validate} from '@/utils/middlewares'

export const createProfile = Joi.object({
    industry_ids: Joi.array().items(Joi.string().trim().required()).label('Industry IDs'),
    experience_level_id: Joi.string().trim().required().label('Experience Level ID'),
    education_ids: Joi.array().items(Joi.string().trim().required()).allow(null).label('Education IDs'),
    certification_ids: Joi.array()
        .items(Joi.string().trim().required())
        .allow(null)
        .label('Certification IDs'),
    category_ids: Joi.array().items(Joi.string().trim().required()).allow(null).label('Category IDs'),
    skill_ids: Joi.array().items(Joi.string().trim().required()).allow(null).label('Skill IDs'),
    additional_infos: Joi.array().items(
        Joi.object({
            name: Joi.string().trim().required().max(MAX_STRING_SIZE).label('Name of Additional Info'),
            description: Joi.string()
                .trim()
                .allow('')
                .max(MAX_STRING_SIZE)
                .label('Description of Additional Info'),
            content: Joi.string().trim().allow(null).max(MAX_STRING_SIZE).label('Content of Additional Info'),
        })
    ),
})
