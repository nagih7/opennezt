import React from 'react'
import { Button, Checkbox, CloseButton, Dialog, Portal, Stack } from '@chakra-ui/react'
import { IconlyCall, IconlyDanger2, IconlySetting, IconlyVoice } from 'components/UI/Iconly'
import BotFrame from './components/BotFrame'
import UserFrame from './components/UserFrame'
import { useInterviewSessionManage } from '../hooks'

interface SessionProps {
   videoRef: React.RefObject<HTMLVideoElement> | null
}

const Session: React.FC<SessionProps> = ({ videoRef }) => {
   const {
      isOpenModalInterview,
      currentAction,
      messages,
      isLoadingReplyInterview,
      isListening,
      isSpeaking,
      error,
      interviewDuration,
      isOpenModalCloseInterview,
      confirmSendData,
      formatTime,
      toggleVoiceDetection,
      handleCloseInterview,
      onChangeConfirmSendData,
      handleConfirmCloseInterview,
      setIsOpenModalCloseInterview,
   } = useInterviewSessionManage()

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

                           {isLoadingReplyInterview && (
                              <div className="absolute z-10 flex items-center gap-2 px-3 py-1 text-white bg-yellow-600 rounded-full top-4 right-4">
                                 <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                                 <span>Processing your message...</span>
                              </div>
                           )}

                           {currentAction === 'speaking' && (
                              <div className="absolute z-10 flex items-center gap-2 px-3 py-1 text-white bg-blue-600 rounded-full top-4 right-4">
                                 <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                                 <span>AI Speaking...</span>
                              </div>
                           )}

                           {isSpeaking && currentAction === 'listening' && !isLoadingReplyInterview && (
                              <div className="absolute z-10 flex items-center gap-2 px-3 py-1 text-white bg-red-600 rounded-full top-4 right-4">
                                 <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                                 <span>Recording voice...</span>
                              </div>
                           )}

                           {isListening && !isSpeaking && currentAction === 'listening' && !isLoadingReplyInterview && (
                              <div className="absolute z-10 flex items-center gap-2 px-3 py-1 text-white bg-green-600 rounded-full top-4 right-4">
                                 <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                                 <span>Listening for your voice...</span>
                              </div>
                           )}

                           {error && (
                              <div className="absolute z-10 px-3 py-1 text-white bg-red-500 rounded-full top-4 right-4">
                                 {error}
                              </div>
                           )}
                        </div>
                     </div>
                     <div className="flex w-full px-8 pt-4">
                        <div className="w-full">
                           <div className="flex items-center justify-between font-medium text-[#ffffff]">
                              <div className="flex gap-2">
                                 <span>{formatTime(interviewDuration)}</span>
                                 <span>|</span>
                                 <span>Virtual interview</span>
                              </div>
                              <div className="text-sm">
                                 {messages.length > 0 && (
                                    <span>
                                       Last message: {messages[messages.length - 1]?.content?.substring(0, 30)}...
                                    </span>
                                 )}
                              </div>
                           </div>
                        </div>
                     </div>
                     <Dialog.Root
                        size={'lg'}
                        open={isOpenModalCloseInterview}
                        placement={'center'}
                        motionPreset="slide-in-bottom"
                     >
                        <Portal>
                           <Dialog.Backdrop />
                           <Dialog.Positioner>
                              <Dialog.Content>
                                 <Dialog.Header className="p-4">
                                    {/* <Text className="mb-0 text-xl font-medium">Invite to project</Text> */}
                                 </Dialog.Header>
                                 <Dialog.Body>
                                    <Stack>
                                       Are you sure you want to end the interview?
                                       <Checkbox.Root
                                          value={confirmSendData}
                                          defaultChecked={false}
                                          onChange={(e: any) => onChangeConfirmSendData(e)}
                                       >
                                          <Checkbox.HiddenInput />
                                          <Checkbox.Control />
                                          <Checkbox.Label>
                                             Do you want to send the interview data to the founder?
                                          </Checkbox.Label>
                                       </Checkbox.Root>
                                       This action will prohibit you from interviewing until you receive a response from
                                       the founder
                                    </Stack>
                                 </Dialog.Body>
                                 <Dialog.Footer>
                                    <Dialog.ActionTrigger asChild>
                                       <Button
                                          variant="outline"
                                          className="bg-[#f6f5f5] rounded-md"
                                          onClick={() => setIsOpenModalCloseInterview(false)}
                                       >
                                          Cancel
                                       </Button>
                                    </Dialog.ActionTrigger>
                                    <Button
                                       onClick={handleConfirmCloseInterview}
                                       borderRadius={4}
                                       className="bg-[#2f65b9] text-white text-sm rounded-md font-medium"
                                       loadingText="Loading..."
                                       spinnerPlacement="start"
                                    >
                                       FINISH
                                    </Button>
                                 </Dialog.Footer>
                                 <Dialog.CloseTrigger asChild>
                                    <CloseButton onClick={() => setIsOpenModalCloseInterview(false)} size="sm" />
                                 </Dialog.CloseTrigger>
                              </Dialog.Content>
                           </Dialog.Positioner>
                        </Portal>
                     </Dialog.Root>
                  </Dialog.Body>
                  <Dialog.Footer className="w-full h-[100px] bg-[#201f24] flex items-center justify-center gap-4">
                     <div className="flex items-center justify-center gap-3">
                        <div className="flex justify-center items-center bg-[#42474a] p-3 rounded-full cursor-pointer">
                           <IconlySetting size={25} color={'#ffffff'} />
                        </div>
                        <div
                           className="flex items-center justify-center bg-[#ff2c20] p-3 rounded-full cursor-pointer"
                           onClick={handleCloseInterview}
                        >
                           <IconlyCall size={25} color={'#ffffff'} />
                        </div>
                        <div
                           className={`flex justify-center items-center ${
                              isListening ? 'bg-green-500' : 'bg-[#42474a]'
                           } p-3 rounded-full cursor-pointer transition-colors`}
                           onClick={toggleVoiceDetection}
                           title={isListening ? 'Stop listening' : 'Start listening'}
                        >
                           <IconlyVoice size={25} color={'#ffffff'} />
                        </div>
                        <div className="flex justify-center items-center bg-[#42474a] p-3 rounded-full cursor-pointer">
                           <IconlyDanger2 size={25} color={'#ffffff'} />
                        </div>
                     </div>
                  </Dialog.Footer>
               </Dialog.Content>
            </Dialog.Positioner>
         </Portal>
      </Dialog.Root>
   )
}

export default Session
