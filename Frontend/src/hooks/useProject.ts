import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/types'

interface Project {
   id: string
   name: string
   description: string
   status: string
   [key: string]: any
}

interface FetchProjectsParams {
   page?: number
   limit?: number
   filter?: Record<string, any>
}

interface UseProjectReturn {
   projects: Project[]
   loading: boolean
   error: string | null
   fetchProjects: (params?: FetchProjectsParams) => Promise<void>
   getProjectById: (id: string) => Project | undefined
   currentProject: Project | null
   setCurrentProject: (project: Project | null) => void
}

const useProject = (): UseProjectReturn => {
   const dispatch = useDispatch()
   const [loading, setLoading] = useState<boolean>(false)
   const [error, setError] = useState<string | null>(null)
   const [currentProject, setCurrentProject] = useState<Project | null>(null)

   // Get projects from Redux store
   const projects = useSelector((state: RootState) => state.project?.projects || [])

   const fetchProjects = async (params: FetchProjectsParams = {}) => {
      try {
         setLoading(true)
         setError(null)

         dispatch({
            type: 'project/FETCH_PROJECTS_REQUEST',
            payload: params,
         })

         // We don't need to set projects here as it will be updated through Redux
      } catch (err) {
         setError(err instanceof Error ? err.message : 'Failed to fetch projects')
      } finally {
         setLoading(false)
      }
   }

   const getProjectById = (id: string): Project | undefined => {
      return projects.find((project) => project.id === id)
   }

   return {
      projects,
      loading,
      error,
      fetchProjects,
      getProjectById,
      currentProject,
      setCurrentProject,
   }
}

export default useProject
