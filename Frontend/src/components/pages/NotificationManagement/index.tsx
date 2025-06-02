import { ActionBar, Button, Kbd, Portal, Spinner, Table, Tabs } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import RightSidebar from '~/components/common/RightSidebar'
import store, { AppDispatch } from '~/store'
import moment from 'moment'
import {
   CONFIRM_FRIEND_REQUEST_NOTIFICATION,
   CONFIRM_PROJECT_INVITATION_NOTIFICATION,
   CONFIRM_STATUS,
   FRIEND_REQUEST_NOTIFICATION,
   PROJECT_APPLICATION_NOTIFICATION,
   PROJECT_INVITATION_NOTIFICATION,
   WAITING_STATUS,
} from 'utils/constants'
import ConfirmFriendRequestNotification from 'components/layouts/AppLayout/Header/components/PopoverNotification/components/ConfirmFriendRequestNotification'
import ProjectApplicationNotification from 'components/layouts/AppLayout/Header/components/PopoverNotification/components/ProjectApplicationNotification'
import ConfirmProjectInvitationNoitification from 'components/layouts/AppLayout/Header/components/PopoverNotification/components/ConfirmProjectInvitationNoitification'
import ProjectInvitationNotification from 'components/layouts/AppLayout/Header/components/PopoverNotification/components/ProjectInvitationNotification'
import FriendRequestNotification from 'components/layouts/AppLayout/Header/components/PopoverNotification/components/FriendRequestNotification'
import Actions from 'components/layouts/AppLayout/Header/components/PopoverNotification/components/Actions'
import { markAsRead, replyNotification } from 'api/notification'
import { postProjectDetailsActivitiesNewMember } from 'api/activity'
import { getConversations } from 'api/chat'

interface Notification {
   _id: string
   type?: {
      name: string
   }
   message?: string
   timestamp: string
   metadata?: {
      read: boolean
      status: string
      projectId?: string
   }
}

interface NotificationState {
   notifications: Notification[]
   isLoadingReplyNotification: boolean
}

function NotificationProject() {
   const dispatch = useDispatch<AppDispatch>()
   // ========= STATE FROM REDUX STORE ========== //
   const { notifications, isLoadingReplyNotification } = useSelector(
      (state: any) => state.notification
   ) as NotificationState
   // ========= STATE ========== //
   const [unread, setUnread] = useState<Notification[]>([])
   const [read, setRead] = useState<Notification[]>([])

   // ========= USE EFFECT ========== //
   useEffect(() => {
      if (notifications && notifications.length > 0) {
         setRead(notifications.filter((notification) => notification.metadata && notification.metadata.read === true))
         setUnread(
            notifications.filter((notification) => !notification.metadata || notification.metadata.read === false)
         )
      }
   }, [notifications])

   // ========== HANDLE REPLY NOTIFICATION ========== //
   const handleReplyNotification = async (notification_id: string, action: string) => {
      const notification = notifications.find((n) => n._id === notification_id)
      await store.dispatch(replyNotification(notification_id, action))
      await store.dispatch(getConversations())
      if (action === 'confirm' && notification?.metadata?.projectId) {
         await postProjectDetailsActivitiesNewMember(notification_id)
      }
   }
   // ========== HANDLE MARK AS READ ========== //
   const handleMarkAsRead = async (notification: Notification) => {
      if (notification.metadata?.read === false) {
         await store.dispatch(markAsRead(notification._id))
      }
   }

   // ========== STATE ========== //
   const [selection, setSelection] = useState<string[]>([])
   const hasSelection = selection.length > 0
   // const indeterminate = hasSelection && selection.length < unread.length
   const allRows = notifications.map((notification, index) => (
      <Table.Row
         key={notification._id}
         data-selected={selection.includes(notification._id) ? '' : undefined}
         onClick={() => {
            // Chỉ áp dụng handleMarkAsRead nếu thông báo chưa đọc
            if (notification.metadata?.read === false) {
               handleMarkAsRead(notification)
            }
         }}
         className={notification.metadata?.read === false ? 'cursor-pointer hover:bg-gray-50' : ''}
      >
         <Table.Cell className="py-4 pl-8 ">
            {(() => {
               switch (notification.type?.name) {
                  case PROJECT_INVITATION_NOTIFICATION:
                     return <ProjectInvitationNotification notification={notification} />
                  case FRIEND_REQUEST_NOTIFICATION:
                     return <FriendRequestNotification notification={notification} />
                  case CONFIRM_FRIEND_REQUEST_NOTIFICATION:
                     return <ConfirmFriendRequestNotification notification={notification} />
                  case PROJECT_APPLICATION_NOTIFICATION:
                     return <ProjectApplicationNotification notification={notification} />
                  case CONFIRM_PROJECT_INVITATION_NOTIFICATION:
                     return <ConfirmProjectInvitationNoitification notification={notification} />
                  default:
                     return (
                        <div className="text-[#6f7f92] text-sm font-medium">
                           {notification.message || 'New notification'}
                        </div>
                     )
               }
            })()}
         </Table.Cell>
         <Table.Cell>{moment(notification.timestamp).fromNow()}</Table.Cell>
         <Table.Cell
            justifyContent={'center'}
            textAlign="center"
            display={'flex'}
            alignItems={'center'}
            height={'68px'}
         >
            {(() => {
               switch (notification._id) {
                  case index.toString():
                     switch (isLoadingReplyNotification) {
                        case true:
                           return <Spinner size="md" />
                        default:
                           switch (notification.metadata?.status) {
                              case WAITING_STATUS:
                                 return (
                                    <Actions
                                       notification={notification}
                                       handleReplyNotification={handleReplyNotification}
                                       index={index}
                                    />
                                 )
                              case CONFIRM_STATUS:
                                 return null
                              default:
                                 return null
                           }
                     }
                  default:
                     switch (notification.metadata?.status) {
                        case WAITING_STATUS:
                           return (
                              <Actions
                                 notification={notification}
                                 handleReplyNotification={handleReplyNotification}
                                 index={index}
                              />
                           )
                        case CONFIRM_STATUS:
                           return null
                        default:
                           return null
                     }
               }
            })()}
         </Table.Cell>
      </Table.Row>
   ))
   const unreadRows = unread.map((notification, index) => (
      <Table.Row
         key={notification._id}
         data-selected={selection.includes(notification._id) ? '' : undefined}
         onClick={() => handleMarkAsRead(notification)}
         className="cursor-pointer hover:bg-gray-50"
      >
         <Table.Cell className="py-4 pl-8 ">
            {(() => {
               switch (notification.type?.name) {
                  case PROJECT_INVITATION_NOTIFICATION:
                     return <ProjectInvitationNotification notification={notification} />
                  case FRIEND_REQUEST_NOTIFICATION:
                     return <FriendRequestNotification notification={notification} />
                  case CONFIRM_FRIEND_REQUEST_NOTIFICATION:
                     return <ConfirmFriendRequestNotification notification={notification} />
                  case PROJECT_APPLICATION_NOTIFICATION:
                     return <ProjectApplicationNotification notification={notification} />
                  case CONFIRM_PROJECT_INVITATION_NOTIFICATION:
                     return <ConfirmProjectInvitationNoitification notification={notification} />
                  default:
                     return (
                        <div className="text-[#6f7f92] text-sm font-medium">
                           {notification.message || 'New notification'}
                        </div>
                     )
               }
            })()}
         </Table.Cell>
         <Table.Cell>{moment(notification.timestamp).fromNow()}</Table.Cell>
         <Table.Cell textAlign="center">
            {(() => {
               switch (notification._id) {
                  case index.toString():
                     switch (isLoadingReplyNotification) {
                        case true:
                           return <Spinner size="md" />
                        default:
                           switch (notification.metadata?.status) {
                              case WAITING_STATUS:
                                 return (
                                    <Actions
                                       notification={notification}
                                       handleReplyNotification={handleReplyNotification}
                                       index={index}
                                    />
                                 )
                              case CONFIRM_STATUS:
                                 return null
                              default:
                                 return null
                           }
                     }
                  default:
                     switch (notification.metadata?.status) {
                        case WAITING_STATUS:
                           return (
                              <Actions
                                 notification={notification}
                                 handleReplyNotification={handleReplyNotification}
                                 index={index}
                              />
                           )
                        case CONFIRM_STATUS:
                           return null
                        default:
                           return null
                     }
               }
            })()}
         </Table.Cell>
      </Table.Row>
   ))
   const readRows = read.map((notification, index) => (
      <Table.Row key={notification._id} data-selected={selection.includes(notification._id) ? '' : undefined}>
         <Table.Cell className="py-4 pl-8 ">
            {(() => {
               switch (notification.type?.name) {
                  case PROJECT_INVITATION_NOTIFICATION:
                     return <ProjectInvitationNotification notification={notification} />
                  case FRIEND_REQUEST_NOTIFICATION:
                     return <FriendRequestNotification notification={notification} />
                  case CONFIRM_FRIEND_REQUEST_NOTIFICATION:
                     return <ConfirmFriendRequestNotification notification={notification} />
                  case PROJECT_APPLICATION_NOTIFICATION:
                     return <ProjectApplicationNotification notification={notification} />
                  case CONFIRM_PROJECT_INVITATION_NOTIFICATION:
                     return <ConfirmProjectInvitationNoitification notification={notification} />
                  default:
                     return (
                        <div className="text-[#6f7f92] text-sm font-medium">
                           {notification.message || 'New notification'}
                        </div>
                     )
               }
            })()}
         </Table.Cell>
         <Table.Cell>{moment(notification.timestamp).fromNow()}</Table.Cell>
         <Table.Cell textAlign="center">
            {(() => {
               switch (notification._id) {
                  case index.toString():
                     switch (isLoadingReplyNotification) {
                        case true:
                           return <Spinner size="md" />
                        default:
                           switch (notification.metadata?.status) {
                              case WAITING_STATUS:
                                 return (
                                    <Actions
                                       notification={notification}
                                       handleReplyNotification={handleReplyNotification}
                                       index={index}
                                    />
                                 )
                              case CONFIRM_STATUS:
                                 return null
                              default:
                                 return null
                           }
                     }
                  default:
                     switch (notification.metadata?.status) {
                        case WAITING_STATUS:
                           return (
                              <Actions
                                 notification={notification}
                                 handleReplyNotification={handleReplyNotification}
                                 index={index}
                              />
                           )
                        case CONFIRM_STATUS:
                           return null
                        default:
                           return null
                     }
               }
            })()}
         </Table.Cell>
      </Table.Row>
   ))

   // ========== RENDER ========== //
   return (
      <>
         <div className="flex w-full gap-8 mt-[1rem] px-[16px] flex-1">
            <Tabs.Root className="flex flex-col w-10/12" defaultValue="all">
               <Tabs.List>
                  <div className="flex justify-between w-full p-4 font-bold bg-white">
                     <div className="flex">
                        <Tabs.Trigger className="text-black" value="all">
                           All
                        </Tabs.Trigger>
                        <Tabs.Trigger className="text-black" value="unread">
                           Unread
                        </Tabs.Trigger>
                        <Tabs.Trigger className="text-black" value="read">
                           Read
                        </Tabs.Trigger>
                     </div>
                  </div>
               </Tabs.List>
               <div className="my-[2.5rem] bg-white flex-1">
                  <Tabs.Content value="all" className="flex flex-col w-full h-full p-0">
                     <Table.Root size="sm" striped>
                        <Table.Header>
                           <Table.Row bg="#2F65B9">
                              <Table.ColumnHeader color="white" w="6/12" className="py-3 pl-8">
                                 Notification
                              </Table.ColumnHeader>
                              <Table.ColumnHeader color="white" w="4/12">
                                 Timestamp
                              </Table.ColumnHeader>
                              <Table.ColumnHeader color="white" w="2/12" textAlign="center">
                                 Actions
                              </Table.ColumnHeader>
                           </Table.Row>
                        </Table.Header>
                        <Table.Body>{allRows}</Table.Body>
                     </Table.Root>
                  </Tabs.Content>
                  <Tabs.Content value="unread" className="flex flex-col w-full h-full p-0">
                     <Table.Root size="sm" striped>
                        <Table.Header>
                           <Table.Row bg="#2F65B9">
                              <Table.ColumnHeader color="white" w="6/12" className="py-3 pl-8">
                                 Notification
                              </Table.ColumnHeader>
                              <Table.ColumnHeader color="white" w="4/12">
                                 Timestamp
                              </Table.ColumnHeader>
                              <Table.ColumnHeader color="white" w="2/12" textAlign="center">
                                 Actions
                              </Table.ColumnHeader>
                           </Table.Row>
                        </Table.Header>
                        <Table.Body>{unreadRows}</Table.Body>
                     </Table.Root>
                     <ActionBar.Root open={hasSelection}>
                        <Portal>
                           <ActionBar.Positioner>
                              <ActionBar.Content>
                                 <ActionBar.SelectionTrigger>{selection.length} selected</ActionBar.SelectionTrigger>
                                 <ActionBar.Separator />
                                 <Button variant="outline" size="sm">
                                    Delete <Kbd>⌫</Kbd>
                                 </Button>
                                 <Button variant="outline" size="sm">
                                    Share <Kbd>T</Kbd>
                                 </Button>
                              </ActionBar.Content>
                           </ActionBar.Positioner>
                        </Portal>
                     </ActionBar.Root>
                  </Tabs.Content>
                  <Tabs.Content value="read" className="flex flex-col w-full h-full p-0">
                     <Table.Root size="sm" striped>
                        <Table.Header>
                           <Table.Row bg="#2F65B9">
                              <Table.ColumnHeader color="white" w="6/12" className="py-3 pl-8">
                                 Notification
                              </Table.ColumnHeader>
                              <Table.ColumnHeader color="white" w="4/12">
                                 Timestamp
                              </Table.ColumnHeader>
                              <Table.ColumnHeader color="white" w="2/12" textAlign="center">
                                 Actions
                              </Table.ColumnHeader>
                           </Table.Row>
                        </Table.Header>
                        <Table.Body>{readRows}</Table.Body>
                     </Table.Root>
                     <ActionBar.Root open={hasSelection}>
                        <Portal>
                           <ActionBar.Positioner>
                              <ActionBar.Content>
                                 <ActionBar.SelectionTrigger>{selection.length} selected</ActionBar.SelectionTrigger>
                                 <ActionBar.Separator />
                                 <Button variant="outline" size="sm">
                                    Delete <Kbd>⌫</Kbd>
                                 </Button>
                                 <Button variant="outline" size="sm">
                                    Share <Kbd>T</Kbd>
                                 </Button>
                              </ActionBar.Content>
                           </ActionBar.Positioner>
                        </Portal>
                     </ActionBar.Root>
                  </Tabs.Content>
               </div>
            </Tabs.Root>
            <RightSidebar activities={[]} action={() => {}} />
         </div>
      </>
   )
}

export default NotificationProject
