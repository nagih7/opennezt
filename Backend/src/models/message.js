// models/messenger.js
import createModel, { ObjectId } from './base'

const Message = createModel(
    'Message',
    'messages',
    {
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
        attachments: {
            type: String,
            required: false,
            default: null,
        },
        type_id: {
            type: ObjectId,
            ref: 'Type',
            required: true,
            default: 'text',
        },
        reply_to: {
            type: ObjectId,
            ref: 'Message',
            required: false,
        },
        read_by: {
            type: [ObjectId],
            ref: 'User',
            required: false,
            default: [],
        },
        reaction_ids: {
            type: [ObjectId],
            ref: 'Reaction',
            required: false,
            default: [],
        },
        is_active: {
            type: Boolean,
            required: true,
            default: true,
        },
        pinned: {
            type: Boolean,
            required: false,
            default: false,
        },
        status: {
            type: String,
            required: true,
            enum: ['sent', 'delivered', 'read'],
            default: 'sent',
        },
        timestamp: {
            type: Date,
            required: true,
            default: Date.now,
        },
        metadata: {
            type: Object,
            required: true,
            default: {},
        },
    },
    {
        virtuals: {
            type: {
                options: {
                    ref: 'Type',
                    localField: 'type_id',
                    foreignField: '_id',
                    justOne: true,
                },
            },
        },
    }
)

export default Message
