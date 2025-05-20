// Common interfaces used throughout the application

// User related interfaces
export interface User {
   _id: string
   name: string
   email: string
   avatar?: string
   role?: string
   createdAt?: string | Date
   updatedAt?: string | Date
}

// Authentication related interfaces
export interface AuthState {
   isAuthenticated: boolean
   authUser: User | null
   loading: boolean
   error: string | null
}

// Notification related interfaces
export interface NotificationType {
   name: string
}

export interface NotificationMetadata {
   read: boolean
   status: string
}

export interface Notification {
   _id: string
   user: User
   type?: NotificationType
   message?: string
   timestamp: string | Date
   metadata: NotificationMetadata
   createdAt?: string | Date
   updatedAt?: string | Date
}

// Project related interfaces
export interface Member {
   user: User
   role?: string
}

export interface Article {
   _id: string
   title: string
   content?: string
   author?: User
   createdAt?: string | Date
   updatedAt?: string | Date
}

export interface Project {
   _id: string
   name: string
   logo?: string
   background?: string
   description?: string
   members?: Member[]
   articles?: Article[]
   createdAt?: string | Date
   updatedAt?: string | Date
}

// Redux state interfaces
export interface RootState {
   auth: AuthState
   notification: {
      notifications: Notification[]
      isLoadingReplyNotification: boolean
   }
   app: {
      language: string
   }
}

// Component prop interfaces
export interface ChildrenProps {
   children?: React.ReactNode
}
