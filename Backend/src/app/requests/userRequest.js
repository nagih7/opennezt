import Joi from 'joi'
import {User, Project} from '../../models'
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
    name: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Họ và tên'),
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
        .label('Số điện thoại')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function () {
                    const user = await User.findOne({phone: value})
                    return !user ? value : helpers.error('any.exists')
                })
        ),
    password: Joi.string().min(6).max(MAX_STRING_SIZE).required().label('Mật khẩu'),
})

export const updateItem = Joi.object({
    name: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Họ và tên'),
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
        .label('Số điện thoại')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function (req) {
                    const userId = req.currentUser._id
                    const user = await User.findOne({phone: value, _id: {$ne: userId}})
                    return !user ? value : helpers.error('any.exists')
                })
        ),
    linkedIn: Joi.string().trim().max(MAX_STRING_SIZE).allow('').label('LinkedIn'),
    region: Joi.string().trim().max(MAX_STRING_SIZE).allow('').label('Khu vực'),
    city: Joi.string().trim().max(MAX_STRING_SIZE).allow('').label('Thành phố'),
    language: Joi.string().trim().max(MAX_STRING_SIZE).allow('').label('Ngôn ngữ'),
})

export const resetPassword = Joi.object({
    new_password: Joi.string().min(6).max(MAX_STRING_SIZE).required().label('Mật khẩu'),
})

export const createProject = Joi.object({
    name: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Tên dự án'),
    background: Joi.object(),
    landing_page_url: Joi.string().trim().max(MAX_STRING_SIZE).label('URL landing page'),
    related_industries: Joi.array()
        .items(Joi.string().trim().max(MAX_STRING_SIZE))
        .required()
        .label('Các ngành liên quan'),
    stage: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Giai đoạn'),
    problem: Joi.string().trim().max(MAX_AREAS_STRING_SIZE).required().label('Vấn đề'),
    solution: Joi.string().trim().max(MAX_AREAS_STRING_SIZE).required().label('Giải pháp'),
    product_demo_url: Joi.string().trim().max(MAX_STRING_SIZE).required().label('URL demo sản phẩm'),
    team_intro_url: Joi.string().trim().max(MAX_STRING_SIZE).required().label('URL giới thiệu nhóm'),
    pitch_deck: Joi.object({
        mimetype: Joi.valid('application/pdf').label('Định dạng tệp'),
    })
        .unknown(true)
        .instance(FileUpload)
        .allow('')
        .label('Pitch deck'),
    statistics: Joi.string().trim().max(MAX_AREAS_STRING_SIZE).required().label('Thống kê'),
    revenues: Joi.array().items(
        Joi.object({
            time: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Thời gian'),
            revenue: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Doanh thu'),
        })
    ),
    funding_sources: Joi.object({
        friend_and_family: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Bạn bè và gia đình'),
        grant: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Trợ cấp'),
        angel: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Nhà đầu tư thiên thần'),
        venture_capital: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Vốn đầu tư mạo hiểm'),
        other: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Khác'),
    }),
    target_money: Joi.string().trim().max(MAX_AREAS_STRING_SIZE).required().label('Mục tiêu tài chính'),
    target_audience: Joi.string().trim().max(MAX_AREAS_STRING_SIZE).required().label('Đối tượng'),
    competitors: Joi.string().trim().max(MAX_AREAS_STRING_SIZE).required().label('Đối thủ cạnh tranh'),
    competitive_advantage: Joi.string()
        .trim()
        .max(MAX_AREAS_STRING_SIZE)
        .required()
        .label('Lợi thế cạnh tranh'),
    why_now: Joi.string().trim().max(MAX_AREAS_STRING_SIZE).required().label('Tại sao là bây giờ ?'),
    strategy: Joi.string().trim().max(MAX_AREAS_STRING_SIZE).required().label('Chiến lược'),
    milestones: Joi.string().trim().max(MAX_AREAS_STRING_SIZE).required().label('Các mốc thời gian'),
    about_opennezt: Joi.string().trim().max(MAX_AREAS_STRING_SIZE).required().label('Về OpenNezt'),
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

export const inviteMember = Joi.object({
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
    project_id: Joi.string()
        .trim()
        .required()
        .label('ID dự án')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function () {
                    const project = await Project.findOne({
                        _id: value,
                    })
                    return project ? value : helpers.error('any.empty')
                })
        ),

    role_project: Joi.valid(
        'founder',
        'co-founder',
        'talent',
        'investor',
        'advisor',
        'mentor',
        'Founder',
        'Co-founder',
        'Talent',
        'Investor',
        'Advisor',
        'Mentor'
    )
        .required()
        .label('Vai trò'),
})

export const createFounderProfile = Joi.object({
    industry: Joi.array().items(Joi.string().trim().max(MAX_STRING_SIZE)).required().label('Ngành nghề'),
    experience_level: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Kinh nghiệm'),
    degree: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Bằng cấp'),
    certification: Joi.array().items(Joi.string().trim().max(MAX_STRING_SIZE)).required().label('Chứng chỉ'),
    areas_of_expertise: Joi.object({
        accounting_and_finance: Joi.array()
            .items(Joi.string().trim().max(MAX_STRING_SIZE))
            .required()
            .label('Kế toán và tài chính'),
        human_resource: Joi.array()
            .items(Joi.string().trim().max(MAX_STRING_SIZE))
            .required()
            .label('Nhân sự'),
        international: Joi.array()
            .items(Joi.string().trim().max(MAX_STRING_SIZE))
            .required()
            .label('Quốc tế'),
        law_and_legal: Joi.array()
            .items(Joi.string().trim().max(MAX_STRING_SIZE))
            .required()
            .label('Pháp lý'),
        management: Joi.array().items(Joi.string().trim().max(MAX_STRING_SIZE)).required().label('Quản lý'),
        marketing: Joi.array().items(Joi.string().trim().max(MAX_STRING_SIZE)).required().label('Marketing'),
        operations: Joi.array().items(Joi.string().trim().max(MAX_STRING_SIZE)).required().label('Hoạt động'),
        sales: Joi.array().items(Joi.string().trim().max(MAX_STRING_SIZE)).required().label('Bán hàng'),
        starting_up: Joi.array()
            .items(Joi.string().trim().max(MAX_STRING_SIZE))
            .required()
            .label('Khởi nghiệp'),
        sustainability: Joi.array()
            .items(Joi.string().trim().max(MAX_STRING_SIZE))
            .required()
            .label('Bền vững'),
        technology_and_internet: Joi.array()
            .items(Joi.string().trim().max(MAX_STRING_SIZE))
            .required()
            .label('Công nghệ và Internet'),
    }),
    professional_summary: Joi.string()
        .trim()
        .max(MAX_AREAS_STRING_SIZE)
        .required()
        .label('Tóm tắt nghề nghiệp'),
    career_goals: Joi.string().trim().max(MAX_AREAS_STRING_SIZE).required().label('Mục tiêu nghề nghiệp'),
    offer: Joi.string().trim().max(MAX_AREAS_STRING_SIZE).required().label('Đề xuất'),
    expectation: Joi.string().trim().max(MAX_AREAS_STRING_SIZE).required().label('Kỳ vọng'),
    availability: Joi.valid('Exploring', 'Full-time', 'Part-time', 'All-In', 'Freelance')
        .required()
        .label('Thời gian làm việc'),
})

export const recuitTalents = Joi.object({
    sector: Joi.string().trim().max(MAX_STRING_SIZE).allow('').label('Ngành nghề'),
    expertise_level: Joi.string().trim().max(MAX_STRING_SIZE).allow('').label('Kinh nghiệm'),
    education_level: Joi.string().trim().max(MAX_STRING_SIZE).allow('').label('Bằng cấp'),
    commitment: Joi.string().trim().max(MAX_STRING_SIZE).allow('').label('Cam kết'),
    location: Joi.string().trim().max(MAX_STRING_SIZE).allow('').label('Địa điểm'),
    language: Joi.string().trim().max(MAX_STRING_SIZE).allow('').label('Ngôn ngữ'),
    skip: Joi.number().integer().min(0).required().label('Bỏ qua'),
})
