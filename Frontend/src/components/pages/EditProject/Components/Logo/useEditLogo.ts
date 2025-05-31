import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateProjectLogo } from 'api/project'
import { postProjectDetailsActivitiesLogo } from 'api/activity'
import resizeLogo from 'utils/files/resizeLogo'
import { RootState } from '~/store'
import { toast } from 'sonner'

export const useEditLogo = () => {
   const params = useParams<{ id: string }>()
   const { id } = params

   // ========== STATE FROM REDUX STORE ========== //
   const { myProjectDetails, isLoadingUpdateMyProject } = useSelector((state: RootState) => state.project)
   const project = myProjectDetails

   // ========== STATE ========== //
   const [logoURL, setLogoURL] = useState<string>('')
   const [logoFile, setLogoFile] = useState<File | null>(null)
   const loadedProjectId = useRef<string | null>(null)

   // ========== USEEFFECT ========== //
   useEffect(() => {
      // CHỈ LOAD KHI project ID khác với đã load
      if (project && project._id === id && loadedProjectId.current !== id) {
         setLogoURL(project?.logo || '')
         setLogoFile(null) // Reset logo file when loading new project

         loadedProjectId.current = id || null
      }
   }, [project, id])

   // ========== ONCHANGE FUNCTION ========== //
   const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      try {
         // Check if the file is an image
         const file = event.target.files?.[0]
         if (!file) return

         console.log('Selected file:', file.name, file.type, file.size)

         // Validate file type
         if (!file.type.startsWith('image/')) {
            toast.error('Please select a valid image file.')
            return
         }

         // Validate file size (e.g., max 5MB)
         const maxSize = 5 * 1024 * 1024 // 5MB in bytes
         if (file.size > maxSize) {
            toast.error('File size must be less than 5MB.')
            return
         }

         const logo = await resizeLogo(file)
         setLogoFile(logo)
         setLogoURL(URL.createObjectURL(logo))

         console.log('Logo processed successfully')
      } catch (error: any) {
         console.error('File processing error:', error)
         toast.error('Failed to process the image. Please try again.')
      }
   }

   const handleSaveChanges = async () => {
      try {
         if (!logoFile) {
            toast.error('Please select a logo file first.')
            return
         }

         console.log('Uploading logo file:', logoFile.name)

         const formData = new FormData()
         formData.append('logo', logoFile)

         await updateProjectLogo(id!, formData)
         await postProjectDetailsActivitiesLogo(id!, formData)

         toast.success('Project logo updated successfully!')
      } catch (error: any) {
         console.error('Save logo error:', error)

         // Hiển thị lỗi chi tiết từ backend nếu có
         if (error.response?.data?.detail) {
            const errorDetail = error.response.data.detail
            const errorMessages = Object.values(errorDetail).join(', ')
            toast.error(`Validation error: ${errorMessages}`)
         } else {
            toast.error('Failed to update project logo. Please try again.')
         }
      }
   }

   return {
      // Data
      logoURL,
      logoFile,
      isLoadingUpdateMyProject,

      // Functions
      handleFileChange,
      handleSaveChanges,
   }
}
