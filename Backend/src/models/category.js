import createModel from './base'

const Category = createModel('Category', 'categories', {
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

export default Category
