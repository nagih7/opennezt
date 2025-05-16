// Message types for chat functionality
export interface MessageUser {
   _id: string
   name: string
   avatar?: string
   [key: string]: any
}

export interface Message {
   _id: string
   conversation_id: string
   user: MessageUser
   content: string
   read_by: string[]
   pinned: boolean
   status: 'sent' | 'delivered' | 'read'
   timestamp: string
   [key: string]: any
}
