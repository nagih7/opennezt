import createModel, {ObjectId} from './base'
import {Schema} from 'mongoose'

const additional_info = new Schema(
    {
        project_id: {
            type: ObjectId,
            ref: 'Project',
            required: false,
        },
    },
    {
        _id: false,
    }
)

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
    additional_info: {
        type: additional_info,
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
