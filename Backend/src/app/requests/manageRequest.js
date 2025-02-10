import Joi from 'joi'
import {tryValidateOrDefault} from '@/utils/helpers'

export const readRoot = Joi.object({
    q: tryValidateOrDefault(Joi.string().trim(), ''),
    page: tryValidateOrDefault(Joi.number().integer().min(1), 1),
    per_page: tryValidateOrDefault(Joi.number().integer().min(1).max(100), 20),
    field: tryValidateOrDefault(Joi.valid('created_at', 'name', 'email', 'phone', 'active'), 'created_at'),
    order: tryValidateOrDefault(Joi.valid('1', '-1'), '-1'),
})
