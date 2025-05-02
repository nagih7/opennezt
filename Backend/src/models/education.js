import createModel, {ObjectId} from './base'

const Education = createModel('Education', 'educations', {
    profile_id: {
        type: ObjectId,
        ref: 'Profile',
        required: true,
        index: true,
    },
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
        required: false,
    },
    end_date: {
        type: Date,
        required: false,
    },
    grade: {
        type: String,
        required: false,
    },
    activities: {
        type: String,
        required: false,
    },
})

export default Education
