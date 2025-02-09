import createModel from './base'

const FundingSource = createModel('Funding_Source', 'funding_sources', {
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        default: '',
    },
    avg_funding: {
        type: Number,
        required: true,
        default: 0,
    },
})

export default FundingSource
