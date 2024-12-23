import createModel, {ObjectId} from './base'

const NotificationFeed = createModel('NotificationFeed', 'notifications_feed', {
    user_id: {
        type: ObjectId,
        required: true,
    },
    source_id: {
        type: ObjectId,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: [
            'project_request',
            'message',
            'message_request',
            'chat_invitation',
            'friend_request',
            'project_invitation',
        ],
    },
    read: {
        type: Boolean,
        default: false,
    },
    metadata: {
        type: Object,
        default: {},
    },
})

export default NotificationFeed
