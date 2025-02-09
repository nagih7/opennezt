// models/messenger.js
import createModel, {ObjectId} from './base'

const Message = createModel('Message', 'messages', {
    conversation_id: {
        type: ObjectId,
        ref: 'Conversation',
        required: true,
    },
    user_id: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    type_id: {
        type: ObjectId,
        ref: 'Type',
        required: true,
    },
    reply_to: {
        type: ObjectId,
        ref: 'Message',
        required: false,
    },
    read_by: {
        type: [ObjectId],
        ref: 'User',
        required: true,
        default: [],
    },
    reaction_ids: {
        type: [ObjectId],
        ref: 'Reaction',
        required: true,
        default: [],
    },
    is_active: {
        type: Boolean,
        required: true,
        default: true,
    },
    pinned: {
        type: Boolean,
        required: true,
        default: false,
    },
    status: {
        type: String,
        required: true,
        enum: ['sent', 'delivered', 'read'],
        default: 'sent',
    },
    metadata: {
        type: Object,
        required: true,
        default: {},
    },
})

export default Message
