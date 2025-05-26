import React from 'react'
import { IconlyFace, IconlyFolder } from 'components/UI/Iconly'
import { useNavigate } from 'react-router-dom'
import { AuthAccount } from '~/store/modules/auth/types'

interface WelcomeSectionProps {
   user?: AuthAccount
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({ user }) => {
   const navigate = useNavigate()

   const handleNavigateToCreateProject = () => {
      navigate('/project/details')
   }

   const handleNavigateToCreateInterview = () => {
      navigate('/profile')
   }

   return (
      <div className="flex flex-col">
         <span className="text-2xl font-bold">Welcome back, {user?.name}</span>
         <span className="text-[#6f7f92] font-semibold">Suggested for you</span>
         <div className="grid grid-cols-3 gap-8 mt-4 2xl:gap-10">
            <div className="flex flex-col p-3 border rounded-xl">
               <div className="flex items-center justify-between">
                  <span className="font-bold">Practice interviews</span>
                  <IconlyFace color={'orange'} size={25} />
               </div>
               <span className="flex-1 text-[#6f7f92] text-sm mt-1">
                  Prepare for your next opportunity with 100+ live interviews ready for you.
               </span>
               <div className="flex justify-end">
                  <button
                     className="bg-[#2f65b9] text-white rounded-lg px-4 py-2 text-sm font-semibold mt-4"
                     onClick={handleNavigateToCreateInterview}
                  >
                     Start now
                  </button>
               </div>
            </div>
            <div className="flex flex-col p-3 border rounded-xl">
               <div className="flex items-center justify-between">
                  <span className="font-bold">Add your own Project</span>
                  <IconlyFolder color={'green'} size={25} />
               </div>
               <span className="flex-1 text-[#6f7f92] text-sm mt-1">
                  Start building your dream team by adding a project and matching with the right co-founders and talent.
               </span>
               <div className="flex justify-end" onClick={handleNavigateToCreateProject}>
                  <button className="bg-[#2f65b9] text-white rounded-lg px-4 py-2 text-sm font-semibold mt-4">
                     Complete now
                  </button>
               </div>
            </div>
         </div>
      </div>
   )
}
