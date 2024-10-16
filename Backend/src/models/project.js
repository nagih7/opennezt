import createModel from './base'

const Project = createModel('Project', 'Projects', {
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: '',
    },
    category: {
        type: String,
        default: '',
    },
    link: {
        type: String,
        default: '',
    },
})

export default Project
