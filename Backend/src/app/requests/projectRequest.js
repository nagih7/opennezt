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

    industry_ids: Joi.array()
        .items(Joi.string().trim().required())
        .label('Industry IDs')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async () => {
                    const industries = await Industry.find({_id: {$in: value}})
                    return industries.length === value.length ? value : helpers.error('any.empty')
                })
        ),
    stage_id: Joi.string()
        .trim()
        .required()
        .label('Stage ID')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async () => {
                    const stage = await Stage.findById(new ObjectId(value))
                    return stage ? value : helpers.error('any.empty')
                })
        ),
    revenues: Joi.array()
        .items(
            Joi.object({
                date: Joi.date().required().label('Date'),
                amount: Joi.number().required().label('Amount'),
                currency: Joi.string().trim().required().label('Currency'),
            })
        )
        .allow(null)
        .label('Revenues'),
    funding_sources: Joi.array()
        .items(
            Joi.object({
                founding_source_id: Joi.string()
                    .trim()
                    .required()
                    .label('Funding Source ID')
                    .custom(
                        (value, helpers) =>
                            new AsyncValidate(value, async () => {
                                const fundingSource = await FundingSource.findById(new ObjectId(value))
                                return fundingSource ? value : helpers.error('any.empty')
                            })
                    ),
                amount: Joi.number().required().label('Amount'),
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
        .allow('', {})
        .label('Logo'),
    background: Joi.object({
        mimetype: Joi.valid('image/jpeg', 'image/png', 'image/svg+xml', 'image/webp')
            .required()
            .label('Image format'),
    })
        .unknown(true)
        .instance(FileUpload)
        .allow('', {})
        .label('Background'),
})
