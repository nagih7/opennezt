import React from 'react';
import { useSelector } from 'react-redux';
import { NOTIFICATIONS } from 'utils/constants';

const FriendRequestNotification = ({ notification }) => {
    const { language } = useSelector((state) => state.app);

    return (
        <div className={` ${notification.metadata?.read === true ? ("text-[#6f7f92]") : ("text-black")} text-sm font-medium`}
        >
            <b>{notification.user?.name}</b> {NOTIFICATIONS.SENT_YOU_A_FRIEND_REQUEST[language]}
            {notification.metadata?.read === false ? (
                <span className="inline-block w-3 h-3 rounded-full bg-blue-400 ml-2"></span>
            ) : (
                <></>
            )}
        </div>
    );
};

export default FriendRequestNotification;
