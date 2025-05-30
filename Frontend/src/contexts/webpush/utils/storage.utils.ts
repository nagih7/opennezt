import { SubscriptionInfo, NotificationPermissionStatus } from '../webpush.types'
import { WEBPUSH_CONSTANTS } from '../webpush.constants'

export const storageUtils = {
   saveSubscription: (subscriptionInfo: SubscriptionInfo | null): void => {
      try {
         if (typeof window === 'undefined') return

         if (subscriptionInfo) {
            localStorage.setItem(WEBPUSH_CONSTANTS.STORAGE_KEY, JSON.stringify(subscriptionInfo))
         } else {
            localStorage.removeItem(WEBPUSH_CONSTANTS.STORAGE_KEY)
         }
      } catch (error) {
         console.warn('Failed to save subscription to storage:', error)
      }
   },

   loadSubscription: (): SubscriptionInfo | null => {
      try {
         if (typeof window === 'undefined') return null

         const stored = localStorage.getItem(WEBPUSH_CONSTANTS.STORAGE_KEY)
         return stored ? JSON.parse(stored) : null
      } catch (error) {
         console.warn('Failed to load subscription from storage:', error)
         return null
      }
   },

   savePermissionStatus: (status: NotificationPermissionStatus): void => {
      try {
         if (typeof window === 'undefined') return
         localStorage.setItem(WEBPUSH_CONSTANTS.PERMISSION_STORAGE_KEY, status)
      } catch (error) {
         console.warn('Failed to save permission status:', error)
      }
   },

   loadPermissionStatus: (): NotificationPermissionStatus | null => {
      try {
         if (typeof window === 'undefined') return null

         const stored = localStorage.getItem(WEBPUSH_CONSTANTS.PERMISSION_STORAGE_KEY)
         return (stored as NotificationPermissionStatus) || null
      } catch (error) {
         console.warn('Failed to load permission status:', error)
         return null
      }
   },

   clearAll: (): void => {
      try {
         if (typeof window === 'undefined') return

         localStorage.removeItem(WEBPUSH_CONSTANTS.STORAGE_KEY)
         localStorage.removeItem(WEBPUSH_CONSTANTS.PERMISSION_STORAGE_KEY)
      } catch (error) {
         console.warn('Failed to clear storage:', error)
      }
   },
}
