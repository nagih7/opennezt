import { useEffect, useRef, useState } from 'react'
import { toaster } from '~/components/UI/toaster'

// Type definitions
interface PermissionStatus {
   camera: 'prompt' | 'granted' | 'denied'
   microphone: 'prompt' | 'granted' | 'denied'
}

interface DebuggingInfo {
   hasMediaDevices: boolean
   hasEnumerateDevices: boolean
   hasUserMediaSupport: boolean
   secure?: boolean
   deviceCount: number
}

type DeviceType = 'audio-input' | 'audio-output' | 'video'

interface UseInterviewReturn {
   audioInputDevices: MediaDeviceInfo[]
   audioOutputDevices: MediaDeviceInfo[]
   videoDevices: MediaDeviceInfo[]
   error: string | null
   permissionStatus: PermissionStatus
   debugging: DebuggingInfo
   videoRef: React.RefObject<HTMLVideoElement | null>
   streamRef: React.RefObject<MediaStream | null>
   selectedAudioInput: MediaDeviceInfo | null
   selectedAudioOutput: MediaDeviceInfo | null
   selectedVideo: MediaDeviceInfo | null
   requestMediaPermissions: () => Promise<void>
   handleDeviceSelect: (type: DeviceType, device: MediaDeviceInfo) => void
   handleTechnicalIssues: () => void
}

export const useInterviewPreview = (): UseInterviewReturn => {
   // STATE
   const [audioInputDevices, setAudioInputDevices] = useState<MediaDeviceInfo[]>([])
   const [audioOutputDevices, setAudioOutputDevices] = useState<MediaDeviceInfo[]>([])
   const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([])
   const [error, setError] = useState<string | null>(null)
   const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>({
      camera: 'prompt',
      microphone: 'prompt',
   })
   const [debugging, setDebugging] = useState<DebuggingInfo>({
      hasMediaDevices: false,
      hasEnumerateDevices: false,
      hasUserMediaSupport: false,
      deviceCount: 0,
   }) // References
   const videoRef = useRef<HTMLVideoElement>(null)
   const streamRef = useRef<MediaStream | null>(null)

   // Trạng thái các thiết bị
   const [selectedAudioInput, setSelectedAudioInput] = useState<MediaDeviceInfo | null>(null)
   const [selectedAudioOutput, setSelectedAudioOutput] = useState<MediaDeviceInfo | null>(null)
   const [selectedVideo, setSelectedVideo] = useState<MediaDeviceInfo | null>(null)

   // Kiểm tra khả năng của trình duyệt khi gắn kết
   useEffect(() => {
      // Set debug information about browser capabilities
      setDebugging({
         hasMediaDevices: !!navigator.mediaDevices,
         hasEnumerateDevices: !!(navigator.mediaDevices && navigator.mediaDevices.enumerateDevices),
         hasUserMediaSupport: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
         secure: window.isSecureContext,
         deviceCount: 0,
      })

      // Check if we're in a secure context (HTTPS or localhost)
      if (!window.isSecureContext) {
         setError('Media devices can only be accessed in a secure context (HTTPS or localhost)')
         toaster.create({
            type: 'error',
            title: 'This page must be accessed via HTTPS to use cameras and microphones.',
         })
      }
   }, [])

   // Lấy các thiết bị có sẵn trên giá đỡ thành phần
   useEffect(() => {
      async function getAvailableDevices() {
         // ...existing code...
         if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
            setError("Your browser doesn't support media device access.")
            toaster.create({
               type: 'error',
               title: "Your browser doesn't support media device access.",
            })
            return
         }

         try {
            // First try to enumerate devices without requesting permissions
            // This will still list devices but with generic labels like "audio input" instead of specific names
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

               // Enumerate devices again after requesting permissions to get device labels
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

            // Set default selections if available
            if (audioInputs.length > 0) setSelectedAudioInput(audioInputs[0])
            if (audioOutputs.length > 0) setSelectedAudioOutput(audioOutputs[0])
            if (videoInputs.length > 0) {
               setSelectedVideo(videoInputs[0])
            } else if (videoInputs.length === 0) {
               toaster.create({
                  type: 'warning',
                  title: 'No video devices detected. Please connect a camera to continue.',
               })
            }
         } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : String(error)
            setError(`Failed to access media devices: ${errorMessage}`)
            toaster.create({
               type: 'error',
               title: 'Failed to access media devices. Please check your permissions.',
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

   // Add this new useEffect for handling video stream
   useEffect(() => {
      if (selectedVideo && videoRef.current) {
         // Stop any existing stream
         if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop())
         }

         // Start new video stream with selected device
         navigator.mediaDevices
            .getUserMedia({
               video: { deviceId: selectedVideo.deviceId },
            })
            .then((stream) => {
               streamRef.current = stream
               if (videoRef.current) {
                  videoRef.current.srcObject = stream
               }
            })
            .catch((error: unknown) => {
               const errorMessage = error instanceof Error ? error.message : String(error)
               setError(`Failed to start video: ${errorMessage}`)
               toaster.create({
                  type: 'error',
                  title: 'Failed to start camera. Please check your permissions.',
               })
            })
      }
   }, [selectedVideo])

   // Hàm yêu cầu quyền truy cập camera và microphone
   const requestMediaPermissions = async () => {
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

         // Re-enumerate devices to get updated labels
         const devices = await navigator.mediaDevices.enumerateDevices()

         // Filter and update device lists
         const audioInputs = devices.filter((device) => device.kind === 'audioinput')
         const audioOutputs = devices.filter((device) => device.kind === 'audiooutput')
         const videoInputs = devices.filter((device) => device.kind === 'videoinput')

         setAudioInputDevices(audioInputs)
         setAudioOutputDevices(audioOutputs)
         setVideoDevices(videoInputs)

         // Set default selections if available
         if (audioInputs.length > 0) setSelectedAudioInput(audioInputs[0])
         if (audioOutputs.length > 0) setSelectedAudioOutput(audioOutputs[0])
         if (videoInputs.length > 0) {
            setSelectedVideo(videoInputs[0])
            // Display video preview
            if (videoRef.current) {
               videoRef.current.srcObject = stream
            }
         }

         toaster.create({
            type: 'success',
            title: 'Permissions granted successfully!',
         })

         setError(null)
      } catch (error: unknown) {
         const errorMessage = error instanceof Error ? error.message : String(error)
         setError(`Permission request failed: ${errorMessage}`)
         toaster.create({
            type: 'error',
            title: 'Permission request failed. Please check your browser settings.',
         })
      }
   } // Xử lý sự kiện chọn thiết bị
   const handleDeviceSelect = (type: DeviceType, device: MediaDeviceInfo) => {
      switch (type) {
         case 'audio-input':
            setSelectedAudioInput(device)
            break
         case 'audio-output':
            setSelectedAudioOutput(device)
            if (
               videoRef.current &&
               'setSinkId' in videoRef.current &&
               typeof videoRef.current.setSinkId === 'function'
            ) {
               videoRef.current.setSinkId(device.deviceId).catch((error: unknown) => {
                  console.error('Error setting audio output device:', error)
               })
            }
            break
         case 'video':
            setSelectedVideo(device)
            break
         default:
            break
      }
   }

   // Xử lý sự cố kỹ thuật
   const handleTechnicalIssues = () => {
      // Show debugging information in the console
      console.log('Device Detection Debug Info:', {
         browser: navigator.userAgent,
         permissions: permissionStatus,
         capabilities: debugging,
         audioInputs: audioInputDevices.length,
         audioOutputs: audioOutputDevices.length,
         videoInputs: videoDevices.length,
      })

      // Ask user to grant permissions again
      requestMediaPermissions()

      toaster.create({
         type: 'info',
         title: 'Attempting to detect devices again...',
      })
   }

   return {
      audioInputDevices,
      audioOutputDevices,
      videoDevices,
      error,
      permissionStatus,
      debugging,
      videoRef,
      streamRef,
      selectedAudioInput,
      selectedAudioOutput,
      selectedVideo,
      requestMediaPermissions,
      handleDeviceSelect,
      handleTechnicalIssues,
   }
}
