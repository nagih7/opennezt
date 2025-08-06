import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateProjectFundingSources } from '~/api/project'
import { postProjectDetailsActivitiesFundingSource } from '~/api/activity'
import { RootState } from '~/store'
import { toast } from 'sonner'

// Define types for the hook
interface FundingSource {
   name: string
   amount: string | number
   currency: string
}

interface FormFundingSource {
   name: string[]
   amount: string | number
   currency: string[]
}

interface SelectEvent {
   value: string[]
}

export const useEditFundingSources = () => {
   const params = useParams<{ id: string }>()
   const { id } = params

   // ========== STATE FROM REDUX STORE ========== //
   const { myProjectDetails, isLoadingUpdateMyProject } = useSelector((state: RootState) => state.project)
   const project = myProjectDetails

   // ========== STATE ========== //
   const [formData, setFormData] = useState<FormFundingSource[]>([])
   const loadedProjectId = useRef<string | null>(null)

   // ========== USEEFFECT ========== //
   useEffect(() => {
      // CHỈ LOAD KHI project ID khác với đã load
      if (project && project._id === id && loadedProjectId.current !== id) {
         console.log('Loading funding sources data for project:', id)

         if (project.funding_sources && project.funding_sources.length > 0) {
            setFormData(
               project.funding_sources.map((item: any) => ({
                  name: [item.name],
                  amount: item.amount,
                  currency: [item.currency],
               }))
            )
         } else {
            setFormData([{ name: [], amount: '', currency: [] }])
         }

         loadedProjectId.current = id || null
      }
   }, [project, id])

   // ========== ONCHANGE FUNCTION ========== //
   const handleChange = (e: React.ChangeEvent<HTMLInputElement> | SelectEvent, index: number, nameSelect?: string) => {
      console.log('handleChange called:', { nameSelect, index })

      if (nameSelect) {
         const newForm = formData.map((item, i) => {
            if (i === index) {
               return { ...item, [nameSelect]: (e as SelectEvent).value }
            }
            return item
         })
         console.log('Updated form (select):', newForm)
         setFormData(newForm)
      } else {
         const { name, value } = (e as React.ChangeEvent<HTMLInputElement>).target
         console.log('Input change:', { name, value, index })

         const newForm = formData.map((item, i) => {
            if (i === index) {
               return { ...item, [name]: value }
            }
            return item
         })
         console.log('Updated form (input):', newForm)
         setFormData(newForm)
      }
   }

   const handleAddFundingSource = () => {
      // VERIFY - kiểm tra form hiện tại đã điền đủ chưa
      const hasEmptyFields = formData.some(
         (item) => !item.name || item.name.length === 0 || !item.amount || !item.currency || item.currency.length === 0
      )

      if (hasEmptyFields) {
         toast.error('Please fill in all funding source fields (name, amount, and currency).')
         return
      }

      setFormData([...formData, { name: [], amount: '', currency: [] }])
   }

   const handleRemoveForm = (index: number) => {
      const newForm = formData.filter((_, i) => i !== index)
      setFormData(newForm)
   }

   const handleSaveChanges = async () => {
      try {
         // Validate và format data trước khi gửi
         const validFundingSources = formData
            .filter(
               (item) => item.name && item.name.length > 0 && item.amount && item.currency && item.currency.length > 0
            )
            .map((item) => ({
               name: item.name[0],
               amount: parseFloat(item.amount.toString()),
               currency: item.currency[0],
            }))

         if (validFundingSources.length === 0) {
            toast.error('Please fill in at least one valid funding source.')
            return
         }

         console.log('Sending funding sources data:', validFundingSources)

         await updateProjectFundingSources(id!, {
            funding_sources: validFundingSources,
         })

         await postProjectDetailsActivitiesFundingSource(id!, {
            funding_sources: validFundingSources,
         })

         toast.success('Update project funding sources successfully!')
      } catch (error: any) {
         console.error('Save funding sources error:', error)

         // Hiển thị lỗi chi tiết từ backend nếu có
         if (error.response?.data?.detail) {
            const errorDetail = error.response.data.detail
            const errorMessages = Object.values(errorDetail).join(', ')
            toast.error(`Validation error: ${errorMessages}`)
         } else {
            toast.error('Failed to update project funding sources. Please try again.')
         }
      }
   }

   return {
      // Data
      formData,
      isLoadingUpdateMyProject,

      // Functions
      handleChange,
      handleAddFundingSource,
      handleRemoveForm,
      handleSaveChanges,
   }
}

// Export types for component
export type { FormFundingSource, SelectEvent, FundingSource }
