import createModel, { ObjectId } from './base'

const ProjectRequirement = createModel('Project_Requirement', 'project_requirements', {
    project_id: {
        type: ObjectId,
        ref: 'Project',
        required: true,
    },
    team_role_ids: {
        type: [ObjectId],
        ref: 'Role',
        required: false,
        default: [],
    },
    role_ids: {
        type: [ObjectId],
        ref: 'Role',
        required: false,
        default: [],
    },
    industry_ids: {
        type: [ObjectId],
        ref: 'Industry',
        required: false,
        default: [],
    },
    experience_level_ids: {
        type: [ObjectId],
        ref: 'Experience_Level',
        required: false,
        default: [],
    },
    // category_ids: {
    //     type: [ObjectId],
    //     ref: 'Category',
    //     required: false,
    //     default: [],
    // },
    // subcategory_ids: {
    //     type: [ObjectId],
    //     ref: 'Subcategory',
    //     required: false,
    //     default: [],
    // },
    skill_ids: {
        type: [ObjectId],
        ref: 'Skill',
        required: false,
        default: [],
    },
    metadata: {
        type: Object,
        required: false,
        default: {},
    },
})

export default ProjectRequirement
