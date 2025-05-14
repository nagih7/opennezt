import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import reportWebVitals from './reportWebVitals'
import { RouterProvider } from 'react-router-dom'
import router from './router/route'
import { Provider } from 'react-redux'
import store from './states/configureStore'
import 'bootstrap/dist/css/bootstrap.min.css'
import { RootProvider } from 'context/RootContext'
import Mobile_Responsive from 'components/common/Mobile_Responsive'
import ChakraProvider from 'components/UI/provider'
import { Toaster } from 'components/UI/toaster'

const root = ReactDOM.createRoot(document.getElementById('root'))

const isMobileDevice = () => {
    return /Mobi|Android/i.test(navigator.userAgent)
}

// if ('serviceWorker' in navigator && 'PushManager' in window) {
//     window.addEventListener('load', async () => {
//         try {
//             // Tạo ID phiên bản dựa trên thời gian để đảm bảo cập nhật
//             const version = new Date().getTime()

//             // Đăng ký service worker với phiên bản mới
//             const registration = await navigator.serviceWorker.register('/service-worker.js?v=' + version, {
//                 scope: '/',
//             })
//             // Kiểm tra xem service worker có đang chờ cài đặt không
//             if (registration.waiting) {
//                 console.log('Có phiên bản service worker mới đang chờ')
//             }

//             // Đăng ký nhận thông báo push
//             setupPushSubscription(registration)
//         } catch (error) {
//             console.error('Đăng ký Service Worker thất bại:', error)
//         }
//     })
// }

root.render(
    <ChakraProvider>
        <Provider store={store}>
            <RootProvider>
                {isMobileDevice() ? (
                    <Mobile_Responsive />
                ) : (
                    <>
                        <Toaster />
                        <RouterProvider router={router} />
                    </>
                )}
            </RootProvider>
        </Provider>
    </ChakraProvider>
)

reportWebVitals()
