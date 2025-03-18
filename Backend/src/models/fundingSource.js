import createModel, {ObjectId} from './base'

const FundingSource = createModel('Funding_Source', 'funding_sources', {
    project_id: {
        type: ObjectId,
        ref: 'Project',
        required: true,
    },
    name: {
        type: String,
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

export default FundingSource
