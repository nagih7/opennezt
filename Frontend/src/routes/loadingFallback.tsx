import { Suspense } from 'react'

// Loading component
const LoadingFallback = () => <div className="page-loading">Loading...</div>

// Wrapper component to handle Suspense
const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
   <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
)

// Helper function to wrap route elements with Suspense
const withSuspense = (element: React.ReactNode) => <SuspenseWrapper>{element}</SuspenseWrapper>

export default withSuspense
