import React from 'react'
import { OPENNEZT_BACKGROUND_GRADIENT } from '~/config/constants'

const ActiveBanner: React.FC = () => {
   return (
      <div
         className="h-[300px] text-[#ffffff] pl-8 py-32 rounded-md bg-local bg-center "
         style={{
            backgroundImage: `url(${OPENNEZT_BACKGROUND_GRADIENT})`,
            objectFit: 'cover',
         }}
      >
         <span className="text-4xl font-medium">Project Directory</span>
         <p className="mt-1">Good Communication is the key to cop-up with good ideas</p>
      </div>
   )
}

export default ActiveBanner
