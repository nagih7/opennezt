export interface Revenue {
   date: string
   amount: string
   currency: string
}

export interface FundingSource {
   name: string
   amount: string
   currency: string
}

export interface AdditionalInfo {
   name: string
   content: string
}

export interface ProjectState {
   title: string
   // ========== My projects ========== //
   myProjects: any[]
   myProjectDetails: any
   isLoadingCreateNewProject: boolean
   formCreateProject: {
      name: string
      description: string
      industries: any[]
      stage: string
      revenues: Revenue[]
      funding_sources: FundingSource[]
      additional_infos: AdditionalInfo[]
      logo: File | null
      background: File | null
   }
   isLoadingGetListMyProjects: boolean
   paginationListMyProjects: {
      currentPage: number
      perPage: number
      totalPage: number
      totalRecord: number
   }
   // Add other properties based on the full state
   [key: string]: any
}
