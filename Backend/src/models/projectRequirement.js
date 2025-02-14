import createModel, {ObjectId} from './base'

const ProjectRequirement = createModel('Project_Requirement', 'project_requirements', {
    project_id: {
        type: ObjectId,
        ref: 'Project',
        required: true,
    },
    team_role_id: {
        type: ObjectId,
        ref: 'Team_Role',
        required: true,
    },
    role_id: {
        type: ObjectId,
        ref: 'Role',
        required: true,
    },
    industry_ids: {
        type: [ObjectId],
        ref: 'Industry',
        required: true,
    },
    experience_level_id: {
        type: ObjectId,
        ref: 'Experience_Level',
        required: true,
    },
    category_ids: {
        type: [ObjectId],
        ref: 'Category',
        required: true,
    },
    skill_ids: {
        type: [ObjectId],
        ref: 'Skill',
        required: true,
    },
    metadata: {
        type: Object,
        required: true,
        default: {},
    },
})

export default ProjectRequirement
