import { useCallback, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '~/store'
import { setCurrentAction } from '~/store/modules/interview'
import { OPENNEZT_INTERVIEW_LISTEN, OPENNEZT_INTERVIEW_SPEAK } from '~/config/constants'
import { createSyncedAudioVideo } from '~/utils/audio/audioHandler'

// Type definitions
type CurrentAction = 'speaking' | 'listening'
type VideoType = typeof OPENNEZT_INTERVIEW_SPEAK | typeof OPENNEZT_INTERVIEW_LISTEN

interface Message {
   _id: string
   content: string
   attachments?: string
   type: string
   timestamp?: Date
}

interface InterviewState {
   hasJoined: boolean
   messages: Message[]
   currentAction: CurrentAction
   conversation: {
      _id?: string
      messages?: Message[]
   }
   project: Record<string, unknown>
   isLoadingStartInterview: boolean
   isLoadingReplyInterview: boolean
   isLoadingCloseInterview: boolean
   isOpenModalInterview: boolean
}

interface SyncController {
   start: () => void
   stop: () => void
   pause: () => void
   resume: () => void
   isAudioEnded: () => boolean
   isVideoEnded: () => boolean
   cleanup: () => void
}

interface SyncOptions {
   onAudioEnd?: () => void
   onVideoEnd?: () => void
   onSyncComplete?: () => void
   autoStart?: boolean
}

interface UseBotFrameReturn {
   interviewVideoRef: React.RefObject<HTMLVideoElement | null>
   currentVideo: VideoType
   isFirstMessageReceived: boolean
   setCurrentVideo: React.Dispatch<React.SetStateAction<VideoType>>
   handleVideoEnded: () => void
   setIsFirstMessageReceived: React.Dispatch<React.SetStateAction<boolean>>
}

export const useBotFrame = (): UseBotFrameReturn => {
   const dispatch = useAppDispatch()
   // STATE FROM REDUX STORE
   const { hasJoined, messages } = useAppSelector((state) => state.interview as InterviewState)
   const [isFirstMessageReceived, setIsFirstMessageReceived] = useState<boolean>(false)
   const [currentVideo, setCurrentVideo] = useState<VideoType>(OPENNEZT_INTERVIEW_SPEAK)

   const interviewVideoRef = useRef<HTMLVideoElement>(null)
   const syncControllerRef = useRef<SyncController | null>(null)

   // Handle switch to listening mode - now with immediate transition
   const switchToListenMode = useCallback((): void => {
      setCurrentVideo(OPENNEZT_INTERVIEW_LISTEN)
      dispatch(setCurrentAction('listening'))
   }, [dispatch])

   // Cleanup function for audio-video sync controller
   const cleanupSyncController = useCallback((): void => {
      if (syncControllerRef.current) {
         syncControllerRef.current.cleanup()
         syncControllerRef.current = null
      }
   }, []) // Listen for new messages and control video
   useEffect(() => {
      if (hasJoined && messages.length > 0) {
         // Determine which message to use
         const messageToPlay: Message | null = !isFirstMessageReceived
            ? messages[0]
            : messages.length > 1
              ? messages[messages.length - 1]
              : null

         if (messageToPlay && messageToPlay.attachments) {
            // Set state to show speaking video and mark first message as received if needed
            setCurrentVideo(OPENNEZT_INTERVIEW_SPEAK)
            dispatch(setCurrentAction('speaking'))

            // setHasAudio(true)

            if (!isFirstMessageReceived) {
               setIsFirstMessageReceived(true)
            }

            // Clean up any existing controller
            cleanupSyncController()

            // Wait for the video element to be ready
            setTimeout(() => {
               if (interviewVideoRef.current && messageToPlay.attachments) {
                  // Create synced audio-video controller
                  const syncOptions: SyncOptions = {
                     onAudioEnd: () => {
                        switchToListenMode()
                        // setHasAudio(false)
                     },
                     onVideoEnd: () => {
                        // console.log('Video playback ended')
                     },
                     onSyncComplete: () => {
                        switchToListenMode()
                        // setHasAudio(false)
                     },
                  }

                  syncControllerRef.current = createSyncedAudioVideo(
                     messageToPlay.attachments,
                     interviewVideoRef.current,
                     syncOptions
                  )
               }
            }, 100) // Small delay to ensure video element is ready
         }
      }
   }, [hasJoined, messages, isFirstMessageReceived, switchToListenMode, cleanupSyncController, dispatch])

   // Handle video ended event
   const handleVideoEnded = (): void => {
      // Only switch to listen mode if the video is the speaking video
      if (currentVideo === OPENNEZT_INTERVIEW_SPEAK) {
         switchToListenMode()
      }
   }

   // Clean up on unmount
   useEffect(() => {
      return () => {
         cleanupSyncController()
      }
   }, [cleanupSyncController])

   return {
      interviewVideoRef,
      currentVideo,
      isFirstMessageReceived,
      setCurrentVideo,
      handleVideoEnded,
      setIsFirstMessageReceived,
   }
}
