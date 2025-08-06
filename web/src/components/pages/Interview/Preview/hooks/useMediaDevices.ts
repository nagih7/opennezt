import { useState, useEffect, useRef } from 'react'
import { toast } from 'sonner'

// Type for permission status
type PermissionStatusType = 'prompt' | 'granted' | 'denied'

// Interface for debugging capabilities
interface DebuggingCapabilities {
   hasMediaDevices: boolean
   hasEnumerateDevices: boolean
   hasUserMediaSupport: boolean
   deviceCount: number
   secure?: boolean
}

interface UseMediaDevicesReturn {
   audioInputDevices: MediaDeviceInfo[]
   audioOutputDevices: MediaDeviceInfo[]
   videoDevices: MediaDeviceInfo[]
   error: string | null
   permissionStatus: {
      camera: PermissionStatusType
      microphone: PermissionStatusType
   }
   debugging: DebuggingCapabilities
   streamRef: React.RefObject<MediaStream | null>
   requestMediaPermissions: () => Promise<void>
   setError: (error: string | null) => void
}

export const useMediaDevices = (): UseMediaDevicesReturn => {
   // STATE
   const [audioInputDevices, setAudioInputDevices] = useState<MediaDeviceInfo[]>([])
   const [audioOutputDevices, setAudioOutputDevices] = useState<MediaDeviceInfo[]>([])
   const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([])
   const [error, setError] = useState<string | null>(null)
   const [permissionStatus, setPermissionStatus] = useState<{
      camera: PermissionStatusType
      microphone: PermissionStatusType
   }>({
      camera: 'prompt',
      microphone: 'prompt',
   })
   const [debugging, setDebugging] = useState<DebuggingCapabilities>({
      hasMediaDevices: false,
      hasEnumerateDevices: false,
      hasUserMediaSupport: false,
      deviceCount: 0,
   })

   // References
   const streamRef = useRef<MediaStream | null>(null)

   // Check browser capabilities on mount
   useEffect(() => {
      const debugInfo: DebuggingCapabilities = {
         hasMediaDevices: !!navigator.mediaDevices,
         hasEnumerateDevices: !!(navigator.mediaDevices && navigator.mediaDevices.enumerateDevices),
         hasUserMediaSupport: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
         deviceCount: 0,
      }

      setDebugging(debugInfo)

      // Check if we're in a secure context (HTTPS or localhost)
      if (!window.isSecureContext) {
         setError('Media devices can only be accessed in a secure context (HTTPS or localhost)')
         toast.error('Media devices can only be accessed in a secure context (HTTPS or localhost)', {
            description: 'Please reload the page in a secure context.',
            duration: 5000,
         })
      }
   }, [])

   // Get available devices on component mount
   useEffect(() => {
      async function getAvailableDevices() {
         if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
            setError("Your browser doesn't support media device access.")
            toast.error("Your browser doesn't support media device access.", {
               description: 'Please try a different browser or update your current one.',
               duration: 5000,
            })
            return
         }

         try {
            // First try to enumerate devices without requesting permissions
            let devices = await navigator.mediaDevices.enumerateDevices()
            let hasLabels = devices.some((device) => device.label !== '')

            // If we don't have device labels, we need to request permissions to get them
            if (!hasLabels) {
               // Try video first
               try {
                  const videoStream = await navigator.mediaDevices.getUserMedia({ video: true })
                  if (streamRef.current) {
                     streamRef.current.getTracks().forEach((track) => track.stop())
                  }
                  streamRef.current = videoStream
                  setPermissionStatus((prev) => ({ ...prev, camera: 'granted' }))
               } catch (err) {
                  console.warn('Camera permission denied:', err)
                  setPermissionStatus((prev) => ({ ...prev, camera: 'denied' }))
               }

               // Then try audio
               try {
                  const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true })
                  if (!streamRef.current) {
                     streamRef.current = audioStream
                  } else {
                     // Add audio tracks to existing stream
                     audioStream.getAudioTracks().forEach((track) => {
                        streamRef.current?.addTrack(track)
                     })
                  }
                  setPermissionStatus((prev) => ({ ...prev, microphone: 'granted' }))
               } catch (err) {
                  console.warn('Microphone permission denied:', err)
                  setPermissionStatus((prev) => ({ ...prev, microphone: 'denied' }))
               }

               // Enumerate devices again after requesting permissions
               devices = await navigator.mediaDevices.enumerateDevices()
            }

            // Update debugging info
            setDebugging((prev) => ({ ...prev, deviceCount: devices.length }))

            // Filter devices by type
            const audioInputs = devices.filter((device) => device.kind === 'audioinput')
            const audioOutputs = devices.filter((device) => device.kind === 'audiooutput')
            const videoInputs = devices.filter((device) => device.kind === 'videoinput')

            // Update device lists
            setAudioInputDevices(audioInputs)
            setAudioOutputDevices(audioOutputs)
            setVideoDevices(videoInputs)

            if (videoInputs.length === 0) {
               toast.warning('No video devices detected. Please connect a camera to continue.', {
                  description: 'You can still use audio devices.',
                  duration: 5000,
               })
            }
         } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error)
            setError(`Failed to access media devices: ${errorMessage}`)
            toast.error(`Failed to access media devices: ${errorMessage}`, {
               description: 'Please check your browser settings or try a different browser.',
               duration: 5000,
            })
         }
      }

      // Add device change listener for hot-plugging devices
      const handleDeviceChange = () => {
         getAvailableDevices()
      }

      navigator.mediaDevices?.addEventListener('devicechange', handleDeviceChange)
      getAvailableDevices()

      // Clean up the stream and event listener when component unmounts
      return () => {
         if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop())
         }
         navigator.mediaDevices?.removeEventListener('devicechange', handleDeviceChange)
      }
   }, [])

   // Request media permissions
   const requestMediaPermissions = async (): Promise<void> => {
      try {
         // Request both audio and video permissions at once
         const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
         })

         // Update permission status
         setPermissionStatus({
            camera: 'granted',
            microphone: 'granted',
         })

         // Stop any existing stream
         if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop())
         }

         // Store the new stream
         streamRef.current = stream

         toast.success('Permissions granted successfully!', {
            description: 'You can now use audio and video devices.',
            duration: 5000,
         })

         setError(null)
      } catch (error) {
         const errorMessage = error instanceof Error ? error.message : String(error)
         setError(`Permission request failed: ${errorMessage}`)

         toast.error(`Permission request failed: ${errorMessage}`, {
            description: 'Please check your browser settings or try a different browser.',
            duration: 5000,
         })
      }
   }

   return {
      audioInputDevices,
      audioOutputDevices,
      videoDevices,
      error,
      permissionStatus,
      debugging,
      streamRef,
      requestMediaPermissions,
      setError,
   }
}
