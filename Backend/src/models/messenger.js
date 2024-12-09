// models/messenger.js
import createModel, {ObjectId} from './base'
import User from './user'

const Messenger = createModel('Messenger', 'messengers', {
    sender_id: {
        type: ObjectId,
        required: true,
        ref: User,
    },
    receiver_id: {
        type: ObjectId,
        required: true,
        ref: User,
    },
    content: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
})

export default Messenger
