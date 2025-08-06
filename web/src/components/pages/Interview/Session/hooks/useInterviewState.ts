import { useCallback, useState } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '~/store'
import { closeInterview, replyInterview } from '~/api/interview'

interface UseInterviewStateProps {
   onSendAudio?: (blob: Blob) => void
   onCloseInterview?: () => void
   onForceStopAudio?: () => void
}

interface UseInterviewStateReturn {
   // Redux state
   isOpenModalInterview: boolean
   currentAction: string
   messages: any[]
   conversation: any
   isLoadingReplyInterview: boolean
   hasJoined: boolean

   // Local state
   isOpenModalCloseInterview: boolean
   confirmSendData: boolean
   audioBlob: Blob | null

   // Actions
   sendAudioMessage: (blob: Blob) => Promise<void>
   handleCloseInterview: () => void
   handleConfirmCloseInterview: () => void
   setIsOpenModalCloseInterview: (value: boolean) => void
   setConfirmSendData: (value: boolean) => void
   setAudioBlob: (blob: Blob | null) => void
   onChangeConfirmSendData: (event: React.FormEvent) => void
}

export const useInterviewState = ({
   onSendAudio,
   onCloseInterview,
   onForceStopAudio,
}: UseInterviewStateProps = {}): UseInterviewStateReturn => {
   const dispatch = useAppDispatch()

   // Redux state
   const { isOpenModalInterview, currentAction, messages, conversation, isLoadingReplyInterview, hasJoined } =
      useAppSelector((state: RootState) => state.interview)

   // Local state
   const [isOpenModalCloseInterview, setIsOpenModalCloseInterview] = useState<boolean>(false)
   const [confirmSendData, setConfirmSendData] = useState<boolean>(false)
   const [audioBlob, setAudioBlob] = useState<Blob | null>(null)

   // Send audio message to the server for speech-to-text conversion
   const sendAudioMessage = useCallback(
      async (blob: Blob): Promise<void> => {
         if (!blob) return

         if (currentAction === 'speaking' || isLoadingReplyInterview === true || !hasJoined) {
            return
         }

         try {
            // Create a FormData object to send the audio file
            const audioFile = new File([blob], `voice_message_${Date.now()}.wav`, {
               type: 'audio/wav',
            })

            const payload = {
               audio: audioFile,
               interview: conversation,
            }

            // Notify parent component if callback provided
            onSendAudio?.(blob)

            dispatch(replyInterview(payload) as any)
         } catch (error) {
            console.error('Failed to send audio message:', error)
            throw new Error('Failed to send audio message')
         }
      },
      [currentAction, isLoadingReplyInterview, hasJoined, conversation, dispatch, onSendAudio]
   )

   const handleCloseInterview = useCallback((): void => {
      setIsOpenModalCloseInterview(true)
   }, [])

   const onChangeConfirmSendData = useCallback((event: React.FormEvent): void => {
      setConfirmSendData(!(event.target as HTMLInputElement).checked)
   }, [])

   const handleConfirmCloseInterview = useCallback((): void => {
      // Call force stop audio callback before confirming close
      onForceStopAudio?.()

      const payload = {
         interview: conversation,
         storage: confirmSendData,
      }

      if (confirmSendData) {
         dispatch(closeInterview({ ...payload, messages }) as any)
      } else {
         dispatch(closeInterview(payload) as any)
      }

      setIsOpenModalCloseInterview(false)
      onCloseInterview?.()
   }, [conversation, confirmSendData, messages, dispatch, onCloseInterview, onForceStopAudio])

   return {
      // Redux state
      isOpenModalInterview,
      currentAction,
      messages,
      conversation,
      isLoadingReplyInterview,
      hasJoined,

      // Local state
      isOpenModalCloseInterview,
      confirmSendData,
      audioBlob,

      // Actions
      sendAudioMessage,
      handleCloseInterview,
      handleConfirmCloseInterview,
      setIsOpenModalCloseInterview,
      setConfirmSendData,
      setAudioBlob,
      onChangeConfirmSendData,
   }
}
