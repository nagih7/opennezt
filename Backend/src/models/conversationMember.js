import createModel, {ObjectId} from './base'

const Conversation = createModel('Conversation_Member', 'conversation_members', {
    user_id: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    conversation_id: {
        type: ObjectId,
        ref: 'Conversation',
        required: true,
    },
    role_id: {
        type: ObjectId,
        ref: 'Role',
        required: true,
    },
    notification_enabled: {
        type: Boolean,
        required: true,
        default: true,
    },
})

export default Conversation
