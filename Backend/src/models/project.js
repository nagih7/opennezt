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
            required: false,
        },
        grant: {
            type: String,
            required: false,
        },
        angel: {
            type: String,
            required: false,
        },
        venture_capital: {
            type: String,
            required: false,
        },
        other: {
            type: String,
            required: false,
        },
    },
    {
        _id: false,
    }
)

const Members = new Schema(
    {
        user_id: {
            type: ObjectId,
            required: true,
            ref: 'User',
        },
        role: {
            type: String,
            required: true,
            default: 'talent',
        },
        join_at: {
            type: Date,
            required: true,
            default: Date.now,
        },
    },
    {
        _id: false,
    }
)

const Metadata = new Schema(
    {
        members: {
            type: [Members],
            required: true,
            default: [],
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
    metadata: {
        type: Metadata,
        required: true,
        default: {},
    },
    landing_page_url: {
        type: String,
        required: false,
    },
    problem: {
        type: String,
        required: false,
    },
    solution: {
        type: String,
        required: false,
    },
    project_demo_url: {
        type: String,
        required: false,
    },
    team_intro_url: {
        type: String,
        required: false,
    },
    pitch_deck: {
        type: String,
        required: false,
    },
    statistics: {
        type: String,
        required: false,
    },
    revenues: {
        type: [Revernue],
        required: false,
    },
    funding_sources: {
        type: FundingSource,
        required: false,
    },
    target_money: {
        type: String,
        required: false,
    },
    target_audience: {
        type: String,
        required: false,
    },
    competitors: {
        type: String,
        required: false,
    },
    competitive_advantage: {
        type: String,
        required: false,
    },
    why_now: {
        type: String,
        required: false,
    },
    strategy: {
        type: String,
        required: false,
    },
    milestones: {
        type: String,
        required: false,
    },
})

export default Project
