export enum SubscriptionStatus {
   UNSUBSCRIBED = 'unsubscribed',
   SUBSCRIBING = 'subscribing',
   SUBSCRIBED = 'subscribed',
   UNSUBSCRIBING = 'unsubscribing',
   ERROR = 'error',
}

export enum NotificationPermissionStatus {
   DEFAULT = 'default',
   GRANTED = 'granted',
   DENIED = 'denied',
}

export interface WebPushConfig {
   vapidPublicKey: string
   serviceWorkerPath: string
   applicationServerEndpoint?: string
   swScope?: string
   enableAnalytics?: boolean
   enablePersistence?: boolean
   autoSubscribe?: boolean
   autoRequestPermission?: boolean
}

export interface SubscriptionInfo {
   endpoint: string
   keys: {
      p256dh: string
      auth: string
   }
   expirationTime: number | null
   createdAt: string
   userId?: string
}

export interface WebPushState {
   status: SubscriptionStatus
   subscription: PushSubscription | null
   subscriptionInfo: SubscriptionInfo | null
   error: string | null
   isLoading: boolean
   isSupported: boolean
   permissionStatus: NotificationPermissionStatus
   registration: ServiceWorkerRegistration | null
}

export interface WebPushContextType extends WebPushState {
   // Actions
   subscribe: () => Promise<boolean>
   unsubscribe: () => Promise<boolean>
   clearError: () => void
   retry: () => Promise<boolean>
   checkPermission: () => Promise<NotificationPermissionStatus>

   // Getters
   getSubscriptionInfo: () => SubscriptionInfo | null
   isReady: boolean
}

export interface WebPushProviderProps {
   children: React.ReactNode
   config: WebPushConfig
   onSubscriptionChange?: (subscription: PushSubscription | null) => void
   onError?: (error: string) => void
   onPermissionChange?: (permission: NotificationPermissionStatus) => void
}
