import createModel, {ObjectId} from './base'
import {Schema} from 'mongoose'
import User from './user'

// Khai báo schema cho AreasOfExpertise
const AreasOfExpertise = new Schema(
    {
        accounting_and_finance: {
            type: [String],
            required: true,
        },
        human_resource: {
            type: [String],
            required: true,
        },
        international: {
            type: [String],
            required: true,
        },
        law_and_legal: {
            type: [String],
            required: true,
        },
        management: {
            type: [String],
            required: true,
        },
        marketing: {
            type: [String],
            required: true,
        },
        operations: {
            type: [String],
            required: true,
        },
        sales: {
            type: [String],
            required: true,
        },
        starting_up: {
            type: [String],
            required: true,
        },
        sustainability: {
            type: [String],
            required: true,
        },
        technology_and_internet: {
            type: [String],
            required: true,
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
        required: true,
    },
    career_goals: {
        type: String,
        required: true,
    },
    offer: {
        type: String,
        required: true,
    },
    expectation: {
        type: String,
        required: true,
    },
    availability: {
        type: String,
        required: true,
        enum: ['Exploring', 'Full-time', 'Part-time', 'All-In', 'Freelance'],
    },
})

export default FounderProfile
