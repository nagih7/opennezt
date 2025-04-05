import React from 'react';
import { useSelector } from 'react-redux';
import { NOTIFICATIONS } from 'utils/constants';

const FriendRequestNotification = ({ notification }) => {
    const { language } = useSelector((state) => state.app);

    return (
        <div className={` ${notification.metadata?.read === true ? ("text-[#6f7f92]") : ("text-black")} text-sm font-medium`}
        >
            <b>{notification.user?.name}</b> {NOTIFICATIONS.SENT_YOU_A_FRIEND_REQUEST[language]}

        </div>
    );
};

export default FriendRequestNotification;
