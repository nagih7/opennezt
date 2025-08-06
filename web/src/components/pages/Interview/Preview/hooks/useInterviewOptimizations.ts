import { useMemo, useCallback } from 'react'

// Type for permission status
type PermissionStatusType = 'prompt' | 'granted' | 'denied'

/**
 * Custom hook for memoizing device selection handlers
 * Prevents unnecessary re-renders of child components
 */
export const useDeviceSelectionHandlers = (
   handleDeviceSelect: (type: 'audio-input' | 'audio-output' | 'video', device: MediaDeviceInfo) => void
) => {
   const handleAudioInputSelect = useCallback(
      (device: MediaDeviceInfo) => handleDeviceSelect('audio-input', device),
      [handleDeviceSelect]
   )

   const handleAudioOutputSelect = useCallback(
      (device: MediaDeviceInfo) => handleDeviceSelect('audio-output', device),
      [handleDeviceSelect]
   )

   const handleVideoSelect = useCallback(
      (device: MediaDeviceInfo) => handleDeviceSelect('video', device),
      [handleDeviceSelect]
   )

   return useMemo(
      () => ({
         handleAudioInputSelect,
         handleAudioOutputSelect,
         handleVideoSelect,
      }),
      [handleAudioInputSelect, handleAudioOutputSelect, handleVideoSelect]
   )
}

/**
 * Custom hook for memoizing device lists to prevent unnecessary re-renders
 */
export const useDeviceLists = (
   audioInputDevices: MediaDeviceInfo[],
   audioOutputDevices: MediaDeviceInfo[],
   videoDevices: MediaDeviceInfo[]
) => {
   const deviceCounts = useMemo(
      () => ({
         audioInput: audioInputDevices.length,
         audioOutput: audioOutputDevices.length,
         video: videoDevices.length,
         total: audioInputDevices.length + audioOutputDevices.length + videoDevices.length,
      }),
      [audioInputDevices.length, audioOutputDevices.length, videoDevices.length]
   )

   const hasDevices = useMemo(
      () => ({
         audioInput: audioInputDevices.length > 0,
         audioOutput: audioOutputDevices.length > 0,
         video: videoDevices.length > 0,
         any: deviceCounts.total > 0,
      }),
      [audioInputDevices.length, audioOutputDevices.length, videoDevices.length, deviceCounts.total]
   )

   return useMemo(
      () => ({
         audioInputDevices,
         audioOutputDevices,
         videoDevices,
         deviceCounts,
         hasDevices,
      }),
      [audioInputDevices, audioOutputDevices, videoDevices, deviceCounts, hasDevices]
   )
}

/**
 * Custom hook for memoizing permission-related data
 */
export const usePermissionData = (
   permissionStatus: { camera: PermissionStatusType; microphone: PermissionStatusType },
   error: string | null
) => {
   const permissionSummary = useMemo(
      () => ({
         hasCameraPermission: permissionStatus.camera === 'granted',
         hasMicrophonePermission: permissionStatus.microphone === 'granted',
         hasAllPermissions: permissionStatus.camera === 'granted' && permissionStatus.microphone === 'granted',
         hasAnyPermission: permissionStatus.camera === 'granted' || permissionStatus.microphone === 'granted',
         needsPermissions: permissionStatus.camera === 'prompt' || permissionStatus.microphone === 'prompt',
         hasErrors: error !== null,
      }),
      [permissionStatus.camera, permissionStatus.microphone, error]
   )

   return useMemo(
      () => ({
         permissionStatus,
         error,
         permissionSummary,
      }),
      [permissionStatus, error, permissionSummary]
   )
}
