import { useEffect, useState } from 'react'
import {
   createProfileAdditionalInfo,
   deleteProfileAdditionalInfo,
   getProfile,
   updateProfileAdditionalInfo,
} from '~/api/profile'
import { ExistingData, Field, FormData } from '../types'
import { PROFILE_ADDITIONAL_INFO_FIELDS } from '~/config/constants/profile'
import { RootState } from '~/store'
import { useSelector } from 'react-redux'
import { toast } from '~/components/UI/toast'

const useAdditionalInfo = () => {
   // ========== STATE FROM REDUX STORE ========== //
   const { language } = useSelector((state: RootState) => state.app) || { language: 'EN' }

   // Sử dụng fields từ constant thay vì useMemo
   const fields: Field[] =
      PROFILE_ADDITIONAL_INFO_FIELDS[language as keyof typeof PROFILE_ADDITIONAL_INFO_FIELDS] ||
      PROFILE_ADDITIONAL_INFO_FIELDS.EN

   // ========== STATE MANAGEMENT ========== //
   const [formData, setFormData] = useState<FormData>({})
   const [existingData, setExistingData] = useState<ExistingData>({})
   const [isSaving, setIsSaving] = useState<boolean>(false)

   // ========== Profile Data Fetching ========== //
   const [profile, setProfile] = useState<any>(null)
   const { additional_infos = [] } = profile || {}

   const fetchProfile = async () => {
      const response = await getProfile()
      if (response && response.data) {
         setProfile(response.data)
      }
   }

   useEffect(() => {
      if (!profile) {
         if (profile === null) {
            fetchProfile()
         }
      }
   }, [profile, getProfile])
   // Initialize form state based on fields
   useEffect(() => {
      const initialFormData: FormData = {}
      const initialExistingData: ExistingData = {}

      fields.forEach((field) => {
         initialFormData[field.id] = ''
         initialExistingData[field.id] = null
      })

      setFormData(initialFormData)
      setExistingData(initialExistingData)
   }, [fields])

   // ========== USE EFFECT ========== //

   useEffect(() => {
      if (additional_infos && additional_infos.length > 0) {
         setFormData((prevFormData) => {
            const newFormData = { ...prevFormData }

            fields.forEach((field) => {
               const info = additional_infos.find((info: any) => info.name === field.name)
               if (info) {
                  newFormData[field.id] = info.content || ''
               }
            })

            return newFormData
         })

         setExistingData((prevExistingData) => {
            const newExistingData = { ...prevExistingData }

            fields.forEach((field) => {
               const info = additional_infos.find((info: any) => info.name === field.name)
               if (info) {
                  newExistingData[field.id] = info
               }
            })

            return newExistingData
         })
      }
   }, [additional_infos, fields])

   // ========== HANDLE CHANGE FUNCTION ========== //
   const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      })
   }

   const handleCreateProfileAdditionalInfo = async (submitData: {
      name: string
      content: string
      _id?: string
   }): Promise<void> => {
      const response = await createProfileAdditionalInfo(submitData, 'create')
      try {
         if (response.status === 200 || response.status === 201) {
            toast.success(`${response.message}`)
            setProfile((prevProfile: any) => ({
               ...prevProfile,
               additional_infos: [...prevProfile.additional_infos, response.data],
            }))
         }
      } catch (error) {
         toast.error(`${response.message}`)
      }
   }

   const handleUpdateProfileAdditionalInfo = async (submitData: {
      name: string
      content: string
      _id?: string
   }): Promise<void> => {
      const response = await updateProfileAdditionalInfo(submitData)
      try {
         if (response.status === 200 || response.status === 201) {
            toast.success(`${response.message}`)
            setProfile((prevProfile: any) => ({
               ...prevProfile,
               additional_infos: prevProfile.additional_infos.map((item: any) =>
                  item._id === response.data._id ? response.data : item
               ),
            }))
         }
      } catch (error) {
         toast.error(`${response.message}`)
      }
   }

   const handleDeleteProfileAdditionalInfo = async (id: string): Promise<void> => {
      const response = await deleteProfileAdditionalInfo(id)
      try {
         if (response.status === 200 || response.status === 201) {
            toast.success(`${response.message}`)
            setProfile((prevProfile: any) => ({
               ...prevProfile,
               additional_infos: prevProfile.additional_infos.filter((item: any) => item._id !== response.data),
            }))
         }
         window.location.reload() // Reload to reflect changes
      } catch (error) {
         toast.error(`${response.message}`)
      }
   }

   const handleSaveAll = (): void => {
      setIsSaving(true)

      // Get all field IDs from fields array
      const fieldIds = fields.map((field) => field.id)

      // Process each field
      const promises = fieldIds.map((fieldId) => {
         const fieldInfo = fields.find((f) => f.id === fieldId)
         if (!fieldInfo) return Promise.resolve()

         const fieldName = fieldInfo.name
         const content = formData[fieldId]

         // Nếu trường rỗng và có dữ liệu hiện tại - xóa
         if (!content && existingData[fieldId]) {
            return handleDeleteProfileAdditionalInfo(existingData[fieldId]?._id)
         }
         // Nếu có dữ liệu - cập nhật hoặc tạo mới
         else if (content) {
            const submitData: { name: string; content: string; _id?: string } = {
               name: fieldName,
               content: content,
            }

            if (existingData[fieldId]) {
               submitData._id = existingData[fieldId]?._id
               return handleUpdateProfileAdditionalInfo(submitData)
            } else {
               return handleCreateProfileAdditionalInfo(submitData)
            }
         }

         return Promise.resolve() // Không có thay đổi
      })

      Promise.all(promises)
         .then(() => {
            setIsSaving(false)
         })
         .catch(() => {
            setIsSaving(false)
         })
   }
   return {
      fields,
      formData,
      existingData,
      isSaving,
      handleChange,
      handleSaveAll,
   }
}

export default useAdditionalInfo
