import { useEffect, useRef } from 'react'
import { toast } from 'sonner'

interface UseVideoStreamProps {
   selectedVideo: MediaDeviceInfo | null
   setError: (error: string | null) => void
}

interface UseVideoStreamReturn {
   videoRef: React.RefObject<HTMLVideoElement | null>
   streamRef: React.RefObject<MediaStream | null>
}

export const useVideoStream = ({ selectedVideo, setError }: UseVideoStreamProps): UseVideoStreamReturn => {
   const videoRef = useRef<HTMLVideoElement | null>(null)
   const streamRef = useRef<MediaStream | null>(null)

   // Handle video stream when selected device changes
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
            .catch((error) => {
               const errorMessage = error instanceof Error ? error.message : String(error)
               setError(`Failed to start video: ${errorMessage}`)
               toast.error(`Failed to start camera: ${errorMessage}`, {
                  description: 'Please check your camera permissions or try a different device.',
                  duration: 5000,
               })
            })
      }

      // Cleanup function
      return () => {
         if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop())
         }
      }
   }, [selectedVideo, setError])

   return {
      videoRef,
      streamRef,
   }
}
