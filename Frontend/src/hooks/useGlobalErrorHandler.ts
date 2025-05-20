import { useEffect } from 'react'

interface ErrorLogData {
   message: string
   source?: string
   lineno?: number
   colno?: number
   error?: Error
   timestamp: string
}

/**
 * Hook để bắt các lỗi JavaScript toàn cục và xử lý chúng
 *
 * @param options.logToServer Có ghi log lỗi đến server hay không
 * @param options.showErrorModal Có hiển thị modal lỗi hay không
 */
const useGlobalErrorHandler = (
   options: {
      logToServer?: boolean
      showErrorModal?: boolean
   } = {}
) => {
   const { logToServer = true, showErrorModal = false } = options

   useEffect(() => {
      const originalOnError = window.onerror

      // Bắt lỗi JavaScript toàn cục
      window.onerror = (message, source, lineno, colno, error) => {
         // Gọi handler gốc nếu có
         if (typeof originalOnError === 'function') {
            originalOnError(message, source, lineno, colno, error)
         }

         console.error('Global error:', {
            message,
            source,
            lineno,
            colno,
            error,
         })

         if (logToServer) {
            // Ghi log lỗi đến server
            const errorData: ErrorLogData = {
               message: message as string,
               source,
               lineno,
               colno,
               error,
               timestamp: new Date().toISOString(),
            }

            // TODO: Gửi lỗi đến API server
            try {
               console.log('Would send error to server:', errorData)
               // fetch('/api/error-log', {
               //   method: 'POST',
               //   headers: { 'Content-Type': 'application/json' },
               //   body: JSON.stringify(errorData)
               // });
            } catch (e) {
               console.error('Error logging failed:', e)
            }
         }

         // Cho phép lỗi tiếp tục lan truyền
         return false
      }

      // Bắt Promise rejection không được xử lý
      const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
         console.error('Unhandled promise rejection:', event.reason)

         if (logToServer) {
            // TODO: Gửi lỗi đến API server
         }
      }

      window.addEventListener('unhandledrejection', handleUnhandledRejection)

      // Cleanup
      return () => {
         window.onerror = originalOnError
         window.removeEventListener('unhandledrejection', handleUnhandledRejection)
      }
   }, [logToServer, showErrorModal])
}

export default useGlobalErrorHandler
