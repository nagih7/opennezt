import { SubscriptionStatus, NotificationPermissionStatus, SubscriptionInfo } from '../webpush.types'

export type WebPushAction =
   | { type: 'SET_LOADING'; payload: boolean }
   | { type: 'SET_ERROR'; payload: string | null }
   | { type: 'SET_SUBSCRIPTION'; payload: { subscription: PushSubscription | null; info: SubscriptionInfo | null } }
   | { type: 'SET_STATUS'; payload: SubscriptionStatus }
   | { type: 'SET_PERMISSION'; payload: NotificationPermissionStatus }
   | { type: 'SET_REGISTRATION'; payload: ServiceWorkerRegistration | null }
   | { type: 'SET_SUPPORTED'; payload: boolean }
   | { type: 'RESET_STATE' }

export const webPushActions = {
   setLoading: (isLoading: boolean): WebPushAction => ({
      type: 'SET_LOADING',
      payload: isLoading,
   }),

   setError: (error: string | null): WebPushAction => ({
      type: 'SET_ERROR',
      payload: error,
   }),

   setSubscription: (subscription: PushSubscription | null, info: SubscriptionInfo | null): WebPushAction => ({
      type: 'SET_SUBSCRIPTION',
      payload: { subscription, info },
   }),

   setStatus: (status: SubscriptionStatus): WebPushAction => ({
      type: 'SET_STATUS',
      payload: status,
   }),

   setPermission: (permission: NotificationPermissionStatus): WebPushAction => ({
      type: 'SET_PERMISSION',
      payload: permission,
   }),

   setRegistration: (registration: ServiceWorkerRegistration | null): WebPushAction => ({
      type: 'SET_REGISTRATION',
      payload: registration,
   }),

   setSupported: (isSupported: boolean): WebPushAction => ({
      type: 'SET_SUPPORTED',
      payload: isSupported,
   }),

   resetState: (): WebPushAction => ({
      type: 'RESET_STATE',
   }),
}
