import { IconlyAddUser, IconlyArrowLeft2 } from 'components/UI/Iconly'
import { BsArrowsAngleExpand } from 'react-icons/bs'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { FC, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DIRECT_CONVERSATION, GROUP_CONVERSATION } from 'utils/constants'
import { Popover, Portal, Stack } from '@chakra-ui/react'
import { Tooltip } from 'components/UI/tooltip'
import ConversationHeader from './components/ConversationHeader'
import InviteMemberModal from './components/InviteMemberModal'
import { setModalInviteMember } from 'store/modules/project'
import NoChat from './components/NoChat'
import Chat from './components/Chat'
import { ROUTE_CONFIG } from '~/config/constants/routes'

interface ParamTypes {
   id?: string
   [key: string]: string | undefined
}

interface ConversationState {
   chat: {
      conversation: {
         _id: string
         type: {
            name: string
         }
         members: Array<{
            _id: string
            name: string
            avatar: string
         }>
         data?: {
            project?: {
               name: string
               logo: string
            }
         }
      }
   }
}

const Conversation: FC = () => {
   const dispatch = useDispatch()
   const params = useParams<ParamTypes>()
   const { id } = params

   // ========== STATE FROM REDUX ========== //
   const { conversation } = useSelector((state: ConversationState) => state.chat)

   // ========== STATE ========== //
   const [isOpenMoreActions, setIsOpenMoreActions] = useState<boolean>(false)

   // ========== HANDLE FUNCTION MODAL ========== //
   const handleOpenModal = () => {
      dispatch(setModalInviteMember(true))
      setIsOpenMoreActions(false)
   }

   // ========== HANDLE FUNCTION POPPER ========== //
   const onOpenChange = (open: { open: boolean }) => {
      setIsOpenMoreActions(open.open)
   }

   if (id) {
      return (
         <>
            <div className="flex justify-between p-[10px] mb-[18px] bg-[#ffffff] rounded-md">
               <div className="flex items-center">
                  <Link
                     to={ROUTE_CONFIG.USER.CONVERSATION.PREFIX}
                     className="hidden md:flex justify-center items-center w-[50px] h-11"
                  >
                     <IconlyArrowLeft2 size={18} color={'#6f7f92'} />
                  </Link>

                  <Link to={'/messages-sidebar'} className="flex md:hidden justify-center items-center w-[50px] h-11 ">
                     <IconlyArrowLeft2 size={18} color={'#6f7f92'} />
                  </Link>
                  {(() => {
                     switch (conversation?.type?.name) {
                        case DIRECT_CONVERSATION:
                           return (
                              <ConversationHeader
                                 name={conversation?.members[0]?.name}
                                 logo={conversation?.members[0]?.avatar}
                              />
                           )
                        case GROUP_CONVERSATION:
                           return (
                              <ConversationHeader
                                 name={conversation?.data?.project?.name || ''}
                                 logo={conversation?.data?.project?.logo || ''}
                              />
                           )
                        default:
                           return null
                     }
                  })()}
               </div>
               <div className="flex items-center">
                  <span className="flex items-center justify-center text-[#6f7f92] w-[50px] h-11">
                     <BsArrowsAngleExpand />
                  </span>

                  <Popover.Root
                     positioning={{ placement: 'bottom-end' }}
                     open={isOpenMoreActions}
                     onOpenChange={(open) => onOpenChange(open)}
                  >
                     <Popover.Trigger asChild>
                        <span
                           className="flex items-center justify-center text-[#6f7f92] w-[50px] h-11 cursor-pointer"
                           onClick={() => setIsOpenMoreActions(!isOpenMoreActions)}
                        >
                           <Tooltip content="More" openDelay={0} closeDelay={100} positioning={{ placement: 'top' }}>
                              <span>
                                 <HiOutlineDotsVertical />
                              </span>
                           </Tooltip>
                        </span>
                     </Popover.Trigger>
                     <Portal>
                        <Popover.Positioner>
                           <Popover.Content>
                              <Popover.Arrow />
                              <Popover.Body className="p-[15px]">
                                 <Stack className="space-y-4">
                                    <Stack
                                       className="flex flex-row items-center cursor-pointer hover:bg-[#f5f5f5] rounded-md p-2 m-2 space-x-4"
                                       onClick={handleOpenModal}
                                    >
                                       <IconlyAddUser size={24} color="#6f7f92" />
                                       <span>Invite to project</span>
                                    </Stack>
                                 </Stack>
                              </Popover.Body>
                           </Popover.Content>
                        </Popover.Positioner>
                     </Portal>
                  </Popover.Root>
                  <InviteMemberModal />
               </div>
            </div>
            <Chat />
         </>
      )
   } else {
      return <NoChat />
   }
}

export default Conversation
