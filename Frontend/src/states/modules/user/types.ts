// Define a generic Collection type
export type Collection<T> = Record<string, T>

export interface UserState {
   // INDUSTRIES
   industryFramework: Collection<any>
   isLoadingGetIndustryFramwork: boolean
   // EXPERIENCE_LEVELS
   experienceLevelFramework: Collection<any>
   isLoadingGetExperienceLevelFramwork: boolean
   // CATEGORIES
   categoryFramework: Collection<any>
   subCategoryFramework: Collection<any>
   isLoadingGetCategoryFramework: boolean
   isLoadingGetSubCategoryFramework: boolean
   // SKILLS
   skillFramework: Collection<any>
   isLoadingGetSkillFramework: boolean
   // USER PROFILES
   userProfiles: any[]
   isLoadingGetUserProfiles: boolean
   // USER PROFILE
   userProfile: any
   isLoadingGetuserProfile: boolean
   // SUGGESTED USERS
   suggestedUsers: any[]
   isLoadingGetSuggestedUsers: boolean
   // CONTACT US
   isLoadingPostContactUs: boolean
   // SUBSCRIPTION
   subscription: any
   isLoadingSubscription: boolean
}
