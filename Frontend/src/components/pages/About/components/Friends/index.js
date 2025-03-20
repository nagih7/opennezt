import React from "react"
import RightSidebar from "components/common/RightSidebar";
import { useState } from "react";
const Friends = () => {
    const [activeTab, setActiveTab] = useState("Friendships");
    const [orderBy, setOrderBy] = useState("Last Active");
    const friendsList = [
        {
            id: 1,
            name: "Jenny Wilson",
            username: "@jenny",
            avatar: "https://i.pravatar.cc/50?img=1",
            verified: true,
            lastActive: "16 hours ago",
        },
        {
            id: 2,
            name: "Darlin Robertson",
            username: "@darlin",
            avatar: "https://i.pravatar.cc/50?img=2",
            verified: false,
            lastActive: "a day ago",
        },
    ];
    return (<>
        <div className="flex gap-8">
            <div className="w-10/12">
                <div className="flex justify-between items-center  pb-2 bg-white h-[5.25rem]">
                    {/* Tabs */}

                    <div className="flex space-x-6 ml-10">
                        <button
                            onClick={() => setActiveTab("Friendships")}
                            className={`text-sm font-medium ${activeTab === "Friendships" ? "text-black border-b-2 border-black" : "text-gray-400"}`}
                        >
                            Friendships
                        </button>

                        <button
                            onClick={() => setActiveTab("Request")}
                            className={`text-sm font-medium ${activeTab === "Request" ? "text-black border-b-2 border-black" : "text-gray-400"}`}
                        >
                            Request
                        </button>
                    </div>



                    {/* Order By Dropdown */}
                    <div className="flex items-center space-x-2 mr-6">
                        <span className="text-sm text-gray-500">Order By:</span>
                        <select
                            className="text-sm font-medium text-gray-600 bg-transparent outline-none border-1 border-[#F3F3F3] w-[10rem] h-[2rem] rounded-sm"
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
                    <div className="bg-white rounded-lg  p-6">
                        <h4 className="text-lg font-semibold mb-4">Friends ({friendsList.length})</h4>
                        <hr className="mb-4" />

                        {friendsList.map((friend) => (
                            <div
                                key={friend.id}
                                className="flex justify-between items-center bg-gray-100 rounded-lg p-4 mb-3"
                            >
                                {/* Avatar + Name */}
                                <div className="flex items-center space-x-4">
                                    <img src={friend.avatar} alt={friend.name} className="w-[4.5rem] h-[4.5rem] rounded-full" />
                                    <div>
                                        <div className="flex items-center space-x-1">
                                            <span className="font-medium">{friend.name}</span>
                                            {friend.verified && <span className="text-blue-500">✅</span>}
                                        </div>
                                        <span className="text-gray-500 text-sm">{friend.username}</span>
                                    </div>
                                </div>

                                {/* Last Active + Message Icon */}
                                <div className="flex items-center space-x-4">
                                    <span className="text-gray-500 text-sm">{friend.lastActive}</span>
                                    <button className="text-blue-500 text-lg">✉️</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <RightSidebar />
        </div>
    </>)
}
export default Friends