export interface ChatState {
   // ========== CONVERSATIONS ========== //
   conversations: any[]
   isLoadingGetConversations: boolean
   // ========== CONVERSATION ========== //
   conversation: any
   isLoadingGetConversation: boolean
   // ========== MESSAGES ========== //
   isLoadingGetMessages: boolean
}
