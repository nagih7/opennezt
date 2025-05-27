import { Avatar } from '@chakra-ui/react'
import { IconlyBookmark } from 'components/UI/Iconly'
import React from 'react'
import { FaChevronRight, FaCheckCircle, FaStar, FaRegStar } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { RootState } from 'store/types'

interface ProjectUser {
   name: string
   avatar?: string
}

interface ProjectStage {
   name: string
}

interface ProjectDetails {
   name: string
   user?: ProjectUser
   stage?: ProjectStage
}

const BannerActive: React.FC = () => {
   // ========== STATE FROM REDUX STORE ========== //
   const { projectDetails } = useSelector((state: RootState) => state.project)

   return (
      <div className=" bg-[#07142e] w-full h-[18.75rem] relative top-[0rem]">
         <div className="text-white font-bold relative top-[5rem]  border-b border-[#142039] pb-4 ml-[5.5rem]">
            <ul className="flex mb-0">
               <li>
                  Seek Projects
                  <FaChevronRight className="inline mx-2" />
               </li>
               <li>
                  Project Details
                  <FaChevronRight className="inline mx-2" />
               </li>
               <li>{projectDetails?.name}</li>
            </ul>
            <span className="ml-[2rem] 2xl:text-2xl">{projectDetails?.name}</span>
         </div>

         <div className="flex items-center mt-[-0.5rem] relative top-[5.8rem] ml-8 text-white ml-[7rem]">
            <Avatar.Root size="md" className="w-10 h-10 mr-3 rounded-full">
               <Avatar.Fallback name={projectDetails?.user?.name} />
               <Avatar.Image src={projectDetails?.user?.avatar} />
            </Avatar.Root>
            <div>
               <p className="relative top-[1.25rem] text-xs mb-4 text-[#6F7F92]">Created by</p>
               <p>
                  {projectDetails?.user?.name} <FaCheckCircle className="inline ml-1 text-blue-500" />
               </p>
            </div>
            <div className="ml-5">
               <p className="relative top-[1.25rem] text-xs mb-4 text-[#6F7F92]">Stage</p>
               <p className="text-[1rem]">{projectDetails?.stage?.name}</p>
            </div>
            <div className="ml-5">
               <p className="relative top-[1.25rem] text-xs mb-4 text-[#6F7F92]">Review</p>
               <p className="flex items-center text-xl text-yellow-400">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaRegStar />
               </p>
            </div>
            <div className="ml-5">
               <p className="relative top-[1rem] text-xs mb-[1.6rem] text-[#6F7F92]">Project Results: 70%</p>
               <p className="w-[8rem] h-[0.6rem] bg-gray-700 rounded-full overflow-hidden">
                  <div className="w-3/5 h-full bg-blue-600 rounded-full"></div>
               </p>
            </div>
            <button className="ml-5 mb-[0.5rem]">
               <IconlyBookmark size={24} color="#ffffff" />
            </button>
         </div>
      </div>
   )
}

export default BannerActive
