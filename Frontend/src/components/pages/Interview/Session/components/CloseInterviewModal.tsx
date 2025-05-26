import React from 'react'
import { Button, Checkbox, CloseButton, Dialog, Portal, Stack } from '@chakra-ui/react'
import { CloseInterviewModalProps } from '~/types'

const CloseInterviewModal: React.FC<CloseInterviewModalProps> = ({
   isOpen,
   confirmSendData,
   onClose,
   onConfirm,
   onChangeConfirmSendData,
   isLoading = false,
}) => {
   return (
      <Dialog.Root size="lg" open={isOpen} placement="center" motionPreset="slide-in-bottom">
         <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
               <Dialog.Content>
                  <Dialog.Header className="p-4">{/* Optional header content */}</Dialog.Header>
                  <Dialog.Body>
                     <Stack>
                        Are you sure you want to end the interview?
                        <Checkbox.Root
                           defaultChecked={false}
                           onChange={onChangeConfirmSendData}
                           checked={confirmSendData}
                        >
                           <Checkbox.HiddenInput />
                           <Checkbox.Control />
                           <Checkbox.Label>Do you want to send the interview data to the founder?</Checkbox.Label>
                        </Checkbox.Root>
                        This action will prohibit you from interviewing until you receive a response from the founder
                     </Stack>
                  </Dialog.Body>
                  <Dialog.Footer>
                     <Dialog.ActionTrigger asChild>
                        <Button variant="outline" className="bg-[#f6f5f5] rounded-md" onClick={onClose}>
                           Cancel
                        </Button>
                     </Dialog.ActionTrigger>
                     <Button
                        onClick={onConfirm}
                        borderRadius={4}
                        className="bg-[#2f65b9] text-white text-sm rounded-md font-medium"
                        loadingText="Loading..."
                        spinnerPlacement="start"
                        loading={isLoading}
                     >
                        FINISH
                     </Button>
                  </Dialog.Footer>
                  <Dialog.CloseTrigger asChild>
                     <CloseButton onClick={onClose} size="sm" />
                  </Dialog.CloseTrigger>
               </Dialog.Content>
            </Dialog.Positioner>
         </Portal>
      </Dialog.Root>
   )
}

export default CloseInterviewModal
