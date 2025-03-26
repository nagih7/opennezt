import createModel, {ObjectId} from './base'
import {Schema} from 'mongoose'

const metadata = new Schema(
    {
        read: {
            type: Boolean,
            required: true,
            default: false,
        },
        status: {
            type: String,
            required: false,
            default: '',
        },
    },
    {
        _id: false,
    }
)

const NotificationFeed = createModel('NotificationFeed', 'notifications_feed', {
    user_id: {
        type: ObjectId,
        required: true,
        index: true,
    },
    source_id: {
        type: ObjectId,
        required: true,
        index: true,
    },
    type_id: {
        type: ObjectId,
        ref: 'Type',
        required: true,
        index: true,
    },
    data: {
        type: Object,
        required: true,
        default: {},
    },
    metadata: {
        type: metadata,
        required: true,
        default: {},
    },
})

export default NotificationFeed
