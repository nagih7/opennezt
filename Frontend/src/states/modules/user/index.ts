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
   // USER PROFILES
   userProfiles: [],
   isLoadingGetUserProfiles: false,
   // USER PROFILE
   userProfile: null,
   isLoadingGetuserProfile: false,
   // SUGGESTED USERS
   suggestedUsers: [],
   isLoadingGetSuggestedUsers: false,
   // CONTACT US
   isLoadingPostContactUs: false,
   // SUBSCRIPTION
   subscription: null,
   isLoadingSubscription: false,
}

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      // INDUSTRIES
      requestgetIndustryFramework: (state: UserState) => ({
         ...state,
         isLoadingGetIndustryFramwork: true,
      }),
      getIndustryFrameworkSuccess: (state: UserState, action: PayloadAction<any>) => ({
         ...state,
         isLoadingGetIndustryFramwork: false,
         industryFramework: createListCollection({
            items: action.payload.data.map((industry: any) => ({
               label: industry.name,
               value: industry._id,
            })),
         }),
      }),
      getIndustryFrameworkFail: (state: UserState) => ({
         ...state,
         isLoadingGetIndustryFramwork: false,
      }),
      // EXPERIENCE_LEVELS
      requestgetExperienceLevelFramwork: (state: UserState) => ({
         ...state,
         isLoadingGetExperienceLevelFramwork: true,
      }),
      getExperienceLevelFramworkSuccess: (state: UserState, action: PayloadAction<any>) => ({
         ...state,
         isLoadingGetExperienceLevelFramwork: false,
         experienceLevelFramework: createListCollection({
            items: action.payload.data.map((experienceLevel: any) => ({
               label: experienceLevel.name,
               value: experienceLevel._id,
            })),
         }),
      }),
      getExperienceLevelFramworkFail: (state: UserState) => ({
         ...state,
         isLoadingGetExperienceLevelFramwork: false,
      }),
      // CATEGORIES
      requestGetCategoryFramework: (state: UserState) => ({
         ...state,
         isLoadingGetCategoryFramework: true,
      }),
      getCategoryFrameworkSuccess: (state: UserState, action: PayloadAction<any>) => ({
         ...state,
         isLoadingGetCategoryFramework: false,
         categoryFramework: createListCollection({
            items: action.payload.data.map((category: any) => ({
               label: category.name,
               value: category._id,
            })),
         }),
      }),
      getCategoryFrameworkFail: (state: UserState) => ({
         ...state,
         isLoadingGetCategoryFramework: false,
      }),
      requestGetSubCategoryFramework: (state: UserState) => ({
         ...state,
         isLoadingGetSubCategoryFramework: true,
      }),
      getSubCategoryFrameworkSuccess: (state: UserState, action: PayloadAction<any>) => ({
         ...state,
         isLoadingGetSubCategoryFramework: false,
         subCategoryFramework: createListCollection({
            items: action.payload.data.map((category: any) => ({
               label: category.name,
               value: category._id,
            })),
         }),
      }),
      getSubCategoryFrameworkFail: (state: UserState) => ({
         ...state,
         isLoadingGetSubCategoryFramework: false,
      }),
      // SKILLS
      requestGetSkillFramework: (state: UserState) => ({
         ...state,
         isLoadingGetSkillFramework: true,
      }),
      getSkillFrameworkSuccess: (state: UserState, action: PayloadAction<any>) => ({
         ...state,
         isLoadingGetSkillFramework: false,
         skillFramework: createListCollection({
            items: action.payload.data.map((skill: any) => ({
               label: skill.name,
               value: skill._id,
            })),
         }),
      }),
      getSkillFrameworkFail: (state: UserState) => ({
         ...state,
         isLoadingGetSkillFramework: false,
      }),
      // USER PROFILES
      requestGetUserProfiles: (state: UserState) => ({
         ...state,
         isLoadingGetUserProfiles: true,
      }),
      getUserProfilesSuccess: (state: UserState, action: PayloadAction<any>) => ({
         ...state,
         userProfiles: action.payload.data,
         isLoadingGetUserProfiles: false,
      }),
      getUserProfilesFail: (state: UserState) => ({
         ...state,
         isLoadingGetUserProfiles: false,
      }),
      // USER PROFILE
      requestGetUserProfile: (state: UserState) => ({
         ...state,
         isLoadingGetuserProfile: true,
      }),
      getUserProfileSuccess: (state: UserState, action: PayloadAction<any>) => ({
         ...state,
         userProfile: action.payload.data,
         isLoadingGetuserProfile: false,
      }),
      getUserProfileFail: (state: UserState) => ({
         ...state,
         isLoadingGetuserProfile: false,
      }),
      // SUGGESTED USERS
      requestGetSuggestedUsers: (state: UserState) => ({
         ...state,
         isLoadingGetSuggestedUsers: true,
      }),
      getSuggestedUsersSuccess: (state: UserState, action: PayloadAction<any>) => ({
         ...state,
         suggestedUsers: action.payload.data,
         isLoadingGetSuggestedUsers: false,
      }),
      getSuggestedUsersFail: (state: UserState) => ({
         ...state,
         isLoadingGetSuggestedUsers: false,
      }),
      // CONTACT US
      requestPostContactUs: (state: UserState) => ({
         ...state,
         isLoadingPostContactUs: true,
      }),
      postContactUsSuccess: (state: UserState) => ({
         ...state,
         isLoadingPostContactUs: false,
      }),
      postContactUsFail: (state: UserState) => ({
         ...state,
         isLoadingPostContactUs: false,
      }),
      // SUBSCRIPTION
      requestGetSubscription: (state: UserState) => ({
         ...state,
         isLoadingSubscription: true,
      }),
      getSubscriptionSuccess: (state: UserState, action: PayloadAction<any>) => ({
         ...state,
         subscription: action.payload.data,
         isLoadingSubscription: false,
      }),
      getSubscriptionFail: (state: UserState) => ({
         ...state,
         isLoadingSubscription: false,
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
   // USER PROFILES
   requestGetUserProfiles,
   getUserProfilesSuccess,
   getUserProfilesFail,
   // USER PROFILE
   requestGetUserProfile,
   getUserProfileSuccess,
   getUserProfileFail,
   // SUGGESTED USERS
   requestGetSuggestedUsers,
   getSuggestedUsersSuccess,
   getSuggestedUsersFail,
   // CONTACT US
   requestPostContactUs,
   postContactUsSuccess,
   postContactUsFail,
   // SUBSCRIPTION
   requestGetSubscription,
   getSubscriptionSuccess,
   getSubscriptionFail,
} = userSlice.actions

export default userSlice.reducer
