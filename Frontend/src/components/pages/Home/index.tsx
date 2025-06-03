import React from 'react'
import { InterviewCard } from './components/InterviewCard'
import useHome from './useHome'
import { BaseProjectProps } from '~/types'
import WelcomeSection from './components/WelcomeSection'

const Home: React.FC = () => {
   const {
      projects,
      authUser,
      handleViewProjectDetails,
      handleInterviewPractice,
      handleNavigateCreateProject,
      handleNavigateInterview,
   } = useHome()

   if (!authUser) return null

   return (
      <div className="mt-[2px] ml-[16px] p-8 bg-[#ffffff] w-full h-100vh 2xl:h-full">
         <WelcomeSection
            username={authUser.name}
            navigateCreateProject={handleNavigateCreateProject}
            navigateInterview={handleNavigateInterview}
         />
         <div className="flex flex-col mt-8">
            <span className="text-2xl font-bold">Practice interview</span>
            <span className="text-[#6f7f92]">Practice real interview questions and pave your startup journey</span>            <div className="grid grid-cols-3 gap-8 pb-8 mt-4 2xl:gap-10">
               {projects &&
                  projects.length > 0 &&
                  projects.map((project: BaseProjectProps, index: number) => (
                     <InterviewCard
                        key={index}
                        index={index}
                        project={project}
                        onInterviewPractice={handleInterviewPractice}
                        onViewDetail={handleViewProjectDetails}
                     />
                  ))}
            </div>
         </div>
      </div>
   )
}

export default Home
