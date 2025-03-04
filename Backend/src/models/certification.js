import createModel, {ObjectId} from './base'

const Certification = createModel('Certification', 'certifications', {
    profile_id: {
        type: ObjectId,
        ref: 'Profile',
        required: true,
    },
    organization_id: {
        type: ObjectId,
        ref: 'Organization',
        required: true,
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
    issue_date: {
        type: Date,
        required: true,
    },
    expiration_date: {
        type: Date,
        required: false,
    },
    is_lifetime: {
        type: Boolean,
        required: true,
        default: false,
    },
    verification_url: {
        type: String,
        required: true,
        default: '',
    },
    metadata: {
        type: Object,
        required: true,
        default: {},
    },
})

export default Certification
