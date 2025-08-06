import createModel, { ObjectId } from './base'

const ActivityLog = createModel('ActivityLog', 'activity_logs', {
    user_id: {
        type: ObjectId,
        required: true,
        ref: 'User',
    },
    type_id: {
        type: ObjectId,
        required: true,
        ref: 'Type',
    },
    data: {
        type: Object,
        required: false,
        default: {},
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
})

export default ActivityLog
