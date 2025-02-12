import createModel, {ObjectId} from './base'

const ProjectMember = createModel('Project_Member', 'project_members', {
    project_id: {
        type: ObjectId,
        ref: 'Project',
        required: true,
    },
    user_id: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    team_role_id: {
        type: ObjectId,
        ref: 'Role',
        required: true,
    },
    role_id: {
        type: ObjectId,
        ref: 'Role',
        required: true,
    },
    metadata: {
        type: Object,
        required: true,
        default: {},
    },
})

export default ProjectMember
