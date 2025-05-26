import { RefObject } from 'react'

type PermissionStatusType = 'prompt' | 'granted' | 'denied'

export interface PermissionAlertProps {
   error: string | null
   permissionStatus: {
      camera: PermissionStatusType
      microphone: PermissionStatusType
   }
   requestMediaPermissions: () => Promise<void>
}

export interface VideoPreviewProps {
   videoRef: RefObject<HTMLVideoElement | null>
}

// Type for voice detector
export interface VoiceDetector {
   start: () => Promise<boolean>
   stop: () => Promise<void>
   isActive: () => boolean
}

// Interview session
export interface CloseInterviewModalProps {
   isOpen: boolean
   confirmSendData: boolean
   onClose: () => void
   onConfirm: () => void
   onChangeConfirmSendData: (event: React.FormEvent) => void
   isLoading?: boolean
}

export interface InterviewControlsProps {
   isListening: boolean
   onToggleVoice: () => void
   onCloseInterview: () => void
   onSettings?: () => void
   onEmergency?: () => void
}

export interface InterviewHeaderProps {
   formattedTime: string
   messages: any[]
   showLastMessage?: boolean
}

export interface UserFrameProps {
   videoRef: React.RefObject<HTMLVideoElement | null>
}
