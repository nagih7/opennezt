import createModel from './base'

const ExperienceLevel = createModel('ExperienceLevel', 'experience_levels', {
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
        default: '',
    },
})

export default ExperienceLevel
