import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import store from './states/configureStore'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))

const isMobileDevice = () => {
    return /Mobi|Android/i.test(navigator.userAgent)
}

if ('serviceWorker' in navigator && 'PushManager' in window) {
    window.addEventListener('load', async () => {
        try {
            // Tạo ID phiên bản dựa trên thời gian để đảm bảo cập nhật
            const version = new Date().getTime()

            // Đăng ký service worker với phiên bản mới
            const registration = await navigator.serviceWorker.register('/service-worker.js?v=' + version, {
                scope: '/',
            })
            // Kiểm tra xem service worker có đang chờ cài đặt không
            if (registration.waiting) {
                console.log('Có phiên bản service worker mới đang chờ')
            }

            // Đăng ký nhận thông báo push
            setupPushSubscription(registration)
        } catch (error) {
            console.error('Đăng ký Service Worker thất bại:', error)
        }
    })
}

root.render(
    <Provider store={store}>
        <App />
    </Provider>
)

reportWebVitals()
