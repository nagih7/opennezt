import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/routes'
import { Provider } from 'react-redux'
import store from './store/configureStore'
import { RootProvider } from 'contexts'
import Mobile_Responsive from 'components/common/Mobile_Responsive'
import ChakraProvider from 'components/UI/provider'
import { Toaster } from 'components/UI/toaster'
import ErrorBoundary from 'components/ErrorBoundary'
import useGlobalErrorHandler from 'hooks/useGlobalErrorHandler'

// Hook wrapper để sử dụng trong thành phần hàm
const ErrorHandler = ({ children }: { children: React.ReactNode }) => {
   useGlobalErrorHandler({ logToServer: true })
   return <>{children}</>
}

// Define type for the root element
const rootElement: HTMLElement | null = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement)

const isMobileDevice = (): boolean => {
   return /Mobi|Android/i.test(navigator.userAgent)
}

// Bắt lỗi trong quá trình khởi tạo
window.addEventListener(
   'error',
   (event) => {
      console.error('Startup error:', event.error)

      // Hiển thị UI lỗi nếu xảy ra lỗi trước khi React khởi tạo
      if (!rootElement.innerHTML) {
         rootElement.innerHTML = `
         <div style="padding: 20px; font-family: Arial, sans-serif;">
            <h2 style="color: #e53e3e;">Đã xảy ra lỗi</h2>
            <p>Ứng dụng gặp lỗi khi khởi tạo. Vui lòng thử tải lại trang.</p>
            <pre style="background: #f8f8f8; padding: 10px; overflow: auto; font-size: 12px; border-radius: 4px;">${event.error?.toString() || event.message}</pre>
            <button onclick="location.reload()" style="margin-top: 15px; padding: 8px 16px; background: #3182ce; color: white; border: none; border-radius: 4px; cursor: pointer;">Tải lại trang</button>
         </div>
      `
      }
   },
   { once: true }
)

root.render(
   <React.StrictMode>
      <ErrorBoundary>
         <ErrorHandler>
            <Provider store={store}>
               <RootProvider>
                  <ChakraProvider>
                     {isMobileDevice() ? (
                        <Mobile_Responsive />
                     ) : (
                        <>
                           <RouterProvider router={routes} />
                           <Toaster />
                        </>
                     )}
                  </ChakraProvider>
               </RootProvider>
            </Provider>
         </ErrorHandler>
      </ErrorBoundary>
   </React.StrictMode>
)
