export interface BaseConversationProps {
   _id: string
   type: 'group' | 'direct'
   members: object[]
   name?: string
   last_message?: {
      content: string
      timestamp: string
      user: object
   }
   data?: object
   updated_at?: string
}
