import createModel, {ObjectId} from './base'

const Category = createModel('Category', 'categories', {
    name: {
        type: String,
        required: true,
    },
    parent_id: {
        type: ObjectId,
        ref: 'Category',
        required: false,
    },
    subcategories: {
        type: [ObjectId],
        ref: 'Category',
        required: true,
        default: [],
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
