import { Schema } from 'mongoose'
import createModel, { ObjectId } from './base'

const MemberSchema = new Schema(
    {
        user_id: {
            type: ObjectId,
            ref: 'User',
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
    },
    {
        _id: false,
    }
)

const Conversation = createModel('Conversation', 'conversations', {
    members: {
        type: [MemberSchema],
        required: true,
    },
    type_id: {
        type: ObjectId,
        ref: 'Type',
        required: true,
    },
    name: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    last_message_id: {
        type: ObjectId,
        ref: 'Message',
        required: false,
    },
    encryption_enabled: {
        type: Boolean,
        required: true,
        default: false,
    },
    data: {
        type: Object,
        required: false,
        default: {},
    },
    metadata: {
        type: Object,
        required: true,
        default: {},
    },
})

export default Conversation
