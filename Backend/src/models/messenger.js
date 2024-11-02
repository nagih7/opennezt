import createModel, {ObjectId} from './base'

const Messenger = createModel('Messenger', 'messengers', {
    senderId: {
        type: ObjectId,
        required: true,
        ref: 'User',
    },
    receiverId: {
        type: ObjectId,
        required: true,
        ref: 'User',
    },
    message: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
})

export default Messenger
