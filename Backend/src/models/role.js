import createModel, {ObjectId} from './base'

const Role = createModel('Role', 'roles', {
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type_id: {
        type: ObjectId,
        ref: 'Role',
        required: true,
    },
    metadata: {
        type: Object,
        required: true,
        default: {},
    },
})

export default Role
