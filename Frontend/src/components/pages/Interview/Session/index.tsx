import { Dialog, Portal } from '@chakra-ui/react'
import React from 'react'
import {
   VoiceStatusIndicator,
   InterviewControls,
   InterviewHeader,
   CloseInterviewModal,
   BotFrame,
   UserFrame,
} from './components'
import { useInterviewSession } from './useInterviewSession'

const InterviewSession: React.FC = () => {
   const {
      videoRef,
      isOpenModalInterview,
      currentAction,
      messages,
      isLoadingReplyInterview,
      isListening,
      isSpeaking,
      voiceError,
      formattedTime,
      isOpenModalCloseInterview,
      confirmSendData,
      toggleVoiceDetection,
      handleCloseInterview,
      onChangeConfirmSendData,
      handleConfirmCloseInterview,
      setIsOpenModalCloseInterview,
   } = useInterviewSession()

   // RENDERING
   return (
      <Dialog.Root size="full" motionPreset="slide-in-bottom" open={isOpenModalInterview}>
         <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
               <Dialog.Content className="w-full h-full bg-[#201f24] rounded-none flex flex-col">
                  <Dialog.Body className="w-full flex-1 bg-[#201f24] p-0 flex flex-col overflow-hidden">
                     <div className="flex-1 px-8 pt-8 overflow-hidden">
                        <div className="relative w-full h-full">
                           <BotFrame />
                           <UserFrame videoRef={videoRef} />

                           <VoiceStatusIndicator
                              isLoadingReplyInterview={isLoadingReplyInterview}
                              currentAction={currentAction}
                              isSpeaking={isSpeaking}
                              isListening={isListening}
                              voiceError={voiceError}
                           />
                        </div>
                     </div>

                     <InterviewHeader formattedTime={formattedTime} messages={messages} showLastMessage={true} />

                     <CloseInterviewModal
                        isOpen={isOpenModalCloseInterview}
                        confirmSendData={confirmSendData}
                        onClose={() => setIsOpenModalCloseInterview(false)}
                        onConfirm={handleConfirmCloseInterview}
                        onChangeConfirmSendData={onChangeConfirmSendData}
                     />
                  </Dialog.Body>

                  <Dialog.Footer className="w-full h-[100px] bg-[#201f24] flex items-center justify-center gap-4">
                     <InterviewControls
                        isListening={isListening}
                        onToggleVoice={toggleVoiceDetection}
                        onCloseInterview={handleCloseInterview}
                        onSettings={() => console.log('Settings clicked')}
                        onEmergency={() => console.log('Emergency clicked')}
                     />
                  </Dialog.Footer>
               </Dialog.Content>
            </Dialog.Positioner>
         </Portal>
      </Dialog.Root>
   )
}

export default InterviewSession
