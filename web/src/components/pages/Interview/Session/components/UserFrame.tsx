import { memo } from 'react'
import { UserFrameProps } from '~/types'

const UserFrame: React.FC<UserFrameProps> = memo(({ videoRef }) => {
   return (
      <div className="absolute bottom-0 right-0 p-4">
         <div className="relative">
            <video
               ref={videoRef}
               width="200"
               height="200"
               className="transition-opacity duration-300 border-2 rounded-md shadow-lg opacity-100 border-green-400/40"
               autoPlay
               playsInline
               muted
               style={{ transform: 'scaleX(-1)', outline: 'none' }}
               controlsList="nodownload nofullscreen noremoteplaybook"
            />
         </div>
      </div>
   )
})

export default UserFrame
