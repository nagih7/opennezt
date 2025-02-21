import Joi from 'joi'
import {MAX_STRING_SIZE} from '@/configs'
import {Education, ObjectId, Organization} from '@/models'
// import {AsyncValidate, FileUpload} from '@/utils/classes'
// import {tryValidateOrDefault} from '@/utils/helpers'
// import {validate} from '@/utils/middlewares'

// ========== Profile ========== //
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

// ========== Profile Education ========== //
export const createProfileEducation = Joi.object({
    school: Joi.string().trim().required().max(MAX_STRING_SIZE).label('School'),
    degree: Joi.string().trim().required().max(MAX_STRING_SIZE).label('Degree'),
    field_of_study: Joi.string().trim().required().max(MAX_STRING_SIZE).label('Field of Study'),
    start_date: Joi.date().allow(null, '').label('Start Date'),
    end_date: Joi.date().allow(null, '').label('End Date'),
    grade: Joi.string().trim().allow(null, '').max(MAX_STRING_SIZE).label('Grade'),
    activities: Joi.string().trim().allow(null, '').max(MAX_STRING_SIZE).label('Activities'),
})

// ========== Profile Certification ========== //
export const createProfileCertification = Joi.object({
    organization_id: Joi.string()
        .trim()
        .required()
        .label('Organization ID')
        .custom((value, helpers) => {
            const organization = Organization.findById(new ObjectId(value))
            return organization ? value : helpers.error('any.empty')
        }),
    name: Joi.string().trim().required().max(MAX_STRING_SIZE).label('Name'),
    description: Joi.string().trim().allow('').max(MAX_STRING_SIZE).label('Description'),
    issue_date: Joi.date().allow(null, '').label('Issue Date'),
    expiration_date: Joi.date().allow(null, '').label('Expiration Date'),
    is_lifetime: Joi.boolean().label('Is Lifetime'),
    verification_url: Joi.string().trim().allow(null).label('Verification ID'),
})

export const updateProfileEducation = Joi.object({
    _id: Joi.string()
        .trim()
        .required()
        .label('ID')
        .custom((value, helpers) => {
            const education = Education.findById(new ObjectId(value))
            return education ? value : helpers.error('any.empty')
        }),
    school: Joi.string().trim().max(MAX_STRING_SIZE).label('School'),
    degree: Joi.string().trim().max(MAX_STRING_SIZE).label('Degree'),
    field_of_study: Joi.string().trim().max(MAX_STRING_SIZE).label('Field of Study'),
    start_date: Joi.date().allow(null, '').label('Start Date'),
    end_date: Joi.date().allow(null, '').label('End Date'),
    description: Joi.string().trim().allow('').max(MAX_STRING_SIZE).label('Description'),
})
