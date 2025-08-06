import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateProjectAdditionalInfos } from '~/api/project'
import { postProjectDetailsActivitiesAdditionalInfo } from '~/api/activity'
import { PROJECT_ADDITIONAL_INFO_FIELDS } from '~/config/constants/profile'
import { RootState } from '~/store'
import { toast } from 'sonner'

// Define types for the hook
interface Field {
   id: string
   name: string
   value?: string
   placeholder: string
   backgroundColor?: string
}

interface AdditionalInfo {
   name: string
   content: string
   value?: string
}

export const useEditAdditionalInfo = () => {
   const params = useParams<{ id: string }>()
   const { id } = params

   // ========== STATE FROM REDUX STORE ========== //
   const { myProjectDetails, isLoadingUpdateMyProject } = useSelector((state: RootState) => state.project)
   const { language } = useSelector((state: RootState) => state.app) || { language: 'EN' }
   const project = myProjectDetails

   // Chọn danh sách trường dựa trên ngôn ngữ
   const fields: Field[] =
      PROJECT_ADDITIONAL_INFO_FIELDS[language as keyof typeof PROJECT_ADDITIONAL_INFO_FIELDS] ||
      PROJECT_ADDITIONAL_INFO_FIELDS.EN

   // ========== STATE ========== //
   const [isEditing, setIsEditing] = useState<boolean>(false)
   const [isSaving, setIsSaving] = useState<boolean>(false)
   const [projectFormData, setProjectFormData] = useState<Record<string, string>>({})
   const loadedProjectId = useRef<string | null>(null)

   // ========== USEEFFECT ========== //
   useEffect(() => {
      // CHỈ LOAD KHI project ID khác với đã load
      if (project && project._id === id && loadedProjectId.current !== id) {
         console.log('Loading additional info data for project:', id)
         console.log('Project data:', project)

         // Initialize form data with default structure
         const initialData: Record<string, string> = {}
         fields.forEach((field) => {
            initialData[field.id] = ''
         })

         // Fill in data from project if available
         if (project.additional_infos && project.additional_infos.length > 0) {
            console.log('Project additional_infos:', project.additional_infos)

            project.additional_infos.forEach((item: any) => {
               // Kiểm tra khớp giữa tên field trong additional_infos và trong fields
               const matchingField = fields.find(
                  (field) => field.name === item.name || field.value === item.name || field.name === item.value
               )

               if (matchingField) {
                  initialData[matchingField.id] = item.content
                  console.log(`Matched field ${matchingField.id} with value ${item.content}`)
               } else {
                  console.log(`No match found for field: ${item.name}`)
               }
            })
         }

         console.log('Initial form data:', initialData)
         setProjectFormData(initialData)
         loadedProjectId.current = id || null
      }
   }, [project, fields, id])

   // ========== HANDLE FUNCTIONS ========== //
   const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isEditing) return

      const { name, value } = e.target
      console.log('Textarea change:', { name, value })

      setProjectFormData((prev) => ({
         ...prev,
         [name]: value,
      }))
   }

   const toggleEdit = () => {
      setIsEditing(!isEditing)
   }

   const handleSaveChanges = async () => {
      setIsSaving(true)

      try {
         // Prepare data from fields
         const fieldData: AdditionalInfo[] = []
         fields.forEach((field) => {
            if (projectFormData[field.id]) {
               fieldData.push({
                  name: field.name,
                  content: projectFormData[field.id],
               })
            }
         })

         console.log('Sending additional info data:', fieldData)

         // Update project additional info
         await updateProjectAdditionalInfos(id!, {
            additional_infos: fieldData,
         })

         // Post activity log
         await postProjectDetailsActivitiesAdditionalInfo(id!, {
            additional_infos: fieldData,
         })

         toast.success('Update additional information successfully!')

         setIsEditing(false)
      } catch (error: any) {
         console.error('Save additional info error:', error)

         // Hiển thị lỗi chi tiết từ backend nếu có
         if (error.response?.data?.detail) {
            const errorDetail = error.response.data.detail
            const errorMessages = Object.values(errorDetail).join(', ')
            toast.error(`Validation error: ${errorMessages}`)
         } else {
            toast.error('Failed to update additional information. Please try again.')
         }
      } finally {
         setIsSaving(false)
      }
   }

   return {
      // Data
      fields,
      isEditing,
      isSaving,
      projectFormData,
      isLoadingUpdateMyProject,

      // Functions
      handleChange,
      toggleEdit,
      handleSaveChanges,
   }
}

// Export types for component
export type { Field, AdditionalInfo }
