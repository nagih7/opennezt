import React, { useEffect, useState } from 'react'
import { Alert, Avatar, Blockquote, Button, CloseButton, Dialog, Portal, Stack, Text } from '@chakra-ui/react'
import { inviteMember, searchMyProjects } from 'api/project'
import { getProjectRoleFramework } from 'api/user'
import InputCustom from 'components/UI/InputCustom'
import SelectCustom from 'components/UI/SelectCustom'
import { debounce } from 'lodash'
import { RootState, useAppDispatch, useAppSelector } from '~/store'
import { BaseProjectProps } from '~/types'
// import { setModalInviteMember } from 'store/modules/project'

const InviteMemberModal: React.FC = () => {
   const dispatch = useAppDispatch()
   // ========== STATE FROM REDUX ========== //
   const { conversation } = useAppSelector((state: RootState) => state.chat)
   const { projectRoleFramework, projectTeamRoleFramework } = useAppSelector((state: RootState) => state.user)
   const { myProjectsBySearch, isLoadingSearchMyProjects, isOpenModalInviteMember, isLoadingInviteMember } =
      useAppSelector((state: RootState) => state.project)

   // ========== STATE ========== //
   const [projectSelected, setProjectSelected] = useState<BaseProjectProps | null>(null)
   const [formRequest, setFormRequest] = useState({
      teamRole: '',
      role: '',
   })

   // ========== USE EFFECT ========== //
   useEffect(() => {
      if (projectRoleFramework?.items?.length === 0 || projectTeamRoleFramework?.items?.length === 0) {
         dispatch(getProjectRoleFramework())
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [dispatch])

   // ========== HANDLE FUNCTIONS ========== //
   const handleSearchProject = debounce((e) => {
      if (e.target.value === '') {
         return
      }
      searchMyProjects(e.target.value)
   }, 300)

   const handleRemoveProject = () => {
      setProjectSelected(null)
      setFormRequest({
         teamRole: '',
         role: '',
      })
   }

   const handleChangeFormRequest = (e: any, field: any) => {
      setFormRequest((prev) => ({
         ...prev,
         [field]: e.value[0],
      }))
   }
   const handleConfirmInvite = async () => {
      if (!projectSelected) return
      inviteMember(projectSelected._id, { ...formRequest, userId: conversation.members[0]._id })
      setFormRequest({
         teamRole: '',
         role: '',
      })
      setProjectSelected(null)
   }

   const handleClose = () => {
      // dispatch(setModalInviteMember(false))
   }

   // ========== RENDER ========== //
   return (
      <Dialog.Root size={'lg'} open={isOpenModalInviteMember} placement={'center'} motionPreset="slide-in-bottom">
         <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
               <Dialog.Content>
                  <Dialog.Header className="p-4">
                     <Text className="mb-0 text-xl font-medium">Invite to project</Text>
                  </Dialog.Header>
                  <Dialog.Body>
                     <Stack>
                        <Alert.Root status="info">
                           <Alert.Indicator />
                           <Alert.Title>Do you want to invite people to join the project?</Alert.Title>
                        </Alert.Root>
                        <Stack spacing={4} className="flex flex-col gap-2 my-4">
                           {!projectSelected && (
                              <>
                                 <InputCustom
                                    label="Project"
                                    required
                                    placeholder="Start typing to search for a project"
                                    onChange={handleSearchProject}
                                    loading={isLoadingSearchMyProjects}
                                 />
                                 <div
                                    className={`${
                                       myProjectsBySearch?.length >= 4
                                          ? 'flex flex-col items-center max-h-[150px] p-0 m-0 overflow-y-scroll scrollbar-thumb-gray-400 scrollbar-track-gray-200 w-full'
                                          : ''
                                    }`}
                                 >
                                    {myProjectsBySearch?.length > 0 && (
                                       <Stack spacing={4} className="w-full gap-0">
                                          {myProjectsBySearch.map((project, idx) => (
                                             <Stack
                                                key={idx}
                                                direction={'row'}
                                                align={'center'}
                                                className="px-[15px] hover:bg-[#f6f5f5] py-[10px] border-b border-gray-200"
                                                cursor="pointer"
                                                onClick={() => setProjectSelected(project)}
                                             >
                                                <Avatar.Root size={'sm'}>
                                                   <Avatar.Fallback name={project.name} />
                                                   <Avatar.Image src={project.logo} />
                                                </Avatar.Root>
                                                <Text className="mb-0 ">{project.name}</Text>
                                             </Stack>
                                          ))}
                                       </Stack>
                                    )}
                                 </div>
                              </>
                           )}
                           <div className="flex flex-col gap-4">
                              {projectSelected && (
                                 <>
                                    <Stack
                                       spacing={4}
                                       direction={'row'}
                                       align={'center'}
                                       className="flex justify-between w-full px-[3px] py-[3px] rounded-md "
                                    >
                                       <Stack spacing={4} direction={'row'} align={'center'}>
                                          <Avatar.Root size={'sm'}>
                                             <Avatar.Fallback name={projectSelected.name} />
                                             <Avatar.Image src={projectSelected.logo || undefined} />
                                          </Avatar.Root>
                                          <Text className="mb-0">{projectSelected.name}</Text>
                                       </Stack>
                                       <CloseButton
                                          className="w-[20px] h-[20px] "
                                          size={'xs'}
                                          onClick={handleRemoveProject}
                                       />
                                    </Stack>

                                    <SelectCustom
                                       height="40px"
                                       label="Team Role"
                                       required
                                       collection={projectTeamRoleFramework}
                                       onChange={(e: any) => handleChangeFormRequest(e, 'teamRole')}
                                       value={[formRequest.teamRole]}
                                    />
                                    <SelectCustom
                                       height="40px"
                                       label="Role"
                                       required
                                       collection={projectRoleFramework}
                                       onChange={(e: any) => handleChangeFormRequest(e, 'role')}
                                       value={[formRequest.role]}
                                    />
                                 </>
                              )}
                           </div>
                        </Stack>
                        <Blockquote.Root
                           colorPalette="yellow"
                           style={{
                              borderInlineStartWidth: '4px',
                              borderInlineStartColor: '#fef08a',
                           }}
                        >
                           <Blockquote.Content cite="OpenNezt">
                              If you would like to invite someone to this project, please let me know what position you
                              would like the person to fill.
                           </Blockquote.Content>
                           <Blockquote.Caption>
                              — <cite>OpenNezt</cite>
                           </Blockquote.Caption>
                        </Blockquote.Root>
                     </Stack>
                  </Dialog.Body>
                  <Dialog.Footer>
                     <Dialog.ActionTrigger asChild>
                        <Button variant="outline" className="bg-[#f6f5f5] rounded-md" onClick={handleClose}>
                           Cancel
                        </Button>
                     </Dialog.ActionTrigger>
                     <Button
                        onClick={handleConfirmInvite}
                        borderRadius={4}
                        loading={isLoadingInviteMember}
                        className="bg-[#2f65b9] text-white text-sm rounded-md font-medium"
                        loadingText="Loading..."
                        spinnerPlacement="start"
                     >
                        INVITE
                     </Button>
                  </Dialog.Footer>
                  <Dialog.CloseTrigger asChild>
                     <CloseButton onClick={handleClose} size="sm" />
                  </Dialog.CloseTrigger>
               </Dialog.Content>
            </Dialog.Positioner>
         </Portal>
      </Dialog.Root>
   )
}

export default InviteMemberModal
