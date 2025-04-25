import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import store from 'states/configureStore'
import { markAsRead, replyNotification } from 'api/notification'
import {
    CONFIRM_FRIEND_REQUEST_NOTIFICATION,
    CONFIRM_PROJECT_INVITATION_NOTIFICATION,
    NOTIFICATIONS,
    PROJECT_APPLICATION_NOTIFICATION,
} from 'utils/constants'
import { Avatar, Spinner, Stack } from '@chakra-ui/react'
import { getConversations } from 'api/chat'
import {
    CONFIRM_STATUS,
    PROJECT_INVITATION_NOTIFICATION,
    FRIEND_REQUEST_NOTIFICATION,
    WAITING_STATUS,
} from 'utils/constants'
import Actions from './components/Actions'
import FriendRequest from './components/FriendRequestNotification'
import ProjectInvitation from './components/ProjectInvitationNotification'
import Footer from './components/FooterPopoverNotification'
import ConfirmFriendRequestNotification from './components/ConfirmFriendRequestNotification'
import ProjectApplicationNotification from './components/ProjectApplicationNotification'
import ConfirmProjectInvitationNoitification from './components/ConfirmProjectInvitationNoitification'
import { postProjectDetailsActivitiesNewMember } from 'api/activity'

function PopoverNotification() {
    // ========== STATE FROM REDUX ========== //
    const { notifications, isLoadingReplyNotification } = useSelector((state) => state.notification)
    const { language } = useSelector((state) => state.app)

    // ========== STATE ========== //
    const [notificationIndex, setNotificationIndex] = useState(null)
    // ========= UNREAD/READ ========== //
    const unreadNotifications = notifications.filter((notification) => notification.metadata?.read === false)
    const readNotifications = notifications.filter((notification) => notification.metadata?.read === true)

    // ========== HANDLE REPLY NOTIFICATION ========== //
    const handleReplyNotification = async (notification_id, action, index) => {
        setNotificationIndex(index)
        await store.dispatch(replyNotification(notification_id, action))
        await store.dispatch(getConversations())
        if (action === 'confirm') {
            await postProjectDetailsActivitiesNewMember(notification_id, {})
        }
    }
    // ========== HANDLE MARK AS READ ========== //
    const handleMarkAsRead = async (notification) => {
        if (notification.metadata?.read === false) {
            await store.dispatch(markAsRead(notification._id))
        }
    }

    // ========== RENDER ========== //
    return (
        <Stack spacing={4}>
            <div className="mx-4 py-[16px] border-b border-gray-200 text-lg font-medium ">
                {NOTIFICATIONS.NOTIFICATIONS[language]}
            </div>
            <div
                className={`${
                    notifications && notifications?.length >= 3
                        ? 'flex flex-col items-center max-h-[350px] p-0 m-0 overflow-y-scroll scrollbar-thumb-gray-400 scrollbar-track-gray-200 w-full'
                        : ''
                }`}
            >
                <Stack spacing={4}>
                    {/* UNREAD */}
                    {unreadNotifications.length > 0 && (
                        <div>
                            <div className="mx-4 py-[8px] text-md font-semibold text-gray-600">Unread</div>
                            <Stack className="gap-0">
                                {unreadNotifications.map((notification, index) => (
                                    <div
                                        className="px-4 py-[16px] bg-gray-100 hover:bg-[#f6f5f5] cursor-pointer"
                                        key={index}
                                        onClick={() => handleMarkAsRead(notification)}
                                    >
                                        <Stack>
                                            <Stack direction="row" spacing={4}>
                                                <Avatar.Root size={'sm'}>
                                                    <Avatar.Fallback name={notification.user?.name} />
                                                    <Avatar.Image src={notification.user.avatar} />
                                                </Avatar.Root>
                                                <Stack spacing={2}>
                                                    {(() => {
                                                        switch (notification.type?.name) {
                                                            case PROJECT_INVITATION_NOTIFICATION:
                                                                return <ProjectInvitation notification={notification} />
                                                            case FRIEND_REQUEST_NOTIFICATION:
                                                                return <FriendRequest notification={notification} />
                                                            case CONFIRM_FRIEND_REQUEST_NOTIFICATION:
                                                                return (
                                                                    <ConfirmFriendRequestNotification
                                                                        notification={notification}
                                                                    />
                                                                )
                                                            case PROJECT_APPLICATION_NOTIFICATION:
                                                                return (
                                                                    <ProjectApplicationNotification
                                                                        notification={notification}
                                                                    />
                                                                )
                                                            case CONFIRM_PROJECT_INVITATION_NOTIFICATION:
                                                                return (
                                                                    <ConfirmProjectInvitationNoitification
                                                                        notification={notification}
                                                                    />
                                                                )
                                                            default:
                                                                return (
                                                                    <div className="text-[#6f7f92] text-sm font-medium">
                                                                        {notification.message || 'New notification'}
                                                                    </div>
                                                                )
                                                        }
                                                    })()}
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[#6f7f92] text-xs">
                                                            {moment(notification.timestamp).fromNow()}
                                                        </span>
                                                        {notification.metadata?.read === false ? (
                                                            <span className="inline-block w-3 h-3 ml-2 bg-blue-400 rounded-full"></span>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </div>
                                                </Stack>
                                            </Stack>
                                            {/* ACTION */}
                                            <div className="flex items-center justify-end">
                                                {(() => {
                                                    switch (notificationIndex) {
                                                        case index:
                                                            switch (isLoadingReplyNotification) {
                                                                case true:
                                                                    return <Spinner size="md" />
                                                                default:
                                                                    switch (notification.metadata.status) {
                                                                        case WAITING_STATUS:
                                                                            return (
                                                                                <Actions
                                                                                    notification={notification}
                                                                                    handleReplyNotification={
                                                                                        handleReplyNotification
                                                                                    }
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
                                                            switch (notification.metadata.status) {
                                                                case WAITING_STATUS:
                                                                    return (
                                                                        <Actions
                                                                            notification={notification}
                                                                            handleReplyNotification={
                                                                                handleReplyNotification
                                                                            }
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
                                            </div>
                                        </Stack>
                                    </div>
                                ))}
                            </Stack>
                        </div>
                    )}
                    {/* READ */}
                    {readNotifications?.length > 0 && (
                        <div>
                            <div className="mx-4 py-[8px] text-md font-semibold text-gray-600">Read</div>
                            <Stack spacing={2}>
                                {readNotifications.map((notification, index) => (
                                    <div className="px-4 py-[16px] hover:bg-[#f6f5f5] cursor-pointer" key={index}>
                                        <Stack>
                                            <Stack direction="row" spacing={4}>
                                                <Avatar.Root size={'sm'}>
                                                    <Avatar.Fallback name={notification.user?.name} />
                                                    <Avatar.Image src={notification.user.avatar} />
                                                </Avatar.Root>
                                                <Stack spacing={2}>
                                                    {(() => {
                                                        switch (notification.type?.name) {
                                                            case PROJECT_INVITATION_NOTIFICATION:
                                                                return <ProjectInvitation notification={notification} />
                                                            case FRIEND_REQUEST_NOTIFICATION:
                                                                return <FriendRequest notification={notification} />
                                                            case CONFIRM_FRIEND_REQUEST_NOTIFICATION:
                                                                return (
                                                                    <ConfirmFriendRequestNotification
                                                                        notification={notification}
                                                                    />
                                                                )
                                                            case PROJECT_APPLICATION_NOTIFICATION:
                                                                return (
                                                                    <ProjectApplicationNotification
                                                                        notification={notification}
                                                                    />
                                                                )
                                                            case CONFIRM_PROJECT_INVITATION_NOTIFICATION:
                                                                return (
                                                                    <ConfirmProjectInvitationNoitification
                                                                        notification={notification}
                                                                    />
                                                                )
                                                            default:
                                                                return (
                                                                    <div className="text-[#6f7f92] text-sm font-medium">
                                                                        {notification.message || 'New notification'}
                                                                    </div>
                                                                )
                                                        }
                                                    })()}
                                                    <span className="text-[#6f7f92] text-xs">
                                                        {moment(notification.timestamp).fromNow()}
                                                    </span>
                                                </Stack>
                                            </Stack>
                                            <div className="flex items-center justify-end">
                                                {(() => {
                                                    switch (notificationIndex) {
                                                        case index:
                                                            switch (isLoadingReplyNotification) {
                                                                case true:
                                                                    return <Spinner size="md" />
                                                                default:
                                                                    switch (notification.metadata.status) {
                                                                        case WAITING_STATUS:
                                                                            return (
                                                                                <Actions
                                                                                    notification={notification}
                                                                                    handleReplyNotification={
                                                                                        handleReplyNotification
                                                                                    }
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
                                                            switch (notification.metadata.status) {
                                                                case WAITING_STATUS:
                                                                    return (
                                                                        <Actions
                                                                            notification={notification}
                                                                            handleReplyNotification={
                                                                                handleReplyNotification
                                                                            }
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
                                            </div>
                                        </Stack>
                                    </div>
                                ))}
                            </Stack>
                        </div>
                    )}
                </Stack>
            </div>
            <Footer />
        </Stack>
    )
}

export default PopoverNotification
