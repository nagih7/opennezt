import React from 'react'
import RouteErrorBoundary from './RouteErrorBoundary'

// Component này được sử dụng để bao bọc route với ErrorBoundary
const RouteWithErrorBoundary = ({ children }: { children: React.ReactNode }) => {
   return <RouteErrorBoundary>{children}</RouteErrorBoundary>
}

export default RouteWithErrorBoundary
