export interface PaginationState {
   currentPage: number
   perPage: number
   totalPage: number
   totalRecord: number
}

export interface ManageState {
   totalUsers: number
   roles: any[]
   types: any[]
   industries: any[]
   experienceLevels: any[]
   categories: any[]
   skills: any[]
   skillCategories: any[]
   organizations: any[]
   articles: any[]
   previewArticle: any
   paginationListArticle: PaginationState
   paginationListRole: PaginationState
   paginationListType: PaginationState
   paginationListIndustry: PaginationState
   paginationListExperienceLevel: PaginationState
   paginationListCategory: PaginationState
   paginationListSkill: PaginationState
   paginationListSkillCategory: PaginationState
   paginationListOrganization: PaginationState
   isLoadingGetAllUsers: boolean
   isLoadingGetAllArticles: boolean
   isLoadingGetAllRoles: boolean
   isLoadingGetAllTypes: boolean
   isLoadingGetAllIndustries: boolean
   isLoadingGetAllExperienceLevels: boolean
   isLoadingGetAllCategories: boolean
   isLoadingGetAllSkills: boolean
   isLoadingGetAllSkillCategories: boolean
   isLoadingGetAllOrganizations: boolean
   isLoadingCreateNewRole: boolean
   isLoadingCreateNewType: boolean
   isLoadingCreateNewIndustry: boolean
   isLoadingCreateNewExperienceLevel: boolean
   isLoadingCreateNewCategory: boolean
   isLoadingCreateNewSkill: boolean
   isLoadingCreateNewSkillCategory: boolean
   isLoadingCreateNewOrganization: boolean
   isLoadingDeleteRole: boolean
   isLoadingDeleteType: boolean
   isLoadingDeleteIndustry: boolean
   isLoadingDeleteExperienceLevel: boolean
   isLoadingDeleteCategory: boolean
   isLoadingDeleteSkill: boolean
   isLoadingDeleteSkillCategory: boolean
   isLoadingDeleteOrganization: boolean
   isLoadingUpdateRole: boolean
   isLoadingUpdateType: boolean
   isLoadingUpdateIndustry: boolean
   isLoadingUpdateExperienceLevel: boolean
   isLoadingUpdateCategory: boolean
   isLoadingUpdateSkill: boolean
   isLoadingUpdateSkillCategory: boolean
   isLoadingUpdateOrganization: boolean
   [key: string]: any
}
