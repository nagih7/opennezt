import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
      navigate(`/projects/${project._id}/details`)
   }

   return {
      errorBG,
      setErrorBG,
      handleNavigateToProjectDetails,
   }
}
