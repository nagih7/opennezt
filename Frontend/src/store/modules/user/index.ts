import { createListCollection } from '@chakra-ui/react'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserState } from './types'

// Define the initial state with TypeScript typing
const initialState: UserState = {
   // INDUSTRIES
   industryFramework: createListCollection({
      items: [],
   }),
   isLoadingGetIndustryFramwork: false,
   // EXPERIENCE_LEVELS
   experienceLevelFramework: createListCollection({
      items: [],
   }),
   isLoadingGetExperienceLevelFramwork: false,
   // CATEGORIES
   categoryFramework: createListCollection({
      items: [],
   }),
   subCategoryFramework: createListCollection({
      items: [],
   }),
   isLoadingGetCategoryFramework: false,
   isLoadingGetSubCategoryFramework: false,
   // SKILLS
   skillFramework: createListCollection({
      items: [],
   }),
   isLoadingGetSkillFramework: false,
   // STAGES
   stageFramework: createListCollection({
      items: [],
   }),
   isLoadingGetStageFramework: false,
   // PROJECT ROLE
   projectRoleFramework: createListCollection({
      items: [],
   }),
   projectTeamRoleFramework: createListCollection({
      items: [],
   }),
   isLoadingGetProjectRoleFramework: false,
}

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      // INDUSTRIES
      requestgetIndustryFramework: (state) => ({
         ...state,
         isLoadingGetIndustryFramwork: true,
      }),
      getIndustryFrameworkSuccess: (state, action) => ({
         ...state,
         isLoadingGetIndustryFramwork: false,
         industryFramework: createListCollection({
            items: action.payload.data.map((industry: any) => ({
               label: industry.name,
               value: industry._id,
            })),
         }),
      }),
      getIndustryFrameworkFail: (state) => ({
         ...state,
         isLoadingGetIndustryFramwork: false,
      }),
      // EXPERIENCE_LEVELS
      requestgetExperienceLevelFramwork: (state) => ({
         ...state,
         isLoadingGetExperienceLevelFramwork: true,
      }),
      getExperienceLevelFramworkSuccess: (state, action) => ({
         ...state,
         isLoadingGetExperienceLevelFramwork: false,
         experienceLevelFramework: createListCollection({
            items: action.payload.data.map((experienceLevel: any) => ({
               label: experienceLevel.name,
               value: experienceLevel._id,
            })),
         }),
      }),
      getExperienceLevelFramworkFail: (state) => ({
         ...state,
         isLoadingGetExperienceLevelFramwork: false,
      }),
      // CATEGORIES
      requestGetCategoryFramework: (state) => ({
         ...state,
         isLoadingGetAllCategory: true,
      }),
      getCategoryFrameworkSuccess: (state, action) => ({
         ...state,
         isLoadingGetAllCategory: false,
         categoryFramework: createListCollection({
            items: action.payload.data.map((category: any) => ({
               label: category.name,
               value: category._id,
            })),
         }),
      }),
      getCategoryFrameworkFail: (state) => ({
         ...state,
         isLoadingGetAllCategory: false,
      }),
      requestGetSubCategoryFramework: (state) => ({
         ...state,
         isLoadingGetSubCategoryFramework: true,
      }),
      getSubCategoryFrameworkSuccess: (state, action) => ({
         ...state,
         isLoadingGetSubCategoryFramework: false,
         subCategoryFramework: createListCollection({
            items: action.payload.data.map((category: any) => ({
               label: category.name,
               value: category._id,
            })),
         }),
      }),
      getSubCategoryFrameworkFail: (state) => ({
         ...state,
         isLoadingGetSubCategoryFramework: false,
      }),
      // SKILLS
      requestGetSkillFramework: (state) => ({
         ...state,
         isLoadingGetSkillFramework: true,
      }),
      getSkillFrameworkSuccess: (state, action) => ({
         ...state,
         isLoadingGetSkillFramework: false,
         skillFramework: createListCollection({
            items: action.payload.data.map((skill: any) => ({
               label: skill.name,
               value: skill._id,
            })),
         }),
      }),
      getSkillFrameworkFail: (state) => ({
         ...state,
         isLoadingGetSkillFramework: false,
      }),
      // STAGES
      requestGetStageFramework: (state) => ({
         ...state,
         isLoadingGetStageFramework: true,
      }),
      getStageFrameworkSuccess: (state, action) => ({
         ...state,
         isLoadingGetStageFramework: false,
         stageFramework: createListCollection({
            items: action.payload.data.map((stage: any) => ({
               label: stage.name,
               value: stage._id,
            })),
         }),
      }),
      getStageFrameworkFail: (state) => ({
         ...state,
         isLoadingGetStageFramework: false,
      }),
      // PROJECT ROLE
      requestGetProjectRoleFramework: (state) => ({
         ...state,
         isLoadingGetProjectRoleFramework: true,
      }),
      getProjectRoleFrameworkSuccess: (state, action) => ({
         ...state,
         isLoadingGetProjectRoleFramework: false,
         projectRoleFramework: createListCollection({
            items: action.payload.data.roles.map((role: any) => ({
               label: role.name,
               value: role._id,
            })),
         }),
         projectTeamRoleFramework: createListCollection({
            items: action.payload.data.teamRoles.map((role: any) => ({
               label: role.name,
               value: role._id,
            })),
         }),
      }),
      getProjectRoleFrameworkFail: (state) => ({
         ...state,
         isLoadingGetProjectRoleFramework: false,
      }),
   },
})

export const {
   // INDUSTRIES
   requestgetIndustryFramework,
   getIndustryFrameworkSuccess,
   getIndustryFrameworkFail,
   // EXPERIENCE_LEVELS
   requestgetExperienceLevelFramwork,
   getExperienceLevelFramworkSuccess,
   getExperienceLevelFramworkFail,
   // CATEGORIES
   requestGetCategoryFramework,
   getCategoryFrameworkSuccess,
   getCategoryFrameworkFail,
   requestGetSubCategoryFramework,
   getSubCategoryFrameworkSuccess,
   getSubCategoryFrameworkFail,
   // SKILLS
   requestGetSkillFramework,
   getSkillFrameworkSuccess,
   getSkillFrameworkFail,
   // STAGES
   requestGetStageFramework,
   getStageFrameworkSuccess,
   getStageFrameworkFail,
   // PROJECT ROLE
   requestGetProjectRoleFramework,
   getProjectRoleFrameworkSuccess,
   getProjectRoleFrameworkFail,
} = userSlice.actions

export default userSlice.reducer
