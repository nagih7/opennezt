// Types for notifications used throughout the application
export interface NotificationMetadata {
   status: string
   read: boolean
   [key: string]: any
}

export interface NotificationType {
   class: string
   name: string
}

export interface NotificationData {
   project?: {
      name: string
      [key: string]: any
   }
   [key: string]: any
}

export interface NotificationUser {
   _id: string
   name: string
   avatar?: string
   [key: string]: any
}

export interface Notification {
   _id: string
   type: NotificationType
   user: NotificationUser
   source_id?: string
   timestamp: string
   metadata: NotificationMetadata
   data: NotificationData
   message?: string
   [key: string]: any
}
