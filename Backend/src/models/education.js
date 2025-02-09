import createModel from './base'

const Education = createModel('Education', 'educations', {
    school: {
        type: String,
        required: true,
    },
    degree: {
        type: String,
        required: true,
    },
    field_of_study: {
        type: String,
        required: true,
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    grade: {
        type: String,
        required: true,
    },
    activities: {
        type: String,
        required: true,
        default: '',
    },
    description: {
        type: String,
        required: true,
        default: '',
    },
})

export default Education
