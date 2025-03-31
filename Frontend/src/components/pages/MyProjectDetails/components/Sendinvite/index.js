import React, { useState } from "react"
import { Tabs } from '@chakra-ui/react';
import { IconlyCalendar, IconlyLocation, IconlyMessage, IconlySearch } from "components/UI/Iconly";
import ProjectActivity from "../ProjectActivity";
const Sendinvite = () => {
    const friendsData = [
        {
            id: 1,
            name: "Jerome Bell",
            location: "San Jose",
            lastActive: "2 days ago",
            status: "friend",
            avatar: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/29/1742357406-bpfull.jpg",

        },
        {
            id: 2,
            name: "Jerome Bell",
            location: "San Jose",
            lastActive: "2 days ago",
            status: "friend",
            avatar: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/29/1742357406-bpfull.jpg",

        },
    ];
    const [friends, setFriends] = useState(friendsData);
    return (<>
        <div className="w-full h-full">
            <div className="px-[16px]">
                <div className="flex w-full gap-8">
                    <div className="w-10/12 mt-8">
                        <div className="p-8 bg-[#ffffff] rounded-md">
                            <div className="flex justify-between items-center border-[1px] rounded-md caret-[#2f65b9] bg-[#f8f9fa] pl-[15px]">
                                <input
                                    type="text"
                                    placeholder="Search Friends..."
                                    className="bg-[#f8f9fa] outline-none h-8 w-full rounded-md text-xs font-medium text-black"
                                />
                                <button className="flex items-center justify-center bg-[#2f65b9] rounded-md w-11 h-10">
                                    <IconlySearch
                                        size={14}
                                        color={"#ffffff"}
                                        className="text-gray-400"
                                    />
                                </button>
                            </div>
                        </div>
                        <div className="mt-8">
                            <Tabs.Root className="h-4" defaultValue="All Friends">
                                <div className="2xl:w-full w-full">
                                    <Tabs.List>
                                        <div className="flex justify-between bg-white  p-4 font-bold w-full">
                                            <div className='flex'>
                                                <Tabs.Trigger className="text-black" value="All Friends">
                                                    All Friends
                                                </Tabs.Trigger>

                                            </div>

                                            <div className="flex items-center space-x-2 2xl:ml-[31.5rem] ">
                                                <span className="text-black ">Show By:</span>
                                                <select className="text-sm font-medium text-gray-600 bg-transparent outline-none border border-[#F3F3F3] w-[10rem] h-[2rem] rounded-sm">
                                                    <option value="Last Active">Last Active</option>
                                                    <option value="Newest Registered">Newest Registered</option>
                                                    <option value="Alphabetical">Alphabetical</option>
                                                </select>
                                            </div>
                                        </div>
                                    </Tabs.List>
                                    <div className=" bg-white ">
                                        <Tabs.Content value="All Friends">
                                            <div className=" mx-auto p-4">

                                                {friends.map((friend) => (
                                                    <div
                                                        key={friend.id}
                                                        className="flex items-center justify-between bg-[#F8F9FA] p-4 mb-2 rounded-lg "
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <img
                                                                src={friend.avatar}
                                                                alt={friend.name}
                                                                className="w-20 h-20 rounded-full"
                                                            />
                                                            <div>
                                                                <h3 className="font-semibold">{friend.name}</h3>
                                                                <div className="flex">
                                                                    <p className="text-sm text-gray-500 flex"><IconlyLocation size={20} color={"#9BA8B1"} />{friend.location}  </p>
                                                                    <p className="text-sm text-gray-500 flex ml-4"><IconlyCalendar size={20} color={"#9BA8B1"} />  {friend.lastActive}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {friend.status === "friend" && (
                                                            <div className="flex">
                                                                <button
                                                                    className="bg-blue-600 text-white px-2 py-1 rounded mr-4 font-bold"
                                                                >
                                                                    Invite to project
                                                                </button>
                                                                <button><IconlyMessage size={20} color={"#9BA8B1"} /></button>
                                                            </div>
                                                        )}

                                                    </div>
                                                ))}
                                            </div>
                                        </Tabs.Content>
                                    </div>
                                </div>
                            </Tabs.Root>
                        </div>
                    </div>
                    <div className="w-4/12 mt-8">
                        {/* ProjectActivity */}
                        <ProjectActivity />
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default Sendinvite
