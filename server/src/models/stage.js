import createModel from './base'

const Stage = createModel('Stage', 'stages', {
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        default: '',
    },
    success_rate: {
        type: Number,
        required: true,
    },
    avg_funding: {
        type: Number,
        required: true,
        default: 0,
    },
})

export default Stage
