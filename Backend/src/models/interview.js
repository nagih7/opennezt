import { Schema } from 'mongoose'
import createModel, { ObjectId } from './base'

const messageSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        attachments: {
            type: String,
            default: null,
        },
        type: {
            type: String,
            required: true,
        },
    },
    {
        _id: false,
    }
)

const Interview = createModel('Interview', 'interviews', {
    project_id: {
        type: ObjectId,
        ref: 'Project',
        required: true,
    },
    user_id: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    conversation_id: {
        type: String,
        required: true,
    },
    messages: [messageSchema],
})

export default Interview
