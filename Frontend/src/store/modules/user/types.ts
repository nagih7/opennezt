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
   // STAGES
   stageFramework: Collection<any>
   isLoadingGetStageFramework: boolean
   // PROJECT ROLE
   projectRoleFramework: Collection<any>
   projectTeamRoleFramework: Collection<any>
   isLoadingGetProjectRoleFramework: boolean
}
