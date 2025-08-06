import React, { useReducer, useCallback, useMemo, useEffect, useRef } from 'react'
import { WebPushContext } from './WebpushContext'
import { WebPushErrorBoundary } from './WebPushErrorBoundary'
import { webPushReducer, initialWebPushState } from './reducers/webpush.reducer'
import { webPushActions } from './reducers/webpush.actions'
import {
   WebPushProviderProps,
   NotificationPermissionStatus,
   SubscriptionStatus,
   WebPushContextType,
} from './webpush.types'
import {
   checkBrowserSupport,
   subscriptionToInfo,
   subscriptionToApiPayload,
   validateConfig,
   delay,
} from './utils/webpush.utils'
import { storageUtils } from './utils/storage.utils'
import { analyticsUtils } from './utils/analytics.utils'
import { createSubscriptionManager } from './utils/subscription-manager.utils'
import urlBase64ToUint8Array from './utils/urlBase64ToUint8Array.js'
import { WEBPUSH_CONSTANTS, ERROR_MESSAGES } from './webpush.constants'

export const WebPushProvider: React.FC<WebPushProviderProps> = ({
   children,
   config,
   onSubscriptionChange,
   onError,
   onPermissionChange,
}) => {
   const [state, dispatchState] = useReducer(webPushReducer, initialWebPushState)
   const retryCountRef = useRef(0)
   const isInitializedRef = useRef(false)

   // Create subscription manager instance
   const subscriptionManager = useMemo(
      () =>
         createSubscriptionManager({
            maxRetries: WEBPUSH_CONSTANTS.MAX_RETRIES,
            retryDelay: WEBPUSH_CONSTANTS.RETRY_DELAY,
            enableAnalytics: config.enableAnalytics,
         }),
      [config.enableAnalytics]
   )

   // Validate config on mount
   useEffect(() => {
      if (!validateConfig(config)) {
         dispatchState(webPushActions.setError('Invalid WebPush configuration'))
         return
      }

      const isSupported = checkBrowserSupport()
      dispatchState(webPushActions.setSupported(isSupported))

      if (!isSupported) {
         dispatchState(webPushActions.setError(ERROR_MESSAGES.BROWSER_NOT_SUPPORTED))
         return
      }

      initializeWebPush()
   }, [config]) // Initialize WebPush
   const initializeWebPush = useCallback(async () => {
      if (isInitializedRef.current) return
      isInitializedRef.current = true

      try {
         dispatchState(webPushActions.setLoading(true)) // Register service worker and request permission
         const registration = await registerServiceWorker()
         const permission = await checkPermissionAndRequest()
         dispatchState(webPushActions.setPermission(permission))
         onPermissionChange?.(permission)

         // Load persisted subscription if enabled
         if (config.enablePersistence) {
            const storedInfo = storageUtils.loadSubscription()
            if (storedInfo && registration) {
               const existingSubscription = await registration.pushManager.getSubscription()
               if (existingSubscription) {
                  dispatchState(webPushActions.setSubscription(existingSubscription, storedInfo))
                  onSubscriptionChange?.(existingSubscription)
               }
            }
         } // Auto-subscribe if permission granted
         if (permission === NotificationPermissionStatus.GRANTED) {
            await subscribeWithRegistration(registration)
         }

         if (config.enableAnalytics) {
            analyticsUtils.trackWebPushEvent('webpush_initialized', {
               supported: state.isSupported,
               permission,
               autoRequested: true,
            })
         }
      } catch (error) {
         const errorMessage = error instanceof Error ? error.message : 'Failed to initialize WebPush'
         dispatchState(webPushActions.setError(errorMessage))
         onError?.(errorMessage)
      } finally {
         dispatchState(webPushActions.setLoading(false))
      }
   }, [config, onSubscriptionChange, onPermissionChange, onError]) // Auto-request permission
   const checkPermissionAndRequest = useCallback(async (): Promise<NotificationPermissionStatus> => {
      if (!('Notification' in window)) {
         throw new Error(ERROR_MESSAGES.BROWSER_NOT_SUPPORTED)
      }

      let permission = Notification.permission as NotificationPermissionStatus // Auto-request permission if configured
      if (permission === NotificationPermissionStatus.DEFAULT && config.autoRequestPermission) {
         try {
            permission = (await Notification.requestPermission()) as NotificationPermissionStatus

            if (config.enableAnalytics) {
               analyticsUtils.trackWebPushEvent('permission_requested', {
                  result: permission,
                  automatic: true,
                  user: 'vuongmanhnghia',
               })
            }
         } catch (error) {
            permission = NotificationPermissionStatus.DENIED
         }
      }

      if (config.enablePersistence) {
         storageUtils.savePermissionStatus(permission)
      }

      return permission
   }, [config])

   // Register Service Worker
   const registerServiceWorker = useCallback(async (): Promise<ServiceWorkerRegistration> => {
      try {
         const swPath = config.serviceWorkerPath || WEBPUSH_CONSTANTS.DEFAULT_SW_PATH
         const swScope = config.swScope || WEBPUSH_CONSTANTS.DEFAULT_SW_SCOPE

         const registration = await navigator.serviceWorker.register(swPath, { scope: swScope })
         await navigator.serviceWorker.ready

         dispatchState(webPushActions.setRegistration(registration))

         if (config.enableAnalytics) {
            analyticsUtils.trackWebPushEvent('service_worker_registered', {
               scope: swScope,
            })
         }

         return registration
      } catch (error) {
         const errorMessage = `${ERROR_MESSAGES.SW_REGISTRATION_FAILED}: ${error instanceof Error ? error.message : 'Unknown error'}`
         dispatchState(webPushActions.setError(errorMessage))
         throw new Error(errorMessage)
      }
   }, [config])

   // Check permission
   const checkPermission = useCallback(async (): Promise<NotificationPermissionStatus> => {
      if (!('Notification' in window)) {
         throw new Error(ERROR_MESSAGES.BROWSER_NOT_SUPPORTED)
      }

      let permission = Notification.permission as NotificationPermissionStatus

      if (permission === NotificationPermissionStatus.DEFAULT) {
         permission = (await Notification.requestPermission()) as NotificationPermissionStatus
      }

      dispatchState(webPushActions.setPermission(permission))
      onPermissionChange?.(permission)

      if (config.enablePersistence) {
         storageUtils.savePermissionStatus(permission)
      }

      return permission
   }, [config.enablePersistence, onPermissionChange]) // Subscribe with registration
   const subscribeWithRegistration = useCallback(
      async (registration: ServiceWorkerRegistration): Promise<boolean> => {
         try {
            dispatchState(webPushActions.setLoading(true))
            dispatchState(webPushActions.setStatus(SubscriptionStatus.SUBSCRIBING))
            dispatchState(webPushActions.setError(null))

            // Check permission
            const permission = await checkPermission()
            if (permission === NotificationPermissionStatus.DENIED) {
               dispatchState(webPushActions.setError(ERROR_MESSAGES.PERMISSION_DENIED))
               return false
            }

            if (permission !== NotificationPermissionStatus.GRANTED) {
               dispatchState(webPushActions.setError(ERROR_MESSAGES.PERMISSION_DENIED))
               return false
            } // Check for existing subscription
            const existingSubscription = await registration.pushManager.getSubscription()
            if (existingSubscription) {
               const subscriptionInfo = subscriptionToInfo(existingSubscription)
               dispatchState(webPushActions.setSubscription(existingSubscription, subscriptionInfo))

               if (config.enablePersistence) {
                  storageUtils.saveSubscription(subscriptionInfo)
               }

               onSubscriptionChange?.(existingSubscription)
               return true
            }

            // Validate VAPID key (Base64URL format = 87 characters)
            if (!config.vapidPublicKey || config.vapidPublicKey.length !== 87) {
               throw new Error(`${ERROR_MESSAGES.VAPID_KEY_MISSING}: Invalid VAPID key length`)
            }

            // Create new subscription
            const applicationServerKey = urlBase64ToUint8Array(config.vapidPublicKey)
            const newSubscription = await registration.pushManager.subscribe({
               userVisibleOnly: true,
               applicationServerKey,
            }) // Save and track subscription
            const subscriptionInfo = subscriptionToInfo(newSubscription)
            dispatchState(webPushActions.setSubscription(newSubscription, subscriptionInfo))

            if (config.enablePersistence) {
               storageUtils.saveSubscription(subscriptionInfo)
            }

            // Send to server
            const apiPayload = subscriptionToApiPayload(newSubscription)
            await subscriptionManager.subscribeGracefully(apiPayload)

            if (config.enableAnalytics) {
               analyticsUtils.trackWebPushEvent('subscription_created', {
                  endpoint: newSubscription.endpoint,
               })
            }

            onSubscriptionChange?.(newSubscription)
            retryCountRef.current = 0

            return true
         } catch (error) {
            const errorMessage = error instanceof Error ? error.message : ERROR_MESSAGES.SUBSCRIPTION_FAILED
            dispatchState(webPushActions.setError(errorMessage))
            onError?.(errorMessage)

            if (config.enableAnalytics) {
               analyticsUtils.trackWebPushEvent('subscription_failed', {
                  error: errorMessage,
               })
            }

            return false
         } finally {
            dispatchState(webPushActions.setLoading(false))
         }
      },
      [config, subscriptionManager, checkPermission, onSubscriptionChange, onError]
   ) // Subscribe
   const subscribe = useCallback(async (): Promise<boolean> => {
      if (!state.registration) {
         dispatchState(webPushActions.setError(ERROR_MESSAGES.SW_NOT_REGISTERED))
         return false
      }

      // Use the registration from state for regular subscription calls
      return await subscribeWithRegistration(state.registration)
   }, [state.registration, subscribeWithRegistration]) // Unsubscribe
   const unsubscribeFromNotifications = useCallback(async (): Promise<boolean> => {
      if (!state.subscription) {
         return true // Already unsubscribed
      }

      try {
         dispatchState(webPushActions.setLoading(true))
         dispatchState(webPushActions.setStatus(SubscriptionStatus.UNSUBSCRIBING))
         dispatchState(webPushActions.setError(null))

         const success = await state.subscription.unsubscribe()

         if (success) {
            // Notify server about unsubscription
            await subscriptionManager.unsubscribeGracefully({
               endpoint: state.subscription.endpoint,
            })

            dispatchState(webPushActions.setSubscription(null, null))

            if (config.enablePersistence) {
               storageUtils.saveSubscription(null)
            }

            if (config.enableAnalytics) {
               analyticsUtils.trackWebPushEvent('unsubscribed')
            }

            onSubscriptionChange?.(null)
         }

         return success
      } catch (error) {
         const errorMessage = error instanceof Error ? error.message : ERROR_MESSAGES.UNSUBSCRIPTION_FAILED
         dispatchState(webPushActions.setError(errorMessage))
         onError?.(errorMessage)
         return false
      } finally {
         dispatchState(webPushActions.setLoading(false))
      }
   }, [state.subscription, subscriptionManager, config, onSubscriptionChange, onError])

   // Clear error
   const clearError = useCallback(() => {
      dispatchState(webPushActions.setError(null))
   }, [])

   // Retry subscription
   const retry = useCallback(async (): Promise<boolean> => {
      if (retryCountRef.current >= WEBPUSH_CONSTANTS.MAX_RETRIES) {
         dispatchState(webPushActions.setError('Maximum retry attempts reached'))
         return false
      }
      retryCountRef.current++
      await delay(WEBPUSH_CONSTANTS.RETRY_DELAY * retryCountRef.current)

      return await subscribe()
   }, [subscribe])

   // Get subscription info
   const getSubscriptionInfo = useCallback(() => {
      return state.subscriptionInfo
   }, [state.subscriptionInfo])

   // Context value
   const contextValue = useMemo<WebPushContextType>(
      () => ({
         ...state,
         isReady: state.isSupported && !!state.registration,
         subscribe,
         unsubscribe: unsubscribeFromNotifications,
         clearError,
         retry,
         checkPermission,
         getSubscriptionInfo,
      }),
      [state, subscribe, unsubscribeFromNotifications, clearError, retry, checkPermission, getSubscriptionInfo]
   )

   return (
      <WebPushErrorBoundary
         onError={(error, errorInfo) => {
            const errorMessage = error instanceof Error ? error.message : 'WebPush Error Boundary triggered'
            onError?.(errorMessage)
            console.error('WebPush Error Boundary:', error, errorInfo)
         }}
      >
         <WebPushContext.Provider value={contextValue}>{children}</WebPushContext.Provider>
      </WebPushErrorBoundary>
   )
}
