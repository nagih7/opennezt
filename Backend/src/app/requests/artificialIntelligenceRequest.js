import Joi from 'joi'
import { Conversation, ObjectId, Project } from '../../models'
import { AsyncValidate } from '@/utils/classes'

export const startInterview = Joi.object({
    project_id: Joi.string()
        .required()
        .label('Project')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function () {
                    const project = await Project.findById(new ObjectId(value))
                    return project ? value : helpers.error('any.exists')
                })
        ),
})

export const replyInterview = Joi.object({
    conversation_id: Joi.string()
        .required()
        .label('Conversation')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function () {
                    const conversation = await Conversation.findById(new ObjectId(value))
                    return conversation ? value : helpers.error('any.exists')
                })
        ),
    content: Joi.string().required().label('Answer'),
})

export const closeInterview = Joi.object({
    conversation_id: Joi.string()
        .required()
        .label('Conversation')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function () {
                    const conversation = await Conversation.findById(new ObjectId(value))
                    return conversation ? value : helpers.error('any.exists')
                })
        ),
})
