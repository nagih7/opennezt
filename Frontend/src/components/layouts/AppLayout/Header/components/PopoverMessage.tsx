import NotFound from 'components/UI/NotFound'
import { Avatar } from '@chakra-ui/react'
import { DIRECT_CONVERSATION, GROUP_CONVERSATION } from 'utils/constants'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import moment from 'moment'
import useChat from '~/components/pages/Chat/useChat'

const PopoverMessage: React.FC = () => {
   const { allChat: chats, navigateToConversation } = useChat()

   return (
      <div className="bg-[#ffffff] rounded-md">
         <div className="mx-2 p-[16px] border-b border-gray-200 text-lg font-medium ">Messages</div>
         <div className="flex flex-col items-center gap-2 p-2 overflow-y-scroll max-h-popover-message scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {chats.length === 0 && <NotFound content="Not found" size="100" />}
            {chats.length > 0 &&
               chats.map((chat: any, index: any) => {
                  return (
                     <div key={index} className="group cursor-pointer p-[15px] hover:bg-[#f6f5f5] w-full rounded-md">
                        <div
                           className="flex flex-row items-center w-full gap-2 overflow-hidden"
                           onClick={() => navigateToConversation(chat)}
                        >
                           <Avatar.Root size={'lg'}>
                              <Avatar.Fallback
                                 name={
                                    (chat.type === DIRECT_CONVERSATION && chat.members[0]?.name) ||
                                    (chat.type === GROUP_CONVERSATION && chat.data?.project?.name)
                                 }
                              />
                              <Avatar.Image
                                 src={
                                    (chat.type === DIRECT_CONVERSATION && chat.members[0]?.avatar) ||
                                    (chat.type === GROUP_CONVERSATION && chat.data?.project?.logo)
                                 }
                              />
                           </Avatar.Root>
                           <div className="flex flex-col w-full">
                              <div className="text-sm font-semibold text-gray-600">
                                 {(chat.type === DIRECT_CONVERSATION && chat.members[0]?.name) ||
                                    (chat.type === GROUP_CONVERSATION && chat.data?.project?.name)}
                              </div>
                              <p className="text-sm text-gray-500 truncate">
                                 {chat.last_message?.content}
                                 {chat.last_message?.timestamp && (
                                    <span className="ml-2 text-xs text-gray-400">
                                       {moment(chat.last_message?.timestamp)?.local().fromNow()}
                                    </span>
                                 )}
                              </p>
                           </div>
                           <div className="justify-end hidden group-hover:flex">
                              <HiOutlineDotsVertical className="w-[15px] h-[15px] text-black" />
                           </div>
                        </div>
                     </div>
                  )
               })}
         </div>
      </div>
   )
}

export default PopoverMessage
