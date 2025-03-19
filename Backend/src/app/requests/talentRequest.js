import Joi from 'joi'
import {Category, ExperienceLevel, Industry, ObjectId, Skill} from '../../models'
import {MAX_STRING_SIZE} from '@/configs'
import {AsyncValidate} from '@/utils/classes'
import {tryValidateOrDefault} from '@/utils/helpers'

export const recruitTalents = Joi.object({
    q: tryValidateOrDefault(Joi.string().trim(), ''),
    page: tryValidateOrDefault(Joi.number().integer().min(1), 1),
    per_page: tryValidateOrDefault(Joi.number().integer().min(1).max(100), 20),
    field: tryValidateOrDefault(Joi.valid('created_at', 'name', 'email', 'phone', 'active'), 'created_at'),
    order: tryValidateOrDefault(Joi.valid('1', '-1'), '-1'),
    industry_id: Joi.string()
        .trim()
        .max(MAX_STRING_SIZE)
        .allow('')
        .label('Industry')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async () => {
                    const industry = await Industry.findById(new ObjectId(value))
                    return industry ? value : helpers.error('any.invalid')
                })
        ),
    experience_level_id: Joi.string()
        .trim()
        .max(MAX_STRING_SIZE)
        .allow(null, '')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async () => {
                    const experienceLevel = await ExperienceLevel.findById(new ObjectId(value))
                    return experienceLevel ? value : helpers.error('any.invalid')
                })
        ),
    category_id: Joi.string()
        .trim()
        .max(MAX_STRING_SIZE)
        .allow(null, '')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async () => {
                    const category = await Category.findById(new ObjectId(value))
                    return category ? value : helpers.error('any.invalid')
                })
        ),
    subcategory_id: Joi.string()
        .trim()
        .max(MAX_STRING_SIZE)
        .allow(null, '')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async () => {
                    const subcategory = await Category.findById(new ObjectId(value))
                    return subcategory ? value : helpers.error('any.invalid')
                })
        ),
    skill_id: Joi.string()
        .trim()
        .max(MAX_STRING_SIZE)
        .allow(null, '')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async () => {
                    const skill = await Skill.findById(new ObjectId(value))
                    return skill ? value : helpers.error('any.invalid')
                })
        ),
})
