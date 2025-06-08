import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateProjectBackground } from '~/api/project'
import { postProjectDetailsActivitiesBackground } from '~/api/activity'
import resizeBackground from 'utils/files/resizeBackground'
import { RootState } from '~/store'
import { toast } from 'sonner'

export const useEditBackground = () => {
   const params = useParams<{ id: string }>()
   const { id } = params

   // ========== STATE FROM REDUX STORE ========== //
   const { myProjectDetails, isLoadingUpdateMyProject } = useSelector((state: RootState) => state.project)
   const project = myProjectDetails

   // ========== STATE ========== //
   const [bgURL, setBgURL] = useState<string>('')
   const [bgFile, setBgFile] = useState<File | null>(null)
   const loadedProjectId = useRef<string | null>(null)

   // ========== USEEFFECT ========== //
   useEffect(() => {
      // CHỈ LOAD KHI project ID khác với đã load
      if (project && project._id === id && loadedProjectId.current !== id) {
         setBgURL(project?.background || '')
         setBgFile(null) // Reset background file when loading new project

         loadedProjectId.current = id || null
      }
   }, [project, id])

   // ========== ONCHANGE FUNCTION ========== //
   const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      try {
         // Check if the file is an image
         const file = event.target.files?.[0]
         if (!file) return

         // Validate file type
         if (!file.type.startsWith('image/')) {
            toast.error('Please select a valid image file.')
            return
         }

         // Validate file size (e.g., max 10MB for background images)
         const maxSize = 10 * 1024 * 1024 // 10MB in bytes
         if (file.size > maxSize) {
            toast.error('File size must be less than 10MB.')
            return
         }

         const background = await resizeBackground(file)
         setBgFile(background)
         setBgURL(URL.createObjectURL(background))
      } catch (error: any) {
         toast.error('Failed to process the image. Please try again.')
      }
   }

   const handleSaveChanges = async () => {
      try {
         if (!bgFile) {
            toast.error('Please select a background image first.')
            return
         }

         const formData = new FormData()
         formData.append('background', bgFile)
         await updateProjectBackground(id!, formData)
         await postProjectDetailsActivitiesBackground(id!, formData)

         toast.success('Project background updated successfully!')
      } catch (error: any) {
         console.error('Save background error:', error)

         // Hiển thị lỗi chi tiết từ backend nếu có
         if (error.response?.data?.detail) {
            const errorDetail = error.response.data.detail
            const errorMessages = Object.values(errorDetail).join(', ')
            toast.error(`Validation error: ${errorMessages}`)
         } else {
            toast.error('Failed to update project background. Please try again.')
         }
      }
   }

   return {
      // Data
      bgURL,
      bgFile,
      isLoadingUpdateMyProject,

      // Functions
      handleFileChange,
      handleSaveChanges,
   }
}
