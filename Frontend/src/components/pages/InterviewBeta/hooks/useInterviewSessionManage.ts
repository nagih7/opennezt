import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeInterview, replyInterview } from 'api/interview'
import { createVoiceDetector } from 'utils/audio/voiceDetection'
import type React from 'react'

// Type definitions for VoiceDetector based on the utility file
interface VoiceDetector {
   start(): Promise<boolean>
   stop(): Promise<void>
   isActive(): boolean
   isSpeechDetected(): boolean
   setThreshold(threshold: number): void
}

// Type for audio player (based on usage patterns)
interface AudioPlayer {
   cleanup(): void
}

// Return type for the hook
interface UseInterviewSessionManageReturn {
   isOpenModalInterview: boolean
   currentAction: 'speaking' | 'listening'
   messages: any[]
   conversation: any
   isLoadingReplyInterview: boolean
   hasJoined: boolean
   isListening: boolean
   isSpeaking: boolean
   error: string | null
   interviewDuration: number
   audioBlob: Blob | null
   isOpenModalCloseInterview: boolean
   confirmSendData: boolean
   voiceDetectorRef: React.RefObject<VoiceDetector | null>
   audioPlayerRef: React.RefObject<AudioPlayer | null>
   timerRef: React.RefObject<NodeJS.Timeout | null>
   formatTime: (seconds: number) => string
   setupVoiceDetection: () => Promise<boolean>
   cleanupVoiceDetection: () => Promise<void>
   toggleVoiceDetection: () => void
   sendAudioMessage: (blob: Blob) => Promise<void>
   cleanupAudioPlayer: () => void
   handleCloseInterview: () => void
   onChangeConfirmSendData: (event: React.ChangeEvent<HTMLInputElement>) => void
   handleConfirmCloseInterview: () => void
   setIsOpenModalCloseInterview: React.Dispatch<React.SetStateAction<boolean>>
}

export const useInterviewSessionManage = (): UseInterviewSessionManageReturn => {
   const dispatch = useDispatch()
   // STATE
   const { isOpenModalInterview, currentAction, messages, conversation, isLoadingReplyInterview, hasJoined } =
      useSelector((state: any) => state.interview)
   const [isListening, setIsListening] = useState<boolean>(false)
   const [isSpeaking, setIsSpeaking] = useState<boolean>(false)
   const [error, setError] = useState<string | null>(null)
   const [interviewDuration, setInterviewDuration] = useState<number>(0)
   const [isPlaying] = useState<boolean>(false) // isPlaying is used in useEffect dependency array
   const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
   const [isOpenModalCloseInterview, setIsOpenModalCloseInterview] = useState<boolean>(false)
   const [confirmSendData, setConfirmSendData] = useState<boolean>(false)

   // REFS
   const voiceDetectorRef = useRef<VoiceDetector | null>(null)
   const audioPlayerRef = useRef<AudioPlayer | null>(null)
   const timerRef = useRef<NodeJS.Timeout | null>(null)
   // Start timer for interview duration
   useEffect(() => {
      if (isOpenModalInterview) {
         timerRef.current = setInterval(() => {
            setInterviewDuration((prev) => prev + 1)
         }, 1000)
      }
      return () => {
         if (timerRef.current) {
            clearInterval(timerRef.current)
         }
      }
   }, [isOpenModalInterview])

   // Format time for display (mm:ss)
   const formatTime = (seconds: number): string => {
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`
   }
   // VOICE DETECTION SETUP
   const setupVoiceDetection = async (): Promise<boolean> => {
      try {
         // Don't start voice detection if we're currently loading a reply
         if (isLoadingReplyInterview) {
            setError('Waiting for AI response...')
            setIsListening(false)
            return false
         }

         // Clean up any existing detector
         if (voiceDetectorRef.current) {
            await voiceDetectorRef.current.stop()
         }

         // Create voice detector with callbacks
         voiceDetectorRef.current = createVoiceDetector({
            threshold: 10,
            silenceDelay: 3000,
            sampleRate: 44100,
            onSpeechStart: () => {
               setIsSpeaking(true)
            },
            onSpeechEnd: () => {
               setIsSpeaking(false)
               // The audio blob is automatically created by the voice detector
            },
            onAudioReady: (blob: Blob) => {
               // This callback receives the audio blob when speech ends
               setAudioBlob(blob)
               // Send the audio to be processed
               sendAudioMessage(blob)
            },
            onError: (_err: unknown) => {
               setError('Microphone access denied')
               setIsListening(false)
            },
            onListeningStart: () => {
               setIsListening(true)
               setError(null)
            },
            onListeningEnd: () => {
               setIsListening(false)
               setIsSpeaking(false)
            },
         })

         // Start the voice detector
         const success = await voiceDetectorRef.current.start()
         if (!success) {
            setError('Failed to start voice detection')
            return false
         }
         return true
      } catch (err) {
         setError('Voice detection error')
         setIsListening(false)
         return false
      }
   }
   // CLEANUP FUNCTION
   const cleanupVoiceDetection = async (): Promise<void> => {
      if (voiceDetectorRef.current) {
         await voiceDetectorRef.current.stop()
         voiceDetectorRef.current = null
      }
   }

   // Toggle voice detection on/off
   const toggleVoiceDetection = (): void => {
      if (isListening) {
         cleanupVoiceDetection()
      } else {
         setupVoiceDetection()
      }
   } // Send audio message to the server for speech-to-text conversion
   const sendAudioMessage = async (blob: Blob): Promise<void> => {
      if (!blob) return

      if (currentAction === 'speaking' || isLoadingReplyInterview === true || !hasJoined) {
         return
      }

      try {
         // Stop voice detection immediately before sending the message
         if (voiceDetectorRef.current && voiceDetectorRef.current.isActive()) {
            await voiceDetectorRef.current.stop()
            setIsListening(false)
         }

         // Create a FormData object to send the audio file
         const audioFile = new File([blob], `voice_message_${Date.now()}.wav`, {
            type: 'audio/wav',
         })

         const payload = {
            audio: audioFile,
            interview: conversation,
         }
         dispatch(replyInterview(payload) as any)
      } catch (error) {
         setError('Failed to send audio message')
      }
   }
   // Cleanup function for audio player
   const cleanupAudioPlayer = (): void => {
      if (audioPlayerRef.current) {
         audioPlayerRef.current.cleanup()
         audioPlayerRef.current = null
      }
   }

   // Enhanced cleanup on unmount to include audio player
   useEffect(() => {
      return () => {
         cleanupVoiceDetection()
         cleanupAudioPlayer()
         if (timerRef.current) {
            clearInterval(timerRef.current)
         }
      }
   }, []) // Stop voice detection when AI is speaking
   useEffect(() => {
      if (currentAction === 'speaking' && voiceDetectorRef.current && voiceDetectorRef.current.isActive()) {
         // Stop listening while AI is speaking
         voiceDetectorRef.current.stop()
         setIsListening(false)
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [currentAction, isPlaying, isOpenModalInterview, isListening, isLoadingReplyInterview])

   // Stop voice detection when API replyInterview is called (isLoadingReplyInterview becomes true)
   useEffect(() => {
      if (isLoadingReplyInterview && voiceDetectorRef.current && voiceDetectorRef.current.isActive()) {
         voiceDetectorRef.current.stop()
         setIsListening(false)
         setError('Waiting for AI response...')
      }
   }, [isLoadingReplyInterview])

   const handleCloseInterview = (): void => {
      setIsOpenModalCloseInterview(true)
   }

   const onChangeConfirmSendData = (event: React.ChangeEvent<HTMLInputElement>): void => {
      setConfirmSendData(event.target.checked)
   }

   const handleConfirmCloseInterview = (): void => {
      cleanupVoiceDetection()
      cleanupAudioPlayer()

      const payload = {
         interview: conversation,
         storage: confirmSendData,
      }
      if (confirmSendData) dispatch(closeInterview({ ...payload, messages }) as any)
      else dispatch(closeInterview(payload) as any)
      setIsOpenModalCloseInterview(false)
   }

   return {
      isOpenModalInterview,
      currentAction,
      messages,
      conversation,
      isLoadingReplyInterview,
      hasJoined,
      isListening,
      isSpeaking,
      error,
      interviewDuration,
      audioBlob,
      isOpenModalCloseInterview,
      confirmSendData,
      voiceDetectorRef,
      audioPlayerRef,
      timerRef,
      formatTime,
      setupVoiceDetection,
      cleanupVoiceDetection,
      toggleVoiceDetection,
      sendAudioMessage,
      cleanupAudioPlayer,
      handleCloseInterview,
      onChangeConfirmSendData,
      handleConfirmCloseInterview,
      setIsOpenModalCloseInterview,
   }
}
