import createModel from './base'

const Industry = createModel('Industry', 'industries', {
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
        default: '',
    },
})

export default Industry
