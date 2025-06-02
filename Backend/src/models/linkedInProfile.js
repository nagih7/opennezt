import createModel, { ObjectId } from './base'

const LinkedInProfile = createModel('LinkedInProfile', 'linkedin_profiles', {
    user_id: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    skills: {
        type: [String],
        default: [],
    },
})

export default LinkedInProfile
