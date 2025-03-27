import createModel, {ObjectId} from './base'

const Friend = createModel('Friend', 'friends', {
    user_id: {
        type: ObjectId,
        required: true,
    },
    friend_id: {
        type: ObjectId,
        required: true,
    },
    last_message_at: {
        type: Date,
        required: true,
        default: Date.now,
    },
    status: {
        type: String,
        required: true,
        default: '',
    },
    is_favorite: {
        type: Boolean,
        required: true,
        default: false,
    },
    metadata: {
        type: Object,
        required: false,
        default: {},
    },
})

export default Friend
