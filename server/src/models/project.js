import { LINK_STATIC_URL } from '@/configs'
import createModel, { ObjectId } from './base'

const Project = createModel(
    'Project',
    'projects',
    {
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
    },
    {
        methods: {
            getBasicInfo() {
                return {
                    _id: this._id,
                    user_id: this.user_id,
                    name: this.name,
                    description: this.description,
                    logo: this.logo ? `${LINK_STATIC_URL}${this.logo}` : '',
                    background: this.background ? `${LINK_STATIC_URL}${this.background}` : '',
                }
            },
        },
    }
)

export default Project
