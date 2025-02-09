import createModel, {ObjectId} from './base'

const ProjectFundingSource = createModel('Project_Funding_Source', 'project_funding_sources', {
    project_id: {
        type: ObjectId,
        ref: 'Project',
        required: true,
    },
    funding_source_id: {
        type: ObjectId,
        ref: 'Funding_Source',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
        enum: ['VND', 'USD', 'EUR'],
    },
})

export default ProjectFundingSource
