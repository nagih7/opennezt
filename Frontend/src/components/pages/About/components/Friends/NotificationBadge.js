import React from "react";
import { useState } from "react";
const NotificationBadge = ({ label = "Request", count = friendRequests.length, onClick, isActive }) => {
    const [counts, setCount] = useState(count);

    const handleClick = () => {
        setCount(0);
        if (onClick) onClick();
    };
    const friendRequests = [
        {
            id: 3,
            name: "John Doe",
            username: "@john",
            avatar: "https://i.pravatar.cc/50?img=3",
            verified: false,
            lastActive: "2 days ago",
        },
        {
            id: 4,
            name: "Alice Smith",
            username: "@alice",
            avatar: "https://i.pravatar.cc/50?img=4",
            verified: true,
            lastActive: "5 hours ago",
        },
    ];
    return (
        <button
            onClick={handleClick}
            className={`text-[1rem] font-medium ${isActive ? "text-black" : "text-gray-400"} relative`}
        >
            <span>{label}</span>
            {counts > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {counts}
                </span>
            )}
        </button>
    );
}
export default NotificationBadge