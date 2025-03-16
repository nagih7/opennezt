import Joi from 'joi'
import {MAX_STRING_SIZE} from '@/configs'
import {AsyncValidate, FileUpload} from '@/utils/classes'
import {FundingSource, Industry, ObjectId, Project, Stage, User} from '@/models'

export const requestAddFriend = Joi.object({
    user_id: Joi.string()
        .required()
        .label('User ID')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async () => {
                    const user = await User.findById(value)
                    return user ? value : helpers.error('any.empty')
                })
        ),

    source_name: Joi.string().max(MAX_STRING_SIZE).required().label('Source Name'),

    metadata: Joi.object({
        project_id: Joi.string().required().label('Project ID'),
        project_name: Joi.string().required().label('Project Name'),
    }).required(),
})

export const seekProjects = Joi.object({
    industry: Joi.string().trim().max(MAX_STRING_SIZE).allow('').label('Industry'),
    stage: Joi.string().trim().max(MAX_STRING_SIZE).allow('').label('Stage'),
    name: Joi.string().trim().max(MAX_STRING_SIZE).allow('').label('Name'),
    page: Joi.number().integer().min(0).default(0).label('Page'),
})

// ========== POST [Project] ========== //
export const createProject = Joi.object({
    name: Joi.string()
        .trim()
        .max(MAX_STRING_SIZE)
        .required()
        .label('Project name')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async (req) => {
                    const project = await Project.findOne({name: value, user_id: req.currentUser._id})
                    return project ? helpers.error('any.empty') : value
                })
        ),
    description: Joi.string().trim().max(MAX_STRING_SIZE).allow('', null).label('Description'),
    industries: Joi.array()
        .required()
        .label('Industry')
        .items(
            Joi.string()
                .trim()
                .required()
                .custom(
                    (value, helpers) =>
                        new AsyncValidate(value, async () => {
                            const industry = await Industry.findById(new ObjectId(value))
                            return industry ? value : helpers.error('any.empty')
                        })
                )
        ),
    stage: Joi.string()
        .trim()
        .required()
        .label('Stage')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async () => {
                    const stage = await Stage.findById(new ObjectId(value))
                    return stage ? value : helpers.error('any.empty')
                })
        ),
    revenues: Joi.array()
        .allow(null)
        .label('Revenue')
        .items(
            Joi.object({
                date: Joi.date().required().label('Date'),
                amount: Joi.number().required().label('Amount'),
                currency: Joi.string().trim().required().label('Currency'),
            })
        ),

    funding_sources: Joi.array()
        .items(
            Joi.object({
                name: Joi.string().trim().required().max(MAX_STRING_SIZE).label('Name'),
                amount: Joi.string().required().label('Amount'),
                currency: Joi.string().trim().required().label('Currency'),
            })
        )
        .allow(null)
        .label('Funding Sources'),
    additional_infos: Joi.array()
        .items(
            Joi.object({
                name: Joi.string().trim().required().max(MAX_STRING_SIZE).label('Name'),
                description: Joi.string().trim().allow('').max(MAX_STRING_SIZE).label('Description'),
                content: Joi.string().trim().required().max(MAX_STRING_SIZE).label('Content'),
            })
        )
        .label('Profile Additional Info')
        .allow(null),
    logo: Joi.object({
        mimetype: Joi.valid('image/jpeg', 'image/png', 'image/svg+xml', 'image/webp')
            .required()
            .label('Image format'),
    })
        .unknown(true)
        .instance(FileUpload)
        .allow('', {}, 'null')
        .label('Logo'),
    background: Joi.object({
        mimetype: Joi.valid('image/jpeg', 'image/png', 'image/svg+xml', 'image/webp')
            .required()
            .label('Image format'),
    })
        .unknown(true)
        .instance(FileUpload)
        .allow('', {}, 'null')
        .label('Background'),
})
