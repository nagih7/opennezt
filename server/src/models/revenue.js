import createModel, {ObjectId} from './base'

const Revenue = createModel('Revenue', 'revenues', {
    project_id: {
        type: ObjectId,
        ref: 'Project',
        required: true,
    },
    date: {
        type: Date,
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

export default Revenue
