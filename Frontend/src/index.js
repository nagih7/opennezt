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
import WebPushNotification from 'components/common/WebPushNotification'

const root = ReactDOM.createRoot(document.getElementById('root'))

const isMobileDevice = () => {
    return /Mobi|Android/i.test(navigator.userAgent)
}

// Register service worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/service-worker.js')
            .then((registration) => {
                // console.log('✅ Service Worker registered: ', registration)
            })
            .catch((registrationError) => {
                console.log('❌ Service Worker registration failed: ', registrationError)
            })
    })
}

root.render(
    <ChakraProvider>
        <Provider store={store}>
            <RootProvider>
                {isMobileDevice() ? (
                    <Mobile_Responsive />
                ) : (
                    <>
                        <WebPushNotification />
                        <Toaster />
                        <RouterProvider router={router} />
                    </>
                )}
            </RootProvider>
        </Provider>
    </ChakraProvider>
)

reportWebVitals()
