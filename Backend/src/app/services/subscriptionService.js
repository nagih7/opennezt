import { Subscription } from '@/models'
import webpush from 'web-push'

export async function subscribe(user, requestBody) {
    const { endpoint, expirationTime, keys } = requestBody

    // Kiểm tra xem subscription đã tồn tại chưa
    const existingSubscription = await Subscription.findOne({ endpoint: endpoint })

    if (existingSubscription) {
        // Cập nhật subscription nếu đã tồn tại
        existingSubscription.keys = keys
        existingSubscription.expirationTime = expirationTime
        existingSubscription.updated_at = new Date()
        await existingSubscription.save()
        console.log('Đã cập nhật subscription')
    } else {
        // Tạo subscription mới
        const newSubscription = new Subscription({
            endpoint: endpoint,
            expirationTime: expirationTime,
            keys: keys,
            user_id: user._id,
        })
        await newSubscription.save()
        console.log('Đã lưu subscription mới')

        // Gửi thông báo chào mừng
        const payload = JSON.stringify({
            title: 'Chào mừng!',
            body: 'Bạn đã đăng ký nhận thông báo thành công!',
            icon: 'icon.ico',
        })

        // Gửi thông báo
        webpush
            .sendNotification(requestBody, payload)
            .catch((error) => console.error('Lỗi gửi thông báo chào mừng:', error))
    }
}

export async function unsubscribe(user, endpoint) {
    console.log('Đang xử lý hủy đăng ký nhận thông báo...', endpoint)
    await Subscription.findOneAndDelete({ endpoint: endpoint, user_id: user._id })
}

export async function trackingEvent(user, requestBody) {
    await console.log('Đang xử lý sự kiện theo dõi...', requestBody)
}
