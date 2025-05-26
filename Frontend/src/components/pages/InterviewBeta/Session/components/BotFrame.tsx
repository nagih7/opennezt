import React from 'react'
import { OPENNEZT_INTERVIEW_LISTEN, OPENNEZT_INTERVIEW_SPEAK } from 'utils/constants'
import { useBotFrame } from '../../hooks'

interface BotFrameProps {}

const BotFrame: React.FC<BotFrameProps> = () => {
   const { interviewVideoRef, currentVideo, handleVideoEnded } = useBotFrame()

   const handleVideoLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>): void => {
      const target = e.target as HTMLVideoElement
      if (target.paused) {
         target.play().catch((error: Error) => console.warn('Video autoplay failed:', error))
      }
   }

   return (
      <div className="relative bg-[#000000] w-full h-full rounded-md overflow-hidden">
         <video
            ref={interviewVideoRef}
            width="100%"
            height="100%"
            loop
            autoPlay
            muted
            className="absolute w-full h-full rounded-md"
            playsInline
            style={{ outline: 'none' }}
            src={OPENNEZT_INTERVIEW_SPEAK}
            onLoadedMetadata={handleVideoLoadedMetadata}
            onEnded={handleVideoEnded}
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
         />
         <video
            ref={interviewVideoRef}
            width="100%"
            height="100%"
            loop
            autoPlay
            muted
            className={`absolute w-full h-full rounded-md ${
               currentVideo === OPENNEZT_INTERVIEW_LISTEN ? 'opacity-100' : 'opacity-0'
            }`}
            playsInline
            style={{ outline: 'none' }}
            src={OPENNEZT_INTERVIEW_LISTEN}
            onLoadedMetadata={handleVideoLoadedMetadata}
            onEnded={handleVideoEnded}
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
         />
      </div>
   )
}

export default BotFrame
