import Joi from 'joi'
import { ObjectId, Project } from '../../models'
import { AsyncValidate, FileUpload } from '@/utils/classes'

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
    interview: Joi.string()
        .required()
        .label('Interview')
        .custom((value) => {
            return JSON.parse(value)
        }),
    audio: Joi.object({
        mimetype: Joi.string().valid('audio/mpeg', 'audio/wav').required().label('Mimetype'),
    })
        .unknown(true)
        .instance(FileUpload)
        .required()
        .label('Audio file'),
})
export const closeInterview = Joi.object({
    interview: Joi.object().required().label('Interview'),
    storage: Joi.boolean().required().label('Storage'),
    messages: Joi.array().items(Joi.object()).allow(null).label('Messages'),
})
