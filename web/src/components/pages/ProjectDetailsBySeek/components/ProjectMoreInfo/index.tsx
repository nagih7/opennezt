import {
   IconlyIndustry,
   IconlyEarlyStage,
   IconlyFundingSource,
   IconlyParticipants,
   IconlyRevenue,
} from 'components/UI/Iconly'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '~/store'
import { Alert, Blockquote, Button, Dialog, Portal, Stack } from '@chakra-ui/react'
import SelectCustom from '~/components/UI/SelectCustom'
import { setOpenModalConfirmApply } from '~/store/modules/project'
import { getProjectRoleFramework } from '~/api/user'

interface FormRequest {
   teamRole: string
   role: string
}

const ProjectMoreInfo: React.FC = () => {
   const dispatch = useDispatch<AppDispatch>()
   // ========== STATE FROM REDUX STORE ========== //
   const { projectDetails, isOpenModalConfirmApply, isLoadingGetProjectDetails } = useSelector(
      (state: RootState) => state.project
   )
   const { projectRoleFramework, projectTeamRoleFramework } = useSelector((state: RootState) => state.user)
   const [formRequest, setFormRequest] = useState<FormRequest>({
      teamRole: '',
      role: '',
   })
   const handleOpenModalConfirmApply = () => {
      dispatch(getProjectRoleFramework())
      dispatch(setOpenModalConfirmApply(true))
   }

   const handleCloseModalConfirmApply = () => {
      dispatch(setOpenModalConfirmApply(false))
   }

   const handleConfirmApply = () => {
      // Handle apply logic here
      dispatch(setOpenModalConfirmApply(false))
   }

   const handleChangeFormRequest = (e: any, name: keyof FormRequest) => {
      setFormRequest((prev) => ({
         ...prev,
         [name]: e.value,
      }))
   }

   // ========== RENDER ========== //
   return (
      <div className="mt-8">
         <div className="bg-[#ffffff] rounded-md">
            <div className="p-4 border-b 2xl:p-6">
               <span className="text-lg font-semibold 2xl:text-xl">The Project Includes:</span>
            </div>
            <div className="p-4 2xl:p-6">
               <p className=" text-[#6F7F92] flex">
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

               {projectDetails?.revenues && projectDetails?.revenues?.length > 0 && (
                  <p className="text-[#6F7F92] flex">
                     <IconlyRevenue color={'#2F65B9'} />
                     Revenue {projectDetails?.revenues?.slice(-1)[0].amount} (
                     {projectDetails?.revenues?.slice(-1)[0].currency})
                  </p>
               )}
            </div>
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
                     </Dialog.Footer>{' '}
                     <Dialog.CloseTrigger />
                  </Dialog.Content>
               </Dialog.Positioner>
            </Portal>
         </Dialog.Root>
         {/* Reviews */}
         <div className="bg-[#ffffff] rounded-md mt-8">
            <div className="p-4 border-b 2xl:p-6">
               <span className="text-lg font-semibold 2xl:text-xl">Reviews</span>
            </div>
            <div className="p-4 2xl:p-6">
               <ul>
                  <li className="flex items-center gap-2">
                     <img src="https://i.pravatar.cc/300?img=4" alt="" className="w-20 h-20 " />
                     <div className="flex flex-col ">
                        <h3 className="text-base 2xl:text-lg">Vuong Manh Nghia </h3>
                        <div className="flex text-yellow-400 text-base 2xl:text-[1.2rem]">
                           <span>⭐</span>
                           <span>⭐</span>
                           <span>⭐</span>
                           <span>⭐</span>
                           <span className="text-gray-300">⭐</span>
                        </div>
                        <p className="text-[#6F7F92] text-xs 2xl:text-sm">
                           It was a fantastic course with lots of hands on training and fun! Absolutely recommended to
                           all food lovers !
                        </p>
                     </div>
                  </li>
               </ul>
            </div>
         </div>
      </div>
   )
}

export default ProjectMoreInfo
