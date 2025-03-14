import Joi from 'joi'
import {MAX_STRING_SIZE} from '@/configs'
import {
    Certification,
    Education,
    ObjectId,
    Organization,
    Profile,
    ProfileAdditionalInfo,
    Skill,
} from '@/models'
import {AsyncValidate} from '@/utils/classes'

// ========== PUT [Professional] ========== //
export const updateProfessionalProfile = Joi.object({
    industry_ids: Joi.array().items(Joi.string().trim().required()).label('Industry IDs'),
    experience_level_id: Joi.string().trim().required().label('Experience Level ID'),
})

// ========== POST [Education] ========== //
export const createProfileEducations = Joi.object({
    school: Joi.string()
        .trim()
        .required()
        .max(MAX_STRING_SIZE)
        .label('School')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async (req) => {
                    const profile = await Profile.findOne({user_id: req.currentUser._id})
                    const education = await Education.findOne({school: value, profile_id: profile._id})
                    return education ? helpers.error('any.duplicate') : value
                })
        ),
    degree: Joi.string().trim().required().max(MAX_STRING_SIZE).label('Degree'),
    field_of_study: Joi.string().trim().required().max(MAX_STRING_SIZE).label('Field of study'),
    start_date: Joi.date().required().label('Start date'),
    end_date: Joi.date().required().label('End d    ate'),
    grade: Joi.string().trim().allow(null, '').max(MAX_STRING_SIZE).label('Grade'),
    activities: Joi.string().trim().allow(null, '').max(MAX_STRING_SIZE).label('Activities'),
})
// ========== PUT [Education] ========== //
export const updateProfileEducation = Joi.object({
    _id: Joi.string()
        .trim()
        .required()
        .label('ID')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async () => {
                    const education = await Education.findById(new ObjectId(value))
                    return education ? value : helpers.error('any.empty')
                })
        ),
    school: Joi.string().trim().max(MAX_STRING_SIZE).label('School'),
    degree: Joi.string().trim().max(MAX_STRING_SIZE).label('Degree'),
    field_of_study: Joi.string().trim().max(MAX_STRING_SIZE).label('Field of Study'),
    start_date: Joi.date().allow(null, '').label('Start Date'),
    end_date: Joi.date().allow(null, '').label('End Date'),
    grade: Joi.string().trim().allow(null, '').max(MAX_STRING_SIZE).label('Grade'),
    activities: Joi.string().trim().allow(null, '').max(MAX_STRING_SIZE).label('Activities'),
})

// ========== POST [Certification] ========== //
export const createProfileCertifications = Joi.object({
    organization_id: Joi.string()
        .trim()
        .required()
        .label('Organization')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async () => {
                    const organization = await Organization.findById(new ObjectId(value))
                    return organization ? value : helpers.error('any.empty')
                })
        ),
    name: Joi.string().trim().required().max(MAX_STRING_SIZE).label('Name'),
    description: Joi.string().trim().allow('').max(MAX_STRING_SIZE).label('Description'),
    issue_date: Joi.date().required().label('Issue date'),
    expiration_date: Joi.date().required().allow(null).label('Expiration date'),
    is_lifetime: Joi.boolean().label('Is Lifetime'),
    verification_url: Joi.string().trim().allow(null).label('Verification ID'),
})
// ========== PUT [Certification] ========== //
export const updateProfileCertification = Joi.object({
    _id: Joi.string()
        .trim()
        .required()
        .label('ID')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async () => {
                    const certification = await Certification.findById(new ObjectId(value))
                    return certification ? value : helpers.error('any.empty')
                })
        ),
    organization_id: Joi.string()
        .trim()
        .required()
        .label('Organization ID')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async () => {
                    const organization = await Organization.findById(new ObjectId(value))
                    return organization ? value : helpers.error('any.empty')
                })
        ),
    name: Joi.string().trim().required().max(MAX_STRING_SIZE).label('Name'),
    description: Joi.string().trim().allow('').max(MAX_STRING_SIZE).label('Description'),
    issue_date: Joi.date().required().allow(null, '').label('Issue Date'),
    expiration_date: Joi.date().required().allow(null, '').label('Expiration Date'),
    is_lifetime: Joi.boolean().label('Is Lifetime'),
    verification_url: Joi.string().trim().allow(null).label('Verification ID'),
})

// ========== PUT [Skills] ========== //
export const updateProfileSkills = Joi.object({
    skills: Joi.array().items(
        Joi.object({
            _id: Joi.string()
                .trim()
                .required()
                .label('ID')
                .custom(
                    (value, helpers) =>
                        new AsyncValidate(value, async () => {
                            const skill = await Skill.findById(new ObjectId(value))
                            return skill ? value : helpers.error('any.empty')
                        })
                ),
        })
    ),
})

// ========== POST [Profile Additional Info] ========== //
export const createProfileAdditionalInfos = Joi.object({
    additional_infos: Joi.array()
        .items(
            Joi.object({
                name: Joi.string().trim().required().max(MAX_STRING_SIZE).label('Name'),
                description: Joi.string().trim().allow('').max(MAX_STRING_SIZE).label('Description'),
                content: Joi.string().trim().required().max(MAX_STRING_SIZE).label('Content'),
            })
        )
        .label('Profile Additional Info')
        .required(),
})
// ========== PUT [Profile Additional Info] ========== //
export const updateProfileAdditionalInfo = Joi.object({
    id: Joi.string()
        .trim()
        .required()
        .label('ID')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async () => {
                    const additionalInfo = await ProfileAdditionalInfo.findById(new ObjectId(value))
                    return additionalInfo ? value : helpers.error('any.empty')
                })
        ),
    name: Joi.string().trim().required().max(MAX_STRING_SIZE).label('Name'),
    description: Joi.string().trim().allow('').max(MAX_STRING_SIZE).label('Description'),
    content: Joi.string().trim().required().max(MAX_STRING_SIZE).label('Content'),
})
