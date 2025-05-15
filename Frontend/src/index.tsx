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

// Type assertion needed because getElementById might return null
const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement)

const isMobileDevice = (): boolean => {
    return /Mobi|Android/i.test(navigator.userAgent)
}

if ('serviceWorker' in navigator && 'PushManager' in window) {
    window.addEventListener('load', async () => {
        try {
            // Create a version ID based on time to ensure updates
            const version = new Date().getTime()

            // Register service worker with new version
            const registration = await navigator.serviceWorker.register('/service-worker.js?v=' + version, {
                scope: '/',
            })

            // Complete the rest of the service worker registration logic
            console.log('ServiceWorker registration successful with scope: ', registration.scope)
        } catch (error) {
            console.error('ServiceWorker registration failed: ', error)
        }
    })
}

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RootProvider>
                <ChakraProvider>
                    {isMobileDevice() ? (
                        <Mobile_Responsive />
                    ) : (
                        <>
                            <RouterProvider router={router} />
                            <Toaster />
                        </>
                    )}
                </ChakraProvider>
            </RootProvider>
        </Provider>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
