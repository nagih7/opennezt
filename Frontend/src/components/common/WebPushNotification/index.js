// Cập nhật WebPushNotification.js để làm việc với MongoDB
import { fetchStats, subscribe, unsubscribe } from 'api/app'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

const WebPushNotification = () => {
    const dispatch = useDispatch()

    // ========== STATE ========== //
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [subscription, setSubscription] = useState(null)
    const [registration, setRegistration] = useState(null)
    const [error, setError] = useState('')
    const [stats, setStats] = useState(null)

    // API Endpoint
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

    useEffect(() => {
        // Kiểm tra hỗ trợ Service Worker
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            registerServiceWorker()
            // Lấy thống kê từ server
            dispatch(fetchStats())
        } else {
            setError('Trình duyệt của bạn không hỗ trợ web push notifications.')
        }
    }, [dispatch])

    // Đăng ký Service Worker
    const registerServiceWorker = async () => {
        try {
            const reg = await navigator.serviceWorker.register('/service-worker.js')
            setRegistration(reg)

            // Kiểm tra đăng ký đã tồn tại
            const existingSubscription = await reg.pushManager.getSubscription()

            if (existingSubscription) {
                setSubscription(existingSubscription)
                setIsSubscribed(true)
                console.log('Đã đăng ký nhận thông báo trước đó')
            }
        } catch (error) {
            console.error('Lỗi khi đăng ký service worker:', error)
            setError('Không thể đăng ký service worker.')
        }
    }

    // Đăng ký nhận thông báo
    const subscribeToNotifications = async () => {
        try {
            if (!registration) {
                setError('Service worker chưa được đăng ký.')
                return
            }

            // VAPID public key từ backend
            const publicVapidKey =
                'BNsR38gS1HYeps7jv4fvUbz2kv-d1szqrpclVfz31Gc70ZKpvb4RmZ03u-G_FMOiiS1DZi8BkT_IyfxazmxbhGw'

            // Chuyển đổi public key thành Uint8Array
            const convertedVapidKey = urlBase64ToUint8Array(publicVapidKey)

            // Đăng ký với PushManager
            const newSubscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: convertedVapidKey,
            })

            setSubscription(newSubscription)
            setIsSubscribed(true)

            // Gửi thông tin đăng ký đến server
            dispatch(subscribe(newSubscription))
        } catch (error) {
            console.error('Error', error)
            setError('Không thể đăng ký nhận thông báo. Vui lòng kiểm tra quyền trình duyệt.')
        }
    }

    // Hủy đăng ký
    const unsubscribeFromNotifications = async () => {
        try {
            if (subscription) {
                dispatch(unsubscribe(subscription))
                // Hủy đăng ký trên trình duyệt
                await subscription.unsubscribe()
                setSubscription(null)
                setIsSubscribed(false)
                console.log('Đã hủy đăng ký nhận thông báo')

                // Cập nhật thống kê
                dispatch(fetchStats())
            }
        } catch (error) {
            console.error('Lỗi khi hủy đăng ký:', error)
            setError('Không thể hủy đăng ký nhận thông báo.')
        }
    }

    // CONVERT BASE64 TO UINT8ARRAY
    const urlBase64ToUint8Array = (base64String) => {
        const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
        const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

        const rawData = window.atob(base64)
        const outputArray = new Uint8Array(rawData.length)

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i)
        }
        return outputArray
    }

    return (
        <div className="notification-container">
            <h2>Web Push Notifications</h2>

            {error && <div className="error">{error}</div>}

            <div className="status">Trạng thái: {isSubscribed ? 'Đã đăng ký' : 'Chưa đăng ký'}</div>

            <div className="actions">
                {!isSubscribed ? (
                    <button onClick={subscribeToNotifications} className="btn btn-primary">
                        Đăng ký nhận thông báo
                    </button>
                ) : (
                    <button onClick={unsubscribeFromNotifications} className="btn btn-danger">
                        Hủy đăng ký
                    </button>
                )}
            </div>

            {stats && (
                <div className="stats-container">
                    <h3>Thống kê</h3>
                    <p>Tổng số người đăng ký: {stats.totalSubscriptions}</p>

                    {stats.latestSubscriptions.length > 0 && (
                        <>
                            <h4>Người đăng ký gần đây:</h4>
                            <ul>
                                {stats.latestSubscriptions.map((sub, index) => (
                                    <li key={index}>Đăng ký vào: {new Date(sub.createdAt).toLocaleString()}</li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}

export default WebPushNotification
