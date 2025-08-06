import { useCallback, useEffect, useRef, useState } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '~/store'
import { setCurrentAction } from '~/store/modules/interview'
import { createSyncedAudioVideo, SyncedAudioVideoController, stopAllAudio } from '~/utils/audio/audioHandler'
import { OPENNEZT_INTERVIEW_LISTEN, OPENNEZT_INTERVIEW_SPEAK } from '~/config/constants'

const useBotFrame = () => {
   const dispatch = useAppDispatch()
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
      // Pause speaking video
      if (speakingVideoRef.current && !speakingVideoRef.current.paused) {
         speakingVideoRef.current.pause()
      }

      // Set current video to listening
      setCurrentVideo(OPENNEZT_INTERVIEW_LISTEN)
      dispatch(setCurrentAction('listening'))

      // Ensure listening video is playing
      setTimeout(() => {
         if (listeningVideoRef.current) {
            const video = listeningVideoRef.current
            if (video.paused) {
               video.play().catch((error: unknown) => {
                  console.warn('Failed to play listening video:', error)
                  // Retry after a short delay
                  setTimeout(() => {
                     video.play().catch((err: unknown) => console.warn('Retry listening video failed:', err))
                  }, 100)
               })
            }
         }
      }, 50)
   }, [dispatch])

   const cleanupSyncController = useCallback(() => {
      if (syncControllerRef.current) {
         // Stop and clean up the sync controller
         stopAllAudio()
         syncControllerRef.current.stop()
         syncControllerRef.current.cleanup()
         syncControllerRef.current = null
      }
   }, [])

   // Listen for new messages and control video
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

            // Ensure speaking video is ready and force play
            const ensureVideoPlaying = () => {
               if (speakingVideoRef.current) {
                  const video = speakingVideoRef.current

                  // Force play the speaking video
                  if (video.paused) {
                     video.play().catch((error: unknown) => {
                        console.warn('Failed to play speaking video:', error)
                        // Retry after a short delay
                        setTimeout(() => {
                           video.play().catch((err: unknown) => console.warn('Retry speaking video failed:', err))
                        }, 100)
                     })
                  }

                  // Pause listening video to avoid conflicts
                  if (listeningVideoRef.current && !listeningVideoRef.current.paused) {
                     listeningVideoRef.current.pause()
                  }
               }
            }

            // Wait for the video element to be ready
            setTimeout(() => {
               if (speakingVideoRef.current && messageToPlay.attachments) {
                  // Ensure video is playing first
                  ensureVideoPlaying()

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
            }, 150) // Increased delay to ensure video element is ready
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

      // Ensure video is ready before attempting to play
      if (video.readyState >= 2) {
         // HAVE_CURRENT_DATA = 2
         if (video.paused) {
            video.play().catch((error: unknown) => {
               console.warn('Video autoplay failed:', error)
               // Try to force play after user interaction
               setTimeout(() => {
                  video.play().catch((err: unknown) => console.warn('Retry video play failed:', err))
               }, 100)
            })
         }
      } else {
         // Wait for video to be ready
         const onCanPlay = () => {
            video.removeEventListener('canplay', onCanPlay)
            if (video.paused) {
               video.play().catch((error: unknown) => console.warn('Video autoplay failed after canplay:', error))
            }
         }
         video.addEventListener('canplay', onCanPlay)
      }
   }, [])

   // Force stop all audio and cleanup
   const forceStopAudio = useCallback(() => {
      console.log('🛑 Force stopping all audio and video...')

      // Stop all audio instances
      stopAllAudio()

      // Clean up sync controller
      if (syncControllerRef.current) {
         syncControllerRef.current.stop()
         syncControllerRef.current.cleanup()
         syncControllerRef.current = null
      }

      // Pause video elements
      if (speakingVideoRef.current) {
         speakingVideoRef.current.pause()
      }
      if (listeningVideoRef.current) {
         listeningVideoRef.current.pause()
      }

      console.log('✅ All audio and video stopped')
   }, [])

   // Force play video when needed
   const forcePlayVideo = useCallback((videoType: string) => {
      console.log(`🎬 Force playing ${videoType} video...`)

      if (videoType === OPENNEZT_INTERVIEW_SPEAK && speakingVideoRef.current) {
         const video = speakingVideoRef.current
         video.currentTime = 0 // Reset to beginning
         video.play().catch((error: unknown) => {
            console.warn('Failed to force play speaking video:', error)
            // Try with user gesture simulation
            setTimeout(() => {
               video.play().catch((err: unknown) => console.warn('Retry force play failed:', err))
            }, 200)
         })
      } else if (videoType === OPENNEZT_INTERVIEW_LISTEN && listeningVideoRef.current) {
         const video = listeningVideoRef.current
         video.currentTime = 0 // Reset to beginning
         video.play().catch((error: unknown) => {
            console.warn('Failed to force play listening video:', error)
            // Try with user gesture simulation
            setTimeout(() => {
               video.play().catch((err: unknown) => console.warn('Retry force play failed:', err))
            }, 200)
         })
      }
   }, [])

   // Video state change management
   useEffect(() => {
      const handleVideoStateChange = () => {
         // Monitor video state changes and ensure proper playback
         if (currentVideo === OPENNEZT_INTERVIEW_SPEAK && speakingVideoRef.current) {
            const video = speakingVideoRef.current
            if (video.paused && video.readyState >= 2) {
               video.play().catch((error: unknown) => {
                  console.warn('Failed to resume speaking video:', error)
               })
            }
         } else if (currentVideo === OPENNEZT_INTERVIEW_LISTEN && listeningVideoRef.current) {
            const video = listeningVideoRef.current
            if (video.paused && video.readyState >= 2) {
               video.play().catch((error: unknown) => {
                  console.warn('Failed to resume listening video:', error)
               })
            }
         }
      }

      // Set up periodic state monitoring
      const interval = setInterval(handleVideoStateChange, 1000)

      return () => {
         clearInterval(interval)
      }
   }, [currentVideo])

   return {
      speakingVideoRef,
      listeningVideoRef,
      currentVideo,
      handleVideoEnded,
      cleanupSyncController,
      handleVideoMetadataLoaded,
      forceStopAudio,
      forcePlayVideo,
   }
}

export default useBotFrame
