import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
   children: ReactNode
   fallback?: ReactNode
}

interface State {
   hasError: boolean
   error: Error | null
   errorInfo: ErrorInfo | null
}

class ErrorBoundary extends Component<Props, State> {
   constructor(props: Props) {
      super(props)
      this.state = {
         hasError: false,
         error: null,
         errorInfo: null,
      }
   }

   static getDerivedStateFromError(error: Error) {
      return { hasError: true, error }
   }

   componentDidCatch(error: Error, errorInfo: ErrorInfo) {
      this.setState({
         error,
         errorInfo,
      })

      // Bạn có thể ghi log lỗi vào service như Sentry hoặc một API backend
      console.error('Error caught by ErrorBoundary:', error, errorInfo)
   }

   render() {
      if (this.state.hasError) {
         // Bạn có thể tùy chỉnh UI hiển thị lỗi ở đây
         return (
            this.props.fallback || (
               <div className="error-boundary p-4 bg-red-50 border border-red-200 rounded-md">
                  <h2 className="text-xl font-bold text-red-600 mb-2">Đã xảy ra lỗi</h2>
                  <details className="text-sm text-gray-700">
                     <summary className="cursor-pointer text-red-500 font-medium">Xem chi tiết lỗi</summary>
                     <pre className="mt-2 whitespace-pre-wrap bg-gray-100 p-2 rounded">
                        {this.state.error?.toString()}
                        <br />
                        {this.state.errorInfo?.componentStack}
                     </pre>
                  </details>
               </div>
            )
         )
      }

      return this.props.children
   }
}

export default ErrorBoundary
