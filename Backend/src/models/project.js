import createModel, {ObjectId} from './base'

const Project = createModel('Project', 'projects', {
    user_id: {
        type: ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: false,
    },
    background: {
        type: String,
        required: false,
    },
    industry_ids: {
        type: [ObjectId],
        ref: 'Industry',
        required: true,
    },
    stage_id: {
        type: ObjectId,
        ref: 'Stage',
        required: true,
    },
    revenue_ids: {
        type: [ObjectId],
        ref: 'Revenue',
        required: true,
        default: [],
    },
    funding_source_ids: {
        type: [ObjectId],
        ref: 'Funding_Source',
        required: true,
        default: [],
    },
    project_additional_info_ids: {
        type: [ObjectId],
        ref: 'Project_Additional_Info',
        required: true,
        default: [],
    },
    member_ids: {
        type: [ObjectId],
        ref: 'Project_Member',
        required: true,
        default: [],
    },
    metadata: {
        type: Object,
        required: true,
        default: {},
    },
})

export default Project
