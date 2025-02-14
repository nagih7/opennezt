import Joi from 'joi'
import {tryValidateOrDefault} from '@/utils/helpers'
import {Category, ExperienceLevel, Industry, ObjectId, Role, Skill, Type} from '@/models'
import {AsyncValidate} from '@/utils/classes'
import {MAX_STRING_SIZE} from '@/configs'

export const readRoot = Joi.object({
    q: tryValidateOrDefault(Joi.string().trim(), ''),
    page: tryValidateOrDefault(Joi.number().integer().min(1), 1),
    per_page: tryValidateOrDefault(Joi.number().integer().min(1).max(100), 20),
    field: tryValidateOrDefault(Joi.valid('created_at', 'name', 'email', 'phone', 'active'), 'created_at'),
    order: tryValidateOrDefault(Joi.valid('1', '-1'), '-1'),
})

// ROLE
export const createRole = Joi.object({
    name: Joi.string()
        .trim()
        .max(MAX_STRING_SIZE)
        .required()
        .label('Name')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function () {
                    const role = await Role.findOne({name: value})
                    return !role ? value : helpers.error('any.exists')
                })
        ),
    description: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Description'),
})

export const updateRole = Joi.object({
    name: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Name'),
    description: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Description'),
})

// TYPE
export const createType = Joi.object({
    class: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Class'),
    name: Joi.string()
        .trim()
        .max(MAX_STRING_SIZE)
        .required()
        .label('Name')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function () {
                    const type = await Type.findOne({name: value})
                    return !type ? value : helpers.error('any.exists')
                })
        ),
    description: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Description'),
})

export const updateType = Joi.object({
    class: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Class'),
    name: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Name'),
    description: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Description'),
})

// INDUSTRY
export const createIndustry = Joi.object({
    name: Joi.string()
        .trim()
        .max(MAX_STRING_SIZE)
        .required()
        .label('Name')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function () {
                    const industry = await Industry.findOne({name: value})
                    return !industry ? value : helpers.error('any.exists')
                })
        ),
    description: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Description'),
})

export const updateIndustry = Joi.object({
    name: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Name'),
    description: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Description'),
})

// EXPERIENCE_LEVELS
export const createExperienceLevel = Joi.object({
    name: Joi.string()
        .trim()
        .max(MAX_STRING_SIZE)
        .required()
        .label('Name')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function () {
                    const experienceLevel = await ExperienceLevel.findOne({name: value})
                    return !experienceLevel ? value : helpers.error('any.exists')
                })
        ),
    description: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Description'),
})
export const updateExperienceLevel = Joi.object({
    name: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Name'),
    description: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Description'),
})

// CATEGORIES
export const createCategory = Joi.object({
    name: Joi.string()
        .trim()
        .max(MAX_STRING_SIZE)
        .required()
        .label('Name')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function () {
                    const category = await Category.findOne({name: value})
                    return !category ? value : helpers.error('any.exists')
                })
        ),
    description: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Description'),
})
export const updateCategory = Joi.object({
    name: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Name'),
    description: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Description'),
})

// SKILLS
export const createSkill = Joi.object({
    category_id: Joi.string()
        .trim()
        .required()
        .label('Category ID')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function () {
                    const category = await Category.findById(new ObjectId(value))
                    return category ? value : helpers.error('any.invalid')
                })
        ),
    name: Joi.string()
        .trim()
        .max(MAX_STRING_SIZE)
        .required()
        .label('Name')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function () {
                    const skill = await Skill.findOne({name: value})
                    return !skill ? value : helpers.error('any.exists')
                })
        ),
    description: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Description'),
    metadata: Joi.object().label('Metadata'),
})
export const updateSkill = Joi.object({
    category_id: Joi.string()
        .trim()
        .required()
        .label('Category ID')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function () {
                    const category = await Category.findById(value)
                    return category ? value : helpers.error('any.invalid')
                })
        ),
    name: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Name'),
    description: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Description'),
    metadata: Joi.object().label('Metadata'),
})
