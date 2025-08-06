import React, { Suspense } from 'react'

interface LoadingFallbackProps {
   className?: string
}

// Loading component with advanced Tailwind spinner
export const LoadingFallback: React.FC<LoadingFallbackProps> = ({ className }) => (
   <div className={`flex items-center justify-center w-full bg-white/5` + (className ? ` ${className}` : '')}>
      <div className="flex flex-col items-center gap-3">
         <div className="relative">
            {/* Outer spinning circle */}
            <div className="w-16 h-16 border-4 border-gray-200 rounded-full border-t-blue-600 border-r-blue-600 animate-spin"></div>
            {/* Inner pulsing circle */}
            {/* <div
               className="absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 rounded-full top-1/2 left-1/2 animate-pulse"
               style={{
                  animation: 'pulse 1s infinite',
               }}
            ></div> */}
         </div>
         <p className="mt-4 font-medium text-gray-700">Loading...</p>
      </div>
   </div>
)

// Wrapper component to handle Suspense
const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
   <Suspense fallback={<LoadingFallback className="h-screen" />}>{children}</Suspense>
)

// Helper function to wrap route elements with Suspense
const withSuspense = (element: React.ReactNode) => <SuspenseWrapper>{element}</SuspenseWrapper>

export default withSuspense
