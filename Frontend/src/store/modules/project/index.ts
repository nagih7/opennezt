import { createSlice } from '@reduxjs/toolkit'
import { ProjectState } from './types'
import { toast } from 'sonner'

// Define the initial state with TypeScript typing
const initialState: ProjectState = {
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
   bookmarks: [], // Danh sách project đã bookmark
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
}

const projectSlice = createSlice({
   name: 'project',
   initialState,
   reducers: {
      setTitle: (state) => ({
         ...state,
         title: 'title',
      }),

      // ========== CREATE NEW PROJECT ========== //
      requestCreateNewProject: (state) => ({
         ...state,
         isLoadingCreateNewProject: true,
      }),
      createNewProjectSuccess: (state, action) => {
         toast.success('Create project successfully.')
         window.location.href = `/projects/me/${action.payload.data.project_id}`
         return {
            ...state,
            isLoadingCreateNewProject: false,
         }
      },
      createNewProjectFail: (state, action) => {
         toast.error(`${Object.values(action.payload.data.detail)[0]}`)
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
         toast.success('Apply to join project successfully.')
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
         toast.error('Apply to join project failed.')
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
         toast.success('Delete project successfully.')
         window.location.href = '/projects'
         return {
            ...state,
            isLoadingDeleteMyProject: false,
         }
      },
      deleteMyProjectFail: (state) => {
         toast.error('Delete project failed.')
         return {
            ...state,
            isLoadingDeleteMyProject: false,
         }
      },
      // ========== SEEK PROJECTS ========== //
      onChangeFormCreateProject: (state, action) => {
         Object.keys(action.payload).forEach((key) => {
            if (key in state.formCreateProject) {
               ;(state.formCreateProject as any)[key] = action.payload[key]
            }
         })
      },
      // ========== PROJECT REQUIREMENT - ROLE ========== //
      requestUpdateRoleRequirement: (state) => ({
         ...state,
         isLoadingUpdateRoleRequirement: true,
      }),
      updateRoleRequirementSuccess: (state, action) => {
         toast.success('Update role requirement successfully.')
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
         toast.error('Update role requirement failed.')
         return {
            ...state,
            isLoadingUpdateRoleRequirement: false,
         }
      },
      // ========= PROJECT REQUIREMENT - SKILL ========== //
      requestUpdateSkillRequirement: (state) => ({
         ...state,
         isLoadingUpdateSkillRequirement: true,
      }),
      updateSkillRequirementSuccess: (state, action) => {
         toast.success('Update skill requirement successfully.')
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
         toast.error('Update skill requirement failed.')
         return {
            ...state,
            isLoadingUpdateSkillRequirement: false,
         }
      },
      // ========== HANDLE BOOKMARK PROJECT ========== //
      requestBookmarkProject: (state) => ({
         ...state,
         isLoadingBookmarkProject: true,
      }),
      bookmarkProjectSuccess: (state, action) => {
         // Có thể không cần làm gì ở đây nếu updateBookmarks xử lý
         return {
            ...state,
            isLoadingBookmarkProject: false,
         }
      },
      bookmarkProjectFail: (state) => ({
         ...state,
         isLoadingBookmarkProject: false,
      }),

      // Cập nhật danh sách bookmarks (từ localStorage hoặc sau khi API call)
      updateBookmarks: (state, action) => {
         if (action.payload.bookmarks) {
            // Cập nhật toàn bộ danh sách bookmark từ localStorage
            state.bookmarks = action.payload.bookmarks
         } else {
            // Cập nhật một bookmark cụ thể sau khi API call
            const { project_id, marked } = action.payload
            if (marked === 'yes') {
               // Thêm nếu chưa có
               if (!state.bookmarks.some((b: any) => b.project_id === project_id)) {
                  state.bookmarks.push({ project_id })
               }
            } else {
               // Xóa nếu có
               state.bookmarks = state.bookmarks.filter((bookmark: any) => bookmark.project_id !== project_id)
            }
         }
      },
      // ========== GET USER PROJECT BOOKMARKS ========== //
      requestGetUserProjectBookmarks: (state) => ({
         ...state,
         isLoadingGetProjectBookmarks: true,
      }),
      getUserProjectBookmarksSuccess: (state, action) => ({
         ...state,
         isLoadingGetProjectBookmarks: false,
         // Lưu dữ liệu project bookmarks từ API vào state
         projectBookmarks: action.payload.data || [],
      }),
      getUserProjectBookmarksFail: (state) => ({
         ...state,
         isLoadingGetProjectBookmarks: false,
         projectBookmarks: [], // Reset nếu lỗi
      }),
   },
})

export const {
   // ========= CREATE NEW PROJECT ========== //
   requestCreateNewProject,
   createNewProjectSuccess,
   createNewProjectFail,
   // ========= MY PROJECT DETAILS ========== //
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
   // ======== PROJECT REQUIREMENT - SKILL ========== //
   requestUpdateSkillRequirement,
   updateSkillRequirementSuccess,
   updateSkillRequirementFail,
   // ========== HANDLE BOOKMARK PROJECT ========== //
   requestBookmarkProject,
   bookmarkProjectSuccess,
   bookmarkProjectFail,
   updateBookmarks,
   requestGetUserProjectBookmarks,
   getUserProjectBookmarksSuccess,
   getUserProjectBookmarksFail,
} = projectSlice.actions

export default projectSlice.reducer
