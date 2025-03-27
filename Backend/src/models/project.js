import createModel, {ObjectId} from './base'

const Project = createModel('Project', 'projects', {
    user_id: {
        type: ObjectId,
        required: true,
        ref: 'User',
        index: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
        default: '',
    },
    logo: {
        type: String,
        required: false,
        default: '',
    },
    background: {
        type: String,
        required: false,
    },
    industry_ids: {
        type: [ObjectId],
        ref: 'Industry',
        required: true,
        index: true,
    },
    stage_id: {
        type: ObjectId,
        ref: 'Stage',
        required: true,
        index: true,
    },
    metadata: {
        type: Object,
        required: true,
        default: {},
    },
})

export default Project
