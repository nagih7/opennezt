import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProjectState } from './types'

// Define the initial state with TypeScript typing
const initialState: ProjectState = {
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
   // Initialize other properties as needed
   formGetMyProject: {
      keySearch: '',
      industry: '',
      stage: '',
      page: 1,
      perPage: 6,
   },
   isLoadingGetProjectDetails: false,
   formInviteUser: {
      role: '',
      email: '',
   },
   teamMembers: [],
   isLoadingGetTeamMembers: false,
   isLoadingInviteUser: false,
   formInviteTalent: {
      role: '',
      user_id: '',
      expiry_date: '',
   },
}

const projectSlice = createSlice({
   name: 'project',
   initialState,
   reducers: {
      // ========== CREATE NEW PROJECT ========== //
      createNewProject: (state: ProjectState) => ({
         ...state,
         isLoadingCreateNewProject: true,
      }),
      createNewProjectSuccess: (state: ProjectState) => ({
         ...state,
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
      }),
      createNewProjectFail: (state: ProjectState) => ({
         ...state,
         isLoadingCreateNewProject: false,
      }),
      setFormCreateProject: (state: ProjectState, action: PayloadAction<any>) => {
         const { name, value } = action.payload
         return {
            ...state,
            formCreateProject: {
               ...state.formCreateProject,
               [name]: value,
            },
         }
      },
      removeFormCreateProjectItemById: (state: ProjectState, action: PayloadAction<any>) => {
         const { name, index } = action.payload
         // Only allow filtering on properties that are arrays
         const arrayFields = ['revenues', 'funding_sources', 'additional_infos', 'industries'] as const
         if (arrayFields.includes(name as any)) {
            return {
               ...state,
               formCreateProject: {
                  ...state.formCreateProject,
                  [name]: (state.formCreateProject[name as keyof typeof state.formCreateProject] as any[]).filter(
                     (_: any, i: number) => i !== index
                  ),
               },
            }
         }
         return state
      },
      addItemFormCreateProject: (state: ProjectState, action: PayloadAction<any>) => {
         const { name, data } = action.payload
         // Only allow keys that are arrays in formCreateProject
         const arrayFields = ['revenues', 'funding_sources', 'additional_infos', 'industries'] as const
         if (arrayFields.includes(name as any)) {
            return {
               ...state,
               formCreateProject: {
                  ...state.formCreateProject,
                  [name]: [...(state.formCreateProject[name as keyof typeof state.formCreateProject] as any[]), data],
               },
            }
         }
         return state
      },
      updateFormCreateProjectFileById: (state: ProjectState, action: PayloadAction<any>) => {
         const { name, file } = action.payload
         return {
            ...state,
            formCreateProject: {
               ...state.formCreateProject,
               [name]: file,
            },
         }
      },
      // ========== GET MY PROJECT ========== //
      requestGetListMyProjects: (state: ProjectState) => ({
         ...state,
         isLoadingGetListMyProjects: true,
      }),
      getListMyProjectsSuccess: (state: ProjectState, action: PayloadAction<any>) => ({
         ...state,
         myProjects: action.payload.data.projects,
         paginationListMyProjects: {
            currentPage: action.payload.data.page,
            perPage: action.payload.data.per_page,
            totalPage: action.payload.data.total_page,
            totalRecord: action.payload.data.total,
         },
         isLoadingGetListMyProjects: false,
      }),
      getListMyProjectsFail: (state: ProjectState) => ({
         ...state,
         myProjects: [],
         isLoadingGetListMyProjects: false,
      }),
      // SET FORM MY PROJECT
      setFormGetMyProject: (state: ProjectState, action: PayloadAction<any>) => {
         const { event, nameSelect } = action.payload
         if (nameSelect) {
            return {
               ...state,
               formGetMyProject: {
                  ...state.formGetMyProject,
                  [nameSelect]: event.value[0],
                  page: 1,
               },
            }
         }
         return {
            ...state,
            formGetMyProject: {
               ...state.formGetMyProject,
               [event.target.name]: event.target.value,
               page: 1,
            },
         }
      },
      // ===== GET PROJECT DETAILS ===== //
      requestGetProjectDetails: (state: ProjectState) => ({
         ...state,
         isLoadingGetProjectDetails: true,
      }),
      getProjectDetailsSuccess: (state: ProjectState, action: PayloadAction<any>) => ({
         ...state,
         myProjectDetails: action.payload.data,
         isLoadingGetProjectDetails: false,
      }),
      getProjectDetailsFail: (state: ProjectState) => ({
         ...state,
         myProjectDetails: {},
         isLoadingGetProjectDetails: false,
      }),
      // ==== GET TEAM MEMBERS ==== //
      requestGetTeamMembers: (state: ProjectState) => ({
         ...state,
         isLoadingGetTeamMembers: true,
      }),
      getTeamMembersSuccess: (state: ProjectState, action: PayloadAction<any>) => ({
         ...state,
         teamMembers: action.payload.data,
         isLoadingGetTeamMembers: false,
      }),
      getTeamMembersFail: (state: ProjectState) => ({
         ...state,
         teamMembers: [],
         isLoadingGetTeamMembers: false,
      }),
   },
})

export const {
   // ========== CREATE NEW PROJECT ========== //
   createNewProject,
   createNewProjectSuccess,
   createNewProjectFail,
   setFormCreateProject,
   removeFormCreateProjectItemById,
   addItemFormCreateProject,
   updateFormCreateProjectFileById,
   // ========== GET MY PROJECT ========== //
   requestGetListMyProjects,
   getListMyProjectsSuccess,
   getListMyProjectsFail,
   // SET FORM MY PROJECT
   setFormGetMyProject,
   // ===== GET PROJECT DETAILS ===== //
   requestGetProjectDetails,
   getProjectDetailsSuccess,
   getProjectDetailsFail,
   // ==== GET TEAM MEMBERS ==== //
   requestGetTeamMembers,
   getTeamMembersSuccess,
   getTeamMembersFail,
} = projectSlice.actions

export default projectSlice.reducer
