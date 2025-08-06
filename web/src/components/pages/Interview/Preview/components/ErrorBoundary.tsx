import { Component, ErrorInfo, ReactNode } from 'react'
import { toast } from 'sonner'

interface Props {
   children: ReactNode
   fallback?: ReactNode
}

interface State {
   hasError: boolean
   error?: Error
}

/**
 * Error boundary component for the Interview feature
 * Catches JavaScript errors anywhere in the child component tree and displays a fallback UI
 */
class InterviewErrorBoundary extends Component<Props, State> {
   constructor(props: Props) {
      super(props)
      this.state = { hasError: false }
   }

   static getDerivedStateFromError(error: Error): State {
      // Update state so the next render will show the fallback UI
      return { hasError: true, error }
   }

   componentDidCatch(error: Error, errorInfo: ErrorInfo) {
      // Log the error to console and show toast notification
      console.error('Interview Error Boundary caught an error:', error, errorInfo)

      toast.error('Something went wrong with the interview feature', {
         description: 'Please try refreshing the page or contact support if the issue persists.',
         duration: 10000,
         action: {
            label: 'Refresh Page',
            onClick: () => window.location.reload(),
         },
      })
   }

   handleRetry = () => {
      this.setState({ hasError: false, error: undefined })
   }

   render() {
      if (this.state.hasError) {
         // Render custom fallback UI or use provided fallback
         return (
            this.props.fallback || (
               <div className="flex flex-col items-center justify-center p-8 border border-red-200 rounded-lg bg-red-50">
                  <div className="mb-4 text-red-600">
                     <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                     </svg>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-red-800">Interview Feature Error</h3>
                  <p className="max-w-md mb-4 text-sm text-center text-red-600">
                     Something went wrong with the interview feature. This could be due to browser compatibility,
                     permissions, or a temporary issue.
                  </p>
                  <div className="flex gap-3">
                     <button
                        onClick={this.handleRetry}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                     >
                        Try Again
                     </button>
                     <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-600 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                     >
                        Refresh Page
                     </button>
                  </div>
                  {this.state.error && (
                     <details className="mt-4 text-xs text-red-500">
                        <summary className="cursor-pointer">Technical Details</summary>
                        <pre className="max-w-md p-2 mt-2 overflow-auto text-left bg-red-100 rounded">
                           {this.state.error.message}
                        </pre>
                     </details>
                  )}
               </div>
            )
         )
      }

      return this.props.children
   }
}

export default InterviewErrorBoundary
