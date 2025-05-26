import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { OPENNEZT_BG_BLACK } from 'utils/constants'
import { RootState, AppDispatch } from '~/store'
import { getProjectRoleFramework, setOpenModalConfirmApply } from '~/store/actions'
import { Alert, Blockquote, Button, Dialog, Image, Portal, Stack } from '@chakra-ui/react'
import SelectCustom from '~/components/UI/SelectCustom'
import ChatBotIframe from '~/components/common/ChatBotIframe'
import {
   IconlyIndustry,
   IconlyInfoSquare,
   IconlyTickSquare,
   IconlyEarlyStage,
   IconlyFundingSource,
   IconlyParticipants,
   IconlyRevenue,
} from 'components/UI/Iconly'

interface FormRequest {
   teamRole: string
   role: string
}

const ProjectMoreInfo: React.FC = () => {
   const dispatch = useDispatch<AppDispatch>()

   const { projectDetails, isOpenModalConfirmApply, isLoadingGetProjectDetails } = useSelector(
      (state: RootState) => state.project
   )
   const { projectRoleFramework, projectTeamRoleFramework } = useSelector((state: RootState) => state.user)

   const [formRequest, setFormRequest] = useState<FormRequest>({
      teamRole: '',
      role: '',
   })
   const [imageError, setImageError] = useState<boolean>(false)
   const [isOpenChatBotIframe, setIsOpenChatBotIframe] = useState<boolean>(false)

   const handleOpenModalConfirmApply = () => {
      dispatch(getProjectRoleFramework())
      dispatch(setOpenModalConfirmApply(true))
   }

   const handleCloseModalConfirmApply = () => {
      dispatch(setOpenModalConfirmApply(false))
   }

   const handleConfirmApply = () => {
      setIsOpenChatBotIframe(true)
   }

   const handleChangeFormRequest = (e: any, name: keyof FormRequest) => {
      setFormRequest((prev) => ({
         ...prev,
         [name]: e.value[0],
      }))
   }

   return (
      <div className="bg-white relative h-fit top-[-14.75rem] 2xl:w-4/12 2xl:mr-[250px]">
         {!imageError ? (
            <Image
               src={projectDetails?.background}
               alt={projectDetails?.name}
               onError={() => setImageError(true)}
               aspectRatio={5 / 3}
               width="100%"
            />
         ) : (
            <Image aspectRatio={5 / 3} src={OPENNEZT_BG_BLACK} alt={projectDetails?.name} width="100%" 
            className='bg-contain'/>
         )}

         <div className="bg-[#EAEFF8] h-[7.5rem]">
            {projectDetails?.applied ? (
               <p className="bg-[#E3F5F1] flex relative top-[1.75rem] p-6 w-[21rem] right-[-1.5rem] border-l-[3px] border-[#00C792] text-[#00C792] items-center gap-1">
                  <IconlyTickSquare size={20} color={'#00C792'} />
                  Applied
               </p>
            ) : (
               <p className="bg-[#ffffff] flex relative top-[1.75rem] p-6 mx-[24px] border-l-[3px] border-[#ffe41b] text-[#ffe41b] items-center gap-1">
                  <IconlyInfoSquare size={20} color={'#ffe41b'} />
                  Not Applied
               </p>
            )}
         </div>

         <div className="p-4">
            <h4 className="font-bold">The Project Includes:</h4>
            <p className="mt-7 text-[#6F7F92] flex">
               <IconlyIndustry color={'#2F65B9'} />
               {projectDetails?.industries?.length} Main Industries
            </p>
            <p className="text-[#6F7F92] flex">
               <IconlyEarlyStage color={'#2F65B9'} />
               {projectDetails?.stage?.name}
            </p>
            {projectDetails?.funding_sources?.length ? (
               <p className="text-[#6F7F92] flex">
                  <IconlyFundingSource color={'#2F65B9'} />
                  {projectDetails?.funding_sources?.length} Funding Sources
               </p>
            ) : null}
            <p className="text-[#6F7F92] flex">
               <IconlyParticipants color={'#2F65B9'} />
               {projectDetails?.members?.length} Participants in the Project
            </p>

            {projectDetails?.revenues && projectDetails?.revenues.length > 0 && (
               <p className="text-[#6F7F92] flex">
                  <IconlyRevenue color={'#2F65B9'} />
                  Revenue {projectDetails?.revenues?.slice(-1)[0].amount} (
                  {projectDetails?.revenues?.slice(-1)[0].currency})
               </p>
            )}
         </div>

         {projectDetails && projectDetails?.applied === false && isLoadingGetProjectDetails === false && (
            <Button
               className="px-4 py-2 mt-4 bg-[#2f65b9] text-white"
               onClick={handleOpenModalConfirmApply}
               width={'100%'}
               height={'3rem'}
               borderRadius={4}
               loadingText="Loading..."
               spinnerPlacement="start"
            >
               Apply
            </Button>
         )}

         <Dialog.Root
            open={isOpenModalConfirmApply}
            onOpenChange={(e: any) => (e.open ? null : handleCloseModalConfirmApply())}
            size="lg"
         >
            <Portal>
               <Dialog.Backdrop />
               <Dialog.Positioner>
                  <Dialog.Content>
                     <Dialog.Header>
                        <Dialog.Title>Confirm</Dialog.Title>
                     </Dialog.Header>
                     <Dialog.Body>
                        <Stack>
                           <Alert.Root status="info">
                              <Alert.Indicator />
                              <Alert.Title>Would you like to request to join this project?</Alert.Title>
                           </Alert.Root>
                           <Stack gap={4} className="flex flex-col gap-4 my-4">
                              <SelectCustom
                                 height="40px"
                                 label="Team Role"
                                 required
                                 collection={projectTeamRoleFramework}
                                 onChange={(e: any) => handleChangeFormRequest(e, 'teamRole')}
                                 value={formRequest.teamRole}
                              />
                              <SelectCustom
                                 height="40px"
                                 label="Role"
                                 required
                                 collection={projectRoleFramework}
                                 onChange={(e: any) => handleChangeFormRequest(e, 'role')}
                                 value={formRequest.role}
                              />
                           </Stack>
                           <Blockquote.Root
                              colorScheme="yellow"
                              borderInlineStartWidth="4px"
                              borderInlineStartColor="#fef08a"
                           >
                              <Blockquote.Content cite="OpenNezt">
                                 If you would like to request to participate in this project, please let me know what
                                 position you would like to participate in.
                              </Blockquote.Content>
                              <Blockquote.Caption>
                                 — <cite>OpenNezt</cite>
                              </Blockquote.Caption>
                           </Blockquote.Root>
                        </Stack>
                     </Dialog.Body>
                     <Dialog.Footer>
                        <Button variant="outline" onClick={handleCloseModalConfirmApply}>
                           Cancel
                        </Button>
                        <Button
                           onClick={handleConfirmApply}
                           borderRadius={4}
                           loadingText="Loading..."
                           spinnerPlacement="start"
                        >
                           CONFIRM
                        </Button>
                     </Dialog.Footer>
                     <Dialog.CloseTrigger />
                  </Dialog.Content>
               </Dialog.Positioner>
            </Portal>
         </Dialog.Root>

         <Dialog.Root
            open={isOpenChatBotIframe}
            onOpenChange={(e: any) => (e.open ? null : setIsOpenChatBotIframe(false))}
            size="full"
         >
            <Portal>
               <Dialog.Backdrop />
               <Dialog.Positioner>
                  <Dialog.Content>
                     <Dialog.Header></Dialog.Header>
                     <Dialog.Body>
                        <ChatBotIframe />
                     </Dialog.Body>
                     <Dialog.CloseTrigger />
                  </Dialog.Content>
               </Dialog.Positioner>
            </Portal>
         </Dialog.Root>
      </div>
   )
}

export default ProjectMoreInfo

