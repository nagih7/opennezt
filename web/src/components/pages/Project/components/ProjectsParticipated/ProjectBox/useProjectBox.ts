import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTE_CONFIG } from '~/config/constants'

export interface Member {
   user: {
      name: string
      avatar?: string
   }
}

export interface Project {
   _id: string
   name: string
   background?: string
   logo?: string
   articles?: any[]
   members?: Member[]
}

export interface UseProjectBoxProps {
   project: Project
}

export const useProjectBox = () => {
   const navigate = useNavigate()
   const [errorBG, setErrorBG] = useState<boolean>(false)

   const handleNavigateToProjectDetails = (project: Project) => {
      const projectId = project._id
      navigate(ROUTE_CONFIG.USER.PROJECT.DETAIL.PREFIX.replace(':id', projectId))
   }

   return {
      errorBG,
      setErrorBG,
      handleNavigateToProjectDetails,
   }
}
