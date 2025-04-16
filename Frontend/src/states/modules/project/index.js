import { createSlice } from '@reduxjs/toolkit'
import { toaster } from 'components/UI/toaster'
import { create } from 'lodash'

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
        isLoadingGetListMyProjects: false,
        paginationListMyProjects: {
            currentPage: 1,
            perPage: 6,
            totalPage: 1,
            totalRecord: 0,
        },
        // ========== PROJECTS PARTICIPATED ========== //
        projectsParticipated: [],
        paginationProjectsParticipated: {
            currentPage: 1,
            perPage: 6,
            totalPage: 1,
            totalRecord: 0,
        },
        isLoadingGetListProjectsParticipated: false,
        // ========== MY PROJECT DETAILS ========== //
        isLoadingGetMyProjectDetails: false,
        // ========= UPDATE PROJECT ========== //
        isLoadingUpdateMyProject: false,
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
        projects: [],
        bookmarks: [], // Danh sách các project đã bookmark
        isLoadingBookmarkProject: false,
        // ========== APPLY TO JOIN PROJECT ========== //
        isLoadingApplyToJoinProject: false,
        isOpenModalConfirmApply: false,
        // ========== PROJECT REQUIREMENT - ROLE  ========== //
        isLoadingUpdateRoleRequirement: false,
        // ========= PROJECT REQUIREMENT - SECTOR  ========== //
        isLoadingUpdateSectorRequirement: false,
        // ========= PROJECT REQUIREMENT - SKILL  ========== //
        isLoadingUpdateSkillRequirement: false,
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
        // ========== PROJECTS PARTICIPATED ========== //
        requestGetListProjectsParticipated: (state) => ({
            ...state,
            isLoadingGetListProjectsParticipated: true,
        }),
        getListProjectsParticipatedSuccess: (state, action) => ({
            ...state,
            projectsParticipated: [...state.projectsParticipated, ...action.payload.data.projects],
            paginationProjectsParticipated: {
                currentPage: action.payload.data.page,
                perPage: action.payload.data.per_page,
                lastPage: action.payload.data.last_page,
                totalRecord: action.payload.data.total,
            },
            isLoadingGetListProjectsParticipated: false,
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
            })
            window.location.href = `/projects/me/${action.payload.data.project_id}/details`
            return {
                ...state,
                isLoadingCreateNewProject: false,
            }
        },
        createNewProjectFail: (state, action) => {
            toaster.create({
                title: `${Object.values(action.payload.data.detail)[0]}`,
                description: 'You have failed to create the project',
                type: 'error',
            })
            return {
                ...state,
                isLoadingCreateNewProject: false,
            }
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

        // ========= UPDATE PROJECT ========== //
        requestUpdateMyProject: (state) => ({
            ...state,
            isLoadingUpdateMyProject: true,
        }),
        updateMyProjectSuccess: (state, action) => {
            toaster.create({
                title: 'Update project successfully',
                type: 'success',
            })
            return {
                ...state,
                myProjectDetails: {
                    ...state.myProjectDetails,
                    ...action.payload.data,
                },
                isLoadingUpdateMyProject: false,
            }
        },
        updateMyProjectFail: (state) => {
            toaster.create({
                title: 'Update project failed',
                type: 'error',
            })
            return {
                ...state,
                isLoadingUpdateMyProject: false,
            }
        },

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
            })
            return {
                ...state,
                isLoadingApplyToJoinProject: false,
                isOpenModalConfirmApply: false,
                projectDetails: {
                    ...state.projectDetails,
                    applied: true,
                },
            }
        },
        applyToJoinProjectFail: (state) => {
            toaster.create({
                title: 'Apply to join project failed',
                description: 'You have failed to apply to join the project',
                type: 'error',
            })
            return {
                ...state,
                isLoadingApplyToJoinProject: false,
            }
        },
        setOpenModalConfirmApply: (state, action) => ({
            ...state,
            isOpenModalConfirmApply: action.payload,
        }),
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
            })
            window.location.href = '/projects'
            return {
                ...state,
                isLoadingDeleteMyProject: false,
            }
        },
        deleteMyProjectFail: (state) => {
            toaster.create({
                title: 'Delete project failed',
                description: 'You have failed to delete the project',
                type: 'error',
            })
            return {
                ...state,
                isLoadingDeleteMyProject: false,
            }
        },
        // ========== SEEK PROJECTS ========== //
        onChangeFormCreateProject: (state, action) => {
            Object.keys(action.payload).forEach((key) => {
                state.formCreateProject[key] = action.payload[key]
            })
        },
        // ========== PROJECT REQUIREMENT - ROLE ========== //
        requestUpdateRoleRequirement: (state) => ({
            ...state,
            isLoadingUpdateRoleRequirement: true,
        }),
        updateRoleRequirementSuccess: (state, action) => {
            toaster.create({
                title: 'Update role requirement successfully',
                type: 'success',
            })
            return {
                ...state,
                projectDetails: {
                    ...state.projectDetails,
                    requirements: {
                        ...state.projectDetails.requirements,
                        team_role_ids: action.payload.data?.teamRoles,
                        role_ids: action.payload.data?.roles,
                    },
                },
                isLoadingUpdateRoleRequirement: false,
            }
        },
        updateRoleRequirementFail: (state) => {
            toaster.create({
                title: 'Update role requirement failed',
                type: 'error',
            })
            return {
                ...state,
                isLoadingUpdateRoleRequirement: false,
            }
        },
        // ========= PROJECT REQUIREMENT - SECTOR ========== //
        requestUpdateSectorRequirement: (state) => ({
            ...state,
            isLoadingUpdateSectorRequirement: true,
        }),
        updateSectorRequirementSuccess: (state, action) => {
            toaster.create({
                title: 'Update sector requirement successfully',
                type: 'success',
            })
            return {
                ...state,
                myProjectDetails: {
                    ...state.myProjectDetails,
                    requirements: {
                        ...state.myProjectDetails.requirements,
                        industry_ids: action.payload.data?.industries,
                        experience_level_ids: action.payload.data?.experienceLevels,
                    },
                },
                isLoadingUpdateSectorRequirement: false,
            }
        },
        updateSectorRequirementFail: (state) => {
            toaster.create({
                title: 'Update sector requirement failed',
                type: 'error',
            })
            return {
                ...state,
                isLoadingUpdateSectorRequirement: false,
            }
        },
        // ========= PROJECT REQUIREMENT - SKILL ========== //
        requestUpdateSkillRequirement: (state) => ({
            ...state,
            isLoadingUpdateSkillRequirement: true,
        }),
        updateSkillRequirementSuccess: (state, action) => {
            toaster.create({
                title: 'Update skill requirement successfully',
                type: 'success',
            })
            return {
                ...state,
                myProjectDetails: {
                    ...state.myProjectDetails,
                    requirements: {
                        ...state.myProjectDetails.requirements,
                        skill_ids: action.payload.data?.skills,
                    },
                },
                isLoadingUpdateSkillRequirement: false,
            }
        },
        updateSkillRequirementFail: (state) => {
            toaster.create({
                title: 'Update skill requirement failed',
                type: 'error',
            })
            return {
                ...state,
                isLoadingUpdateSkillRequirement: false,
            }
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
            })
            return {
                ...state,
                isLoadingInviteMember: false,
                isOpenModalInviteMember: false,
            }
        },
        inviteMemberFail: (state, action) => {
            toaster.create({
                title: `${Object.values(action.payload.data.detail)[0]}`,
                description: 'You have failed to invite the member',
                type: 'error',
            })
            return {
                ...state,
                isLoadingInviteMember: false,
            }
        },
        setModalInviteMember: (state, action) => ({
            ...state,
            isOpenModalInviteMember: action.payload,
        }),
        // ========== HANDLE BOOKMARK PROJECT ========== //
        handleBookmarkProject: (state, action) => {
            const { project_id, marked } = action.payload;

            if (marked === 'yes') {
                // Thêm dự án vào danh sách bookmark
                state.bookmarks.push({ project_id });
                toaster.create({
                    title: 'Project bookmarked successfully',
                    type: 'success',
                });
            } else {
                // Xóa dự án khỏi danh sách bookmark
                state.bookmarks = state.bookmarks.filter(
                    (bookmark) => bookmark.project_id !== project_id
                );
                toaster.create({
                    title: 'Project unbookmarked successfully',
                    type: 'success',
                });
            }
        },

        // ========== UPDATE BOOKMARKS ========== //
        updateBookmarks: (state, action) => {
            const { project_id, marked } = action.payload;

            if (marked === 'yes') {
                // Thêm dự án vào danh sách bookmark nếu chưa có
                const exists = state.bookmarks.some(
                    (bookmark) => bookmark.project_id === project_id
                );
                if (!exists) {
                    state.bookmarks.push({ project_id });
                }
            } else {
                // Xóa dự án khỏi danh sách bookmark
                state.bookmarks = state.bookmarks.filter(
                    (bookmark) => bookmark.project_id !== project_id
                );
            }
        },
    },
})

export const {
    setTitle,
    // ========== My projects ========== //
    requestGetListMyProjects,
    getListMyProjectsSuccess,
    getListMyProjectsFail,
    // ========== PROJECTS PARTICIPATED ========== //
    requestGetListProjectsParticipated,
    getListProjectsParticipatedSuccess,
    getListProjectsParticipatedFail,
    // ========= CREATE NEW PROJECT ========== //
    requestCreateNewProject,
    createNewProjectSuccess,
    createNewProjectFail,
    // ========= MY PROJECT DETAILS ========== //
    requestGetMyProjectDetails,
    getMyProjectDetailsSuccess,
    getMyProjectDetailsFail,
    // ========= UPDATE PROJECT ========== //
    requestUpdateMyProject,
    updateMyProjectSuccess,
    updateMyProjectFail,
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
    // ========== DELETE PROJECT ========== //
    requestDeleteMyProject,
    deleteMyProjectSuccess,
    deleteMyProjectFail,
    // ========== SEEK PROJECTS ========== //
    onChangeFormCreateProject,
    // ========== PROJECT REQUIREMENT - ROLE ========== //
    requestUpdateRoleRequirement,
    updateRoleRequirementSuccess,
    updateRoleRequirementFail,
    // ========= PROJECT REQUIREMENT - SECTOR ========== //
    requestUpdateSectorRequirement,
    updateSectorRequirementSuccess,
    updateSectorRequirementFail,
    // ======== PROJECT REQUIREMENT - SKILL ========== //
    requestUpdateSkillRequirement,
    updateSkillRequirementSuccess,
    updateSkillRequirementFail,
    // ========== SEARCH MY PROJECTS ========== //
    requestSearchMyProjects,
    searchMyProjectsSuccess,
    searchMyProjectsFail,
    // ========== INVITE MEMBER ========== //
    requestInviteMember,
    inviteMemberSuccess,
    inviteMemberFail,
    setModalInviteMember,
    // ========== HANDLE BOOKMARK PROJECT ========== //
    handleBookmarkProject,
    updateBookmarks,
} = projectSlice.actions

export default projectSlice.reducer
