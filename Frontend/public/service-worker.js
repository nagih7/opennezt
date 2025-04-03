// Service worker cho Web Push Notifications

// Xử lý sự kiện push
self.addEventListener('push', (event) => {
    // Lấy dữ liệu từ push message
    try {
        const data = event.data ? event.data.json() : {}
        console.log('Nhận push event:', data)

        const showNotification = self.registration.showNotification(data.title || 'Thông báo mới', {
            body: data.body || 'Bạn có một thông báo mới',
            icon: data.icon || '/opennezt.png',
            badge: data.badge || '/opennezt.png',
            tag: data.tag || 'default-tag', // Thêm tag để quản lý thông báo
            data: data.data || {},
            requireInteraction: true, // Giữ thông báo cho đến khi người dùng tương tác
        })

        // Hiển thị notification
        event.waitUntil(showNotification)
    } catch (e) {
        console.error('Lỗi parse JSON từ push event:', e)
    }
})

// Xử lý khi người dùng click vào thông báo
self.addEventListener('notificationclick', (event) => {
    console.log('Notification click được kích hoạt')

    // Đóng notification
    event.notification.close()

    try {
        const notificationData = event.notification.data || {}

        // Mở trang web khi click
        const urlToOpen = notificationData.url || '/'

        // Xử lý khi người dùng click vào thông báo
        const promiseChain = clients
            .matchAll({
                type: 'window',
                includeUncontrolled: true,
            })
            .then((windowClients) => {
                // Kiểm tra xem có tab nào đang mở không
                let matchingClient = null

                for (let i = 0; i < windowClients.length; i++) {
                    const windowClient = windowClients[i]

                    // Kiểm tra URL có chứa phần domain chính không
                    const urlObj = new URL(windowClient.url)
                    const openUrlObj = new URL(urlToOpen, self.location.origin)

                    if (urlObj.origin === openUrlObj.origin) {
                        matchingClient = windowClient
                        break
                    }
                }

                if (matchingClient) {
                    // Nếu có tab đang mở, focus vào tab đó
                    return matchingClient.navigate(urlToOpen).then((client) => client.focus())
                } else {
                    // Nếu không có tab nào, mở tab mới
                    return clients.openWindow(urlToOpen)
                }
            })

        event.waitUntil(promiseChain)
    } catch (e) {
        console.error('Lỗi khi xử lý notification click:', e)
    }
})

// Xử lý khi người dùng đóng thông báo
self.addEventListener('notificationclose', (event) => {
    console.log('Notification close được kích hoạt')

    // Lấy dữ liệu từ notification
    const notificationData = event.notification.data || {}
    console.log('Đã đóng thông báo:', notificationData)
})

// Xử lý khi service worker được cài đặt
self.addEventListener('install', (event) => {
    console.log('Service Worker đang được cài đặt')
    self.skipWaiting() // Cho phép service worker mới thay thế service worker cũ ngay lập tức
})

// Xử lý khi service worker được kích hoạt
self.addEventListener('activate', (event) => {
    console.log('Service Worker đã được kích hoạt')
    // Lấy quyền kiểm soát các trang ngay lập tức mà không cần tải lại
    event.waitUntil(clients.claim())
})
