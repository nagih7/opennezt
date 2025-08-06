export const WEBPUSH_CONSTANTS = {
   STORAGE_KEY: 'webpush_subscription_info',
   PERMISSION_STORAGE_KEY: 'webpush_permission_status',
   DEFAULT_SW_PATH: '/service-worker.js',
   DEFAULT_SW_SCOPE: '/',
   RETRY_DELAY: 2000,
   MAX_RETRIES: 3,
} as const

export const ERROR_MESSAGES = {
   BROWSER_NOT_SUPPORTED: 'Your browser does not support web push notifications',
   SW_REGISTRATION_FAILED: 'Service worker registration failed',
   PERMISSION_DENIED: 'Notification permission denied',
   SUBSCRIPTION_FAILED: 'Failed to subscribe to notifications',
   UNSUBSCRIPTION_FAILED: 'Failed to unsubscribe from notifications',
   VAPID_KEY_MISSING: 'VAPID public key not configured',
   SW_NOT_REGISTERED: 'Service worker not registered',
} as const
