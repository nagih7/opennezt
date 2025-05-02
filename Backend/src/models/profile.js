import createModel, {ObjectId} from './base'
import User from './user'

const Profile = createModel('Profile', 'profiles', {
    user_id: {
        type: ObjectId,
        ref: User,
        required: true,
        index: true,
    },
    industry_ids: {
        type: [ObjectId],
        required: true,
        default: [],
        index: true,
    },
    experience_level_id: {
        type: ObjectId,
        ref: 'Experience_Level',
        required: true,
        index: true,
    },
    category_ids: {
        type: [ObjectId],
        ref: 'Category',
        required: true,
        default: [],
        index: true,
    },
    skill_ids: {
        type: [ObjectId],
        ref: 'Skill',
        required: true,
        default: [],
        index: true,
    },
})

export default Profile
