export interface ArtificialIntelligenceState {
   // ========== AI Matching Project ========== //
   projects: any[]
   isLoadingMatchingProjects: boolean
   isOpenModalMatchingProjects: boolean
   // ========== AI Matching Talents ========== //
   talents: any[]
   openModalMatchingTalents: boolean
   loadingMatchingTalents: boolean
   isLoadingConvertSpeechToText: boolean
}
