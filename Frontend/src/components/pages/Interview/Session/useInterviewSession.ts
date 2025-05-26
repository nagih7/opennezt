import { useEffect, useCallback } from 'react'
import useInterviewPreview from '../Preview/useInterviewPreview'
import { useVoiceDetection, useInterviewTimer, useAudioPlayer, useInterviewState } from './hooks'

interface UseInterviewSessionManagerReturn {
   // Video ref from base interview hook
   videoRef: React.RefObject<HTMLVideoElement | null>

   // Voice detection state and controls
   isListening: boolean
   isSpeaking: boolean
   voiceError: string | null
   setupVoiceDetection: () => Promise<boolean>
   cleanupVoiceDetection: () => Promise<void>
   toggleVoiceDetection: () => void
   isVoiceDetectorActive: () => boolean

   // Timer state and controls
   interviewDuration: number
   formattedTime: string

   // Audio player state and controls
   isPlaying: boolean
   currentAudioUrl: string | null
   playAudio: (audioUrl: string) => Promise<void>

   // Interview state and actions
   isOpenModalInterview: boolean
   currentAction: string
   messages: any[]
   conversation: any
   isLoadingReplyInterview: boolean
   hasJoined: boolean
   isOpenModalCloseInterview: boolean
   confirmSendData: boolean
   audioBlob: Blob | null

   // Interview actions
   sendAudioMessage: (blob: Blob) => Promise<void>
   handleCloseInterview: () => void
   handleConfirmCloseInterview: () => void
   onChangeConfirmSendData: (event: React.FormEvent) => void
   setIsOpenModalCloseInterview: (value: boolean) => void
}

export const useInterviewSession = (): UseInterviewSessionManagerReturn => {
   const { videoRef } = useInterviewPreview()

   // Initialize interview state hook
   const {
      isOpenModalInterview,
      currentAction,
      messages,
      conversation,
      isLoadingReplyInterview,
      hasJoined,
      isOpenModalCloseInterview,
      confirmSendData,
      audioBlob,
      sendAudioMessage,
      handleCloseInterview,
      handleConfirmCloseInterview,
      setIsOpenModalCloseInterview,
      setAudioBlob,
      onChangeConfirmSendData,
   } = useInterviewState({
      onSendAudio: (blob) => {
         setAudioBlob(blob)
      },
   })

   // Initialize timer hook
   const { duration: interviewDuration, formattedTime } = useInterviewTimer({
      isActive: isOpenModalInterview,
      autoStart: true,
   })

   // Initialize audio player hook
   const {
      isPlaying,
      currentAudioUrl,
      playAudio,
      cleanup: cleanupAudioPlayer,
   } = useAudioPlayer({
      onPlay: () => {
         // Pause voice detection while audio is playing
         if (isVoiceDetectorActive()) {
            cleanupVoiceDetection()
         }
      },
      onEnd: () => {
         // Auto resume voice detection after audio finishes
         if (!isListening && isOpenModalInterview && !isLoadingReplyInterview) {
            setupVoiceDetection()
         }
      },
      onError: (error) => {
         console.error('Audio player error:', error)
      },
   })

   // Initialize voice detection hook
   const {
      isListening,
      isSpeaking,
      error: voiceError,
      setupVoiceDetection,
      cleanupVoiceDetection,
      toggleVoiceDetection,
      isVoiceDetectorActive,
   } = useVoiceDetection({
      onSpeechStart: () => {},
      onSpeechEnd: () => {},
      onAudioReady: (blob: Blob) => {
         sendAudioMessage(blob)
      },
      onError: (error) => {
         console.error('Voice detection error:', error)
      },
      threshold: 10,
      silenceDelay: 3000,
      sampleRate: 44100,
   })

   // Enhanced cleanup function that cleans up all resources
   const cleanup = useCallback(async (): Promise<void> => {
      await cleanupVoiceDetection()
      cleanupAudioPlayer()
   }, [cleanupVoiceDetection, cleanupAudioPlayer])

   // Stop voice detection when AI is speaking
   useEffect(() => {
      if (currentAction === 'speaking' && isVoiceDetectorActive()) {
         // Stop listening while AI is speaking
         cleanupVoiceDetection()
      } else if (
         currentAction === 'listening' &&
         !isListening &&
         !isPlaying &&
         isOpenModalInterview &&
         !isLoadingReplyInterview
      ) {
         // Auto-resume listening when AI stops speaking
         setupVoiceDetection()
      }
   }, [
      currentAction,
      isPlaying,
      isOpenModalInterview,
      isListening,
      isLoadingReplyInterview,
      isVoiceDetectorActive,
      cleanupVoiceDetection,
      setupVoiceDetection,
   ])

   // Stop voice detection when API replyInterview is called
   useEffect(() => {
      if (isLoadingReplyInterview && isVoiceDetectorActive()) {
         cleanupVoiceDetection()
      }
   }, [isLoadingReplyInterview, isVoiceDetectorActive, cleanupVoiceDetection])

   // Prevent voice detection from starting if we're currently loading a reply
   const enhancedSetupVoiceDetection = useCallback(async (): Promise<boolean> => {
      if (isLoadingReplyInterview) {
         return false
      }
      return await setupVoiceDetection()
   }, [isLoadingReplyInterview, setupVoiceDetection])

   // Enhanced cleanup on unmount
   useEffect(() => {
      return () => {
         cleanup()
      }
   }, [cleanup])

   return {
      // Video ref
      videoRef,

      // Voice detection
      isListening,
      isSpeaking,
      voiceError,
      setupVoiceDetection: enhancedSetupVoiceDetection,
      cleanupVoiceDetection,
      toggleVoiceDetection,
      isVoiceDetectorActive,

      // Timer
      interviewDuration,
      formattedTime,

      // Audio player
      isPlaying,
      currentAudioUrl,
      playAudio,

      // Interview state
      isOpenModalInterview,
      currentAction,
      messages,
      conversation,
      isLoadingReplyInterview,
      hasJoined,
      isOpenModalCloseInterview,
      confirmSendData,
      audioBlob,

      // Interview actions
      sendAudioMessage,
      handleCloseInterview,
      handleConfirmCloseInterview,
      onChangeConfirmSendData,
      setIsOpenModalCloseInterview,
   }
}
