import { Spin } from 'antd'
import React, { Suspense } from 'react'

const LazyLoading = ({ children }) => {
   return (
      <Suspense
         fallback={
            <div
               style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(calc(-50% + 100px), -50%)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
               }}
            >
               <Spin tip="Loading" size="large" />
            </div>
         }
      >
         {children}
      </Suspense>
   )
}

export default LazyLoading
