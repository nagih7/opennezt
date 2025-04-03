export async function registerServiceWorker() {
    try {
        // Kiểm tra xem trình duyệt có hỗ trợ Service Worker không
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            const registration = await navigator.serviceWorker.register('/service-worker.js')
            console.log('Service Worker đã đăng ký thành công:', registration)
            return registration
        } else {
            console.log('Push notifications không được hỗ trợ.')
            return null
        }
    } catch (error) {
        console.error('Đăng ký Service Worker thất bại:', error)
        return null
    }
}

export default registerServiceWorker
