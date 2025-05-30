export interface MemberProps {
   _id: string
   name: string
   avatar?: string
}

export interface DataConversationProps {
   project?: {
      _id: string
      name: string
      logo?: string
   }
}

export interface BaseConversationProps {
   _id: string
   type: 'group' | 'direct'
   members: MemberProps[]
   name?: string
   last_message?: {
      content: string
      timestamp: string
      user: object
   }
   data?: DataConversationProps
   updated_at?: string
}

export interface BaseChatProps {
   _id: string
   type: 'group' | 'direct'
   members: MemberProps[]
   name?: string
   last_message?: {
      content: string
      timestamp: string
      user: object
   }
   data?: DataConversationProps
   updated_at?: string
}

export interface MessageProps {
   _id: string
   conversation_id: string
   content: string
   user: MemberProps
   timestamp: string
   attachments?: {
      type: string
      url: string
   }[]
   reactions?: {
      user: MemberProps
      type: string
   }[]
   replies?: MessageProps[]
   is_deleted?: boolean
   is_edited?: boolean
   is_pinned?: boolean
   is_muted?: boolean
   is_archived?: boolean
   is_active?: boolean
}

export interface ChatProps extends BaseConversationProps {
   logo?: string
   name?: string
   messages?: MessageProps[] | undefined
   description?: string
   created_at?: string
   updated_at?: string
   is_active?: boolean
   is_archived?: boolean
   is_deleted?: boolean
   is_pinned?: boolean
   is_muted?: boolean
   unread_count?: number
}
