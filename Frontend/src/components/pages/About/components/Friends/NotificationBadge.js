import { useState, useEffect } from "react";
import React from "react";

export default function NotificationBadge({ label = "Request", count = 0, onClick, isActive }) {
    const [notificationCount, setNotificationCount] = useState(count);

    useEffect(() => {
        setNotificationCount(count);
    }, [count]);

    const handleClick = () => {
        setNotificationCount(0);
        if (onClick) onClick();
    };

    return (
        <button
            onClick={handleClick}
            className={`text-[1rem] font-medium ${isActive ? "text-black" : "text-gray-400"} relative`}
        >
            <span>{label}</span>
            {notificationCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {notificationCount}
                </span>
            )}
        </button>
    );
}
