import React, { useEffect, useState, useCallback, useMemo, createContext } from 'react'
import { useDispatch } from 'react-redux'
import { subscribe } from 'api/app'
import { subscribeWrapped } from 'utils/appActions'
import urlBase64ToUint8Array from 'utils/webpush/urlBase64ToUint8Array'
import { PUBLIC_VALID_KEY } from 'utils/constants'

export const WebPushContext = createContext()

export const WebPushProvider = ({ children }) => {
    const dispatch = useDispatch()

    // State management
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [subscription, setSubscription] = useState(null)
    const [registration, setRegistration] = useState(null)
    const [error, setError] = useState('')
    const [stats, setStats] = useState(null)

    // Register Service Worker
    const registerServiceWorker = useCallback(async () => {
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
            setError(`Unable to register service worker: ${error.message}`)
        }
    }, [])

    // Subscribe to notifications
    const subscribeToNotifications = useCallback(async () => {
        // Check if the user has granted permission for notifications
        if (Notification.permission === 'denied') {
            setError('Notifications are blocked. Please enable them in your browser settings.')
            return
        }

        if (Notification.permission !== 'granted') {
            const permission = await Notification.requestPermission()
            if (permission !== 'granted') {
                setError('Notifications permission denied.')
                return
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
            dispatch(subscribeWrapped(newSubscription))
            return true
        } catch (error) {
            setError('Unable to subscribe to notifications. Please check browser permissions.')
            return false
        }
    }, [registration, dispatch])

    // Unsubscribe from notifications
    const unsubscribeFromNotifications = useCallback(async () => {
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
            //     if (result?.payload) {
            //         setStats(result.payload)
            //     }
            // })
        } else {
            setError('Your browser does not support web push notifications.')
        }

        return () => {
            /* noop */
        }
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
export const useWebPush = () => {
    const context = React.useContext(WebPushContext)
    if (context === undefined) {
        throw new Error('useWebPush must be used within a WebPushProvider')
    }
    return context
}
