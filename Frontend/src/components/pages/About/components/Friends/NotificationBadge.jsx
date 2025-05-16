import React from 'react'

export default function NotificationBadge({ count }) {
    return (
        <span className={`text-[1rem] font-medium text-black`}>
            {(() => {
                switch (count) {
                    case 0:
                        return null
                    case count > 99:
                        return (
                            <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -top-0 -right-1">
                                99+
                            </span>
                        )
                    default:
                        return (
                            <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -top-0 -right-1">
                                {count}
                            </span>
                        )
                }
            })()}
        </span>
    )
}
