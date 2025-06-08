import React, { useEffect } from 'react'
import { OPENNEZT_LOGO } from '~/config/constants'

const Mobile_Responsive: React.FC = () => {
   useEffect(() => {
      document.title = 'This website is not available on mobile devices'
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
         metaDescription.setAttribute('content', 'This website is only available on desktop devices')
      }
   }, [])

   return (
      <div className="h-[100vh] flex flex-col items-center justify-center bg-white text-center gap-10 overflow-hidden">
         <div className="w-[300px] h-[300px]">
            <img src={OPENNEZT_LOGO} alt="OpenNezt" />
         </div>
         <div className="flex flex-col items-center gap-4">
            <p className="text-2xl font-bold text-gray-800">This website is not available on mobile devices</p>
            <p>Please access this website from a desktop computer or laptop.</p>
         </div>
      </div>
   )
}

export default Mobile_Responsive
