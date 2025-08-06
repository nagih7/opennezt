import { useState, useCallback } from 'react'

interface UseDeviceSelectionReturn {
   selectedAudioInput: MediaDeviceInfo | null
   selectedAudioOutput: MediaDeviceInfo | null
   selectedVideo: MediaDeviceInfo | null
   setSelectedAudioInput: (device: MediaDeviceInfo | null) => void
   setSelectedAudioOutput: (device: MediaDeviceInfo | null) => void
   setSelectedVideo: (device: MediaDeviceInfo | null) => void
   handleDeviceSelect: (type: 'audio-input' | 'audio-output' | 'video', device: MediaDeviceInfo) => void
   setDefaultSelections: (
      audioInputs: MediaDeviceInfo[],
      audioOutputs: MediaDeviceInfo[],
      videoInputs: MediaDeviceInfo[]
   ) => void
}

export const useDeviceSelection = (): UseDeviceSelectionReturn => {
   // Device states
   const [selectedAudioInput, setSelectedAudioInput] = useState<MediaDeviceInfo | null>(null)
   const [selectedAudioOutput, setSelectedAudioOutput] = useState<MediaDeviceInfo | null>(null)
   const [selectedVideo, setSelectedVideo] = useState<MediaDeviceInfo | null>(null)

   // Handle device selection
   const handleDeviceSelect = useCallback(
      (type: 'audio-input' | 'audio-output' | 'video', device: MediaDeviceInfo): void => {
         switch (type) {
            case 'audio-input':
               setSelectedAudioInput(device)
               break
            case 'audio-output':
               setSelectedAudioOutput(device)
               // Set audio output for video element if supported
               if (typeof window !== 'undefined') {
                  const videoElements = document.querySelectorAll('video')
                  videoElements.forEach((video) => {
                     if ('setSinkId' in video) {
                        ;(video as any).setSinkId(device.deviceId).catch((error: unknown) => {
                           console.error('Failed to set audio output device:', error)
                        })
                     }
                  })
               }
               break
            case 'video':
               setSelectedVideo(device)
               break
            default:
               break
         }
      },
      []
   )

   // Set default device selections
   const setDefaultSelections = useCallback(
      (audioInputs: MediaDeviceInfo[], audioOutputs: MediaDeviceInfo[], videoInputs: MediaDeviceInfo[]): void => {
         if (audioInputs.length > 0 && !selectedAudioInput) {
            setSelectedAudioInput(audioInputs[0])
         }
         if (audioOutputs.length > 0 && !selectedAudioOutput) {
            setSelectedAudioOutput(audioOutputs[0])
         }
         if (videoInputs.length > 0 && !selectedVideo) {
            setSelectedVideo(videoInputs[0])
         }
      },
      [selectedAudioInput, selectedAudioOutput, selectedVideo]
   )

   return {
      selectedAudioInput,
      selectedAudioOutput,
      selectedVideo,
      setSelectedAudioInput,
      setSelectedAudioOutput,
      setSelectedVideo,
      handleDeviceSelect,
      setDefaultSelections,
   }
}
