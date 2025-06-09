import { OPENNEZT_INTERVIEW_LISTEN, OPENNEZT_INTERVIEW_SPEAK } from '~/config/constants'
import useBotFrame from './useBotFrame'
import { FC } from 'react'

const BotFrame: FC = () => {
   const { speakingVideoRef, listeningVideoRef, currentVideo, handleVideoEnded, handleVideoMetadataLoaded } =
      useBotFrame()

   return (
      <div className="relative bg-[#000000] w-full h-full rounded-md overflow-hidden">
         <video
            ref={speakingVideoRef}
            width="100%"
            height="100%"
            loop
            autoPlay
            muted
            preload="auto"
            className={`absolute w-full h-full rounded-md ${
               currentVideo === OPENNEZT_INTERVIEW_SPEAK ? 'opacity-100' : 'opacity-0'
            }`}
            playsInline
            style={{ outline: 'none' }}
            src={OPENNEZT_INTERVIEW_SPEAK}
            onLoadedMetadata={handleVideoMetadataLoaded}
            onEnded={handleVideoEnded}
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
         />
         <video
            ref={listeningVideoRef}
            width="100%"
            height="100%"
            loop
            autoPlay
            preload="auto"
            muted
            className={`absolute w-full h-full rounded-md ${
               currentVideo === OPENNEZT_INTERVIEW_LISTEN ? 'opacity-100' : 'opacity-0'
            }`}
            playsInline
            style={{ outline: 'none' }}
            src={OPENNEZT_INTERVIEW_LISTEN}
            onLoadedMetadata={handleVideoMetadataLoaded}
            onEnded={handleVideoEnded}
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
         />
      </div>
   )
}

export default BotFrame
