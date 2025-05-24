import React from 'react'
import ProjectBox from './ProjectBox'
import { useMyProjects, UseMyProjectsProps } from './useMyProjects'

const MyProjects: React.FC<UseMyProjectsProps> = (props) => {
   const { myProjects, isLoadingGetListMyProjects } = useMyProjects(props)

   return (
      <>
         {myProjects && myProjects.length === 0 && !isLoadingGetListMyProjects && (
            <div className="flex flex-col items-center justify-center">
               <img
                  alt="Not found"
                  src="https://homepage.momocdn.net/next-js/_next/static/public/cinema/not-found.svg"
                  className="object-cover w-[200px] h-[200px]"
               />
               <p className="text-2xl text-center font-semibold text-[#6f7f92] ">
                  Create a project or participate in a project
               </p>
            </div>
         )}
         <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
            {myProjects && myProjects.length > 0 ? (
               myProjects.map((project, index) => <ProjectBox project={project} key={index} />)
            ) : (
               <div className="hidden text-center text-gray-500 "></div>
            )}
         </div>
         {isLoadingGetListMyProjects && <div className="text-center">Loading...</div>}
      </>
   )
}

export default MyProjects
