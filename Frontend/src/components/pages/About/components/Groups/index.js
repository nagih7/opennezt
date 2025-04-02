import React from "react"
import { Tabs } from '@chakra-ui/react'
import RightSidebar from "components/common/RightSidebar"
import { FaRegFileAlt, FaUsers } from "react-icons/fa"
import { Button } from "antd"
import { IconlyDelete } from "components/UI/Iconly"
const Groups = () => {
    const groups = [
        {
            id: 1,
            name: "Wombo Combo",
            avatar: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/group-avatars/37/1656670311-bpfull.jpg",
            background: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/buddypress/groups/37/cover-image/62be9d9987b5a-bp-cover-image.jpg",
            posts: 0,
            members: 9,
            memberAvatars: [
                "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/1/1696595070-bpthumb.jpg",
                "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/1/1696595070-bpthumb.jpg",
                "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/1/1696595070-bpthumb.jpg",
                "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/1/1696595070-bpthumb.jpg",
                "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/1/1696595070-bpthumb.jpg"
            ]
        },
        {
            id: 2,
            name: "Tech Enthusiasts",
            avatar: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/group-avatars/37/1656670311-bpfull.jpg",
            background: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/buddypress/groups/37/cover-image/62be9d9987b5a-bp-cover-image.jpg",
            posts: 15,
            members: 23,
            memberAvatars: [
                "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/1/1696595070-bpthumb.jpg",
                "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/1/1696595070-bpthumb.jpg",
                "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/1/1696595070-bpthumb.jpg",
                "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/1/1696595070-bpthumb.jpg",
                "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/1/1696595070-bpthumb.jpg"
            ]
        },
        {
            id: 1,
            name: "Wombo Combo",
            avatar: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/group-avatars/37/1656670311-bpfull.jpg",
            background: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/buddypress/groups/37/cover-image/62be9d9987b5a-bp-cover-image.jpg",
            posts: 0,
            members: 9,
            memberAvatars: [
                "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/1/1696595070-bpthumb.jpg",
                "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/1/1696595070-bpthumb.jpg",
                "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/1/1696595070-bpthumb.jpg",
                "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/1/1696595070-bpthumb.jpg",
                "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/1/1696595070-bpthumb.jpg"
            ]
        },
        {
            id: 2,
            name: "Tech Enthusiasts",
            avatar: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/group-avatars/37/1656670311-bpfull.jpg",
            background: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/buddypress/groups/37/cover-image/62be9d9987b5a-bp-cover-image.jpg",
            posts: 15,
            members: 23,
            memberAvatars: [
                "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/1/1696595070-bpthumb.jpg",
                "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/1/1696595070-bpthumb.jpg",
                "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/1/1696595070-bpthumb.jpg",
                "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/1/1696595070-bpthumb.jpg",
                "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/1/1696595070-bpthumb.jpg"
            ]
        }
    ];
    const Invitations = [{
        id: 1,
        name: "Nguyen Quoc Cuong",
        groups: "Hoi nhung nguoi dam me AI",
        avatar: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/group-avatars/37/1656670311-bpfull.jpg"
    }]
    return (<>
        <div className="flex gap-8">
            <div className="w-10/12">
                <Tabs.Root className="h-4" defaultValue="Memberships">
                    <div className="2xl:w-full w-full">
                        <Tabs.List>
                            <div className="flex justify-between bg-white  p-4 font-bold w-full">
                                <div className='flex'>
                                    <Tabs.Trigger className="text-black" value="Memberships">
                                        Memberships
                                    </Tabs.Trigger>
                                    <Tabs.Trigger className="text-black" value="Invitations">
                                        Invitations
                                    </Tabs.Trigger>
                                </div>

                                <div className="flex items-center space-x-2 2xl:ml-[31.5rem] ">
                                    <span className="text-black ">Order By:</span>
                                    <select className="text-sm font-medium text-gray-600 bg-transparent outline-none border border-[#F3F3F3] w-[10rem] h-[2rem] rounded-sm">
                                        <option value="Last Active">Last Active</option>
                                        <option value="Most Members">Most Members</option>
                                        <option value="Newly Created">Newly Created</option>
                                    </select>
                                </div>
                            </div>
                        </Tabs.List>
                        <div className="mt-5 bg-white ">
                            <Tabs.Content value="Memberships">
                                <>
                                    <div className="bg-white rounded-lg p-6">
                                        <h4 className="text-lg font-semibold mb-4">Groups({groups.length})</h4>
                                        <hr className="mb-4" />
                                        <div className="flex flex-wrap gap-6">
                                            {groups.map((group) => (
                                                <div key={group.id} className="bg-white  rounded-xl  w-[21rem] h-[24.5rem] text-center border">

                                                    <div className=" w-full h-28 bg-gradient-to-r from-blue-500 to-indigo-700">
                                                        <img
                                                            src={group.background}
                                                            alt="Background"
                                                            className=" inset-0 w-full h-full object-cover"
                                                        />
                                                    </div>


                                                    <div className="relative -mt-12 flex justify-center mb-3">
                                                        <img
                                                            src={group.avatar}
                                                            alt="Group Avatar"
                                                            className="w-16 h-16 rounded-lg border-4 border-white shadow-md"
                                                        />
                                                    </div>


                                                    <h3 className="text-center text-lg font-semibold mt-2">{group.name}</h3>


                                                    <div className="flex justify-center items-center gap-4 text-gray-500 text-sm mt-1">
                                                        <div className="flex items-center gap-1">
                                                            <FaRegFileAlt /> <span>{group.posts} Posts</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <FaUsers /> <span>Members {group.members}</span>
                                                        </div>
                                                    </div>
                                                    <hr />


                                                    <div className="flex justify-center mt-4">
                                                        <div className="flex justify-center -space-x-5">
                                                            {group.memberAvatars.map((avatar, i) => (
                                                                <img
                                                                    key={i}
                                                                    src={avatar}
                                                                    alt="Member"
                                                                    className="w-10 h-10 rounded-full border border-white mt-6 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-125 hover:z-10 hover:shadow-lg"
                                                                />
                                                            ))}
                                                            <div className="w-10 h-10 rounded-full border border-white mt-6 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-125 hover:z-10 hover:shadow-lg bg-blue-600 text-white pt-1">
                                                                +
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Leave Group Button */}
                                                    <div className="mt-6 flex justify-center">
                                                        <Button className="bg-[#F8EAEA] text-red-500 font-bold px-6 py-2 rounded-lg shadow-md hover:!bg-[#F14646] hover:!text-white">
                                                            LEAVE GROUP
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            </Tabs.Content>

                            <Tabs.Content value="Invitations">
                                <>
                                    <div className="p-4">
                                        {Invitations.length === 0 ? (
                                            <div className="bg-[#E3F1F6] p-3 border-l-2 border-[#0098CB] text-[#1599CC]">
                                                You have no outstanding group invites.
                                            </div>
                                        ) : (
                                            <>
                                                <div className="">
                                                    <div className="bg-white rounded-lg ">
                                                        <h4 className="text-lg font-semibold mb-4">
                                                            Invitations({Invitations.length})
                                                        </h4>
                                                        <hr className="mb-4" />

                                                        {Invitations.map((invite) => (
                                                            <div key={invite.id} className="flex justify-between items-center bg-white border rounded-lg p-4 mb-3">
                                                                <div className="flex items-center space-x-4">
                                                                    <img src={invite.avatar} alt={invite.name} className="w-[4.5rem] h-[4.5rem] rounded-full" />

                                                                    <div className="flex items-center space-x-1">
                                                                        <p>  <span className="font-medium text-lg">{invite.name}</span>  invite you to group <span className="font-medium text-lg">{invite.groups}</span></p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex space-x-4">
                                                                    <Button className="bg-blue-500 text-white hover:!bg-blue-400 hover:!text-white font-bold">Accept</Button>
                                                                    <Button className="bg-[#F4F5F6] font-bold">Delete</Button>
                                                                </div>


                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                    </div>

                                </>
                            </Tabs.Content>

                        </div>
                    </div>
                </Tabs.Root>
            </div>
            <RightSidebar />
        </div>
    </>)
}
export default Groups