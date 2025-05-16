import { Avatar, Button, Image } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaRegFileAlt, FaUsers } from 'react-icons/fa'
import { OPENNEZT_BG_BLACK } from 'utils/constants'

const ProjectBox = ({ project }) => {
   // ========== STATE ========== //
   const [errorBG, setErrorBG] = useState(false)

   // ========== RENDER ========== //
   return (
      <div className="bg-white  rounded-xl  w-100% h-[24.5rem] text-center border">
         <div className="w-full h-28 bg-gradient-to-r from-blue-500 to-indigo-700">
            {!errorBG ? (
               <Image
                  className="inset-0 object-cover w-full h-full "
                  src={project.background}
                  alt={project.name}
                  aspectRatio={10 / 5}
                  width="100%"
                  objectFit="cover"
                  onError={() => setErrorBG(true)}
               />
            ) : (
               <Image
                  className="inset-0 object-cover w-full h-full "
                  width="100%"
                  aspectRatio={10 / 5}
                  objectFit="cover"
                  src={OPENNEZT_BG_BLACK}
                  alt="OpenNezt"
               />
            )}
         </div>

         <div className="relative flex justify-center mb-3 -mt-12">
            <Avatar.Root
               className="w-16 h-16 overflow-hidden border-2 border-white rounded-lg shadow-md"
               shape="square"
            >
               <Avatar.Image src={project.logo} />
               <Avatar.Fallback alt={project.name} />
            </Avatar.Root>
         </div>

         <h3 className="mt-2 text-lg font-semibold text-center">{project.name}</h3>

         <div className="flex items-center justify-center gap-4 mt-1 text-sm text-gray-500">
            <div className="flex items-center gap-1">
               <FaRegFileAlt /> <span>{project.articles?.length} Posts</span>
            </div>
            <div className="flex items-center gap-1">
               <FaUsers /> <span>Members {project.members?.length}</span>
            </div>
         </div>
         <hr />

         <div className="flex justify-center mt-4">
            <div className="flex justify-center -space-x-5">
               {project.members?.map((member, idx) => (
                  <Avatar.Root
                     className="w-10 h-10 mt-6 transition-transform duration-300 ease-in-out border border-white rounded-full cursor-pointer hover:scale-125 hover:z-10 hover:shadow-lg"
                     key={idx}
                  >
                     <Avatar.Image src={member.user?.avatar} />
                     <Avatar.Fallback alt={member.user?.name} />
                  </Avatar.Root>
               ))}
               <div className="w-10 h-10 pt-1 mt-6 text-white transition-transform duration-300 ease-in-out bg-blue-600 border border-white rounded-full cursor-pointer hover:scale-125 hover:z-10 hover:shadow-lg">
                  +
               </div>
            </div>
         </div>

         <div className="flex justify-center mt-6">
            <Button className="bg-[#F8EAEA] text-red-500 font-bold px-6 py-2 rounded-lg shadow-md hover:!bg-[#F14646] hover:!text-white">
               LEAVE GROUP
            </Button>
         </div>
      </div>
   )
}

export default ProjectBox
