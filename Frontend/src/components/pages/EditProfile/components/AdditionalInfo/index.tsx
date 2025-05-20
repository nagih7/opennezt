import { Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProfileCard from '../ProfileCard'
import ProfileEditMenu from '../ProfileEditMenu'
import ActionBar from '../ActionBar'
import { IconlyDocument, IconlyEdit } from 'components/UI/Iconly'
import {
   createProfileAdditionalInfo,
   updateProfileAdditionalInfo,
   deleteProfileAdditionalInfo,
   getProfile,
} from 'api/profile'
import TextAreaCustom from 'components/UI/TextAreaCustom'
import { PROFILE_ADDITIONAL_INFO_FIELDS } from 'utils/constants/additionalInfor'
import { RootState } from '~/store'

// Định nghĩa các interfaces
interface Field {
   id: string
   name: string
   placeholder: string
   backgroundColor: string
}

interface AdditionalInfo {
   _id: string
   name: string
   content?: string
   [key: string]: any
}

interface FormData {
   [key: string]: string
}

interface ExistingData {
   [key: string]: AdditionalInfo | null
}

type AppDispatch = any // Tạm thời dùng any, nên thay bằng kiểu từ Redux store thực tế

const AdditionalInfo: React.FC = () => {
   const dispatch = useDispatch<AppDispatch>()

   // ========== STATE FROM REDUX STORE ========== //
   const { profile } = useSelector((state: RootState) => state.profile)
   const { additional_infos = [] } = profile || {}
   const { language } = useSelector((state: RootState) => state.app) || { language: 'EN' }

   // Sử dụng fields từ constant thay vì useMemo
   const fields: Field[] =
      PROFILE_ADDITIONAL_INFO_FIELDS[language as keyof typeof PROFILE_ADDITIONAL_INFO_FIELDS] ||
      PROFILE_ADDITIONAL_INFO_FIELDS.EN

   // ========== STATE MANAGEMENT ========== //
   const [formData, setFormData] = useState<FormData>({})
   const [existingData, setExistingData] = useState<ExistingData>({})
   const [isSaving, setIsSaving] = useState<boolean>(false)
   const [isEditing, setIsEditing] = useState<boolean>(false)

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
      if (!profile) dispatch(getProfile())
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [dispatch])

   useEffect(() => {
      if (additional_infos && additional_infos.length > 0) {
         setFormData((prevFormData) => {
            const newFormData = { ...prevFormData }

            fields.forEach((field) => {
               const info = additional_infos.find((info) => info.name === field.name)
               if (info) {
                  newFormData[field.id] = info.content || ''
               }
            })

            return newFormData
         })

         setExistingData((prevExistingData) => {
            const newExistingData = { ...prevExistingData }

            fields.forEach((field) => {
               const info = additional_infos.find((info) => info.name === field.name)
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
      if (!isEditing) return

      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      })
   }

   const toggleEdit = (): void => {
      setIsEditing(!isEditing)
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
            return dispatch(deleteProfileAdditionalInfo(existingData[fieldId]?._id)).then(() => {
               setExistingData((prev) => ({
                  ...prev,
                  [fieldId]: null,
               }))
            })
         }
         // Nếu có dữ liệu - cập nhật hoặc tạo mới
         else if (content) {
            const submitData: { name: string; content: string; _id?: string } = {
               name: fieldName,
               content: content,
            }

            if (existingData[fieldId]) {
               submitData._id = existingData[fieldId]?._id
               return dispatch(updateProfileAdditionalInfo(submitData))
            } else {
               return dispatch(createProfileAdditionalInfo(submitData, 'create'))
            }
         }

         return Promise.resolve() // Không có thay đổi
      })

      Promise.all(promises)
         .then(() => {
            setIsSaving(false)
            setIsEditing(false)
         })
         .catch(() => {
            setIsSaving(false)
         })
   }

   // ========== COMPONENT RENDER ========== //
   return (
      <div className="flex gap-8 flex-col md:flex-row w-full py-8 px-[16px]">
         <ProfileEditMenu />
         <div className="w-full md:w-8/12">
            <div className="bg-[#ffffff] p-8 hidden md:block rounded-md">
               {/* =========== Profile Card ========== */}
               <ProfileCard />
               {/* =========== Action Bar  ========== */}
               <ActionBar />
            </div>
            <div className="bg-[#ffffff] p-8 rounded-md md:mt-8">
               <div className="pb-[20px] mb-8 border-b-[1px] border-gray-200">
                  <div className="flex items-center justify-between">
                     <div>
                        <h4 className="text-xl font-semibold">Additional Information</h4>
                        <p className="mt-1 text-sm text-gray-600">
                           Add more details about your professional background and career aspirations <br />
                           <strong className="font-bold">Note: max 500 characters for each field</strong>
                        </p>
                     </div>
                  </div>
               </div>

               {/* Direct input fields instead of a modal */}
               <div className="overflow-hidden border rounded-md">
                  <table className="w-full">
                     <tbody>
                        {/* Render fields dynamically from fields array */}
                        {fields.map((field, index) => (
                           <tr key={field.id}>
                              <td
                                 className={`p-4 ${index < fields.length - 1 ? 'border-b border-gray-200' : ''} ${
                                    field.backgroundColor
                                 }`}
                              >
                                 <div className="flex items-center justify-between mb-2">
                                    <label htmlFor={field.id} className="font-medium text-gray-700">
                                       {field.name}
                                    </label>
                                    {!isEditing && index === 0 && (
                                       <Button
                                          onClick={toggleEdit}
                                          className="bg-[#2f65b9] text-white px-3 py-1 rounded-md"
                                          size="sm"
                                       >
                                          <IconlyEdit size={18} color="#ffffff" backgroundColor={undefined} />
                                       </Button>
                                    )}
                                 </div>
                                 <TextAreaCustom
                                    id={field.id}
                                    resize="none"
                                    placeholder={field.placeholder}
                                    name={field.id}
                                    onChange={handleChange}
                                    value={formData[field.id] || ''}
                                    rows={4}
                                    disabled={!isEditing}
                                    nomax={true}
                                 />
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>

               {isEditing && (
                  <div className="flex justify-end mt-4 space-x-3">
                     <Button onClick={toggleEdit} className="px-6 py-2 text-white bg-gray-400 rounded-md">
                        Cancel
                     </Button>
                     <Button
                        onClick={handleSaveAll}
                        loading={isSaving}
                        loadingText="Saving..."
                        className="bg-[#2f65b9] text-white px-6 py-2 rounded-md"
                     >
                        <span className="mr-2">
                           <IconlyDocument size={18} color="#ffffff" />
                        </span>{' '}
                        Save
                     </Button>
                  </div>
               )}
            </div>
         </div>
      </div>
   )
}

export default AdditionalInfo
