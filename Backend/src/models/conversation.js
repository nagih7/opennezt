import createModel, {ObjectId} from './base'

const Conversation = createModel('Conversation', 'conversations', {
    member_ids: {
        type: [ObjectId],
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
