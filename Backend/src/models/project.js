import createModel, {ObjectId} from './base'
import {Schema} from 'mongoose'

const Revernue = new Schema(
    {
        time: {
            type: Date,
            required: true,
        },
        revenue: {
            type: String,
            required: true,
        },
    },
    {
        _id: false,
    }
)

const FundingSource = new Schema(
    {
        friend_and_family: {
            type: String,
            required: true,
        },
        grant: {
            type: String,
            required: true,
        },
        angel: {
            type: String,
            required: true,
        },
        venture_capital: {
            type: String,
            required: true,
        },
        other: {
            type: String,
            required: true,
        },
    },
    {
        _id: false,
    }
)

const Project = createModel('Project', 'projects', {
    user_id: {
        type: ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: false,
    },
    background: {
        type: String,
        required: true,
    },
    lading_page_url: {
        type: String,
        required: false,
    },
    related_industries: {
        type: [String],
        required: true,
    },
    stage: {
        type: String,
        required: true,
    },
    problem: {
        type: String,
        required: true,
    },
    solution: {
        type: String,
        required: true,
    },
    product_demo_url: {
        type: String,
        required: true,
    },
    team_intro_url: {
        type: String,
        required: true,
    },
    pitch_deck: {
        type: String,
        required: false,
    },
    statistics: {
        type: String,
        required: true,
    },
    revenues: {
        type: [Revernue],
        required: true,
    },
    funding_sources: {
        type: FundingSource,
        required: false,
    },
    target_money: {
        type: String,
        required: true,
    },
    target_audience: {
        type: String,
        required: true,
    },
    competitors: {
        type: String,
        required: true,
    },
    competitive_advantage: {
        type: String,
        required: true,
    },
    why_now: {
        type: String,
        required: true,
    },
    strategy: {
        type: String,
        required: true,
    },
    milestones: {
        type: String,
        required: true,
    },
    about_opennezt: {
        type: String,
        required: true,
    },
})

export default Project
