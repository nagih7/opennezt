import React, { Component, ReactNode } from 'react'
import { analyticsUtils } from './utils/analytics.utils'

interface Props {
   children: ReactNode
   fallback?: ReactNode
   onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface State {
   hasError: boolean
   error?: Error
}

export class WebPushErrorBoundary extends Component<Props, State> {
   constructor(props: Props) {
      super(props)
      this.state = { hasError: false }
   }

   static getDerivedStateFromError(error: Error): State {
      return { hasError: true, error }
   }

   componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      console.error('WebPush Error Boundary caught error:', error, errorInfo)

      // Track error
      analyticsUtils.trackWebPushEvent('error_boundary_triggered', {
         error: error.message,
         stack: error.stack,
         componentStack: errorInfo.componentStack,
      })

      // Call custom error handler
      this.props.onError?.(error, errorInfo)
   }

   handleRetry = () => {
      this.setState({ hasError: false, error: undefined })
   }

   render() {
      if (this.state.hasError) {
         if (this.props.fallback) {
            return this.props.fallback
         }

         return (
            <div
               className="webpush-error-boundary"
               style={{
                  padding: '20px',
                  border: '1px solid #ff6b6b',
                  borderRadius: '8px',
                  backgroundColor: '#fff5f5',
                  color: '#c53030',
                  textAlign: 'center',
               }}
            >
               <h3>🔔 Notification Error</h3>
               <p>Something went wrong with the notification system.</p>
               {this.state.error && (
                  <details style={{ marginTop: '10px', textAlign: 'left' }}>
                     <summary>Error Details</summary>
                     <pre
                        style={{
                           fontSize: '12px',
                           background: '#f7fafc',
                           padding: '10px',
                           borderRadius: '4px',
                           overflow: 'auto',
                        }}
                     >
                        {this.state.error.message}
                     </pre>
                  </details>
               )}
               <button
                  onClick={this.handleRetry}
                  style={{
                     marginTop: '15px',
                     padding: '8px 16px',
                     backgroundColor: '#3182ce',
                     color: 'white',
                     border: 'none',
                     borderRadius: '4px',
                     cursor: 'pointer',
                  }}
               >
                  Try Again
               </button>
            </div>
         )
      }

      return this.props.children
   }
}
