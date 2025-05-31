import React from 'react'
import { IconlyTimeCircle, IconlyArrowRight } from 'components/UI/Iconly'
import { BsArrowsAngleExpand } from "react-icons/bs";
// import useHome from '../../useHome'
import { BaseProjectProps } from '~/types'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/UI/avatar'
import { OPENNEZT_LOGO } from '~/utils/constants'

interface InterviewCardProps {
   key: number
   project: BaseProjectProps
   onInterviewPractice: (projectId: string) => void
   onViewDetail: (projectId: string) => void
}

export const InterviewCard: React.FC<InterviewCardProps> = ({ project, onInterviewPractice, onViewDetail }) => {
   const gradients = [
      'bg-gradient-to-r from-[#B7445580] to-[#CBA9AE33]',
      'bg-gradient-to-r from-[#B7445580] to-[#CBA9AE33]', 
      'bg-gradient-to-r from-[#0A5D9980] to-[#A9D6FF33]', 
      'bg-gradient-to-r from-[#56368780] to-[#877A9A33]',
   ]

   const getGradientIndex = (projectId: string) => {
      if (!projectId) return 0
      let hash = 0
      for (let i = 0; i < projectId.length; i++) {
         const char = projectId.charCodeAt(i)
         hash = ((hash << 5) - hash) + char
         hash = hash & hash 
      }
      return Math.abs(hash) % gradients.length
   }

   const selectedGradient = gradients[getGradientIndex(project?._id || '')]

   return (
      <div className="group flex flex-col border-[2px] hover:border-[#2f65b9] h-[290px] 2xl:h-[310px] rounded-xl transition-all duration-500 ease-in-out">
         <div
            className={`${selectedGradient} relative flex items-center justify-center m-1 cursor-pointer rounded-xl`}
            onClick={() => onViewDetail(project?._id)}
         >
            <div className="bg-[#ffffff] transition-all duration-500 ease-in-out rounded-full p-[2px] my-[30px] group-hover:my-[10px]">
               <Avatar className="2xl:w-[80px] 2xl:h-[80px] w-[70px] h-[70px]">
                  <AvatarImage src={project?.logo || undefined} alt={project.name} />
                  <AvatarImage src={OPENNEZT_LOGO} alt={project.name} />
               </Avatar>
            </div>
            <div className="group-hover:flex items-center transition-all duration-700 ease-in-out hidden absolute right-0 top-0 bg-[#ffffff] rounded-lg m-[10px] cursor-pointer">
               <span className="p-2 border-r">Share</span>
               <BsArrowsAngleExpand className='w-3 h-3 mx-3'/>
            </div>
         </div>
         <div className="p-[10px] bg-[#ffffff] rounded-xl">
            <div className="flex flex-col justify-start">
               <span className="text-lg font-bold">{project.name}</span>
               <p className="text-sm text-[#6f7f92]">{project.description}</p>
               <div className="flex items-center w-fit gap-1 border rounded-lg p-[5px]">
                  <IconlyTimeCircle color={'#6f7f92'} size={20} />
                  <span className="text-sm">30m</span>
               </div>
            </div>
            <div
               className="group-hover:flex hidden transition-all duration-500 ease-in-out 2xl:text-base 2xl:font-bold text-sm mt-2 text-[#2f65b9] items-center font-semibold cursor-pointer"
               onClick={() => onInterviewPractice(project?._id)}
            >
               <span className="mb-1">Start interview</span>
               <IconlyArrowRight color={'#2f65b9'} size={25} />
            </div>
         </div>
      </div>
   )
}
