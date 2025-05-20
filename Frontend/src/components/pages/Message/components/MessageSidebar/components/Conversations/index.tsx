import { Avatar, Stack, Tabs } from '@chakra-ui/react'
import { IconlyChat, IconlyHome, IconlyProfile, IconlyUser } from 'components/UI/Iconly'
import React, { FC, useEffect } from 'react'
import { CheckCircleFilled } from '@ant-design/icons'
import img_project from '../../../../../../../assets/images/logo/opennezt_black.png'
import img_avt from '../../../../../../../assets/images/background/avt.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { DIRECT_CONVERSATION, GROUP_CONVERSATION } from 'utils/constants'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { getMyFriends } from 'api/profile'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

interface User {
   _id: string
   name: string
   avatar: string
}

interface Message {
   content: string
   user?: User
   _id: string
}

interface Project {
   name: string
   logo: string
}

interface Conversation {
   _id: string
   type: {
      name: string
   }
   members: User[]
   data?: {
      project?: Project
   }
   last_message?: Message
   updated_at: string
}

interface Friend {
   _id: string
   name: string
   avatar: string
}

interface RootState {
   chat: {
      conversations: Conversation[]
   }
   auth: {
      authUser: User
   }
   profile: {
      myFriends: Friend[]
   }
}

const Conversations: FC = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>()

   // ========== STATE FROM REDUX STORE =========== //
   const { conversations } = useSelector((state: RootState) => state.chat)

   console.log(conversations)
   const { authUser } = useSelector((state: RootState) => state.auth)
   const friends = useSelector((state: RootState) => state.profile.myFriends)

   useEffect(() => {
      if (friends?.length === 0) {
         dispatch(getMyFriends())
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [dispatch])

   // ========== COMPONENT RENDER =========== //
   return (
      <div className="flex flex-col flex-1 overflow-hidden">
         <Tabs.Root defaultValue="message" variant="plain" className="flex flex-col h-full">
            <Stack className="bg-[#ffffff] rounded-md p-[13px]">
               <Tabs.List bg="bg.muted" className="bg-white" rounded="l3" p="1">
                  <Tabs.Trigger value="message" textStyle="xs" className="text-black bg-white">
                     <IconlyChat size={16} color={'#000000'} />
                     Message
                  </Tabs.Trigger>
                  <Tabs.Trigger value="friend" textStyle="xs" className="text-black bg-white">
                     <IconlyUser size={16} color={'#000000'} />
                     Friends
                  </Tabs.Trigger>
                  <Tabs.Trigger value="projects" textStyle="xs" className="text-black bg-white">
                     <IconlyUser size={16} color={'#000000'} />
                     Projects
                  </Tabs.Trigger>
                  <Tabs.Indicator rounded="l2" />
               </Tabs.List>
            </Stack>
            <Tabs.Content value="message" className="flex-1 h-full overflow-y-scroll scrollbar-hide">
               <div className="h-full overflow-y-scroll scrollbar-hide">
                  {conversations
                     .filter((conversation) => conversation.last_message)
                     .map((conversation, index) => {
                        return (
                           <Stack
                              key={index}
                              onClick={() => navigate(`/conversation/${conversation._id}`)}
                              className="p-[15px] bg-[#ffffff] cursor-pointer overflow-hidden flex items-center gap-3 hover:bg-[#f8f9fa] "
                              direction={'row'}
                           >
                              {(() => {
                                 switch (conversation.type.name) {
                                    case DIRECT_CONVERSATION:
                                       return (
                                          <Stack
                                             className="items-center flex-1 gap-3 overflow-hidden"
                                             direction={'row'}
                                          >
                                             <Avatar.Root size={'xl'}>
                                                <Avatar.Fallback name={conversation?.members[0]?.name} />
                                                <Avatar.Image src={conversation?.members[0]?.avatar} />
                                             </Avatar.Root>
                                             <div className="flex-1 overflow-hidden">
                                                <span className="flex items-center gap-2 text-sm font-bold">
                                                   {conversation.members[0].name}
                                                </span>

                                                <p className="text-xs mb-0 text-[#6f7f92] font-bold whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                                                   {(() => {
                                                      const sender =
                                                         conversation.last_message?.user?._id === authUser._id
                                                            ? 'You: '
                                                            : conversation.last_message?.user?.name
                                                              ? `${conversation.last_message?.user?.name}: `
                                                              : ''

                                                      const content = conversation.last_message?.content || 'No message'

                                                      return `${sender}${content}`
                                                   })()}
                                                </p>
                                             </div>
                                          </Stack>
                                       )
                                    case GROUP_CONVERSATION:
                                       return (
                                          <Stack className="items-center gap-3" direction={'row'}>
                                             <Avatar.Root size={'xl'}>
                                                <Avatar.Fallback name={conversation.data?.project?.name} />
                                                <Avatar.Image src={conversation.data?.project?.logo} />
                                             </Avatar.Root>
                                             <div className="flex-1">
                                                <span className="flex items-center gap-2 text-sm font-bold">
                                                   {conversation.data?.project?.name}
                                                </span>
                                                <p className="text-xs mb-0 text-[#6f7f92] font-bold whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                                                   {(() => {
                                                      const sender =
                                                         conversation.last_message?.user?._id === authUser._id
                                                            ? 'You: '
                                                            : conversation.last_message?.user?.name
                                                              ? `${conversation.last_message?.user?.name}: `
                                                              : ''

                                                      const content = conversation.last_message?.content || 'No message'

                                                      return `${sender}${content}`
                                                   })()}
                                                </p>
                                             </div>
                                          </Stack>
                                       )
                                    default:
                                       return null
                                 }
                              })()}
                              <div className="text-xs text-[#6f7f92] ml-auto font-bold">
                                 <span>{moment(conversation.updated_at).fromNow()}</span>
                              </div>
                           </Stack>
                        )
                     })}
               </div>
            </Tabs.Content>
            <Tabs.Content value="friend" className="flex-1 h-full overflow-y-scroll scrollbar-hide">
               <div className="flex-1 h-full overflow-y-scroll scrollbar-hide">
                  <div className="bg-[#ffffff]">
                     <input
                        type="text"
                        placeholder="Search friends..."
                        className="text-sm w-full outline-none px-[10px] h-[45px] py-[5px] bg-white"
                     />
                  </div>
                  <div className=" mt-[15px] w-full">
                     {friends.length > 0 ? (
                        <>
                           {conversations.map((conversation, index) => {
                              return (
                                 <Stack
                                    key={index}
                                    onClick={() => navigate(`/conversation/${conversation._id}`)}
                                    className="p-[15px] bg-[#ffffff] cursor-pointer overflow-hidden flex items-center gap-3 hover:bg-[#f8f9fa] "
                                    direction={'row'}
                                 >
                                    {(() => {
                                       switch (conversation.type.name) {
                                          case DIRECT_CONVERSATION:
                                             return (
                                                <Stack
                                                   className="items-center flex-1 gap-3 overflow-hidden"
                                                   direction={'row'}
                                                >
                                                   <Avatar.Root size={'xl'}>
                                                      <Avatar.Fallback name={conversation?.members[0]?.name} />
                                                      <Avatar.Image src={conversation?.members[0]?.avatar} />
                                                   </Avatar.Root>
                                                   <div className="flex-1 overflow-hidden">
                                                      <span className="flex items-center gap-2 text-sm font-bold">
                                                         {conversation?.members[0]?.name}
                                                      </span>

                                                      <p className="text-xs mb-0 text-[#6f7f92] font-bold whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                                                         {(() => {
                                                            const sender =
                                                               conversation.last_message?.user?._id === authUser._id
                                                                  ? 'You: '
                                                                  : conversation.last_message?.user?.name
                                                                    ? `${conversation.last_message?.user?.name}: `
                                                                    : ''

                                                            const content =
                                                               conversation.last_message?.content || 'No message'

                                                            return `${sender}${content}`
                                                         })()}
                                                      </p>
                                                   </div>
                                                </Stack>
                                             )
                                          case GROUP_CONVERSATION:
                                             return (
                                                <Stack className="items-center gap-3" direction={'row'}>
                                                   <Avatar.Root size={'xl'}>
                                                      <Avatar.Fallback name={conversation.data?.project?.name} />
                                                      <Avatar.Image src={conversation.data?.project?.logo} />
                                                   </Avatar.Root>
                                                   <div className="flex-1">
                                                      <span className="flex items-center gap-2 text-sm font-bold">
                                                         {conversation.data?.project?.name}
                                                      </span>
                                                      <p className="text-xs mb-0 text-[#6f7f92] font-bold whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                                                         {(() => {
                                                            switch (conversation.last_message?.user?._id) {
                                                               case authUser._id:
                                                                  return 'You: '
                                                               default:
                                                                  return conversation.last_message?.user?.name
                                                                     ? `${conversation.last_message?.user?.name}: `
                                                                     : ''
                                                            }
                                                         })()}
                                                         {conversation.last_message?.content || 'No message'}
                                                      </p>
                                                   </div>
                                                </Stack>
                                             )
                                          default:
                                             return null
                                       }
                                    })()}
                                    <div className="text-xs text-[#6f7f92] ml-auto font-bold">
                                       <span>{moment(conversation.updated_at).fromNow()}</span>
                                    </div>
                                 </Stack>
                              )
                           })}
                        </>
                     ) : (
                        <p className="text-sm text-center text-gray-500">You do not have friend.</p>
                     )}
                  </div>
               </div>
            </Tabs.Content>
            <Tabs.Content value="projects">
               <div className="flex-1 h-full overflow-y-scroll scrollbar-hide">
                  <div className="bg-[#ffffff]">
                     <input
                        type="text"
                        placeholder="Search..."
                        className="text-sm w-full outline-none px-[10px] h-[45px] py-[5px] bg-white"
                     />
                  </div>
                  <div className=" mt-[15px] rounded-md bg-[#ffffff]">
                     {conversations.filter((c) => c.members.length >= 2).length > 0 ? (
                        <>
                           {conversations
                              .filter((conversation) => conversation.members.length >= 2)
                              .map((conversation, index) => {
                                 return (
                                    <Stack
                                       key={index}
                                       onClick={() => navigate(`/conversation/${conversation._id}`)}
                                       className="p-[15px] bg-[#ffffff] cursor-pointer overflow-hidden flex items-center gap-3 hover:bg-[#f8f9fa] "
                                       direction={'row'}
                                    >
                                       {(() => {
                                          switch (conversation.type.name) {
                                             case GROUP_CONVERSATION:
                                                return (
                                                   <Stack className="items-center gap-3" direction={'row'}>
                                                      <Avatar.Root size={'xl'}>
                                                         <Avatar.Fallback name={conversation.data?.project?.name} />
                                                         <Avatar.Image
                                                            src={conversation.data?.project?.logo || img_project}
                                                         />
                                                      </Avatar.Root>
                                                      <div className="flex-1 overflow-hidden">
                                                         <span className="flex items-center gap-2 text-sm font-bold">
                                                            {conversation.data?.project?.name ||
                                                               conversation.members.map((m) => m.name).join(', ')}
                                                         </span>
                                                         <p className="text-xs mb-0 text-[#6f7f92] font-bold whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                                                            {(() => {
                                                               const sender =
                                                                  conversation.last_message?.user?._id === authUser._id
                                                                     ? 'You: '
                                                                     : conversation.last_message?.user?.name
                                                                       ? `${conversation.last_message?.user?.name}: `
                                                                       : ''
                                                               const content =
                                                                  conversation.last_message?.content || 'No message'
                                                               return `${sender}${content}`
                                                            })()}
                                                         </p>
                                                      </div>
                                                   </Stack>
                                                )
                                             default:
                                                return null
                                          }
                                       })()}
                                       <div className="text-xs text-[#6f7f92] ml-auto font-bold">
                                          <span>{moment(conversation.updated_at).fromNow()}</span>
                                       </div>
                                    </Stack>
                                 )
                              })}
                        </>
                     ) : (
                        <p className="p-10 text-sm text-center text-gray-500">You do not have group.</p>
                     )}
                  </div>
               </div>
            </Tabs.Content>
         </Tabs.Root>
      </div>
   )
}

export default Conversations
