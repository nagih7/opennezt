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
})

export default Friend
