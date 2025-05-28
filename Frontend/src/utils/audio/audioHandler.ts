/**
 * Audio Handler Utility for OpenNezt Interview Features
 * Provides functions to manage audio playback and events
 */

// Global audio instance tracking
class AudioInstanceManager {
   private static instance: AudioInstanceManager
   private audioInstances: Set<HTMLAudioElement> = new Set()

   static getInstance(): AudioInstanceManager {
      if (!AudioInstanceManager.instance) {
         AudioInstanceManager.instance = new AudioInstanceManager()
      }
      return AudioInstanceManager.instance
   }

   addAudio(audio: HTMLAudioElement): void {
      this.audioInstances.add(audio)
   }

   removeAudio(audio: HTMLAudioElement): void {
      this.audioInstances.delete(audio)
   }

   stopAllAudio(): void {
      this.audioInstances.forEach((audio) => {
         try {
            audio.pause()
            audio.currentTime = 0
            audio.src = ''
         } catch (error) {
            console.warn('Error stopping audio instance:', error)
         }
      })
      this.audioInstances.clear()
   }
   getActiveCount(): number {
      return this.audioInstances.size
   }
}

// Export manager instance for external use
export const audioInstanceManager = AudioInstanceManager.getInstance()

// Utility function to stop all audio instances
export const stopAllAudio = (): void => {
   audioInstanceManager.stopAllAudio()
}

// Type definitions
interface AudioPlayerOptions {
   onEnd?: () => void
   onPlay?: () => void
   onError?: (error: Event | Error) => void
   onTimeUpdate?: (currentTime: number, duration: number) => void
   autoPlay?: boolean
}

interface AudioPlayerController {
   audio: HTMLAudioElement
   play: () => void
   pause: () => void
   stop: () => void
   isPlaying: () => boolean
   getCurrentTime: () => number
   getDuration: () => number
   setVolume: (volume: number) => void
   cleanup: () => void
}

interface SyncedAudioVideoOptions {
   onAudioEnd?: () => void
   onVideoEnd?: () => void
   onSyncComplete?: () => void
   autoStart?: boolean
}

export interface SyncedAudioVideoController {
   start: () => void
   stop: () => void
   pause: () => void
   resume: () => void
   isAudioEnded: () => boolean
   isVideoEnded: () => boolean
   cleanup: () => void
}

/**
 * Creates an audio player with enhanced event handling
 * @param src - URL of the audio to play
 * @param options - Configuration options
 * @returns Audio controller with methods and the audio element
 */
export const createAudioPlayer = (src: string, options: AudioPlayerOptions = {}): AudioPlayerController => {
   const {
      onEnd = () => {
         /* noop */
      },
      onPlay = () => {
         /* noop */
      },
      onError = (error: Event | Error) => console.error('Audio playback error:', error),
      onTimeUpdate = () => {
         /* noop */
      },
      autoPlay = true,
   } = options // Create audio element
   const audio = new Audio(src)

   // Add to global manager
   const audioManager = AudioInstanceManager.getInstance()
   audioManager.addAudio(audio) // Track if the audio has started playing
   let hasStarted = false

   // Get the global audio instance manager
   const audioInstanceManager = AudioInstanceManager.getInstance()
   audioInstanceManager.addAudio(audio)

   // Create a wrapper for the timeupdate handler
   const timeUpdateHandler = () => {
      onTimeUpdate(audio.currentTime, audio.duration)
   }

   // Set up event listeners
   audio.addEventListener('ended', () => {
      onEnd()
   })

   audio.addEventListener('playing', () => {
      hasStarted = true
      onPlay()
   })

   audio.addEventListener('error', (e: Event) => {
      onError(e)
   })

   audio.addEventListener('timeupdate', timeUpdateHandler)

   // Start playing if autoPlay is enabled
   if (autoPlay) {
      audio.play().catch(onError)
   }

   return {
      audio,

      // Play the audio
      play: () => audio.play().catch(onError),

      // Pause the audio
      pause: () => audio.pause(),

      // Stop and reset the audio
      stop: () => {
         audio.pause()
         audio.currentTime = 0
      },

      // Check if audio is currently playing
      isPlaying: () => !audio.paused && hasStarted,

      // Get current time in seconds
      getCurrentTime: () => audio.currentTime,

      // Get total duration in seconds
      getDuration: () => audio.duration,

      // Set volume (0-1)
      setVolume: (volume: number) => {
         audio.volume = Math.min(Math.max(volume, 0), 1)
      }, // Clean up method to remove event listeners and stop audio
      cleanup: () => {
         // Force stop audio playback first
         audio.pause()
         audio.currentTime = 0
         audio.src = '' // Clear the audio source to free memory

         // Remove all event listeners
         audio.removeEventListener('ended', onEnd)
         audio.removeEventListener('playing', onPlay)
         audio.removeEventListener('error', onError)
         audio.removeEventListener('timeupdate', timeUpdateHandler)

         // Remove from global audio instance manager
         audioInstanceManager.removeAudio(audio)
      },
   }
}

/**
 * Checks if an audio file exists and is playable
 * @param url - URL of the audio to check
 * @returns Promise that resolves to true if audio is valid
 */
export const checkAudioValidity = (url: string): Promise<boolean> => {
   return new Promise((resolve) => {
      const audio = new Audio()

      const onCanPlay = () => {
         cleanup()
         resolve(true)
      }

      const onError = () => {
         cleanup()
         resolve(false)
      }

      const cleanup = () => {
         audio.removeEventListener('canplaythrough', onCanPlay)
         audio.removeEventListener('error', onError)
      }

      audio.addEventListener('canplaythrough', onCanPlay)
      audio.addEventListener('error', onError)

      audio.src = url

      // Set a timeout to prevent hanging indefinitely
      setTimeout(() => {
         if (audio.readyState < 3) {
            // HAVE_FUTURE_DATA = 3
            cleanup()
            resolve(false)
         }
      }, 5000)
   })
}

/**
 * Creates a synchronized audio-video player
 * @param audioSrc - URL of the audio to play
 * @param videoElement - Video element to synchronize with
 * @param options - Configuration options for audio and synchronization
 * @returns Controller for the synchronized playback
 */
export const createSyncedAudioVideo = (
   audioSrc: string,
   videoElement: HTMLVideoElement,
   options: SyncedAudioVideoOptions = {}
): SyncedAudioVideoController => {
   const {
      onAudioEnd = () => {
         /* noop */
      },
      onVideoEnd = () => {
         /* noop */
      },
      onSyncComplete = () => {
         /* noop */
      },
      autoStart = true,
   } = options

   let isAudioEnded = false
   let isVideoEnded = false

   // Create audio player
   const audioPlayer = createAudioPlayer(audioSrc, {
      autoPlay: autoStart,
      onEnd: () => {
         isAudioEnded = true
         onAudioEnd()
         checkSyncComplete()
      },
      onError: (error: Event | Error) => {
         console.error('Audio sync error:', error)
         // If audio fails, still allow the video to play independently
         isAudioEnded = true
         checkSyncComplete()
      },
   })

   // Add video event listeners
   const handleVideoEnded = () => {
      isVideoEnded = true
      onVideoEnd()
      checkSyncComplete()
   }

   // Check if both audio and video have completed
   const checkSyncComplete = () => {
      if (isAudioEnded && isVideoEnded) {
         onSyncComplete()
      } else if (isAudioEnded) {
         // If audio ends first, force the video to end as well
         videoElement.currentTime = videoElement.duration
      }
   }

   videoElement.addEventListener('ended', handleVideoEnded)

   // Return controller object
   return {
      start: () => {
         isAudioEnded = false
         isVideoEnded = false
         videoElement.play()
         audioPlayer.play()
      },
      stop: () => {
         audioPlayer.stop()
         videoElement.pause()
         videoElement.currentTime = 0
      },

      pause: () => {
         audioPlayer.pause()
         videoElement.pause()
      },

      resume: () => {
         audioPlayer.play()
         videoElement.play()
      },

      isAudioEnded: () => isAudioEnded,
      isVideoEnded: () => isVideoEnded,
      cleanup: () => {
         // Stop everything first
         audioPlayer.stop()
         videoElement.pause()
         videoElement.currentTime = 0

         audioPlayer.cleanup()

         // Remove video event listeners
         videoElement.removeEventListener('ended', handleVideoEnded)
      },
   }
}
