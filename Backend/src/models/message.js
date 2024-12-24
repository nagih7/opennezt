// models/messenger.js
import createModel, {ObjectId} from './base'
import {Conversation, User} from '@/models'
import {Schema} from 'mongoose'

const Metadata = new Schema(
    {
        type: {
            type: String,
            required: true,
            enum: ['text', 'image', 'file'],
            default: 'text',
        },
        data: {
            type: Object,
            required: true,
            default: {},
        },
        read_by: {
            type: [ObjectId],
            required: true,
            default: [],
        },
    },
    {
        _id: false,
    }
)

const Message = createModel('Message', 'messages', {
    conversation_id: {
        type: ObjectId,
        required: true,
        ref: Conversation,
    },
    user_id: {
        type: ObjectId,
        required: true,
        ref: User,
    },
    content: {
        type: String,
        required: true,
    },
    metadata: {
        type: Metadata,
        required: true,
    },
})

export default Message
