import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/routes'
import { Provider } from 'react-redux'
import store from '~/store'
import { SocketProvider } from 'contexts'
import Mobile_Responsive from 'components/common/Mobile_Responsive'
import ChakraProvider from 'components/UI/provider'
import { Toaster } from 'sonner'
import { WebPushProvider, WebPushConfig } from './contexts/webpush'
import { PUBLIC_VALID_KEY } from './utils/constants'

// Define type for the root element
const rootElement: HTMLElement | null = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement)

const isMobileDevice = (): boolean => {
   return /Mobi|Android/i.test(navigator.userAgent)
}

// Web Push configuration
const webPushConfig: WebPushConfig = {
   vapidPublicKey: PUBLIC_VALID_KEY,
   serviceWorkerPath: '/service-worker.js',
   swScope: '/',
   enableAnalytics: true,
   enablePersistence: true,
   autoSubscribe: true,
   autoRequestPermission: true,
}

root.render(
   <React.StrictMode>
      <Provider store={store}>
         <ChakraProvider>
            <SocketProvider>
               <WebPushProvider config={webPushConfig}>
                  {isMobileDevice() ? (
                     <Mobile_Responsive />
                  ) : (
                     <>
                        <RouterProvider router={routes} />
                        <Toaster />
                     </>
                  )}
               </WebPushProvider>
            </SocketProvider>
         </ChakraProvider>
      </Provider>
   </React.StrictMode>
)
