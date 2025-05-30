import React from 'react'
import { Input } from '~/components/UI/input'
import { IconlyArrowLeft2, IconlyEditSquare, IconlySetting } from '~/components/UI/Iconly'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/UI/tabs'
import useChat from './useChat'
import ChatCard from './components/ChatCard'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/UI/avatar'
import { BsArrowsAngleExpand } from 'react-icons/bs'
import ChatActionBar from './components/ChatActionBar'
import MessageWrap from './components/MessageWrap'
import { OPENNEZT_LOGO } from '~/utils/constants'
import NoChat from './components/NoChat'
import { LoadingFallback } from '~/routes/loadingFallback'
import { FaCircleCheck } from 'react-icons/fa6'
import { Skeleton } from '~/components/UI/skeleton'

const Message: React.FC = () => {
   const {
      loading,
      authUser,
      allChat,
      directChat,
      groupChat,
      currentChat,
      messagesContainerRef,
      onSendMessage,
      navigateToConversation,
      navigateToPrefix,
   } = useChat()

   if (!authUser) return null

   return (
      <div className="w-full px-[16px] py-[16px] h-full flex flex-row gap-[16px]">
         {/* SIDEBAR */}
         <div className="flex-col hidden h-full gap-4 overflow-hidden md:flex md:w-1/4">
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
            <Tabs defaultValue="all" className="w-full flex-1 overflow-hidden bg-[#ffffff] rounded-md flex flex-col">
               <TabsList className="grid grid-cols-3 m-3">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="direct">Direct</TabsTrigger>
                  <TabsTrigger value="group">Group</TabsTrigger>
               </TabsList>
               <TabsContent value="all" className="flex-1 p-3 overflow-y-auto scroll-smooth">
                  {allChat.map((conversation: any, index: number) => {
                     if (!conversation.members || conversation.members.length === 0) return null
                     return (
                        <ChatCard
                           key={index}
                           conversation={conversation}
                           userId={authUser._id}
                           index={index}
                           onNavigate={() => navigateToConversation(conversation)}
                        />
                     )
                  })}
               </TabsContent>
               <TabsContent value="direct" className="flex-1 p-3 overflow-y-auto scroll-smooth">
                  {directChat.map((conversation: any, index: number) => {
                     if (!conversation.members || conversation.members.length === 0) return null
                     return (
                        <ChatCard
                           key={index}
                           conversation={conversation}
                           userId={authUser._id}
                           index={index}
                           onNavigate={() => navigateToConversation(conversation)}
                        />
                     )
                  })}
               </TabsContent>
               <TabsContent value="group" className="flex-1 p-3 overflow-y-auto scroll-smooth">
                  {groupChat.map((conversation: any, index: number) => {
                     if (!conversation.members || conversation.members.length === 0) return null
                     return (
                        <ChatCard
                           key={index}
                           conversation={conversation}
                           userId={authUser._id}
                           index={index}
                           onNavigate={() => navigateToConversation(conversation)}
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
         {/* SIDEBAR */}

         {/* CONTENT */}
         {!loading && !currentChat && <NoChat />}

         {currentChat && (
            <div className="flex flex-col w-full md:w-3/4 ">
               {/* Header */}

               <div className="flex justify-between p-[10px] mb-[18px] bg-[#ffffff] rounded-md">
                  <div className="flex items-center">
                     <span
                        onClick={navigateToPrefix}
                        className="hidden md:flex justify-center items-center w-[50px] h-11"
                     >
                        <IconlyArrowLeft2 size={18} color={'#6f7f92'} />
                     </span>
                     {!loading && currentChat.name ? (
                        <div className="flex items-center">
                           <span className="mr-[8px]">
                              <Avatar>
                                 <AvatarFallback>{currentChat.name}</AvatarFallback>
                                 <AvatarImage src={currentChat.logo} />
                              </Avatar>
                           </span>
                           <span className="flex items-center gap-1 font-[600]">
                              {currentChat.name}
                              <FaCircleCheck className="text-blue-500" />
                           </span>
                        </div>
                     ) : (
                        <Skeleton className="w-[300px] h-[40px]" />
                     )}
                  </div>
                  <div className="flex items-center">
                     <span className="flex items-center justify-center text-[#6f7f92] w-[50px] h-11">
                        <BsArrowsAngleExpand />
                     </span>
                  </div>
               </div>

               {/* Content */}

               <div className="flex-1 overflow-y-scroll bg-[#ffffff] w-full p-2" ref={messagesContainerRef}>
                  {loading && <LoadingFallback className="!h-full" />}
                  {!loading &&
                     currentChat.messages?.map((message, index) => (
                        <MessageWrap
                           key={message._id}
                           userId={authUser?._id}
                           ownerId={message.user?._id}
                           ownerName={message.user?.name}
                           messageId={message._id}
                           favicon={message.user?.avatar || OPENNEZT_LOGO}
                           content={message.content}
                           timestamp={message.timestamp}
                           prevUserId={currentChat.messages?.[index - 1]?.user?._id}
                        />
                     ))}
               </div>

               {/* <Popover.Root
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
               <InviteMemberModal /> */}

               {/* Actionbar */}
               <ChatActionBar currentChatId={currentChat._id} onSendMessage={onSendMessage} />
            </div>
         )}
         {/* CONTENT */}
      </div>
   )
}

export default Message
