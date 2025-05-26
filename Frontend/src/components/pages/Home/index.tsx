import React from 'react'
import { WelcomeSection } from './components/WelcomeSection'
import { InterviewCard } from './components/InterviewCard'
import useHome from './useHome'
import { BaseProjectProps } from '~/types'

const Home: React.FC = () => {
   const { projects, isLoading } = useHome()

   return (
      <div className="mt-[2px] ml-[16px] p-8 bg-[#ffffff] w-full h-100vh 2xl:h-full">
         <WelcomeSection />
         <div className="flex flex-col mt-8">
            <span className="text-2xl font-bold">Practice interview</span>
            <span className="text-[#6f7f92]">Practice real interview questions and pave your startup journey</span>
            <div className="grid grid-cols-3 gap-8 pb-8 mt-4 2xl:gap-10">
               {projects &&
                  projects.length > 0 &&
                  projects.map((project: BaseProjectProps, index: number) => (
                     <InterviewCard key={index} project={project} />
                  ))}
            </div>
         </div>
      </div>
   )
}

export default Home
