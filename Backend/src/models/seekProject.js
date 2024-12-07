import createModel, {ObjectId} from './base'
import User from './user'
import Project from './project'
const SeekProject = createModel('SeekProject', 'seek_projects', {
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
    sender_email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
    },
    receiver_email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
    },
    project_id: {
        type: ObjectId,
        ref: Project,
        required: true,
    },
    role_project: {
        type: String,
        required: true,
        lowercase: true,
        enum: ['founder', 'co-founder', 'talent', 'investor', 'advisor', 'mentor'],
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'accepted', 'rejected', 'expired'],
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

export default SeekProject
