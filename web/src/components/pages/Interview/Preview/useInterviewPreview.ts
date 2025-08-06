import { useEffect } from 'react'
import { toast } from 'sonner'
import { useMediaDevices, useDeviceSelection, useVideoStream } from './hooks'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '~/store'
import { startInterview } from '~/api/interview'

const useInterviewPreview = () => {
   // Use separated hooks for different concerns
   const dispatch = useAppDispatch()
   const { projectId } = useParams()
   const mediaDevices = useMediaDevices()
   const deviceSelection = useDeviceSelection()
   const videoStream = useVideoStream({
      selectedVideo: deviceSelection.selectedVideo,
      setError: mediaDevices.setError,
   })

   // Set default device selections when devices are available
   useEffect(() => {
      deviceSelection.setDefaultSelections(
         mediaDevices.audioInputDevices,
         mediaDevices.audioOutputDevices,
         mediaDevices.videoDevices
      )
   }, [
      mediaDevices.audioInputDevices,
      mediaDevices.audioOutputDevices,
      mediaDevices.videoDevices,
      deviceSelection.setDefaultSelections,
   ])

   // Request media permissions
   const requestMediaPermissions = async () => {
      try {
         await mediaDevices.requestMediaPermissions()
      } catch (error) {
         const errorMessage = error instanceof Error ? error.message : String(error)
         toast.error(`Permission request failed: ${errorMessage}`, {
            description: 'Please check your browser settings or try a different browser.',
            duration: 5000,
         })
      }
   }

   // Handle device selection
   const handleDeviceSelect = (type: 'audio-input' | 'audio-output' | 'video', device: MediaDeviceInfo) => {
      deviceSelection.handleDeviceSelect(type, device)
   }

   // Handle technical issues
   const handleTechnicalIssues = () => {
      // Show debugging information in the console
      console.log('Device Detection Debug Info:', {
         browser: navigator.userAgent,
         permissions: mediaDevices.permissionStatus,
         capabilities: mediaDevices.debugging,
         audioInputs: mediaDevices.audioInputDevices.length,
         audioOutputs: mediaDevices.audioOutputDevices.length,
         videoInputs: mediaDevices.videoDevices.length,
      })

      // Ask user to grant permissions again
      requestMediaPermissions()

      toast.info('Attempting to detect devices again...', {
         description: 'Please ensure your camera and microphone are connected and permissions are granted.',
         duration: 5000,
      })
   }

   // Start the interview
   const handleStartInterview = () => {
      if (projectId) {
         dispatch(startInterview(projectId))
      }
   }

   return {
      // Media devices
      audioInputDevices: mediaDevices.audioInputDevices,
      audioOutputDevices: mediaDevices.audioOutputDevices,
      videoDevices: mediaDevices.videoDevices,
      error: mediaDevices.error,
      permissionStatus: mediaDevices.permissionStatus,
      debugging: mediaDevices.debugging,

      // Device selection
      selectedAudioInput: deviceSelection.selectedAudioInput,
      selectedAudioOutput: deviceSelection.selectedAudioOutput,
      selectedVideo: deviceSelection.selectedVideo,

      // Video stream
      videoRef: videoStream.videoRef,
      streamRef: videoStream.streamRef,

      // Methods
      requestMediaPermissions,
      handleDeviceSelect,
      handleTechnicalIssues,
      handleStartInterview,
   }
}

export default useInterviewPreview
