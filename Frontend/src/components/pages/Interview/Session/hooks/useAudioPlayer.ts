import { useState, useRef, useCallback, useEffect } from 'react'

export interface AudioPlayer {
   cleanup: () => void
}

interface UseAudioPlayerProps {
   onPlay?: () => void
   onEnd?: () => void
   onError?: (error: string) => void
   autoPlay?: boolean
}

interface UseAudioPlayerReturn {
   isPlaying: boolean
   currentAudioUrl: string | null
   playAudio: (audioUrl: string) => Promise<void>
   stopAudio: () => void
   pauseAudio: () => void
   resumeAudio: () => void
   cleanup: () => void
}

// Simple audio player implementation
const createAudioPlayer = (
   audioUrl: string,
   options: {
      autoPlay?: boolean
      onPlay?: () => void
      onEnd?: () => void
      onError?: (error: Error) => void
   }
): AudioPlayer & { audio: HTMLAudioElement; play: () => Promise<void>; pause: () => void; stop: () => void } => {
   const audio = new Audio(audioUrl)

   const handlePlay = () => options.onPlay?.()
   const handleEnd = () => options.onEnd?.()
   const handleError = () => options.onError?.(new Error('Audio playback error'))

   audio.addEventListener('play', handlePlay)
   audio.addEventListener('ended', handleEnd)
   audio.addEventListener('error', handleError)

   if (options.autoPlay) {
      audio.play().catch((error) => {
         console.error('Auto-play failed:', error)
         options.onError?.(error)
      })
   }

   return {
      audio,
      cleanup: () => {
         audio.pause()
         audio.currentTime = 0
         audio.removeEventListener('play', handlePlay)
         audio.removeEventListener('ended', handleEnd)
         audio.removeEventListener('error', handleError)
      },
      play: () => audio.play(),
      pause: () => audio.pause(),
      stop: () => {
         audio.pause()
         audio.currentTime = 0
      },
   }
}

export const useAudioPlayer = ({
   onPlay,
   onEnd,
   onError,
   autoPlay = true,
}: UseAudioPlayerProps = {}): UseAudioPlayerReturn => {
   const [isPlaying, setIsPlaying] = useState<boolean>(false)
   const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null)
   const audioPlayerRef = useRef<
      (AudioPlayer & { audio: HTMLAudioElement; play: () => Promise<void>; pause: () => void; stop: () => void }) | null
   >(null)

   const cleanup = useCallback((): void => {
      if (audioPlayerRef.current) {
         audioPlayerRef.current.cleanup()
         audioPlayerRef.current = null
      }
      setIsPlaying(false)
      setCurrentAudioUrl(null)
   }, [])

   const playAudio = useCallback(
      async (audioUrl: string): Promise<void> => {
         try {
            // Clean up previous audio player if exists
            cleanup()

            setCurrentAudioUrl(audioUrl)

            // Create a new audio player for the response
            audioPlayerRef.current = createAudioPlayer(audioUrl, {
               autoPlay,
               onPlay: () => {
                  setIsPlaying(true)
                  onPlay?.()
               },
               onEnd: () => {
                  setIsPlaying(false)
                  onEnd?.()
               },
               onError: (error: Error) => {
                  console.error('Error playing audio:', error)
                  const errorMessage = 'Failed to play audio response'
                  setIsPlaying(false)
                  onError?.(errorMessage)
               },
            })

            if (!autoPlay && audioPlayerRef.current) {
               await audioPlayerRef.current.play()
            }
         } catch (error) {
            console.error('Audio playback error:', error)
            setIsPlaying(false)
            onError?.('Failed to play audio')
         }
      },
      [autoPlay, onPlay, onEnd, onError, cleanup]
   )

   const stopAudio = useCallback((): void => {
      if (audioPlayerRef.current) {
         audioPlayerRef.current.stop()
         setIsPlaying(false)
      }
   }, [])

   const pauseAudio = useCallback((): void => {
      if (audioPlayerRef.current) {
         audioPlayerRef.current.pause()
         setIsPlaying(false)
      }
   }, [])

   const resumeAudio = useCallback((): void => {
      if (audioPlayerRef.current) {
         audioPlayerRef.current
            .play()
            .then(() => {
               setIsPlaying(true)
            })
            .catch((error) => {
               console.error('Resume audio error:', error)
               onError?.('Failed to resume audio')
            })
      }
   }, [onError])

   // Cleanup on unmount
   useEffect(() => {
      return () => {
         cleanup()
      }
   }, [cleanup])

   return {
      isPlaying,
      currentAudioUrl,
      playAudio,
      stopAudio,
      pauseAudio,
      resumeAudio,
      cleanup,
   }
}
