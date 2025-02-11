import Joi from 'joi'
import {User} from '../../models'
import {MAX_STRING_SIZE, VALIDATE_PHONE_REGEX, MAX_AREAS_STRING_SIZE} from '@/configs'
import {AsyncValidate, FileUpload} from '@/utils/classes'
import {tryValidateOrDefault} from '@/utils/helpers'

export const readRoot = Joi.object({
    q: tryValidateOrDefault(Joi.string().trim(), ''),
    page: tryValidateOrDefault(Joi.number().integer().min(1), 1),
    per_page: tryValidateOrDefault(Joi.number().integer().min(1).max(100), 20),
    field: tryValidateOrDefault(Joi.valid('created_at', 'name', 'email'), 'created_at'),
    order: tryValidateOrDefault(Joi.valid('1', '-1'), '-1'),
})

export const createItem = Joi.object({
    name: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Full name'),
    email: Joi.string()
        .trim()
        .max(MAX_STRING_SIZE)
        .email()
        .required()
        .label('Email')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function () {
                    const user = await User.findOne({email: value})
                    return !user ? value : helpers.error('any.exists')
                })
        ),
    phone: Joi.string()
        .trim()
        .pattern(VALIDATE_PHONE_REGEX)
        .allow('')
        .required()
        .label('Phone number')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function () {
                    const user = await User.findOne({phone: value})
                    return !user ? value : helpers.error('any.exists')
                })
        ),
    password: Joi.string().min(6).max(MAX_STRING_SIZE).required().label('Password'),
})

export const updateItem = Joi.object({
    name: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Full name'),
    email: Joi.string()
        .trim()
        .max(MAX_STRING_SIZE)
        .email()
        .required()
        .label('Email')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function (req) {
                    const userId = req.currentUser._id
                    const user = await User.findOne({email: value, _id: {$ne: userId}})
                    return !user ? value : helpers.error('any.exists')
                })
        ),
    phone: Joi.string()
        .trim()
        .pattern(VALIDATE_PHONE_REGEX)
        .allow('')
        .required()
        .label('Phone number')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function (req) {
                    const userId = req.currentUser._id
                    const user = await User.findOne({phone: value, _id: {$ne: userId}})
                    return !user ? value : helpers.error('any.exists')
                })
        ),
    linkedin: Joi.string().trim().max(MAX_STRING_SIZE).allow('').label('LinkedIn'),
    facebook: Joi.string().trim().max(MAX_STRING_SIZE).allow('').label('Facebook'),
    region: Joi.string().trim().max(MAX_STRING_SIZE).allow('').label('Region'),
    city: Joi.string().trim().max(MAX_STRING_SIZE).allow('').label('City'),
    // avatar: Joi.object({
    //     mimetype: Joi.valid('image/jpeg', 'image/png', 'image/svg+xml', 'image/webp')
    //         .required()
    //         .label('Định dạng ảnh'),
    // })
    //     .unknown(true)
    //     .instance(FileUpload)
    //     .allow('')
    //     .label('Ảnh đại diện'),
    language: Joi.array().items(Joi.string().trim().max(MAX_STRING_SIZE)).required().label('Language'),
})

export const resetPassword = Joi.object({
    new_password: Joi.string().min(6).max(MAX_STRING_SIZE).required().label('New password'),
})

export const createProject = Joi.object({
    name: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Project name'),
    landing_page_url: Joi.string().trim().max(MAX_STRING_SIZE).allow('').label('URL landing page'),
    related_industries: Joi.array()
        .items(Joi.string().trim().max(MAX_STRING_SIZE))
        .required()
        .label('Related industries'),
    stage: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Stage'),
    problem: Joi.string().trim().max(MAX_AREAS_STRING_SIZE).allow('').label('Problem'),
    solution: Joi.string().trim().max(MAX_AREAS_STRING_SIZE).allow('').label('Solution'),
    project_demo_url: Joi.string().trim().max(MAX_STRING_SIZE).allow('').label('Project demo URL'),
    team_intro_url: Joi.string().trim().max(MAX_STRING_SIZE).allow('').label('Team intro URL'),
    // pitch_deck định dạng FileUpload
    pitch_deck: Joi.object({
        mimetype: Joi.valid('application/pdf').required().label('PDF file'),
    })
        .unknown(true)
        .instance(FileUpload)
        .allow('', {})
        .label('Pitch deck'),
    statistics: Joi.string().trim().max(MAX_AREAS_STRING_SIZE).allow('').label('Statistics'),
    revenues: Joi.array().items(
        Joi.object({
            time: Joi.string().trim().max(MAX_STRING_SIZE).allow('').label('Time'),
            revenue: Joi.string().trim().max(MAX_STRING_SIZE).allow('').label('Revenue'),
        })
    ),
    funding_sources: Joi.object({
        friend_and_family: Joi.string().trim().max(MAX_STRING_SIZE).allow('').label('Friend and family'),
        grant: Joi.string().trim().max(MAX_STRING_SIZE).allow('').label('Grant'),
        angel: Joi.string().trim().max(MAX_STRING_SIZE).allow('').label('Angel'),
        venture_capital: Joi.string().trim().max(MAX_STRING_SIZE).allow('').label('Venture capital'),
        other: Joi.string().trim().max(MAX_STRING_SIZE).allow('').label('Other'),
    }),
    target_money: Joi.string().trim().max(MAX_AREAS_STRING_SIZE).allow('').label('Target money'),
    target_audience: Joi.string().trim().max(MAX_AREAS_STRING_SIZE).allow('').label('Target audience'),
    competitors: Joi.string().trim().max(MAX_AREAS_STRING_SIZE).allow('').label('Competitors'),
    competitive_advantage: Joi.string()
        .trim()
        .max(MAX_AREAS_STRING_SIZE)
        .allow('')
        .label('Competitive advantage'),
    why_now: Joi.string().trim().max(MAX_AREAS_STRING_SIZE).allow('').label('Why now'),
    strategy: Joi.string().trim().max(MAX_AREAS_STRING_SIZE).allow('').label('Strategy'),
    milestones: Joi.string().trim().max(MAX_AREAS_STRING_SIZE).allow('').label('Milestones'),
    // background định dạng FileUpload
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

export const getTalentDetails = Joi.object({
    email: Joi.string()
        .trim()
        .lowercase()
        .email()
        .required()
        .label('Email')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function () {
                    const user = await User.findOne({email: value})
                    return user ? value : helpers.error('any.empty')
                })
        ),
})

export const createProfile = Joi.object({
    industry: Joi.array().items(Joi.string().trim().max(MAX_STRING_SIZE)).required().label('Industry'),
    experience_level: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Experience level'),
    degree: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Degree'),
    certification: Joi.array()
        .items(Joi.string().trim().max(MAX_STRING_SIZE))
        .allow('')
        .label('Certification'),
    areas_of_expertise: Joi.object({
        accounting_and_finance: Joi.array()
            .items(Joi.string().trim().max(MAX_STRING_SIZE))
            .allow('')
            .label('Accounting and finance'),
        human_resource: Joi.array()
            .items(Joi.string().trim().max(MAX_STRING_SIZE))
            .allow('')
            .label('Human resource'),
        international: Joi.array()
            .items(Joi.string().trim().max(MAX_STRING_SIZE))
            .allow('')
            .label('International'),
        law_and_legal: Joi.array()
            .items(Joi.string().trim().max(MAX_STRING_SIZE))
            .allow('')
            .label('Law and legal'),
        management: Joi.array().items(Joi.string().trim().max(MAX_STRING_SIZE)).allow('').label('Management'),
        marketing: Joi.array().items(Joi.string().trim().max(MAX_STRING_SIZE)).allow('').label('Marketing'),
        operations: Joi.array().items(Joi.string().trim().max(MAX_STRING_SIZE)).allow('').label('Operations'),
        sales: Joi.array().items(Joi.string().trim().max(MAX_STRING_SIZE)).allow('').label('Sales'),
        starting_up: Joi.array()
            .items(Joi.string().trim().max(MAX_STRING_SIZE))
            .allow('')
            .label('Starting up'),
        sustainability: Joi.array()
            .items(Joi.string().trim().max(MAX_STRING_SIZE))
            .allow('')
            .label('Sustainability'),
        technology_and_internet: Joi.array()
            .items(Joi.string().trim().max(MAX_STRING_SIZE))
            .allow('')
            .label('Technology and internet'),
    }),
    professional_summary: Joi.string()
        .trim()
        .max(MAX_AREAS_STRING_SIZE)
        .allow('')
        .label('Professional summary'),
    career_goals: Joi.string().trim().max(MAX_AREAS_STRING_SIZE).allow('').label('Career goals'),
    offer: Joi.string().trim().max(MAX_AREAS_STRING_SIZE).allow('').label('Offer'),
    expectation: Joi.string().trim().max(MAX_AREAS_STRING_SIZE).allow('').label('Expectation'),
    availability: Joi.valid('Exploring', 'Full-time', 'Part-time', 'All-In', 'Freelance')
        .allow('')
        .label('Availability'),
})

export const recuitTalents = Joi.object({
    keyword: Joi.string().trim().max(MAX_STRING_SIZE).allow('').label('Keyword'),
    sector: Joi.string().trim().max(MAX_STRING_SIZE).allow('').label('Sector'),
    experience_level: Joi.string().trim().max(MAX_STRING_SIZE).allow('').label('Experience level'),
    education_level: Joi.string().trim().max(MAX_STRING_SIZE).allow('').label('Education level'),
    commitment: Joi.string().trim().max(MAX_STRING_SIZE).allow('').label('Commitment'),
    location: Joi.string().trim().max(MAX_STRING_SIZE).allow('').label('Location'),
    language: Joi.string().trim().max(MAX_STRING_SIZE).allow('').label('Language'),
    page: Joi.number().integer().min(0).required().label('Page'),
    // per_page: Joi.number().integer().min(1).max(100).required().label('Per page'),
})

export const updateAvatar = Joi.object({
    avatar: Joi.object({
        mimetype: Joi.valid('image/jpeg', 'image/png', 'image/svg+xml', 'image/webp')
            .required()
            .label('Image format'),
    })
        .unknown(true)
        .instance(FileUpload)
        .required()
        .label('Ảnh đại diện'),
})

export const updateBackground = Joi.object({
    background: Joi.object({
        mimetype: Joi.valid('image/jpeg', 'image/png', 'image/svg+xml', 'image/webp')
            .required()
            .label('Image format'),
    })
        .unknown(true)
        .instance(FileUpload)
        .required()
        .label('Background'),
})
