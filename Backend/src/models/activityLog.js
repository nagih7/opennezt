import createModel, {ObjectId} from './base'

const ActivityLog = createModel(
    'ActivityLog',
    'activity_logs',
    {
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
        metadata: {
            type: Object,
            required: true,
            default: {},
        },
    },
    {
        strict: false,
        timestamps: true,
        versionKey: false,
    }
)

export default ActivityLog
