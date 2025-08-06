import { useRef, useState, useCallback, useEffect } from 'react'
import VoiceDetector, { createVoiceDetector } from '~/utils/audio/voiceDetection'

interface UseVoiceDetectionProps {
   onSpeechStart?: () => void
   onSpeechEnd?: () => void
   onAudioReady?: (blob: Blob) => void
   onError?: (error: string) => void
   threshold?: number
   silenceDelay?: number
   sampleRate?: number
}

interface UseVoiceDetectionReturn {
   isListening: boolean
   isSpeaking: boolean
   error: string | null
   setupVoiceDetection: () => Promise<boolean>
   cleanupVoiceDetection: () => Promise<void>
   toggleVoiceDetection: () => void
   isVoiceDetectorActive: () => boolean
}

export const useVoiceDetection = ({
   onSpeechStart,
   onSpeechEnd,
   onAudioReady,
   onError,
   threshold = 10,
   silenceDelay = 3000,
   sampleRate = 44100,
}: UseVoiceDetectionProps = {}): UseVoiceDetectionReturn => {
   const [isListening, setIsListening] = useState<boolean>(false)
   const [isSpeaking, setIsSpeaking] = useState<boolean>(false)
   const [error, setError] = useState<string | null>(null)

   const voiceDetectorRef = useRef<VoiceDetector | null>(null)

   const setupVoiceDetection = useCallback(async (): Promise<boolean> => {
      try {
         // Clean up any existing detector
         if (voiceDetectorRef.current) {
            await voiceDetectorRef.current.stop()
         }

         // Create voice detector with callbacks
         voiceDetectorRef.current = createVoiceDetector({
            threshold,
            silenceDelay,
            sampleRate,
            onSpeechStart: () => {
               setIsSpeaking(true)
               onSpeechStart?.()
            },
            onSpeechEnd: () => {
               setIsSpeaking(false)
               onSpeechEnd?.()
            },
            onAudioReady: (blob: Blob) => {
               onAudioReady?.(blob)
            },
            onError: (err: Event | Error) => {
               const errorMessage = 'Microphone access denied'
               setError(errorMessage)
               setIsListening(false)
               onError?.(errorMessage)
               console.error('Voice detection error:', err)
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
         if (!voiceDetectorRef.current) return false

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
   }, [threshold, silenceDelay, sampleRate, onSpeechStart, onSpeechEnd, onAudioReady, onError])

   const cleanupVoiceDetection = useCallback(async (): Promise<void> => {
      if (voiceDetectorRef.current) {
         await voiceDetectorRef.current.stop()
         voiceDetectorRef.current = null
      }
      setIsListening(false)
      setIsSpeaking(false)
      setError(null)
   }, [])

   const toggleVoiceDetection = useCallback((): void => {
      if (isListening) {
         cleanupVoiceDetection()
      } else {
         setupVoiceDetection()
      }
   }, [isListening, cleanupVoiceDetection, setupVoiceDetection])

   const isVoiceDetectorActive = useCallback((): boolean => {
      return voiceDetectorRef.current?.isActive() ?? false
   }, [])

   // Cleanup on unmount
   useEffect(() => {
      return () => {
         cleanupVoiceDetection()
      }
   }, [cleanupVoiceDetection])

   return {
      isListening,
      isSpeaking,
      error,
      setupVoiceDetection,
      cleanupVoiceDetection,
      toggleVoiceDetection,
      isVoiceDetectorActive,
   }
}
