import { NOTIFICATIONS } from 'utils/constants'

export type Language = 'EN' | 'VI' | 'ZH'

export interface NotificationUser {
   name?: string
   [key: string]: any
}

export interface NotificationMetadata {
   read?: boolean
   [key: string]: any
}

export interface ProjectData {
   name?: string
   [key: string]: any
}

export interface Notification {
   user?: NotificationUser
   metadata?: NotificationMetadata
   data?: {
      project?: ProjectData
      [key: string]: any
   }
   [key: string]: any
}

export interface NotificationProps {
   notification: Notification
}

export interface AppState {
   language: Language
   [key: string]: any
}

export type NotificationTexts = typeof NOTIFICATIONS
