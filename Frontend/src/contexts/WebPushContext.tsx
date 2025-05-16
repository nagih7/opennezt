import React, { useEffect, useState, useCallback, useMemo, createContext, ReactNode, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { subscribe } from 'api/app'
import urlBase64ToUint8Array from 'utils/webpush/urlBase64ToUint8Array'
import { PUBLIC_VALID_KEY } from 'utils/constants'
import { AppDispatch } from 'store/configureStore'
import { AnyAction } from 'redux'

// Define types for the context value
interface WebPushContextValue {
   isSubscribed: boolean
   subscription: PushSubscription | null
   error: string
   stats: any | null
   subscribeToNotifications: () => Promise<boolean>
   unsubscribeFromNotifications: () => Promise<boolean>
}

// Props for the WebPushProvider component
interface WebPushProviderProps {
   children: ReactNode
}

// Create the context with a default value
export const WebPushContext = createContext<WebPushContextValue | undefined>(undefined)

export const WebPushProvider: React.FC<WebPushProviderProps> = ({ children }) => {
   const dispatch = useDispatch<AppDispatch>()

   // State management
   const [isSubscribed, setIsSubscribed] = useState<boolean>(false)
   const [subscription, setSubscription] = useState<PushSubscription | null>(null)
   const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null)
   const [error, setError] = useState<string>('')
   const [stats, setStats] = useState<any | null>(null)

   // Register Service Worker
   const registerServiceWorker = useCallback(async (): Promise<void> => {
      try {
         const reg = await navigator.serviceWorker.register('/service-worker.js')
         setRegistration(reg)

         // Check for existing subscription
         const existingSubscription = await reg.pushManager.getSubscription()

         if (existingSubscription) {
            setSubscription(existingSubscription)
            setIsSubscribed(true)
         }
      } catch (error) {
         const errorMessage = error instanceof Error ? error.message : 'Unknown error'
         setError(`Unable to register service worker: ${errorMessage}`)
      }
   }, [])

   // Subscribe to notifications
   const subscribeToNotifications = useCallback(async (): Promise<boolean> => {
      // Check if the user has granted permission for notifications
      if (Notification.permission === 'denied') {
         setError('Notifications are blocked. Please enable them in your browser settings.')
         return false
      }

      if (Notification.permission !== 'granted') {
         const permission = await Notification.requestPermission()
         if (permission !== 'granted') {
            setError('Notifications permission denied.')
            return false
         }
      }

      try {
         if (!registration) {
            setError('Service worker not registered.')
            return false
         }

         // Check if already subscribed
         const existingSubscription = await registration.pushManager.getSubscription()
         if (existingSubscription) {
            setSubscription(existingSubscription)
            setIsSubscribed(true)
            return true
         }

         // VAPID public key from backend
         const publicVapidKey = PUBLIC_VALID_KEY
         const convertedVapidKey = urlBase64ToUint8Array(publicVapidKey)
         const newSubscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidKey,
         })

         if (!newSubscription) {
            setError('Failed to subscribe: No subscription returned.')
            return false
         }
         setSubscription(newSubscription)
         setIsSubscribed(true)
         // Send subscription info to server only for new subscriptions
         dispatch(subscribe(newSubscription) as unknown as AnyAction)
         return true
      } catch (error) {
         setError('Unable to subscribe to notifications. Please check browser permissions.')
         return false
      }
   }, [registration, dispatch])

   // Unsubscribe from notifications
   const unsubscribeFromNotifications = useCallback(async (): Promise<boolean> => {
      try {
         if (!subscription) {
            return false
         }

         await subscription.unsubscribe()
         setSubscription(null)
         setIsSubscribed(false)
         // You might want to notify your server about unsubscription
         return true
      } catch (error) {
         setError('Failed to unsubscribe from notifications.')
         return false
      }
   }, [subscription])

   // Initialize service worker and fetch stats
   useEffect(() => {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
         registerServiceWorker()
         // dispatch(fetchStats()).then((result) => {
         //   if (result?.payload) {
         //     setStats(result.payload);
         //   }
         // });
      } else {
         setError('Your browser does not support web push notifications.')
      }

      return () => {}
   }, [registerServiceWorker])

   // Modify the second useEffect to wait for registration
   useEffect(() => {
      // Only attempt to subscribe if not already subscribed AND registration is available
      if (!isSubscribed && registration) {
         subscribeToNotifications()
      }
      return () => {
         // Cleanup logic if needed
      }
   }, [subscribeToNotifications, isSubscribed, registration])

   // Memoize context value to prevent unnecessary re-renders
   const contextValue = useMemo(
      () => ({
         isSubscribed,
         subscription,
         error,
         stats,
         subscribeToNotifications,
         unsubscribeFromNotifications,
      }),
      [isSubscribed, subscription, error, stats, subscribeToNotifications, unsubscribeFromNotifications]
   )

   return <WebPushContext.Provider value={contextValue}>{children}</WebPushContext.Provider>
}

// Custom hook for easier context consumption
export const useWebPush = (): WebPushContextValue => {
   const context = useContext(WebPushContext)
   if (context === undefined) {
      throw new Error('useWebPush must be used within a WebPushProvider')
   }
   return context
}
