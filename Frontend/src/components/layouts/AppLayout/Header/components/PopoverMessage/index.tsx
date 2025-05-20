import React from 'react'
import { useSelector } from 'react-redux'
import NotFound from 'components/UI/NotFound'
import { MESSAGES } from 'utils/constants'
import { Avatar, Stack, Text } from '@chakra-ui/react'
import { DIRECT_CONVERSATION, GROUP_CONVERSATION } from 'utils/constants'
import { CheckCircleFilled } from '@ant-design/icons'
import { MoreOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

// Define Redux state types
interface RootState {
   chat: {
      conversations: Conversation[]
   }
   app: {
      language: string
   }
}

// Define conversation types
interface Member {
   name: string
   avatar?: string
}

interface Project {
   name: string
   logo?: string
}

interface ConversationData {
   project?: Project
}

interface ConversationType {
   name: string
}

interface Conversation {
   _id: string
   type: ConversationType
   members: Member[]
   data?: ConversationData
}

const PopoverMessage = () => {
   const navigate = useNavigate()
   const { conversations } = useSelector((state: RootState) => state.chat)
   const { language } = useSelector((state: RootState) => state.app)

   const MAX_LENGTH = 15
   const truncateText = (text: string, maxLength: number) => {
      return text.length > maxLength ? '...' : text
   }

   const handleNavigateChat = (id: string) => {
      navigate(`/conversation/${id}`)
   }

   return (
      <Stack className="bg-[#ffffff] rounded-md">
         <div className="mx-2 p-[16px] border-b border-gray-200 text-lg font-medium ">
            {MESSAGES.MESSAGES[language as keyof typeof MESSAGES.MESSAGES]}
         </div>
         <Stack
            className={`${
               conversations.length >= 3
                  ? 'flex flex-col items-center max-h-[250px] p-0 m-0 overflow-y-scroll scrollbar-thumb-gray-400 scrollbar-track-gray-200'
                  : ''
            } p-2`}
         >
            {conversations.length > 0 ? (
               conversations.map((conversation, index) => {
                  return (
                     <Stack key={index} className="group cursor-pointer p-[15px] hover:bg-[#f6f5f5] w-full border-r-2">
                        {(() => {
                           switch (conversation.type.name) {
                              case DIRECT_CONVERSATION:
                                 return (
                                    <Stack
                                       className="flex flex-row items-center w-full gap-2"
                                       gap={4}
                                       onClick={() => handleNavigateChat(conversation._id)}
                                    >
                                       <Avatar.Root size={'lg'}>
                                          <Avatar.Fallback name={conversation.members[0]?.name} />
                                          <Avatar.Image src={conversation.members[0]?.avatar} />
                                       </Avatar.Root>
                                       <Stack className="flex flex-col w-full gap-0">
                                          <Text className="flex items-center gap-1 mb-0 text-sm">
                                             {conversation.members[0]?.name}
                                             <CheckCircleFilled className="text-blue-500" />
                                          </Text>
                                          <Text className="mb-0 text-xs text-[#6f7f92] font-medium">
                                             {truncateText('No message', MAX_LENGTH)}
                                          </Text>
                                       </Stack>
                                       <div className="justify-end hidden group-hover:flex">
                                          <MoreOutlined className="w-[15px] h-[15px] text-black" />
                                       </div>
                                    </Stack>
                                 )
                              case GROUP_CONVERSATION:
                                 return (
                                    <Stack
                                       className="flex flex-row items-center w-full gap-2"
                                       gap={4}
                                       onClick={() => handleNavigateChat(conversation._id)}
                                    >
                                       <Avatar.Root size={'lg'}>
                                          <Avatar.Fallback name={conversation.data?.project?.name} />
                                          <Avatar.Image src={conversation.data?.project?.logo} />
                                       </Avatar.Root>
                                       <Stack className="flex flex-col w-full gap-0">
                                          <Text className="flex items-center gap-1 mb-0 text-sm">
                                             {conversation.data?.project?.name}
                                             <CheckCircleFilled className="text-blue-500" />
                                          </Text>
                                          <Text className="mb-0 text-xs text-[#6f7f92] font-medium">
                                             {truncateText('No message', MAX_LENGTH)}
                                          </Text>
                                       </Stack>
                                       <div className="justify-end hidden group-hover:flex">
                                          <MoreOutlined className="w-[15px] h-[15px] text-black" />
                                       </div>
                                    </Stack>
                                 )
                              default:
                                 return null
                           }
                        })()}
                     </Stack>
                  )
               })
            ) : (
               <div>
                  <NotFound content="Not found" size="100" />
               </div>
            )}
         </Stack>
      </Stack>
   )
}

export default PopoverMessage
