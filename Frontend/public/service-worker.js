self.addEventListener('push', (event) => {
    // Lấy dữ liệu từ push message
    const data = event.data.json()

    // Hiển thị notification
    const showNotification = self.registration.showNotification(data.title, {
        body: data.body,
        icon: data.icon || '/icon.png',
        badge: data.badge || '/badge.png',
        tag: data.tag,
        data: data.data || {},
    })

    // Gửi tracking event nếu có notificationId
    if (data.data && data.data.notificationId && data.data.url) {
        // Báo là notification đã được hiển thị
        fetch('/notification-event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                notificationId: data.data.notificationId,
                endpoint: self.registration.pushManager.getSubscription().then((sub) => sub.endpoint),
                eventType: 'delivered',
                deviceInfo: {
                    userAgent: self.navigator ? self.navigator.userAgent : 'Unknown',
                    language: self.navigator ? self.navigator.language : 'Unknown',
                },
            }),
        }).catch((err) => console.error('Lỗi khi gửi sự kiện delivered:', err))
    }

    event.waitUntil(showNotification)
})

self.addEventListener('notificationclick', (event) => {
    // Đóng notification
    event.notification.close()

    // Lấy dữ liệu từ notification
    const notificationData = event.notification.data || {}

    // Nếu có notificationId, gửi tracking event
    if (notificationData.notificationId) {
        self.registration.pushManager.getSubscription().then((subscription) => {
            if (subscription) {
                // Gửi sự kiện click
                fetch('/notification-event', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        notificationId: notificationData.notificationId,
                        endpoint: subscription.endpoint,
                        eventType: 'clicked',
                        deviceInfo: {
                            userAgent: self.navigator ? self.navigator.userAgent : 'Unknown',
                            language: self.navigator ? self.navigator.language : 'Unknown',
                        },
                    }),
                }).catch((err) => console.error('Lỗi khi gửi sự kiện clicked:', err))
            }
        })
    }

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
})

self.addEventListener('notificationclose', (event) => {
    // Lấy dữ liệu từ notification
    const notificationData = event.notification.data || {}

    // Nếu có notificationId, gửi tracking event
    if (notificationData.notificationId) {
        self.registration.pushManager.getSubscription().then((subscription) => {
            if (subscription) {
                // Gửi sự kiện close
                fetch('/notification-event', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        notificationId: notificationData.notificationId,
                        endpoint: subscription.endpoint,
                        eventType: 'closed',
                    }),
                }).catch((err) => console.error('Lỗi khi gửi sự kiện closed:', err))
            }
        })
    }
})
