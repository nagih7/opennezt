import createModel, {ObjectId} from './base'
import User from './user'

const FounderProfile = createModel('Founder_Profile', 'founder_profiles', {
    user_id: {
        type: ObjectId,
        ref: User,
        required: true,
    },
    industry_ids: {
        type: [ObjectId],
        required: true,
    },
    experience_level_id: {
        type: ObjectId,
        ref: 'Experience_Level',
        required: true,
    },
    education_ids: {
        type: [ObjectId],
        ref: 'Education',
        required: true,
        default: [],
    },
    certification_ids: {
        type: [ObjectId],
        ref: 'Certification',
        required: true,
        default: [],
    },
    category_ids: {
        type: [ObjectId],
        ref: 'Category',
        required: true,
        default: [],
    },
    skill_ids: {
        type: [ObjectId],
        ref: 'Skill',
        required: true,
        default: [],
    },
    founder_additional_info_ids: {
        type: [ObjectId],
        ref: 'Founder_Additional_Info',
        required: true,
        default: [],
    },
    // professional_summary: {
    //     type: String,
    //     required: false,
    // },
    // career_goals: {
    //     type: String,
    //     required: false,
    // },
    // offer: {
    //     type: String,
    //     required: false,
    // },
    // expectation: {
    //     type: String,
    //     required: false,
    // },
    // availability: {
    //     type: String,
    //     required: true,
    //     enum: ['Exploring', 'Full-time', 'Part-time', 'All-In', 'Freelance'],
    // },
})

export default FounderProfile
