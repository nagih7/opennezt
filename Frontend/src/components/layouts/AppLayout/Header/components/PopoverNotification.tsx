import React from 'react'
import moment from 'moment'
import { Avatar, Spinner } from '@chakra-ui/react'
import { useNotification } from '~/hooks'
import { CheckOutlined, CloseOutlined } from '@mui/icons-material'
import { Notification } from '~/types'
import { Action, NotificationType, Status } from '~/config/constants'

const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
   return (
      <div className={` ${notification.metadata?.read === true ? 'text-[#6f7f92]' : 'text-black'} text-sm font-medium`}>
         {notification.type?.name === NotificationType.PROJECT_INVITATION && (
            <>
               <b>{notification?.user?.name}</b> invited you to join the project
               <b>{notification?.data?.project?.name}</b> project
            </>
         )}
         {notification.type?.name === NotificationType.FRIEND_REQUEST && (
            <>
               <b>{notification.user?.name}</b> sent you a friend request
            </>
         )}
         {notification.type?.name === NotificationType.CONFIRM_FRIEND_REQUEST && (
            <>
               <b>{notification.user?.name}</b> confirmed your friend request
            </>
         )}
         {notification.type?.name === NotificationType.PROJECT_APPLICATION && (
            <>
               <b>{notification.user?.name}</b> applied to join the project
               <b>{notification?.data?.project?.name}</b> project
            </>
         )}
         {notification.type?.name === NotificationType.CONFIRM_PROJECT_INVITATION && (
            <>
               <b>{notification.user?.name}</b> confirmed your invitation to join the project
               <b>{notification?.data?.project?.name}</b> project
            </>
         )}
      </div>
   )
}

interface ActionsProps {
   notification: Notification
   index: number
}

const Actions: React.FC<ActionsProps> = ({ notification, index }) => {
   const { handleReplyNotification } = useNotification()
   return (
      <div className="flex flex-row gap-4">
         <button
            className="px-[12px] py-[8px] text-xs font-medium bg-[#2f65b9] text-white rounded-md flex items-center gap-1"
            onClick={() => handleReplyNotification(notification._id, Action.CONFIRM, index)}
         >
            <CheckOutlined fontSize="small" />
            Confirm
         </button>
         <button
            className="px-[12px] py-[8px] text-xs font-medium bg-[gray] text-[white] rounded-md flex items-center gap-1"
            onClick={() => handleReplyNotification(notification._id, Action.DELETE)}
         >
            <CloseOutlined fontSize="small" />
            Delete
         </button>
      </div>
   )
}

const PopoverNotification: React.FC = () => {
   const { notifications, notificationIndex, isLoadingReplyNotification } = useNotification()

   return (
      <div className="flex flex-col items-center w-full">
         <div className="w-full text-center py-[16px] border-b border-gray-200 text-lg font-medium ">Notifications</div>
         <div className="flex flex-col items-center w-full gap-2 p-2 overflow-y-scroll max-h-popover-notification scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {notifications?.length > 0 &&
               notifications.map((notification, index) => (
                  <div
                     className="p-4 flex items-between justify-between hover:bg-[#f6f5f5] cursor-pointer rounded-md gap-4"
                     key={index}
                  >
                     <Avatar.Root size={'sm'}>
                        <Avatar.Fallback name={notification.user?.name} />
                        <Avatar.Image src={notification.user?.avatar} />
                     </Avatar.Root>
                     <div className="flex flex-col flex-1">
                        <NotificationItem notification={notification} />
                        <span className="text-[#6f7f92] text-xs">{moment(notification.timestamp).fromNow()}</span>
                     </div>
                     <div className="flex items-center justify-end">
                        {notificationIndex === index && isLoadingReplyNotification && <Spinner size="md" />}

                        {notificationIndex === index &&
                           !isLoadingReplyNotification &&
                           notification.metadata.status === Status.WAITING && (
                              <Actions notification={notification} index={index} />
                           )}

                        {notificationIndex !== index && notification.metadata.status === Status.CONFIRM && null}

                        {notificationIndex !== index && notification.metadata.status === Status.WAITING && (
                           <Actions notification={notification} index={index} />
                        )}
                     </div>
                  </div>
               ))}
         </div>
      </div>
   )
}

export default PopoverNotification
