import Joi from 'joi'
import {User, ObjectId} from '../../models'
// import {MAX_STRING_SIZE, VALIDATE_PHONE_REGEX, MAX_AREAS_STRING_SIZE} from '@/configs'
import {AsyncValidate} from '@/utils/classes'

export const createChatInvitation = Joi.object({
    receiver_id: Joi.string()
        .trim()
        .required()
        .label('ID người nhận')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function () {
                    const user = await User.findOne({_id: new ObjectId(value)})
                    return user ? value : helpers.error('any.empty')
                })
        ),

    receiver_name: Joi.string().trim().required().label('Tên người nhận'),
})
