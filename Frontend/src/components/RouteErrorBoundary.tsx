import React, { Component, ErrorInfo, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
   children: ReactNode
}

interface State {
   hasError: boolean
   error: Error | null
   errorInfo: ErrorInfo | null
}

// HOC để truy cập hook useNavigate trong class component
const withNavigate = (Component: any) => {
   return (props: any) => {
      const navigate = useNavigate()
      return <Component {...props} navigate={navigate} />
   }
}

class RouteErrorBoundary extends Component<Props & { navigate?: any }, State> {
   constructor(props: Props & { navigate?: any }) {
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
      console.error('Route Error:', error, errorInfo)
   }

   handleGoHome = () => {
      if (this.props.navigate) {
         this.props.navigate('/')
      }
   }

   handleRetry = () => {
      this.setState({ hasError: false, error: null, errorInfo: null })
   }

   render() {
      if (this.state.hasError) {
         return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
               <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-md">
                  <div>
                     <h2 className="mt-6 text-center text-2xl font-bold text-red-600">Đã xảy ra lỗi ở trang này</h2>
                     <p className="mt-2 text-center text-sm text-gray-600">Trang bạn đang cố truy cập đã gặp sự cố.</p>
                  </div>
                  <div className="mt-6">
                     <details className="text-sm text-gray-700 mb-4">
                        <summary className="cursor-pointer text-red-500 font-medium">Xem chi tiết lỗi</summary>
                        <pre className="mt-2 whitespace-pre-wrap bg-gray-100 p-2 rounded overflow-auto max-h-40">
                           {this.state.error?.toString()}
                           <br />
                           {this.state.errorInfo?.componentStack}
                        </pre>
                     </details>
                     <div className="flex gap-4 justify-center">
                        <button
                           onClick={this.handleRetry}
                           className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                           Thử lại
                        </button>
                        <button
                           onClick={this.handleGoHome}
                           className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                           Về trang chủ
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         )
      }

      return this.props.children
   }
}

export default withNavigate(RouteErrorBoundary)
