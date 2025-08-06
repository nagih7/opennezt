import { createContext } from 'react'
import { WebPushContextType, SubscriptionStatus, NotificationPermissionStatus } from './webpush.types'

export const WebPushContext = createContext<WebPushContextType>({
   // State
   status: SubscriptionStatus.UNSUBSCRIBED,
   subscription: null,
   subscriptionInfo: null,
   error: null,
   isLoading: false,
   isSupported: false,
   permissionStatus: NotificationPermissionStatus.DEFAULT,
   registration: null,
   isReady: false,

   // Actions
   subscribe: async () => false,
   unsubscribe: async () => false,
   clearError: () => {},
   retry: async () => false,
   checkPermission: async () => NotificationPermissionStatus.DEFAULT,
   getSubscriptionInfo: () => null,
})
