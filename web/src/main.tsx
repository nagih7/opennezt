import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/routes'
import { Provider } from 'react-redux'
import store from '~/store'
import { SocketProvider, MatchingProvider } from '~/contexts'
import Mobile_Responsive from '~/components/common/Mobile_Responsive'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { Toaster } from 'sonner'
import { WebPushProvider, WebPushConfig } from '~/contexts/webpush'
import { VAPID_PUBLIC_KEY } from '~/config/constants'
// import { logEnvironment } from '~/utils/environment'

// Define type for the root element
const rootElement: HTMLElement | null = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement)

// Log the current environment configuration
// logEnvironment()

const isMobileDevice = (): boolean => {
   return /Mobi|Android/i.test(navigator.userAgent)
}

// Web Push configuration
const webPushConfig: WebPushConfig = {
   vapidPublicKey: VAPID_PUBLIC_KEY || '',
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
         <ChakraProvider value={defaultSystem}>
            <SocketProvider>
               <WebPushProvider config={webPushConfig}>
                  <MatchingProvider>
                     {isMobileDevice() ? (
                        <Mobile_Responsive />
                     ) : (
                        <>
                           <RouterProvider router={routes} />
                           <Toaster />
                        </>
                     )}
                  </MatchingProvider>
               </WebPushProvider>
            </SocketProvider>
         </ChakraProvider>
      </Provider>
   </React.StrictMode>
)
