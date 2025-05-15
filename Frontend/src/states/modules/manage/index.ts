import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ManageState } from './types'

// Define the initial state with TypeScript typing
const initialState: ManageState = {
   totalUsers: 0,
   roles: [],
   types: [],
   industries: [],
   experienceLevels: [],
   categories: [],
   skills: [],
   skillCategories: [],
   organizations: [],
   articles: [],
   previewArticle: {},
   paginationListArticle: {
      currentPage: 1,
      perPage: 10,
      totalPage: 1,
      totalRecord: 0,
   },
   paginationListRole: {
      currentPage: 1,
      perPage: 10,
      totalPage: 1,
      totalRecord: 0,
   },
   paginationListType: {
      currentPage: 1,
      perPage: 10,
      totalPage: 1,
      totalRecord: 0,
   },
   paginationListIndustry: {
      currentPage: 1,
      perPage: 10,
      totalPage: 1,
      totalRecord: 0,
   },
   paginationListExperienceLevel: {
      currentPage: 1,
      perPage: 10,
      totalPage: 1,
      totalRecord: 0,
   },
   paginationListCategory: {
      currentPage: 1,
      perPage: 10,
      totalPage: 1,
      totalRecord: 0,
   },
   paginationListSkill: {
      currentPage: 1,
      perPage: 10,
      totalPage: 1,
      totalRecord: 0,
   },
   paginationListSkillCategory: {
      currentPage: 1,
      perPage: 10,
      totalPage: 1,
      totalRecord: 0,
   },
   paginationListOrganization: {
      currentPage: 1,
      perPage: 10,
      totalPage: 1,
      totalRecord: 0,
   },
   isLoadingGetAllUsers: false,
   isLoadingGetAllArticles: false,
   isLoadingGetAllRoles: false,
   isLoadingGetAllTypes: false,
   isLoadingGetAllIndustries: false,
   isLoadingGetAllExperienceLevels: false,
   isLoadingGetAllCategories: false,
   isLoadingGetAllSkills: false,
   isLoadingGetAllSkillCategories: false,
   isLoadingGetAllOrganizations: false,
   isLoadingCreateNewRole: false,
   isLoadingCreateNewType: false,
   isLoadingCreateNewIndustry: false,
   isLoadingCreateNewExperienceLevel: false,
   isLoadingCreateNewCategory: false,
   isLoadingCreateNewSkill: false,
   isLoadingCreateNewSkillCategory: false,
   isLoadingCreateNewOrganization: false,
   isLoadingDeleteRole: false,
   isLoadingDeleteType: false,
   isLoadingDeleteIndustry: false,
   isLoadingDeleteExperienceLevel: false,
   isLoadingDeleteCategory: false,
   isLoadingDeleteSkill: false,
   isLoadingDeleteSkillCategory: false,
   isLoadingDeleteOrganization: false,
   isLoadingUpdateRole: false,
   isLoadingUpdateType: false,
   isLoadingUpdateIndustry: false,
   isLoadingUpdateExperienceLevel: false,
   isLoadingUpdateCategory: false,
   isLoadingUpdateSkill: false,
   isLoadingUpdateSkillCategory: false,
   isLoadingUpdateOrganization: false,
}

const manageSlice = createSlice({
   name: 'manage',
   initialState,
   reducers: {
      // GET TOTAL USERS
      requestGetTotalUsers: (state: ManageState) => ({
         ...state,
         isLoadingGetAllUsers: true,
      }),
      getTotalUsersSuccess: (state: ManageState, action: PayloadAction<any>) => ({
         ...state,
         totalUsers: action.payload.data.total,
         isLoadingGetAllUsers: false,
      }),
      getTotalUsersFail: (state: ManageState) => ({
         ...state,
         isLoadingGetAllUsers: false,
      }),

      // GET ALL ROLES
      requestGetAllRoles: (state: ManageState) => ({
         ...state,
         isLoadingGetAllRoles: true,
      }),
      getAllRolesSuccess: (state: ManageState, action: PayloadAction<any>) => ({
         ...state,
         roles: action.payload.data.roles,
         paginationListRole: {
            currentPage: action.payload.data.page,
            perPage: action.payload.data.per_page,
            totalPage: action.payload.data.total_page,
            totalRecord: action.payload.data.total,
         },
         isLoadingGetAllRoles: false,
      }),
      getAllRolesFail: (state: ManageState) => ({
         ...state,
         isLoadingGetAllRoles: false,
      }),

      // CREATE NEW ROLE
      requestCreateNewRole: (state: ManageState) => ({
         ...state,
         isLoadingCreateNewRole: true,
      }),
      createNewRoleSuccess: (state: ManageState) => ({
         ...state,
         isLoadingCreateNewRole: false,
      }),
      createNewRoleFail: (state: ManageState) => ({
         ...state,
         isLoadingCreateNewRole: false,
      }),

      // DELETE ROLE
      requestDeleteRole: (state: ManageState) => ({
         ...state,
         isLoadingDeleteRole: true,
      }),
      deleteRoleSuccess: (state: ManageState) => ({
         ...state,
         isLoadingDeleteRole: false,
      }),
      deleteRoleFail: (state: ManageState) => ({
         ...state,
         isLoadingDeleteRole: false,
      }),

      // UPDATE ROLE
      requestUpdateRole: (state: ManageState) => ({
         ...state,
         isLoadingUpdateRole: true,
      }),
      updateRoleSuccess: (state: ManageState) => ({
         ...state,
         isLoadingUpdateRole: false,
      }),
      updateRoleFail: (state: ManageState) => ({
         ...state,
         isLoadingUpdateRole: false,
      }),

      // Similar patterns for other entities like Types, Industries, ExperienceLevels, etc.
      // Each with their request/success/fail actions for CRUD operations
   },
})

export const {
   // GET TOTAL USERS
   requestGetTotalUsers,
   getTotalUsersSuccess,
   getTotalUsersFail,
   // GET ALL ROLES
   requestGetAllRoles,
   getAllRolesSuccess,
   getAllRolesFail,
   // CREATE NEW ROLE
   requestCreateNewRole,
   createNewRoleSuccess,
   createNewRoleFail,
   // DELETE ROLE
   requestDeleteRole,
   deleteRoleSuccess,
   deleteRoleFail,
   // UPDATE ROLE
   requestUpdateRole,
   updateRoleSuccess,
   updateRoleFail,
   // Add exports for other action creators as needed
} = manageSlice.actions

export default manageSlice.reducer
