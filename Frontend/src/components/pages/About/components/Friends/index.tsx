import React, { useState, useEffect } from 'react'
import RightSidebar from 'components/common/RightSidebar'
import NotificationBadge from './NotificationBadge'
import { IconlyDelete } from 'components/UI/Iconly'
import { useDispatch, useSelector } from 'react-redux'
import { getMyFriends } from 'api/profile'
import { Avatar, Tabs } from '@chakra-ui/react'
import moment from 'moment'
import { FRIEND_REQUEST_NOTIFICATION, WAITING_STATUS } from 'utils/constants'
import { AppDispatch } from '~/store'
import { RootState } from 'store/types'

interface Friend {
   user: {
      _id: string
      name: string
      email: string
      avatar: string
   }
   created_at: string
}

interface Notification {
   _id: string
   type?: {
      name: string
   }
   metadata?: {
      status: string
   }
   user: {
      name: string
      avatar: string
      _id: string
   }
   timestamp: string
}

type OrderByType = 'Newest' | 'Oldest' | 'Active'

const Friends: React.FC = () => {
   const dispatch = useDispatch<AppDispatch>()
   // ========== STATE ========== //
   const [isActive, setIsActive] = useState<string>('friends')
   const [orderBy] = useState<OrderByType>('Newest')

   // ========== STATE FROM REDUX ========== //
   const friends = useSelector((state: RootState) => state.profile.myFriends)
   const notis = useSelector((state: RootState) => state.notification.notifications)

   const notifications = notis.filter(
      (notification: Notification) =>
         notification.type?.name === FRIEND_REQUEST_NOTIFICATION && notification.metadata?.status === WAITING_STATUS
   )
   // ========== STATE ========== //

   const sortList = <T extends { timestamp?: string; lastActive?: string }>(list: T[]): T[] => {
      return [...list].sort((a, b) => {
         if (orderBy === 'Newest' && a.timestamp && b.timestamp)
            return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
         if (orderBy === 'Oldest' && a.timestamp && b.timestamp)
            return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
         if (a.lastActive && b.lastActive) return b.lastActive.localeCompare(a.lastActive)
         return 0
      })
   }

   // ========== USE EFFECT ========== //
   useEffect(() => {
      if (friends?.length === 0) {
         dispatch(getMyFriends())
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [dispatch])

   // ========== HANDLER ========== //
   const handleDeleteFriend = (friend: Friend): void => {
      /*noop */
   }
   const handleDeleteRequest = (request: Notification): void => {
      /*noop */
   }
   const handleAcceptRequest = (request: Notification): void => {
      /*noop */
   }
   const handleNavigateToChat = (friend: Friend): void => {
      /*noop */
   }

   return (
      <div className="flex gap-3">
         <div className="w-full lg:w-10/12">
            <Tabs.Root defaultValue={isActive} className="flex flex-col w-full h-full">
               <Tabs.List className="flex justify-between items-center pb-2 bg-white h-[5.25rem]  px-8">
                  <div className="mt-[1rem] font-bold flex gap-2">
                     <Tabs.Trigger value="friends">
                        <span onClick={() => setIsActive('friends')}>Friends</span>
                        <NotificationBadge count={friends.length} />
                     </Tabs.Trigger>
                     <Tabs.Trigger value="friend-requests">
                        <span onClick={() => setIsActive('friend-requests')}>Friend Requests</span>
                        <NotificationBadge count={notifications.length} />
                     </Tabs.Trigger>
                  </div>
               </Tabs.List>

               <div className="mt-[2rem] flex-1 bg-white rounded-lg mb-4">
                  <Tabs.Content value="friends">
                     <div className="p-6">
                        <h4 className="mb-4 text-lg font-semibold">Friends ({friends.length})</h4>
                        <hr className="mb-4" />

                        {friends.map((friend: Friend) => (
                           <div
                              key={friend.user._id}
                              className="flex items-center justify-between p-4 mb-3 bg-gray-100 rounded-lg"
                           >
                              <div className="flex items-center space-x-4">
                                 <Avatar.Root className="w-[4.5rem] h-[4.5rem] rounded-full">
                                    <Avatar.Image src={friend.user.avatar} />
                                    <Avatar.Fallback name={friend.user?.name} />
                                 </Avatar.Root>
                                 <div>
                                    <div className="flex items-center space-x-1">
                                       <span className="font-medium">{friend.user?.name}</span>
                                       <span className="text-blue-500">✅</span>
                                    </div>
                                    <span className="text-sm text-gray-500">{friend.user?.email}</span>
                                 </div>
                              </div>

                              <div className="flex items-center space-x-4">
                                 <span className="text-sm text-gray-500">{moment(friend.created_at).fromNow()}</span>

                                 <button className="text-lg text-blue-500" onClick={() => handleNavigateToChat(friend)}>
                                    ✉️
                                 </button>
                                 <button onClick={() => handleDeleteFriend(friend)} className="text-lg">
                                    <IconlyDelete size={23} color={'#FF0000'} />
                                 </button>
                              </div>
                           </div>
                        ))}
                     </div>
                  </Tabs.Content>
                  <Tabs.Content value="friend-requests">
                     <div className="p-6 bg-white rounded-lg">
                        <h4 className="mb-4 text-lg font-semibold">Requests ({notifications.length})</h4>
                        <hr className="mb-4" />
                        {notifications.map((notification: Notification) => (
                           <div
                              key={notification._id}
                              className="flex items-center justify-between p-4 mb-3 bg-gray-100 rounded-lg"
                           >
                              <div className="flex items-center space-x-4">
                                 <Avatar.Root className="w-[4.5rem] h-[4.5rem] rounded-full">
                                    <Avatar.Image src={notification.user.avatar} />
                                    <Avatar.Fallback name={notification.user?.name} />
                                 </Avatar.Root>
                                 <div>
                                    <div className="flex items-center space-x-1">
                                       <span className="font-medium">{notification.user?.name}</span>
                                       <span className="text-blue-500">✅</span>
                                    </div>
                                 </div>
                              </div>

                              <div className="flex items-center space-x-4">
                                 <span className="text-sm text-gray-500">
                                    {moment(notification.timestamp).fromNow()}
                                 </span>
                                 <button className="text-lg">
                                    <svg
                                       onClick={() => handleAcceptRequest(notification)}
                                       xmlns="http://www.w3.org/2000/svg"
                                       className="text-green-500"
                                       fill="currentColor"
                                       width="24"
                                       height="24"
                                       viewBox="0 0 24 24"
                                    >
                                       <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
                                    </svg>
                                 </button>
                                 <button onClick={() => handleDeleteRequest(notification)} className="text-lg">
                                    <IconlyDelete size={23} color={'#FF0000'} />
                                 </button>
                              </div>
                           </div>
                        ))}
                     </div>
                  </Tabs.Content>
               </div>
            </Tabs.Root>
         </div>

         <RightSidebar activities={[]} action={() => ''} />
      </div>
   )
}

export default Friends
