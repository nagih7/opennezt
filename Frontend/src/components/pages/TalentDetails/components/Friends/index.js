import React, { useState, useEffect } from 'react'
import RightSidebar from 'components/common/RightSidebar'
import NotificationBadge from './NotificationBadge'
import { IconlyDelete } from 'components/UI/Iconly'
import { message } from 'antd'
const Friends = () => {
    const [activeTab, setActiveTab] = useState('Friendships')
    const [orderBy, setOrderBy] = useState('Last Active')

    const friendsList = [
        {
            id: 1,
            name: 'Jenny Wilson',
            username: '@jenny',
            avatar: 'https://i.pravatar.cc/50?img=1',
            verified: true,
            lastActive: '16 hours ago',
            timestamp: 1610000000,
        },
        {
            id: 2,
            name: 'Darlin Robertson',
            username: '@darlin',
            avatar: 'https://i.pravatar.cc/50?img=2',
            verified: false,
            lastActive: 'a day ago',
            timestamp: 1609000000,
        },
    ]

    const friendRequests = [
        {
            id: 3,
            name: 'John Doe',
            username: '@john',
            avatar: 'https://i.pravatar.cc/50?img=3',
            verified: false,
            lastActive: '2 days ago',
            timestamp: 1608000000,
        },
        {
            id: 4,
            name: 'Alice Smith',
            username: '@alice',
            avatar: 'https://i.pravatar.cc/50?img=4',
            verified: true,
            lastActive: '5 hours ago',
            timestamp: 1620000000,
        },
    ]

    const [friends, setFriendsList] = useState(friendsList)
    const [Requests, setFriendRequests] = useState(friendRequests)

    const sortList = (list) => {
        return [...list].sort((a, b) => {
            if (orderBy === 'Newest') return b.timestamp - a.timestamp
            if (orderBy === 'Oldest') return a.timestamp - b.timestamp
            return b.lastActive.localeCompare(a.lastActive)
        })
    }

    const sortedFriends = sortList(friends)
    const sortedRequests = sortList(Requests)
    const displayList = activeTab === 'Friendships' ? sortedFriends : sortedRequests

    const handleAcceptRequest = (user) => {
        setFriendsList((prevFriends) => sortList([...prevFriends, user]))
        setFriendRequests((prevRequests) => prevRequests.filter((req) => req.id !== user.id))
        message.success('Accept successfully')
    }

    const handleDeleteRequest = (user) => {
        setFriendRequests((prevRequests) => prevRequests.filter((req) => req.id !== user.id))
        message.success('Delete successfully')
    }

    return (
        <div className="flex gap-3">
            <div className="w-10/12">
                <div className="flex justify-between items-center pb-2 bg-white h-[5.25rem]">
                    <div className="flex space-x-6 ml-10">
                        <button
                            onClick={() => setActiveTab('Friendships')}
                            className={`text-[1rem] font-medium ${
                                activeTab === 'Friendships' ? 'text-black' : 'text-gray-400'
                            }`}
                        >
                            Friendships
                        </button>

                        <NotificationBadge
                            label="Request"
                            count={Requests.length}
                            onClick={() => setActiveTab('Request')}
                            isActive={activeTab === 'Request'}
                        />
                    </div>

                    <div className="flex items-center space-x-2 mr-6">
                        <span className="text-[1rem] text-gray-500">Order By:</span>
                        <select
                            className="text-sm font-medium text-gray-600 bg-transparent outline-none border border-[#F3F3F3] w-[10rem] h-[2rem] rounded-sm"
                            value={orderBy}
                            onChange={(e) => setOrderBy(e.target.value)}
                        >
                            <option value="Last Active">Last Active</option>
                            <option value="Newest">Newest</option>
                            <option value="Oldest">Oldest</option>
                        </select>
                    </div>
                </div>

                <div className="mt-5">
                    <div className="bg-white rounded-lg p-6">
                        <h4 className="text-lg font-semibold mb-4">
                            {activeTab === 'Friendships'
                                ? `Friends (${friends.length})`
                                : `Requests (${Requests.length})`}
                        </h4>
                        <hr className="mb-4" />

                        {displayList.map((user) => (
                            <div
                                key={user.id}
                                className="flex justify-between items-center bg-gray-100 rounded-lg p-4 mb-3"
                            >
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="w-[4.5rem] h-[4.5rem] rounded-full"
                                    />
                                    <div>
                                        <div className="flex items-center space-x-1">
                                            <span className="font-medium">{user.name}</span>
                                            {user.verified && <span className="text-blue-500">✅</span>}
                                        </div>
                                        <span className="text-gray-500 text-sm">{user.username}</span>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <span className="text-gray-500 text-sm">{user.lastActive}</span>
                                    {activeTab === 'Request' ? (
                                        <>
                                            <button className="text-lg">
                                                <svg
                                                    onClick={() => handleAcceptRequest(user)}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="text-green-500"
                                                    fill="currentColor"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
                                                </svg>
                                            </button>
                                            <button onClick={() => handleDeleteRequest(user)} className="text-lg">
                                                <IconlyDelete size={23} color={'#FF0000'} />
                                            </button>
                                        </>
                                    ) : (
                                        <button className="text-blue-500 text-lg">✉️</button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <RightSidebar />
        </div>
    )
}

export default Friends
