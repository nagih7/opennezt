import { createSlice } from '@reduxjs/toolkit';
import { toaster } from 'components/UI/toaster';
import { create } from 'lodash';

const projectSlice = createSlice({
    name: 'Project',

    initialState: {
        title: '',
        // ========== My projects ========== //
        myProjects: [],
        myProjectDetails: {},
        isLoadingCreateNewProject: false,
        formCreateProject: {
            name: '',
            description: '',
            industries: [],
            stage: '',
            revenues: [{ date: '', amount: '', currency: '' }],
            funding_sources: [{ name: '', amount: '', currency: '' }],
            additional_infos: [{ name: '', content: '' }],
            logo: null,
            background: null,
        },
        paginationListMyProjects: {
            currentPage: 1,
            perPage: 6,
            totalPage: 1,
            totalRecord: 0,
        },
        // ========== MY PROJECT DETAILS ========== //
        isLoadingGetListMyProjects: false,
        isLoadingGetMyProjectDetails: false,
        // ========== DELETE MY PROJECT ========== //
        isLoadingDeleteMyProject: false,
        // ========== PROJECT DETAILS ========== //
        projectDetails: {},
        isLoadingGetProjectDetails: false,
        // ========== SEEK PROJECTS ========== //
        projectsBySeek: [],
        isLoadingSeekProjects: false,
        filterSeekProjects: {
            keySearch: '',
            industry: '',
            stage: '',
            page: 1,
            perPage: 6,
        },
        paginationSeekProjects: {
            currentPage: 1,
            perPage: 6,
            totalPage: 1,
            totalRecord: 0,
        },
        // ========== APPLY TO JOIN PROJECT ========== //
        isLoadingApplyToJoinProject: false,
        isOpenModalConfirmApply: false,
        // ========== REQUIREMENT PROJECT ========== //
        formAddProjectRequirement: {
            team_role_id: '',
            role_id: '',
            industry_ids: [],
            experience_level_id: '',
            category_ids: [],
            skill_ids: [],
        },
        isLoadingCreateProjectRequirement: false,
        // ========== SEARCH MY PROJECTS ========== //
        isLoadingSearchMyProjects: false,
        myProjectsBySearch: [],
        // ========= INVITE MEMBER ========== //
        isLoadingInviteMember: false,
        isOpenModalInviteMember: false,
    },
    reducers: {
        setTitle: (state) => ({
            ...state,
            title: 'title',
        }),
        // ========== My projects ========== //
        requestGetListMyProjects: (state) => ({
            ...state,
            isLoadingGetListMyProjects: true,
        }),
        getListMyProjectsSuccess: (state, action) => ({
            ...state,
            myProjects: [...state.myProjects, ...action.payload.data.projects],
            paginationListMyProjects: {
                currentPage: action.payload.data.page,
                perPage: action.payload.data.per_page,
                lastPage: action.payload.data.last_page,
                totalRecord: action.payload.data.total,
            },
            isLoadingGetListMyProjects: false,
        }),
        getListMyProjectsFail: (state) => ({
            ...state,
            isLoadingGetListMyProjects: false,
        }),

        // ========== CREATE NEW PROJECT ========== //
        requestCreateNewProject: (state) => ({
            ...state,
            isLoadingCreateNewProject: true,
        }),
        createNewProjectSuccess: (state, action) => {
            toaster.create({
                title: 'Create project successfully',
                description: 'You have successfully created the project',
                type: 'success',
            });
            window.location.href = `/projects/details/${action.payload.data.project_id}`;
            return {
                ...state,
                isLoadingCreateNewProject: false,
            };
        },
        createNewProjectFail: (state, action) => {
            toaster.create({
                title: `${Object.values(action.payload.data.detail)[0]}`,
                description: 'You have failed to create the project',
                type: 'error',
            });
            return {
                ...state,
                isLoadingCreateNewProject: false,
            };
        },
        // ========== MY PROJECT DETAILS ========== //
        requestGetMyProjectDetails: (state) => ({
            ...state,
            isLoadingGetMyProjectDetails: true,
        }),
        getMyProjectDetailsSuccess: (state, action) => ({
            ...state,
            myProjectDetails: action.payload.data,
            isLoadingGetMyProjectDetails: false,
        }),
        getMyProjectDetailsFail: (state) => ({
            ...state,
            isLoadingGetMyProjectDetails: false,
        }),

        // ========== PROJECT DETAILS ========== //
        requestGetProjectDetails: (state) => ({
            ...state,
            isLoadingGetProjectDetails: true,
        }),
        getProjectDetailsSuccess: (state, action) => ({
            ...state,
            isLoadingGetProjectDetails: false,
            projectDetails: action.payload.data,
        }),
        getProjectDetailsFail: (state) => ({
            ...state,
            isLoadingGetProjectDetails: false,
        }),

        // ========== SEEK PROJECTS ========== //
        requestSeekProjects: (state) => ({
            ...state,
            isLoadingSeekProjects: true,
        }),
        seekProjectsSuccess: (state, action) => ({
            ...state,
            projectsBySeek: action.payload.data.projects,
            isLoadingSeekProjects: false,
            filterSeekProjects: {
                ...state.filterSeekProjects,
                page: action.payload.page,
            },
            paginationSeekProjects: {
                currentPage: action.payload.data.page,
                perPage: action.payload.data.per_page,
                totalPage: action.payload.data.last_page,
                totalRecord: action.payload.data.total,
            },
        }),
        seekProjectsFail: (state) => ({
            ...state,
            isLoadingSeekProjects: false,
        }),
        setFilterSeekProjects: (state, action) => ({
            ...state,
            filterSeekProjects: action.payload,
        }),

        // ========== APPLY TO JOIN PROJECT ========== //
        requestApplyToJoinProject: (state) => ({
            ...state,
            isLoadingApplyToJoinProject: true,
        }),
        applyToJoinProjectSuccess: (state) => {
            toaster.create({
                title: 'Apply to join project successfully',
                description: 'You have successfully applied to join the project',
                type: 'success',
            });
            return {
                ...state,
                isLoadingApplyToJoinProject: false,
                isOpenModalConfirmApply: false,
                projectDetails: {
                    ...state.projectDetails,
                    applied: true,
                },
            };
        },
        applyToJoinProjectFail: (state) => {
            toaster.create({
                title: 'Apply to join project failed',
                description: 'You have failed to apply to join the project',
                type: 'error',
            });
            return {
                ...state,
                isLoadingApplyToJoinProject: false,
            };
        },
        setOpenModalConfirmApply: (state, action) => ({
            ...state,
            isOpenModalConfirmApply: action.payload,
        }),

        // ========== UPDATE PROJECT ========== //
        // ========== DELETE PROJECT ========== //
        requestDeleteMyProject: (state) => ({
            ...state,
            isLoadingDeleteMyProject: true,
        }),
        deleteMyProjectSuccess: (state) => {
            toaster.create({
                title: 'Delete project successfully',
                description: 'You have successfully deleted the project',
                type: 'success',
            });
            window.location.href = '/projects';
            return {
                ...state,
                isLoadingDeleteMyProject: false,
            };
        },
        deleteMyProjectFail: (state) => {
            toaster.create({
                title: 'Delete project failed',
                description: 'You have failed to delete the project',
                type: 'error',
            });
            return {
                ...state,
                isLoadingDeleteMyProject: false,
            };
        },
        // ========== SEEK PROJECTS ========== //
        onChangeFormCreateProject: (state, action) => {
            Object.keys(action.payload).forEach((key) => {
                state.formCreateProject[key] = action.payload[key];
            });
        },
        // ========== REQUIREMENT PROJECT ========== //
        requestCreateProjectRequirement: (state) => ({
            ...state,
            isLoadingCreateProjectRequirement: true,
        }),
        createProjectRequirementSuccess: (state) => {
            toaster.create({
                title: 'Create project requirement successfully',
                description: 'You have successfully created the project requirement',
                type: 'success',
            });
            return {
                ...state,
                isLoadingCreateProjectRequirement: false,
            };
        },
        createProjectRequirementFail: (state) => {
            toaster.create({
                title: 'Create project requirement failed',
                description: 'You have failed to create the project requirement',
                type: 'error',
            });
            return {
                ...state,
                isLoadingCreateProjectRequirement: false,
            };
        },

        // ========== SEARCH MY PROJECTS ========== //
        requestSearchMyProjects: (state) => ({
            ...state,
            isLoadingSearchMyProjects: true,
        }),
        searchMyProjectsSuccess: (state, action) => ({
            ...state,
            myProjectsBySearch: action.payload.data,
            isLoadingSearchMyProjects: false,
        }),
        searchMyProjectsFail: (state) => ({
            ...state,
            isLoadingSearchMyProjects: false,
        }),
        // ========== INVITE MEMBER ========== //
        requestInviteMember: (state) => ({
            ...state,
            isLoadingInviteMember: true,
        }),
        inviteMemberSuccess: (state) => {
            toaster.create({
                title: 'Invite member successfully',
                description: 'You have successfully invited the member',
                type: 'success',
            });
            return {
                ...state,
                isLoadingInviteMember: false,
                isOpenModalInviteMember: false,
            };
        },
        inviteMemberFail: (state, action) => {
            toaster.create({
                title: `${Object.values(action.payload.data.detail)[0]}`,
                description: 'You have failed to invite the member',
                type: 'error',
            });
            return {
                ...state,
                isLoadingInviteMember: false,
            };
        },
        setModalInviteMember: (state, action) => ({
            ...state,
            isOpenModalInviteMember: action.payload,
        }),
    },
});

export const {
    setTitle,
    // ========== My projects ========== //
    requestGetListMyProjects,
    getListMyProjectsSuccess,
    getListMyProjectsFail,
    requestCreateNewProject,
    createNewProjectSuccess,
    createNewProjectFail,
    requestGetMyProjectDetails,
    getMyProjectDetailsSuccess,
    getMyProjectDetailsFail,
    // ========== Projects ========== //
    requestGetProjectDetails,
    getProjectDetailsSuccess,
    getProjectDetailsFail,
    // ========== SEEK PROJECTS ========== //
    requestSeekProjects,
    seekProjectsSuccess,
    seekProjectsFail,
    setFilterSeekProjects,
    // ========== APPLY TO JOIN PROJECT ========== //
    requestApplyToJoinProject,
    applyToJoinProjectSuccess,
    applyToJoinProjectFail,
    setOpenModalConfirmApply,
    // ========== UPDATE PROJECT ========== //
    // ========== DELETE PROJECT ========== //
    requestDeleteMyProject,
    deleteMyProjectSuccess,
    deleteMyProjectFail,
    // ========== SEEK PROJECTS ========== //
    onChangeFormCreateProject,
    // ========== REQUIREMENT PROJECT ========== //
    requestCreateProjectRequirement,
    createProjectRequirementSuccess,
    createProjectRequirementFail,
    // ========== SEARCH MY PROJECTS ========== //
    requestSearchMyProjects,
    searchMyProjectsSuccess,
    searchMyProjectsFail,
    // ========== INVITE MEMBER ========== //
    requestInviteMember,
    inviteMemberSuccess,
    inviteMemberFail,
    setModalInviteMember,
} = projectSlice.actions;

export default projectSlice.reducer;
