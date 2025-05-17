import React, { useState } from 'react'
import { IconlyDocument, IconlyUser } from 'components/UI/Iconly'
import { useNavigate } from 'react-router-dom'
import { Avatar, Button, Image } from '@chakra-ui/react'
import { OPENNEZT_BG_BLACK } from 'utils/constants'
import { Project } from 'types'

interface ProjectBoxProps {
   project: Project
}

const ProjectBox: React.FC<ProjectBoxProps> = ({ project }) => {
   const navigate = useNavigate()

   // ========== STATE ========== //
   const [errorBG, setErrorBG] = useState<boolean>(false)

   const handleNavigateToProjectDetails = (project: Project): void => {
      navigate(`/projects/me/${project._id}/details`)
   }

   return (
      <div className="mx-[-16px] px-[16px]">
         <div className="bg-[#ffffff] border-[1px] rounded-md">
            {!errorBG ? (
               <Image
                  src={project.background}
                  alt={project.name}
                  aspectRatio={10 / 5}
                  width="100%"
                  objectFit="cover"
                  onError={() => setErrorBG(true)}
               />
            ) : (
               <Image
                  width="100%"
                  aspectRatio={10 / 5}
                  objectFit="cover"
                  src={OPENNEZT_BG_BLACK}
                  alt="OpenNezt"
                  className="px-10"
               />
            )}
            <div className="flex flex-col items-center p-8">
               <div className="flex flex-col items-center mt-[-80px]">
                  <div className="mb-7">
                     <Avatar.Root shape="square" className="w-20 h-20 border-[4px] border-[#f2f3f4]">
                        <Avatar.Fallback name={project.name} />
                        <Avatar.Image src={project.logo} />
                     </Avatar.Root>
                  </div>
                  <h5>
                     <a href="#" className="text-black text-sm sm:text-lg no-underline">
                        {project.name}
                     </a>
                  </h5>
               </div>

               <ul className="flex items-center gap-1 mb-0 pl-0 pb-[24px]">
                  <li className="mr-2 text-[#6f7f92] text-xs sm:text-sm font-medium flex items-center gap-1">
                     <span>
                        <IconlyDocument size={20} color={'#6f7f92'} />
                     </span>
                     <span>{project.articles?.length || 0}</span>
                     <span>Posts</span>
                  </li>
                  <li className="mr-2 text-[#6f7f92] text-xs sm:text-sm font-medium flex items-center gap-1">
                     <span>
                        <IconlyUser size={20} color={'#6f7f92'} />
                     </span>
                     <span>Members</span>
                     <span>{project.members?.length}</span>
                  </li>
               </ul>

               <ul className="mb-0 pl-0 border-t-[1px] w-full pt-[24px] relative flex items-center justify-center">
                  {project.members?.map((member, index) => (
                     <li key={index} className="ml-[-15px]">
                        <Avatar.Root size={'sm'} className="h-9 w-9 rounded-full border-2 border-[#ffffff]">
                           <Avatar.Fallback name={member.user.name} />
                           <Avatar.Image src={member.user.avatar} />
                        </Avatar.Root>
                     </li>
                  ))}
               </ul>
               <div className="mt-7 mx-[-16px] w-full h-[47px] flex justify-center items-center">
                  <Button
                     onClick={() => handleNavigateToProjectDetails(project)}
                     className="bg-[#eaeff8] text-[#2f65b9] hover:bg-[#2f65b9] hover:text-[#ffffff] transition duration- sm:text-sm rounded-md font-semibold sm:px-[28px] px-[20px] text-xs py-[15px] mx-[14px] no-underline"
                  >
                     MANAGE PROJECT
                  </Button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ProjectBox
