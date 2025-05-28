import React from 'react'
import { IconlyEditSquare, IconlySetting } from '~/components/UI/Iconly'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/UI/avatar'
import { Input } from '~/components/UI/input'
import useMessageSidebar from './useMessageSidebar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/UI/tabs'
import ChatCard from './ChatCard'

const MessageSidebar: React.FC = () => {
   const { authUser, allChat, directChat, groupChat, navigateToConversation } = useMessageSidebar()

   if (!authUser) return

   return (
      <div className="flex flex-col w-full h-full gap-4 overflow-hidden">
         {/* Header */}
         <div className="bg-[#ffffff] p-4 rounded-md flex items-center gap-2 no-wrap">
            <Input
               type="text"
               placeholder="Search..."
               className="py-[10px] w-full pl-[10px] outline-none text-[#6f7f92] h-10 pr-[25px] bg-[#f8f9fa] rounded-md border border-gray-200"
            />
            <span className="flex items-center justify-center bg-[#eaeff8] rounded-md min-w-10 h-10">
               <IconlyEditSquare size={20} color={'#6f7f92'} />
            </span>
         </div>

         {/* Content */}
         <Tabs defaultValue="all" className="w-full flex-1 overflow-hidden bg-[#ffffff] rounded-md p-[13px]">
            <TabsList className="grid w-full grid-cols-3">
               <TabsTrigger value="all">All</TabsTrigger>
               <TabsTrigger value="direct">Direct</TabsTrigger>
               <TabsTrigger value="group">Group</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="h-full overflow-y-auto scroll-smooth scrollbar-hide">
               {allChat.map((conversation: any, index: number) => {
                  if (!conversation.members || conversation.members.length === 0) return null
                  return (
                     <ChatCard
                        key={index}
                        conversation={conversation}
                        userId={authUser._id}
                        index={index}
                        onNavigate={() => navigateToConversation(conversation._id)}
                     />
                  )
               })}
            </TabsContent>
            <TabsContent value="direct">
               {directChat.map((conversation: any, index: number) => {
                  if (!conversation.members || conversation.members.length === 0) return null
                  return (
                     <ChatCard
                        key={index}
                        conversation={conversation}
                        userId={authUser._id}
                        index={index}
                        onNavigate={() => navigateToConversation(conversation._id)}
                     />
                  )
               })}
            </TabsContent>
            <TabsContent value="group">
               {groupChat.map((conversation: any, index: number) => {
                  if (!conversation.members || conversation.members.length === 0) return null
                  return (
                     <ChatCard
                        key={index}
                        conversation={conversation}
                        userId={authUser._id}
                        index={index}
                        onNavigate={() => navigateToConversation(conversation._id)}
                     />
                  )
               })}
            </TabsContent>
         </Tabs>

         {/* Foooter */}
         <div className="bg-[#ffffff] flex justify-between p-4 rounded-md">
            <div className="flex gap-4">
               <Avatar>
                  <AvatarFallback>{authUser?.name}</AvatarFallback>
                  <AvatarImage src={authUser?.avatar} />
               </Avatar>
               <p className="flex items-center text-[#6f7f92] text-sm font-medium">{authUser?.name}</p>
            </div>
            <span className="w-[50px] h-[50px] flex items-center justify-center">
               <IconlySetting size={18} color={'#2f65b9'} />
            </span>
         </div>
      </div>
   )
}

export default MessageSidebar
