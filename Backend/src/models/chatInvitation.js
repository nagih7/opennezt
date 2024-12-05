import createModel, {ObjectId} from './base'
import User from './user'

const ChatInvitation = createModel('ChatInvitation', 'chat_invitations', {
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
    status: {
        type: String,
        required: true,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
    },
})

export default ChatInvitation
