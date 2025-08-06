import createModel from './base'

const Organization = createModel('Organization', 'organizations', {
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
    website: {
        type: String,
        required: true,
        default: '',
    },
    contact_email: {
        type: String,
        required: false,
        default: '',
    },
    metadata: {
        type: Object,
        required: true,
        default: {},
    },
})

export default Organization
