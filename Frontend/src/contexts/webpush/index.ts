// Main exports
export { WebPushProvider } from './WebpushProvider'
export { WebPushContext } from './WebpushContext'
export { WebPushErrorBoundary } from './WebPushErrorBoundary'

// Hooks
export { useWebPush } from './hooks/useWebpush'
export { useWebPushPermission } from './hooks/useWebpushPermission'

// Types - Explicitly export the config
export type {
   WebPushConfig,
   WebPushContextType,
   WebPushProviderProps,
   SubscriptionInfo,
   WebPushState,
} from './webpush.types'

// Export enums
export { SubscriptionStatus, NotificationPermissionStatus } from './webpush.types'

// Utils (if needed externally)
export { storageUtils } from './utils/storage.utils'
export { analyticsUtils } from './utils/analytics.utils'
export * from './utils/webpush.utils'

// Constants
export { WEBPUSH_CONSTANTS, ERROR_MESSAGES } from './webpush.constants'
