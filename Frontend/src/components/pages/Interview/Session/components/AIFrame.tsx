import { useState, useRef, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { createSyncedAudioVideo, type SyncedAudioVideoController } from 'utils/audio/audioHandler'
import { OPENNEZT_INTERVIEW_LISTEN, OPENNEZT_INTERVIEW_SPEAK } from 'utils/constants'
import { setCurrentAction } from 'store/modules/interview'
import { RootState, useAppSelector } from '~/store'

const AIFrame = () => {
   const dispatch = useDispatch()
   // STATE FROM REDUX STORE with proper typing
   const { hasJoined, messages } = useAppSelector((state: RootState) => state.interview)
   const [isFirstMessageReceived, setIsFirstMessageReceived] = useState(false)
   const [currentVideo, setCurrentVideo] = useState(OPENNEZT_INTERVIEW_SPEAK)

   // Properly typed refs
   const speakingVideoRef = useRef<HTMLVideoElement>(null)
   const listeningVideoRef = useRef<HTMLVideoElement>(null)
   const syncControllerRef = useRef<SyncedAudioVideoController | null>(null)

   // Handle switch to listening mode - now with immediate transition
   const switchToListenMode = useCallback(() => {
      setCurrentVideo(OPENNEZT_INTERVIEW_LISTEN)
      dispatch(setCurrentAction('listening'))
   }, [dispatch])

   // Cleanup function for audio-video sync controller
   const cleanupSyncController = useCallback(() => {
      if (syncControllerRef.current) {
         syncControllerRef.current.cleanup()
         syncControllerRef.current = null
      }
   }, []) // Listen for new messages and control video
   useEffect(() => {
      if (hasJoined && messages.length > 0) {
         // Determine which message to use
         const messageToPlay = !isFirstMessageReceived
            ? messages[0]
            : messages.length > 1
              ? messages[messages.length - 1]
              : null

         if (messageToPlay?.attachments && speakingVideoRef.current) {
            // Set state to show speaking video and mark first message as received if needed
            setCurrentVideo(OPENNEZT_INTERVIEW_SPEAK)
            dispatch(setCurrentAction('speaking'))

            if (!isFirstMessageReceived) {
               setIsFirstMessageReceived(true)
            }

            // Clean up any existing controller
            cleanupSyncController()

            // Wait for the video element to be ready
            setTimeout(() => {
               if (speakingVideoRef.current && messageToPlay.attachments) {
                  // Create synced audio-video controller
                  syncControllerRef.current = createSyncedAudioVideo(
                     messageToPlay.attachments,
                     speakingVideoRef.current,
                     {
                        onAudioEnd: () => {
                           switchToListenMode()
                        },
                        onVideoEnd: () => {
                           // Video playback ended
                        },
                        onSyncComplete: () => {
                           switchToListenMode()
                        },
                     }
                  )
               }
            }, 100) // Small delay to ensure video element is ready
         }
      }
   }, [hasJoined, messages, isFirstMessageReceived, switchToListenMode, cleanupSyncController, dispatch])

   // Handle video ended event
   const handleVideoEnded = useCallback(() => {
      // Only switch to listen mode if the video is the speaking video
      if (currentVideo === OPENNEZT_INTERVIEW_SPEAK) {
         switchToListenMode()
      }
   }, [currentVideo, switchToListenMode])

   // Handle video metadata loaded with proper typing
   const handleVideoMetadataLoaded = useCallback((e: React.SyntheticEvent<HTMLVideoElement>) => {
      const video = e.currentTarget
      if (video.paused) {
         video.play().catch((error: unknown) => console.warn('Video autoplay failed:', error))
      }
   }, []) // Clean up on unmount
   useEffect(() => {
      return () => {
         cleanupSyncController()
      }
   }, [cleanupSyncController])

   return (
      <div className="relative bg-[#000000] w-full h-full rounded-md overflow-hidden">
         <video
            ref={speakingVideoRef}
            width="100%"
            height="100%"
            loop
            autoPlay
            muted
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

export default AIFrame
