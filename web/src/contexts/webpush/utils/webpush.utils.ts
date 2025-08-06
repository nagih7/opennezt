import { SubscriptionInfo } from '../webpush.types'
import { WebPushSubscriptionPayload } from '../../../types/webpush'

export const checkBrowserSupport = (): boolean => {
   return (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      'PushManager' in window &&
      'Notification' in window
   )
}

export const subscriptionToInfo = (subscription: PushSubscription, userId?: string): SubscriptionInfo => {
   const p256dhKey = subscription.getKey('p256dh')
   const authKey = subscription.getKey('auth')

   if (!p256dhKey || !authKey) {
      throw new Error('Failed to extract subscription keys')
   }

   return {
      endpoint: subscription.endpoint,
      keys: {
         p256dh: btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(p256dhKey)))),
         auth: btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(authKey)))),
      },
      expirationTime: subscription.expirationTime,
      createdAt: new Date().toISOString(),
      userId,
   }
}

/**
 * Converts a PushSubscription object to the API payload format
 * This ensures consistent data structure when sending to server
 */
export const subscriptionToApiPayload = (subscription: PushSubscription): WebPushSubscriptionPayload => {
   const p256dhKey = subscription.getKey('p256dh')
   const authKey = subscription.getKey('auth')

   if (!p256dhKey || !authKey) {
      throw new Error('Failed to extract subscription keys from PushSubscription')
   }

   return {
      endpoint: subscription.endpoint,
      expirationTime: subscription.expirationTime,
      keys: {
         p256dh: btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(p256dhKey)))),
         auth: btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(authKey)))),
      },
   }
}

/**
 * Validates that a PushSubscription has all required properties
 */
export const validatePushSubscription = (subscription: PushSubscription): boolean => {
   try {
      if (!subscription || !subscription.endpoint) {
         return false
      }

      const p256dhKey = subscription.getKey('p256dh')
      const authKey = subscription.getKey('auth')

      return !!(p256dhKey && authKey)
   } catch (error) {
      console.error('Error validating PushSubscription:', error)
      return false
   }
}

export const validateConfig = (config: any): boolean => {
   return !!(
      config &&
      typeof config.vapidPublicKey === 'string' &&
      config.vapidPublicKey.length > 0 &&
      typeof config.serviceWorkerPath === 'string'
   )
}

export const delay = (ms: number): Promise<void> => {
   return new Promise((resolve) => setTimeout(resolve, ms))
}
