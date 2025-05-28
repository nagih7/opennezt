import { Image } from '@chakra-ui/react'
import { useState } from 'react'
import { Project } from 'types'
import { OPENNEZT_LOGO_GRADIENT } from 'utils/constants'

interface ProjectListProps {
    project: Project;
    handleViewProjectDetails: (project: Project) => void;
}

const ProjectList = ({ project, handleViewProjectDetails }: ProjectListProps) => {
    // ========== STATE ========== //
    const [imageError, setImageError] = useState<boolean>(false)

    // ========== RENDER ========== //
    return (
        <li
            onClick={() => handleViewProjectDetails(project)}
            className="overflow-hidden rounded-sm cursor-pointer group"
        >
            <div className="bg-white flex items-center p-4 2xl:w-[68rem]pt-3 w-full">                <div className="relative w-[16rem] h-[10rem] rounded-md overflow-hidden group">
                {!imageError && project.background ? (
                    <Image
                        aspectRatio={16 / 9}
                        className="object-cover absolute w-full h-full bg-cover !transition-transform !duration-500 !transform !origin-center !ease-out !group-hover:scale-110"
                        src={project.background}
                        alt={project.name}
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <Image
                        aspectRatio={16 / 9}
                        src={OPENNEZT_LOGO_GRADIENT}
                        alt={project.name}
                        className="object-contain w-full h-full bg-cover"
                    />
                )}
            </div>

                <div className="flex flex-col justify-center ml-4">
                    <div className="flex">
                        <p className="bg-[#EAEFF8] p-1 rounded-sm text-[#737F92] text-xs md:text-[0.85rem] font-semibold mr-4">
                            {project.stage?.name}
                        </p>
                        <p className="text-xs font-semibold md:text-sm">
                            By <span className="font-semibold text-blue-600">{project.user?.name}</span>
                        </p>
                    </div>

                    <h5 className="text-base md:text-[0.95rem] font-semibold text-gray-900 mt-2 whitespace-normal break-words leading-[1.3rem]">
                        {project.name}
                    </h5>
                    <div className="flex items-center mt-3 text-xs text-gray-600 md:text-sm">
                        <p className="mr-4 text-xs text-nowrap">📖 {project.articles?.length} Posts</p>
                        <p className="text-xs text-nowrap">👨‍🎓 {project.members?.length} Members</p>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default ProjectList
