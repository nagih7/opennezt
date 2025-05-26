import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { WelcomeSection } from './components/WelcomeSection'
import { InterviewCard } from './components/InterviewCard'
import { getListProjectPracticeInterview } from 'api/project'
import { useNavigate } from 'react-router-dom'
import { RootState } from '~/store'
import { ROUTE_CONFIG } from '~/config/constants'

interface Project {
   _id: string
   name: string
   description?: string
   logo?: string | null
   background?: string | null
   created_at?: string
   createdAt?: string
}

const Home: React.FC = () => {
   const { authUser } = useSelector((state: RootState) => state.auth)
   const navigate = useNavigate()
   const [latestProjects, setLatestProjects] = useState<Project[]>([])
   const [isLoading, setIsLoading] = useState(false)

   useEffect(() => {
      const fetchPracticeInterviewProjects = async () => {
         setIsLoading(true)
         try {
            const params = {
               page: 1,
               per_page: 10,
               field: 'created_at',
               order: '-1',
            }

            const response = await getListProjectPracticeInterview(params)

            if (response && response.data) {
               let projectsArray = null

               if (response.data.projects && Array.isArray(response.data.projects)) {
                  projectsArray = response.data.projects
               } else if (response.data.data && response.data.data.projects) {
                  projectsArray = response.data.data.projects
               } else if (Array.isArray(response.data)) {
                  projectsArray = response.data
               } else {
                  for (const key in response.data) {
                     if (Array.isArray(response.data[key])) {
                        projectsArray = response.data[key]
                        break
                     }
                  }
               }

               if (projectsArray && projectsArray.length > 0) {
                  const sortedProjects = [...projectsArray].sort((a, b) => {
                     const dateA = new Date(a.created_at || a.createdAt || 0)
                     const dateB = new Date(b.created_at || b.createdAt || 0)
                     return dateB.getTime() - dateA.getTime()
                  })

                  const newestThreeProjects = sortedProjects.slice(0, 3)

                  setLatestProjects(newestThreeProjects)
               } else {
                  console.error('No projects found in the response')
               }
            } else {
               console.error('Invalid response structure')
            }
         } catch (error) {
            console.error('Error fetching practice interview projects:', error)
         } finally {
            setIsLoading(false)
         }
      }

      fetchPracticeInterviewProjects()
   }, [])

   const handleProjectClick = (projectId: string) => {
      navigate(ROUTE_CONFIG.USER.PROJECT.PREFIX + projectId)
   }

   const handleStartInterview = (projectId: string) => {
      navigate(ROUTE_CONFIG.USER.INTERVIEW.PREFIX + projectId)
   }

   const projectColors = ['pink', 'blue', 'purple']

   return (
      <div className="mt-[2px] ml-[16px] p-8 bg-[#ffffff] w-full h-100vh 2xl:h-full">
         <WelcomeSection user={authUser || undefined} />
         <div className="flex flex-col mt-8">
            <span className="text-2xl font-bold">Practice interview</span>
            <span className="text-[#6f7f92]">Practice real interview questions and pave your startup journey</span>
            <div className="grid grid-cols-3 gap-8 pb-8 mt-4 2xl:gap-10">
               {latestProjects && latestProjects.length > 0 ? (
                  latestProjects.map((project, index) => (
                     <div key={project?._id} className="cursor-pointer">
                        <InterviewCard
                           title={project?.name}
                           description={
                              project?.description && project?.description?.length > 50
                                 ? `${project?.description.substring(0, 150)}...`
                                 : project?.description || 'Xem chi tiết dự án này'
                           }
                           time="30m"
                           color={projectColors[index % projectColors.length]}
                           projectImage={project?.logo || null}
                           projectBackground={project?.background || null}
                           onClickViewProject={() => handleProjectClick(project?._id)}
                           onClickInterview={() => {
                              handleStartInterview(project?._id)
                           }}
                        />
                     </div>
                  ))
               ) : isLoading ? (
                  Array(3)
                     .fill(0)
                     .map((_, index) => (
                        <div
                           key={index}
                           className="flex flex-col border-[2px] h-[290px] 2xl:h-[310px] rounded-xl animate-pulse bg-gray-100"
                        >
                           <div className="bg-gray-200 h-1/2 rounded-t-xl"></div>
                           <div className="p-[10px]">
                              <div className="w-1/2 h-5 mb-2 bg-gray-300 rounded"></div>
                              <div className="w-3/4 h-4 mb-2 bg-gray-200 rounded"></div>
                              <div className="w-1/3 h-8 mt-4 bg-gray-200 rounded"></div>
                           </div>
                        </div>
                     ))
               ) : (
                  <div className="col-span-3 py-10 text-center">
                     <p className="text-lg text-gray-500">We will notify you when there is a new project!</p>
                  </div>
               )}
            </div>
         </div>
      </div>
   )
}

export default Home
