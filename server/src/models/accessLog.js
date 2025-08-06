import createModel, {ObjectId} from './base'

const AccessLog = createModel('AccessLog', 'access_logs', {
    userId: {
        type: ObjectId,
        required: true,
        ref: 'User',
    },
    projectId: {
        type: ObjectId,
        required: true,
        ref: 'Project',
    },
    action: {
        type: String,
        required: true,
    },
})

export default AccessLog
