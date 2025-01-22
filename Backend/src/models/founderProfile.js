import createModel, {ObjectId} from './base'
import {Schema} from 'mongoose'
import User from './user'

// Khai báo schema cho AreasOfExpertise
const AreasOfExpertise = new Schema(
    {
        accounting_and_finance: {
            type: [String],
            required: false,
            default: [],
        },
        human_resource: {
            type: [String],
            required: false,
            default: [],
        },
        international: {
            type: [String],
            required: false,
            default: [],
        },
        law_and_legal: {
            type: [String],
            required: false,
            default: [],
        },
        management: {
            type: [String],
            required: false,
            default: [],
        },
        marketing: {
            type: [String],
            required: false,
            default: [],
        },
        operations: {
            type: [String],
            required: false,
            default: [],
        },
        sales: {
            type: [String],
            required: false,
            default: [],
        },
        starting_up: {
            type: [String],
            required: false,
            default: [],
        },
        sustainability: {
            type: [String],
            required: false,
            default: [],
        },
        technology_and_internet: {
            type: [String],
            required: false,
            default: [],
        },
    },
    {
        _id: false,
    }
)

const FounderProfile = createModel('Founder_Profile', 'founder_profiles', {
    user_id: {
        type: ObjectId,
        ref: User,
        required: true,
    },
    industry: {
        type: [String],
        required: true,
    },
    experience_level: {
        type: String,
        required: true,
    },
    degree: {
        type: String,
        required: true,
    },
    certification: {
        type: [String],
        required: false,
    },
    areas_of_expertise: {
        type: AreasOfExpertise,
        required: true,
    },
    professional_summary: {
        type: String,
        required: false,
    },
    career_goals: {
        type: String,
        required: false,
    },
    offer: {
        type: String,
        required: false,
    },
    expectation: {
        type: String,
        required: false,
    },
    availability: {
        type: String,
        required: true,
        enum: ['Exploring', 'Full-time', 'Part-time', 'All-In', 'Freelance'],
    },
})

export default FounderProfile
