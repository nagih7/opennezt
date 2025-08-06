import createModel from './base'

const Type = createModel('Type', 'types', {
    class: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
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

export default Type
