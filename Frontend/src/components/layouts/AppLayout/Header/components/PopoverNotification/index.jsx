import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { CheckOutlined, CloseOutlined } from '@mui/icons-material';
import store from 'states/configureStore';
import { replyNotification, getNotifications } from 'api/notification';
import { useNavigate } from 'react-router-dom';
import { NOTIFICATIONS, ACTIONS } from 'utils/constants/appConstants';
import { Avatar, Spinner, Stack, Text } from '@chakra-ui/react';
import { CONFIRM_ACTION, DELETE_ACTION, FRIEND_REQUEST_NOTIFICATION } from 'utils/constants';
import { getConversations } from 'api/chat';
import {
    CONFIRM_STATUS,
    PROJECT_INVITATION_NOTIFICATION,
    WAITING_STATUS,
} from 'utils/constants/typeConstants';

function PopoverNotification() {
    const navigate = useNavigate();
    // ========== STATE FROM REDUX ========== //
    const { notifications, isLoadingReplyNotification } = useSelector(
        (state) => state.notification
    );
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
    const handleNavigateToNotification = () => {
        navigate('/notification-management');
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
                        ? 'flex flex-col items-center max-h-[410px] p-0 m-0 overflow-y-scroll scrollbar-hide'
                        : ''
                }`}
            >
                <Stack spacing={4}>
                    <Stack spacing={2}>
                        {notifications &&
                            notifications.length > 0 &&
                            notifications.map((notification, index) => (
                                <div className="px-4 py-[16px]" key={index}>
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
                                                            return (
                                                                <div className="text-[#6f7f92] text-sm font-medium">
                                                                    <b>{notification.user?.name}</b>{' '}
                                                                    {
                                                                        NOTIFICATIONS
                                                                            .INVITED_YOU_TO_JOIN_THE[
                                                                            language
                                                                        ]
                                                                    }{' '}
                                                                    <b>
                                                                        {
                                                                            notification.metadata
                                                                                .project_name
                                                                        }
                                                                    </b>{' '}
                                                                    {
                                                                        NOTIFICATIONS.PROJECT[
                                                                            language
                                                                        ]
                                                                    }
                                                                </div>
                                                            );
                                                        case FRIEND_REQUEST_NOTIFICATION:
                                                            return (
                                                                <div className="text-[#6f7f92] text-sm font-medium">
                                                                    <b>{notification.user?.name}</b>{' '}
                                                                    {
                                                                        NOTIFICATIONS
                                                                            .SENT_YOU_A_FRIEND_REQUEST[
                                                                            language
                                                                        ]
                                                                    }
                                                                </div>
                                                            );
                                                        default:
                                                            return (
                                                                <div className="text-[#6f7f92] text-sm font-medium">
                                                                    {notification.message ||
                                                                        'New notification'}
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
                                                                switch (
                                                                    notification.metadata.status
                                                                ) {
                                                                    case WAITING_STATUS:
                                                                        return (
                                                                            <Stack
                                                                                direction="row"
                                                                                spacing={4}
                                                                            >
                                                                                <button
                                                                                    className="px-[12px] py-[8px] text-xs font-medium bg-[#2f65b9] text-white rounded-md"
                                                                                    icon={
                                                                                        <CheckOutlined />
                                                                                    }
                                                                                    onClick={() =>
                                                                                        handleReplyNotification(
                                                                                            notification._id,
                                                                                            CONFIRM_ACTION,
                                                                                            index
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        ACTIONS
                                                                                            .CONFIRM[
                                                                                            language
                                                                                        ]
                                                                                    }
                                                                                </button>
                                                                                <button
                                                                                    className="px-[12px] py-[8px] text-xs font-medium bg-[#f8f9fa] text-[#6f7f92] rounded-md"
                                                                                    danger
                                                                                    icon={
                                                                                        <CloseOutlined />
                                                                                    }
                                                                                    onClick={() =>
                                                                                        handleReplyNotification(
                                                                                            notification._id,
                                                                                            DELETE_ACTION
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        ACTIONS
                                                                                            .DELETE[
                                                                                            language
                                                                                        ]
                                                                                    }
                                                                                </button>
                                                                            </Stack>
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
                                                                    <Stack
                                                                        direction="row"
                                                                        spacing={4}
                                                                    >
                                                                        <button
                                                                            className="px-[12px] py-[8px] text-xs font-medium bg-[#2f65b9] text-white rounded-md"
                                                                            icon={<CheckOutlined />}
                                                                            onClick={() =>
                                                                                handleReplyNotification(
                                                                                    notification._id,
                                                                                    CONFIRM_ACTION,
                                                                                    index
                                                                                )
                                                                            }
                                                                        >
                                                                            {
                                                                                ACTIONS.CONFIRM[
                                                                                    language
                                                                                ]
                                                                            }
                                                                        </button>
                                                                        <button
                                                                            className="px-[12px] py-[8px] text-xs font-medium bg-[#f8f9fa] text-[#6f7f92] rounded-md"
                                                                            danger
                                                                            icon={<CloseOutlined />}
                                                                            onClick={() =>
                                                                                handleReplyNotification(
                                                                                    notification._id,
                                                                                    DELETE_ACTION
                                                                                )
                                                                            }
                                                                        >
                                                                            {
                                                                                ACTIONS.DELETE[
                                                                                    language
                                                                                ]
                                                                            }
                                                                        </button>
                                                                    </Stack>
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
            <Text
                className="flex justify-center items-center cursor-pointer text-center mx-[24px] mb-[24px]"
                onClick={() => handleNavigateToNotification()}
            >
                <span className="p-3 text-[#2f65b9] font-bold uppercase text-xs">
                    {NOTIFICATIONS.VIEW_ALL_NOTIFICATIONS[language]}
                </span>
            </Text>
        </Stack>
    );
}

export default PopoverNotification;
