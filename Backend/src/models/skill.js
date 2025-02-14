import createModel, {ObjectId} from './base'

const Skill = createModel('Skill', 'skills', {
    category_id: {
        type: ObjectId,
        ref: 'Category',
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

export default Skill
