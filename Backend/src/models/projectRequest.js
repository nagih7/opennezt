import createModel, {ObjectId} from './base'
import User from './user'
import Project from './project'
const ProjectRequest = createModel(
    'ProjectRequest',
    'project_requests',
    {
        sender_id: {
            type: ObjectId,
            ref: User,
            required: true,
        },
        receiver_id: {
            type: ObjectId,
            ref: User,
            required: true,
        },
        sender_name: {
            type: String,
            lowercase: true,
            required: true,
        },
        receiver_name: {
            type: String,
            lowercase: true,
            required: true,
        },
        project_id: {
            type: ObjectId,
            ref: Project,
            required: true,
        },
        role: {
            type: String,
            required: true,
            lowercase: true,
            enum: ['founder', 'co-founder', 'talent', 'investor', 'advisor', 'mentor'],
        },
        status: {
            type: String,
            default: 'pending',
            enum: ['pending', 'waiting', 'accepted', 'rejected', 'expired', 'blocked'],
        },

        token: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
)

export default ProjectRequest
