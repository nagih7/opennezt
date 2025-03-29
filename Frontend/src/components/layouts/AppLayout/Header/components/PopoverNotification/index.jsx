import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import store from 'states/configureStore';
import { replyNotification, getNotifications } from 'api/notification';
import { NOTIFICATIONS } from 'utils/constants';
import { Avatar, Spinner, Stack } from '@chakra-ui/react';
import { getConversations } from 'api/chat';
import {
    CONFIRM_STATUS,
    PROJECT_INVITATION_NOTIFICATION,
    FRIEND_REQUEST_NOTIFICATION,
    WAITING_STATUS,
} from 'utils/constants/typeConstants';
import Actions from './components/Actions';
import FriendRequest from './components/FriendRequestNotification';
import ProjectInvitation from './components/ProjectInvitationNotification';
import Footer from './components/FooterPopoverNotification';

function PopoverNotification() {
    // ========== STATE FROM REDUX ========== //
    const { notifications, isLoadingReplyNotification } = useSelector((state) => state.notification);
    const { language } = useSelector((state) => state.app);

    // ========== STATE ========== //
    const [notificationIndex, setNotificationIndex] = useState(null);

    // ========== HANDLE REPLY NOTIFICATION ========== //
    const handleReplyNotification = async (notification_id, action, index) => {
        setNotificationIndex(index);
        await store.dispatch(replyNotification(notification_id, action));
        await store.dispatch(getNotifications());
        await store.dispatch(getConversations());
    };

    // ========== RENDER ========== //
    return (
        <Stack spacing={4}>
            <div className="mx-4 py-[16px] border-b border-gray-200 text-lg font-medium ">
                {NOTIFICATIONS.NOTIFICATIONS[language]}
            </div>
            <div
                className={`${
                    notifications && notifications.length >= 3
                        ? 'flex flex-col items-center max-h-[250px] p-0 m-0 overflow-y-scroll scrollbar-thumb-gray-400 scrollbar-track-gray-200 w-full'
                        : ''
                }`}
            >
                <Stack spacing={4}>
                    <Stack spacing={2}>
                        {notifications &&
                            notifications.length > 0 &&
                            notifications.map((notification, index) => (
                                <div className="px-4 py-[16px] hover:bg-[#f6f5f5]" key={index}>
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
                                                            return <ProjectInvitation notification={notification} />;
                                                        case FRIEND_REQUEST_NOTIFICATION:
                                                            return <FriendRequest notification={notification} />;
                                                        default:
                                                            return (
                                                                <div className="text-[#6f7f92] text-sm font-medium">
                                                                    {notification.message || 'New notification'}
                                                                </div>
                                                            );
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
                                                                return <Spinner size="md" />;
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
                                                                        );
                                                                    case CONFIRM_STATUS:
                                                                        return null;
                                                                    default:
                                                                        return null;
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
                                                                );
                                                            case CONFIRM_STATUS:
                                                                return null;
                                                            default:
                                                                return null;
                                                        }
                                                }
                                            })()}
                                        </div>
                                    </Stack>
                                </div>
                            ))}
                    </Stack>
                </Stack>
            </div>
            <Footer />
        </Stack>
    );
}

export default PopoverNotification;
