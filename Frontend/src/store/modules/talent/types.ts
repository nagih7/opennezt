export interface TalentState {
   // RECRUIT TALENTS
   talents: any[]
   formRecruitTalents: {
      keySearch: string
      industry: string
      experienceLevel: string
      category: string
      subcategory: string
      skill: string
      page: number
      perPage: number
   }
   isLoadingRecruitTalents: boolean
   paginationRecruitTalents: {
      currentPage: number
      perPage: number
      totalPage: number
      totalRecord: number
   }
   // TALENT DETAILS
   talentDetails: any | null
   isLoadingGetTalentDetails: boolean
   // REQUEST ADD FRIEND
   isLoadingSendFriendRequest: boolean
   // REPLY FRIEND REQUEST
   isLoadingReplyFriendRequest: boolean
}

export interface TalentFormRecruitPayload {
   keySearch?: string
   industry?: string
   experienceLevel?: string
   category?: string
   subcategory?: string
   skill?: string
   page?: number
   perPage?: number
}

export interface TalentPayload {
   id: string
}
