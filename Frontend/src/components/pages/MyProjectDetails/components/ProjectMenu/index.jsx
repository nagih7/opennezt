import {
    IconlyActivity,
    IconlyChat,
    IconlyDocument,
    IconlyHome,
    IconlyImage2,
    IconlySend,
    IconlyUser,
} from 'components/UI/Iconly';
import React, { useState } from 'react';

const ProjectMenu = ({ setTab }) => {
    const [activeTab, setActiveTab] = useState('overview');

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
        setTab(tabName);
    };

    return (
        <div className="w-full px-[16px] pt-8">
            <div className="px-4 bg-[#ffffff] rounded-md ">
                <ul className="flex items-center 2xl:max-w-full max-w-[1170px] p-0 m-0 overflow-x-scroll scrollbar-hide">
                    <li className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6] bg-[#ffffff]">
                        <span
                            className={`no-underline mx-[60px] w-12 h-12 rounded-md flex justify-center items-center gap-2 cursor-pointer ${
                                activeTab === 'overview' ? 'bg-[#4374c0]' : 'bg-[#f8f9fa]'
                            }`}
                            onClick={() => handleTabClick('overview')}
                        >
                            <IconlyHome
                                size={20}
                                color={activeTab === 'overview' ? '#ffffff' : '#6f7f92'}
                            />
                        </span>
                        <span
                            className={`text-sm font-medium ${
                                activeTab === 'overview' ? 'text-[#4374c0]' : 'text-[#6f7f92]'
                            }`}
                        >
                            Home
                        </span>
                    </li>
                    <li className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6] bg-[#ffffff]">
                        <span
                            className={`no-underline mx-[60px] w-12 h-12 rounded-md flex justify-center items-center gap-2 cursor-pointer ${
                                activeTab === 'forum' ? 'bg-[#4374c0]' : 'bg-[#f8f9fa]'
                            }`}
                            onClick={() => handleTabClick('forum')}
                        >
                            <IconlyDocument
                                size={20}
                                color={activeTab === 'forum' ? '#ffffff' : '#6f7f92'}
                            />
                        </span>
                        <span
                            className={`text-sm font-medium ${
                                activeTab === 'forum' ? 'text-[#4374c0]' : 'text-[#6f7f92]'
                            }`}
                        >
                            Forum
                        </span>
                    </li>
                    <li className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6] bg-[#ffffff]">
                        <span
                            className={`no-underline mx-[60px] w-12 h-12 rounded-md flex justify-center items-center gap-2 cursor-pointer ${
                                activeTab === 'members' ? 'bg-[#4374c0]' : 'bg-[#f8f9fa]'
                            }`}
                            onClick={() => handleTabClick('members')}
                        >
                            <IconlyUser
                                size={20}
                                color={activeTab === 'members' ? '#ffffff' : '#6f7f92'}
                            />
                        </span>
                        <span
                            className={`text-sm font-medium ${
                                activeTab === 'members' ? 'text-[#4374c0]' : 'text-[#6f7f92]'
                            }`}
                        >
                            Members
                        </span>
                    </li>
                    <li className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6] bg-[#ffffff]">
                        <span
                            className={`no-underline mx-[60px] w-12 h-12 rounded-md flex justify-center items-center gap-2 cursor-pointer ${
                                activeTab === 'invite' ? 'bg-[#4374c0]' : 'bg-[#f8f9fa]'
                            }`}
                            onClick={() => handleTabClick('invite')}
                        >
                            <IconlySend
                                size={20}
                                color={activeTab === 'invite' ? '#ffffff' : '#6f7f92'}
                            />
                        </span>
                        <span
                            className={`text-sm font-medium ${
                                activeTab === 'invite' ? 'text-[#4374c0]' : 'text-[#6f7f92]'
                            }`}
                        >
                            Send Invites
                        </span>
                    </li>
                    <li className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6] bg-[#ffffff]">
                        <span
                            className={`no-underline mx-[60px] w-12 h-12 rounded-md flex justify-center items-center gap-2 cursor-pointer ${
                                activeTab === 'media' ? 'bg-[#4374c0]' : 'bg-[#f8f9fa]'
                            }`}
                            onClick={() => handleTabClick('media')}
                        >
                            <IconlyImage2
                                size={20}
                                color={activeTab === 'media' ? '#ffffff' : '#6f7f92'}
                            />
                        </span>
                        <span
                            className={`text-sm font-medium ${
                                activeTab === 'media' ? 'text-[#4374c0]' : 'text-[#6f7f92]'
                            }`}
                        >
                            Media
                        </span>
                    </li>
                    <li className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6] bg-[#ffffff]">
                        <span
                            className={`no-underline mx-[60px] w-12 h-12 rounded-md flex justify-center items-center gap-2 cursor-pointer ${
                                activeTab === 'messages' ? 'bg-[#4374c0]' : 'bg-[#f8f9fa]'
                            }`}
                            onClick={() => handleTabClick('messages')}
                        >
                            <IconlyChat
                                size={20}
                                color={activeTab === 'messages' ? '#ffffff' : '#6f7f92'}
                            />
                        </span>
                        <span
                            className={`text-sm font-medium ${
                                activeTab === 'messages' ? 'text-[#4374c0]' : 'text-[#6f7f92]'
                            }`}
                        >
                            Messages
                        </span>
                    </li>
                    <li className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6] bg-[#ffffff]">
                        <span
                            className={`no-underline mx-[60px] w-12 h-12 rounded-md flex justify-center items-center gap-2 cursor-pointer ${
                                activeTab === 'manage' ? 'bg-[#4374c0]' : 'bg-[#f8f9fa]'
                            }`}
                            onClick={() => handleTabClick('manage')}
                        >
                            <IconlyActivity
                                size={20}
                                color={activeTab === 'manage' ? '#ffffff' : '#6f7f92'}
                            />
                        </span>
                        <span
                            className={`text-sm font-medium ${
                                activeTab === 'manage' ? 'text-[#4374c0]' : 'text-[#6f7f92]'
                            }`}
                        >
                            Manage
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ProjectMenu;
