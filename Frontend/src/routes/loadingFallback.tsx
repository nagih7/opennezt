import { Suspense } from 'react'

// Loading component with advanced Tailwind spinner
const LoadingFallback = () => (
   <div className="flex items-center justify-center w-full h-screen bg-white/5">
      <div className="flex flex-col items-center gap-3">
         <div className="relative">
            {/* Outer spinning circle */}
            <div
               className="w-16 h-16 border-4 border-gray-200 rounded-full border-t-blue-600 border-r-blue-600 animate-spin"
               // style={{
               //    width: '4rem',
               //    height: '4rem',
               //    border: '4px solid #c8c9cb',
               //    borderRadius: '9999px',
               //    borderTopColor: '#3b82f6',
               //    borderRightColor: '#3b82f6',
               //    animation: 'spin 1s linear infinite',
               // }}
            ></div>
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
   <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
)

// Helper function to wrap route elements with Suspense
const withSuspense = (element: React.ReactNode) => <SuspenseWrapper>{element}</SuspenseWrapper>

export default withSuspense
