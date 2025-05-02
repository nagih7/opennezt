// Hàm để kiểm tra quyền thông báo
export async function checkNotificationPermission() {
    if (!('Notification' in window)) {
        return 'unsupported'
    }

    return Notification.permission
}

export default checkNotificationPermission
