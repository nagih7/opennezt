import { Image } from '@chakra-ui/react';
import React, { useState } from 'react';
import { OPENNEZT_BG_BLACK } from 'utils/constants';

const ListSort = ({ projects, handleViewProjectDetails }) => {
    // ========== STATE ========== //
    const [imageError, setImageError] = useState(false);

    // ========== RENDER ========== //
    return (
        <ul className="flex flex-col w-full gap-6 pl-0 mt-4">
            {projects.map((project, index) => (
                <li
                    onClick={() => handleViewProjectDetails(project)}
                    key={index}
                    className="overflow-hidden rounded-sm cursor-pointer group"
                >
                    <div className="bg-white flex items-center p-4 2xl:w-[68rem]pt-3 w-full">
                        <div className="relative w-[16rem] h-[10rem] rounded-md overflow-hidden group">
                            {!imageError ? (
                                <Image
                                    className="object-cover absolute w-[16rem] h-[10rem]!transition-transform !duration-500 !transform !origin-center !ease-out !group-hover:scale-110 "
                                    src={project.background}
                                    alt={project.name}
                                    onError={setImageError(true)}
                                />
                            ) : (
                                <div className="object-cover absolute w-[16rem] h-[10rem] flex items-center justify-center px-8">
                                    <Image src={OPENNEZT_BG_BLACK} alt={project.name} />
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col justify-center ml-4">
                            <div className="flex">
                                <p className="bg-[#EAEFF8] p-1 rounded-sm text-[#737F92] text-xs md:text-[0.85rem] font-semibold mr-4">
                                    {project.stage.name}
                                </p>
                                <p className="text-xs font-semibold md:text-sm">
                                    By{' '}
                                    <span className="font-semibold text-blue-600">
                                        {project.user.name}
                                    </span>
                                </p>
                            </div>

                            <h5 className="text-base md:text-[0.95rem] font-semibold text-gray-900 mt-2 whitespace-normal break-words leading-[1.3rem]">
                                {project.name}
                            </h5>
                            <div className="flex items-center mt-3 text-xs text-gray-600 md:text-sm">
                                <p className="mr-4 text-xs text-nowrap">
                                    📖 {project.articles?.length} Posts
                                </p>
                                <p className="text-xs text-nowrap">
                                    👨‍🎓 {project.members.length} Members
                                </p>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default ListSort;
