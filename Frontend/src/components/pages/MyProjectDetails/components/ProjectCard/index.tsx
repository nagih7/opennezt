import { Image } from '@chakra-ui/react'
import React, { useState } from 'react'
import { OPENNEZT_BG_BLACK, OPENNEZT_LOGO } from 'utils/constants'

interface ProjectCardProps {
   project: {
      name: string
      background?: string
      logo?: string
      description?: string
   }
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
   const [backgroundError, setBackgroundError] = useState<boolean>(false)
   const [logoError, setLogoError] = useState<boolean>(false)

   return (
      <>
         <div className="w-full">
            {!backgroundError ? (
               <Image
                  src={project.background}
                  alt={project.name}
                  aspectRatio={10 / 3}
                  width="100%"
                  objectFit="cover"
                  onError={() => setBackgroundError(true)}
               />
            ) : (
               <Image alt={project.name} aspectRatio={10 / 3} width="100%" objectFit="cover" src={OPENNEZT_BG_BLACK} />
            )}
         </div>

         <div className="p-8 bg-[#ffffff]">
            <div className="flex justify-between flex-col md:flex-row w-full px-[16px]">
               <div className="flex-1 item-left">
                  <div className="flex gap-3">
                     <div className="p-[4px] mt-[-60px] rounded-md bg-[#ffffff]">
                        {!logoError ? (
                           <Image
                              src={project.logo}
                              className="w-[150px] h-[150px] rounded-md"
                              alt={project.name}
                              aspectRatio={4 / 4}
                              width="100%"
                              objectFit="cover"
                              onError={() => setLogoError(true)}
                           />
                        ) : (
                           <div className="h-[150px] w-[150px] flex items-center justify-center bg-gray-200 p-4 user-select-none">
                              <Image src={OPENNEZT_LOGO} alt="OpenNezt" />
                           </div>
                        )}
                     </div>
                     <div>
                        <h5 className="text-2xl font-bold">{project.name}</h5>
                        {project.description && (
                           <div>
                              <p className="italic font-medium text-gray-500 text-md">{project.description}</p>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
               <div className="item-right mt-5 md:mt-0">
                  <ul className="flex flex-wrap items-center justify-center gap-5 p-0 m-0">
                     <li className="flex flex-col items-center">
                        <h5>0</h5>
                        Public
                     </li>
                     <li className="flex flex-col items-center">
                        <h5>0</h5>
                        Posts
                     </li>
                     <li className="flex flex-col items-center">
                        <h5>1</h5>
                        Member
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </>
   )
}

export default ProjectCard
