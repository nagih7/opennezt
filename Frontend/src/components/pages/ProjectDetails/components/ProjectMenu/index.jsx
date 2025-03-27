import {
    IconlyActivity,
    IconlyChat,
    IconlyDocument,
    IconlyHome,
    IconlyImage2,
    IconlySend,
    IconlySetting,
    IconlyUser,
} from 'components/UI/Iconly';
import React from 'react';
import { Link } from 'react-router-dom';

const ProjectMenu = () => {
    return (
        <div className="px-4 bg-[#ffffff] w-full rounded-md my-8">
            <ul className="flex items-center 2xl:max-w-full max-w-[1170px] p-0 m-0 overflow-x-scroll scrollbar-hide">
                <li className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]">
                    <Link
                        to={'/projects/details/:id'}
                        className="no-underline bg-[#f8f9fa] mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2"
                    >
                        <IconlyHome size={20} color={'#6f7f92'} />
                    </Link>
                    <span className="text-[#6f7f92] text-sm font-medium">Home</span>
                </li>
                <li className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]">
                    <a
                        href="#"
                        className="no-underline bg-[#f8f9fa] mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2"
                    >
                        <IconlyDocument size={20} color={'#6f7f92'} />
                    </a>
                    <span className="text-[#6f7f92] text-sm font-medium">Forum</span>
                </li>
                <li className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]">
                    <Link
                        to={'/project/details/members'}
                        className="no-underline bg-[#f8f9fa] mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2"
                    >
                        <IconlyUser size={20} color={'#6f7f92'} />
                    </Link>
                    <span className="text-[#6f7f92] text-sm font-medium">Members</span>
                </li>
                <li className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]">
                    <a
                        href="#"
                        className="no-underline bg-[#f8f9fa] mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2"
                    >
                        <IconlySend size={20} color={'#6f7f92'} />
                    </a>
                    <span className="text-[#6f7f92] text-sm font-medium">Send Invites</span>
                </li>

                <li className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]">
                    <a
                        href="#"
                        className="no-underline bg-[#f8f9fa] mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2"
                    >
                        <IconlyImage2 size={20} color={'#6f7f92'} />
                    </a>
                    <span className="text-[#6f7f92] text-sm font-medium">Media</span>
                </li>
                <li className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]">
                    <a
                        href="#"
                        className="no-underline bg-[#f8f9fa] mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2"
                    >
                        <IconlyChat size={20} color={'#6f7f92'} />
                    </a>
                    <span className="text-[#6f7f92] text-sm font-medium">Messages</span>
                </li>
                <li className="flex flex-col items-center gap-3 py-[40px] px-[8px] ">
                    <Link
                        to={'/project/details/setting'}
                        className="no-underline bg-[#f8f9fa] mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2"
                    >
                        <IconlyActivity size={20} color={'#6f7f92'} />
                    </Link>
                    <span className="text-[#6f7f92] text-sm font-medium">Manage</span>
                </li>

                {/* <li className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]">
                          <a
                            href="#"
                            className="no-underline bg-[#f8f9fa] mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2"
                          >
                            <IconlyBookmark size={20} color={"#6f7f92"} />
                          </a>
                          <span className="text-[#6f7f92] text-sm font-medium">Badges</span>
                        </li>
                        <li className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]">
                          <a
                            href="#"
                            className="no-underline bg-[#f8f9fa] mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2"
                          >
                            <IconlyDocument size={20} color={"#6f7f92"} />
                          </a>
                          <span className="text-[#6f7f92] text-sm font-medium">
                            Courses
                          </span>
                        </li> */}
            </ul>
        </div>
    );
};

export default ProjectMenu;
