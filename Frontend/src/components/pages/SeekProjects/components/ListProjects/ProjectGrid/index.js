import { Image } from '@chakra-ui/react'
import React, { useState } from 'react'
import { OPENNEZT_BG_BLACK } from 'utils/constants'

const ProjectGrid = ({ project, handleViewProjectDetails }) => {
    // ========== STATE ========== //
    const [imageError, setImageError] = useState(false)

    // ========== RENDER ========== //
    return (
        <div
            onClick={() => handleViewProjectDetails(project)}
            className="overflow-hidden rounded-sm cursor-pointer group"
        >
            <div className="w-full max-w-lg h-[360px] mx-auto bg-white rounded-[0.2rem]">
                <div className="relative flex items-center justify-center w-full h-48 overflow-hidden mx-autorounded-md group">
                    {!imageError ? (
                        <Image
                            overflow-hidden
                            rounded-sm
                            cursor-pointer
                            group
                            aspectRatio={16 / 9}
                            className="object-cover absolute w-full h-auto transition-transform !duration-500 !transform !origin-center !ease-out !group-hover:scale-110"
                            src={project?.background}
                            alt={project?.name}
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="absolute flex items-center justify-center object-cover w-full h-full">
                            <Image src={OPENNEZT_BG_BLACK} alt={project?.name} className='w-full h-full object-cover' />
                        </div>
                    )}
                </div>
                <div className="relative p-4 top-[-3rem] 2xl:top-[-0.75rem]">
                    <div className="flex items-center justify-between">
                        <p className="bg-[#EAEFF8] p-1 rounded-sm text-[#737F92] text-xs md:text-[0.85rem] font-semibold">
                            {project.stage?.name}
                        </p>
                        <p className="text-xs font-semibold md:text-sm">
                            By <span className="font-semibold text-blue-600">{project?.user?.name}</span>
                        </p>
                    </div>

                    <h5 className="text-base md:text-[0.95rem] font-semibold text-gray-900 mt-2 whitespace-normal break-words leading-[1.3rem]">
                        {project.name}
                    </h5>
                    <div className="flex items-center justify-between mt-3 text-xs text-gray-600 md:text-sm">
                        <p className="text-xs text-nowrap">📖 {project.articles?.length} Posts</p>
                        <p className="text-xs text-nowrap">👨‍🎓 {project.members?.length} Members</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectGrid
