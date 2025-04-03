import urlBase64ToUint8Array from './urlBase64ToUint8Array'

export async function subscribeToPushNotifications(userId) {
    try {
        // Lấy public key từ server
        const response = await fetch('/api/vapidPublicKey')
        const { publicKey } = await response.json()

        // Đăng ký service worker nếu chưa có
        const registration = await navigator.serviceWorker.ready

        // Kiểm tra subscription hiện tại
        let subscription = await registration.pushManager.getSubscription()

        // Nếu chưa có subscription, tạo mới
        if (!subscription) {
            subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(publicKey),
            })
        }

        // Gửi subscription đến server
        await fetch('/api/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId,
                subscription,
            }),
        })

        return true
    } catch (error) {
        console.error('Đăng ký thông báo thất bại:', error)
        return false
    }
}

export default subscribeToPushNotifications
