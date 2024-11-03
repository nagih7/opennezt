import createModel from './base'

const Project = createModel('Project', 'projects', {
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        default: '',
    },
})

export default Project
