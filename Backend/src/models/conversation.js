import { Schema } from 'mongoose'
import createModel, {ObjectId} from './base'
import { fa } from '@faker-js/faker'

const member_ids = new Schema(
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
    },
    {
        _id: false,
    }
)

const Conversation = createModel('Conversation', 'conversations', {
    member_ids: {
        type: [member_ids],
        ref: 'Conversation_Member',
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
    metadata: {
        type: Object,
        required: true,
        default: {},
    },
})

export default Conversation
