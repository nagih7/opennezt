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
   paginationListOrganization: PaginationState
   isLoadingGetListRole: boolean
   visibleModalCreateOrUpdateRole: boolean
   isLoadingBtnCreateOrUpdateRole: boolean
   visibleModalDeleteRole: boolean
   isLoadingDeleteRole: boolean
   isLoadingGetListType: boolean
   visibleModalCreateOrUpdateType: boolean
   isLoadingBtnCreateOrUpdateType: boolean
   visibleModalDeleteType: boolean
   isLoadingDeleteType: boolean
   isLoadingGetListIndustry: boolean
   visibleModalCreateOrUpdateIndustry: boolean
   isLoadingBtnCreateOrUpdateIndustry: boolean
   visibleModalDeleteIndustry: boolean
   isLoadingDeleteIndustry: boolean
   isLoadingGetListExperienceLevel: boolean
   visibleModalCreateOrUpdateExperienceLevel: boolean
   isLoadingBtnCreateOrUpdateExperienceLevel: boolean
   visibleModalDeleteExperienceLevel: boolean
   isLoadingDeleteExperienceLevel: boolean
   isLoadingGetListCategory: boolean
   visibleModalCreateOrUpdateCategory: boolean
   isLoadingBtnCreateOrUpdateCategory: boolean
   visibleModalDeleteCategory: boolean
   isLoadingDeleteCategory: boolean
   isLoadingGetListSkill: boolean
   visibleModalCreateOrUpdateSkill: boolean
   isLoadingBtnCreateOrUpdateSkill: boolean
   visibleModalDeleteSkill: boolean
   isLoadingDeleteSkill: boolean
   isLoadingGetSkillCategories: boolean
   isLoadingGetListOrganization: boolean
   visibleModalCreateOrUpdateOrganization: boolean
   isLoadingBtnCreateOrUpdateOrganization: boolean
   visibleModalDeleteOrganization: boolean
   isLoadingDeteleOrganization: boolean
   isLoadingGetListArticle: boolean
   visibleModalDeleteArticle: boolean
   [key: string]: any
}
