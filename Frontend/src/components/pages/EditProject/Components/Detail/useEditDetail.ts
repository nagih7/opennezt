import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getMyProjectDetails, updateProjectBasic } from '~/api/project'
import { postProjectDetailsActivitiesBasic } from '~/api/activity'
import { RootState, AppDispatch } from '~/store'
import { toast } from 'sonner'

// Define types for the hook
interface FormData {
   name: string
   description: string
}

export const useEditDetail = () => {
   const dispatch = useDispatch<AppDispatch>()
   const params = useParams<{ id: string }>()
   const { id } = params

   // ========== STATE FROM REDUX STORE ========== //
   const { myProjectDetails, isLoadingUpdateMyProject } = useSelector((state: RootState) => state.project)
   const project = myProjectDetails

   // ========== STATE ========== //
   const [formData, setFormData] = useState<FormData>({
      name: '',
      description: '',
   })
   const loadedProjectId = useRef<string | null>(null)

   // ========== USE EFFECT ========== //
   useEffect(() => {
      if (!project || project?._id !== id) {
         dispatch(getMyProjectDetails(id!))
      }
   }, [dispatch, id, project])

   useEffect(() => {
      // CHỈ LOAD KHI project ID khác với đã load
      if (project && project._id === id && loadedProjectId.current !== id) {
         console.log('Loading detail data for project:', id)

         setFormData({
            name: project?.name || '',
            description: project?.description || '',
         })

         loadedProjectId.current = id || null
      }
   }, [project, id])

   // ========== ONCHANGE FUNCTION ========== //
   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      console.log('Input change:', { name, value })

      setFormData((prev) => ({
         ...prev,
         [name]: value,
      }))
   }

   const handleSaveChanges = async () => {
      try {
         // Validate data trước khi gửi
         if (!formData.name.trim()) {
            toast.error('Project name is required.')
            return
         }

         console.log('Sending detail data:', formData)

         await updateProjectBasic(id!, formData)

         await postProjectDetailsActivitiesBasic(id!, formData)

         toast.success('Update project details successfully!')
      } catch (error: any) {
         console.error('Save detail error:', error)

         // Hiển thị lỗi chi tiết từ backend nếu có
         if (error.response?.data?.detail) {
            const errorDetail = error.response.data.detail
            const errorMessages = Object.values(errorDetail).join(', ')
            toast.error(`Validation error: ${errorMessages}`)
         } else {
            toast.error('Failed to update project details. Please try again.')
         }
      }
   }

   return {
      // Data
      formData,
      isLoadingUpdateMyProject,

      // Functions
      handleChange,
      handleSaveChanges,
   }
}

// Export types for component
export type { FormData }
