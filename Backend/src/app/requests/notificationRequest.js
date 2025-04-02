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

// ========== PUT [Notification - Reply Invitation Member] ========== //
export const replyInvitationMember = Joi.object({
    notification_id: Joi.string()
        .required()
        .label('Notification')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async () => {
                    const notification = await NotificationFeed.findById(value)
                    return notification ? value : helpers.error('any.empty')
                })
        ),

    action_id: Joi.string()
        .required()
        .label('Action')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async () => {
                    const action = await Type.findById(value)
                    return action ? value : helpers.error('any.empty')
                })
        ),
})
