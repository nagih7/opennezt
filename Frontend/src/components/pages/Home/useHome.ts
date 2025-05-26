import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchInterviewPracticeProjects } from '~/api/interview'
import { ROUTE_CONFIG } from '~/config/constants'
import { RootState, useAppSelector } from '~/store'
import { BaseProjectProps } from '~/types'

const useHome = () => {
   // Store
   const { authUser } = useAppSelector((state: RootState) => state.auth)
   const navigate = useNavigate()

   // State
   const [error, setError] = useState<string | null>(null)
   const [projects, setProjects] = useState<BaseProjectProps[]>([])
   const [isLoading, setIsLoading] = useState(true)

   // Effect
   useEffect(() => {
      const fetchProjects = async () => {
         try {
            setIsLoading(true)
            const res = await fetchInterviewPracticeProjects()
            setProjects(res.data)
            setIsLoading(false)
         } catch (err) {
            setError('Failed to fetch projects')
         }
      }
      fetchProjects()
   }, [])

   // Handlers
   const handleViewProjectDetails = (projectId: string) => {
      navigate(ROUTE_CONFIG.USER.PROJECT.PREFIX + projectId)
   }

   const handleInterviewPractice = (projectId: string) => {
      navigate(ROUTE_CONFIG.USER.INTERVIEW.PREFIX + projectId)
   }

   const handleNavigateCreateProject = () => {
      navigate(ROUTE_CONFIG.USER.PROJECT.CREATE.BASIC)
   }

   const handleNavigateInterview = () => {
      navigate(ROUTE_CONFIG.USER.PROFILE.PREFIX)
   }

   return {
      // State
      authUser,
      error,
      projects,
      isLoading,
      // Functions
      navigate,
      handleViewProjectDetails,
      handleInterviewPractice,
      handleNavigateCreateProject,
      handleNavigateInterview,
   }
}

export default useHome
