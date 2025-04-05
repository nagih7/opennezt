// import { MAX_STRING_SIZE } from '@/configs'
import { NotificationFeed, Type } from '@/models'
import { AsyncValidate } from '@/utils/classes'
import { tryValidateOrDefault } from '@/utils/helpers'
import Joi from 'joi'

export const readRoot = Joi.object({
    q: tryValidateOrDefault(Joi.string().trim(), ''),
    page: tryValidateOrDefault(Joi.number().integer().min(1), 1),
    per_page: tryValidateOrDefault(Joi.number().integer().min(1).max(100), 20),
    order: tryValidateOrDefault(Joi.valid('1', '-1'), '-1'),
})
