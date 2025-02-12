import createModel, {ObjectId} from './base'

const ProjectAdditionalInfo = createModel('Project_Additional_Info', 'project_additional_infos', {
    project_id: {
        type: ObjectId,
        ref: 'Project',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        default: '',
    },
    content: {
        type: String,
        required: true,
    },
})

export default ProjectAdditionalInfo
