import React from 'react'
import { useUserFrame } from '../../hooks'

interface UserFrameProps {
   videoRef: React.RefObject<HTMLVideoElement>
}

const UserFrame: React.FC<UserFrameProps> = ({ videoRef }) => {
   const { localVideoRef, hasJoined } = useUserFrame(videoRef)

   if (!hasJoined) return null

   return (
      <div className="absolute bottom-0 right-0 p-4">
         <video
            ref={localVideoRef}
            width="200"
            height="200"
            className="rounded-md"
            autoPlay
            playsInline
            muted
            style={{ transform: 'scaleX(-1)', outline: 'none' }}
            disablePictureInPicture
         />
      </div>
   )
}

export default UserFrame
