import createModel, {ObjectId} from './base'
import {Schema} from 'mongoose'

const Members = new Schema(
    {
        user_id: {
            type: ObjectId,
            required: true,
            ref: 'User',
        },
        role: {
            type: String,
            required: true,
        },
    },
    {
        _id: false,
    }
)

const Metadata = new Schema(
    {
        type: {
            type: String,
            required: true,
            enum: ['direct', 'group'],
            default: 'direct',
        },
        data: {
            type: Object,
            required: true,
        },
    },
    {
        _id: false,
    }
)

const conversation = createModel('Conversation', 'conversations', {
    members: {
        type: [Members],
        required: true,
    },
    metadata: {
        type: Metadata,
        required: true,
    },
})

export default conversation
