import createModel, {ObjectId} from './base'
import User from './user'

const ChatInvitation = createModel('ChatInvitation', 'chat_invitations', {
    sender_id: {
        type: ObjectId,
        required: true,
        ref: User,
    },
    sender_name: {
        type: String,
        required: true,
    },
    receiver_id: {
        type: ObjectId,
        required: true,
        ref: User,
    },
    receiver_name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'waiting', 'accepted', 'rejected'],
        default: 'waiting',
    },
})

export default ChatInvitation
