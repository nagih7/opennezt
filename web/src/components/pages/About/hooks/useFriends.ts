import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getMyFriends } from '~/api/profile'
import { AppDispatch, RootState } from '~/store'
import { FRIEND_REQUEST_NOTIFICATION, WAITING_STATUS } from '~/config/constants'
import { replyNotification } from '~/api/notification'
import { useNavigate } from 'react-router-dom'
import { ROUTE_CONFIG } from '~/config/constants'
import { Friend, Notification, OrderByType } from '~/types'

const useFriends = () => {
   const dispatch = useDispatch<AppDispatch>()
   const navigate = useNavigate()
   // ========== STATE ========== //
   const [isActive, setIsActive] = useState<string>('friends')
   const [orderBy] = useState<OrderByType>('Newest')
   const [friends, setFriends] = useState<Friend[]>([])

   // ========== STATE FROM REDUX ========== //
   const notis = useSelector((state: RootState) => state.notification.notifications)

   const notifications = notis.filter(
      (notification: Notification) =>
         notification.type?.name === FRIEND_REQUEST_NOTIFICATION && notification.metadata?.status === WAITING_STATUS
   )
   // ========== STATE ========== //

   const sortList = <T extends Friend | Notification>(list: T[]): T[] => {
      return [...list].sort((a, b) => {
         if (orderBy === 'Newest') {
            const dateA = 'created_at' in a ? a.created_at : a.timestamp
            const dateB = 'created_at' in b ? b.created_at : b.timestamp
            if (dateA && dateB) {
               return new Date(dateB).getTime() - new Date(dateA).getTime()
            }
         }
         if (orderBy === 'Oldest') {
            const dateA = 'created_at' in a ? a.created_at : a.timestamp
            const dateB = 'created_at' in b ? b.created_at : b.timestamp
            if (dateA && dateB) {
               return new Date(dateA).getTime() - new Date(dateB).getTime()
            }
         }
         return 0
      })
   }

   // ========== USE EFFECT ========== //
   useEffect(() => {
      const fetchFriends = async () => {
         try {
            const response = await getMyFriends()
            setFriends(response.data)
         } catch (error) {
            console.error('Failed to fetch friends:', error)
         }
      }
      if (friends?.length === 0) {
         fetchFriends()
      }
   }, [dispatch])

   // useEffect(() => {
   //    if (friends?.length === 0) {
   //       getMyFriends()
   //    }
   //    // eslint-disable-next-line react-hooks/exhaustive-deps
   // }, [dispatch])

   // ========== HANDLER ========== //
   const handleDeleteFriend = (friend: Friend): void => {
      /*noop */
   }
   const handleDeleteRequest = (request: Notification): void => {
      /*noop */
   }
   const handleAcceptRequest = (request: Notification): void => {
      dispatch(replyNotification(request._id, 'confirm'))
      /*noop */
   }
   const handleNavigateToChat = (friend: Friend): void => {
      navigate(ROUTE_CONFIG.USER.CONVERSATION.PREFIX)
   }
   return {
      isActive,
      setIsActive,
      friends: sortList(friends).filter((item): item is Friend => 'created_at' in item),
      notifications: sortList(notifications),
      handleDeleteFriend,
      handleDeleteRequest,
      handleAcceptRequest,
      handleNavigateToChat,
   }
}

export default useFriends
