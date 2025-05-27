import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateProjectRevenue } from 'api/project'
import { postProjectDetailsActivitiesRevenue } from 'api/activity'
import { RootState } from '~/store'
import { toast } from 'sonner'

// Define types for the hook
interface FormRevenue {
   date: string
   amount: string | number
   currency: string[]
}

interface SelectEvent {
   value: string[]
}

export const useEditRevenue = () => {
   const params = useParams<{ id: string }>()
   const { id } = params

   // ========== STATE FROM REDUX STORE ========== //
   const { myProjectDetails, isLoadingUpdateMyProject } = useSelector((state: RootState) => state.project)
   const project = myProjectDetails

   // ========== STATE ========== //
   const [formData, setFormData] = useState<FormRevenue[]>([{ date: '', amount: '', currency: [] }])
   const loadedProjectId = useRef<string | null>(null)

   // ========== USEEFFECT ========== //
   useEffect(() => {
      // CHỈ LOAD KHI project ID khác với đã load
      if (project && project._id === id && loadedProjectId.current !== id) {
         console.log('Loading data for project:', id)

         if (project.revenues && project.revenues.length > 0) {
            setFormData(
               project.revenues.map((item: any) => ({
                  date: new Date(item.date).toISOString().slice(0, 7),
                  amount: item.amount.toString(),
                  currency: [item.currency],
               }))
            )
         } else {
            setFormData([{ date: '', amount: '', currency: [] }])
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

   const handleAddRevenue = () => {
      // VERIFY - kiểm tra form hiện tại đã điền đủ chưa
      const hasEmptyFields = formData.some(
         (item) => !item.date || !item.amount || !item.currency || item.currency.length === 0
      )

      if (hasEmptyFields) {
         toast.error('Please fill in all fields before adding a new revenue.')
         return
      }

      setFormData([...formData, { date: '', amount: '', currency: [] }])
   }

   const handleRemoveForm = (index: number) => {
      const newForm = formData.filter((_, i) => i !== index)
      setFormData(newForm)
   }

   const handleSaveChanges = async () => {
      try {
         // Validate và format data trước khi gửi
         const validRevenues = formData
            .filter((item) => item.date && item.amount && item.currency && item.currency.length > 0)
            .map((item) => {
               // Format date thành YYYY-MM-DD format
               const dateValue = item.date + '-01'

               return {
                  date: dateValue,
                  amount: parseFloat(item.amount.toString()),
                  currency: item.currency[0] || item.currency,
               }
            })

         if (validRevenues.length === 0) {
            toast.error('Please fill in all revenue fields (date, amount, and currency).')
            return
         }

         console.log('Sending revenues data:', validRevenues)
         await updateProjectRevenue(id!, {
            revenues: validRevenues,
         })

         await postProjectDetailsActivitiesRevenue(id!, {
            revenues: validRevenues,
         })

         toast.success('Update project revenue successfully!')
      } catch (error: any) {
         console.error('Save revenue error:', error)

         // Hiển thị lỗi chi tiết từ backend nếu có
         if (error.response?.data?.detail) {
            const errorDetail = error.response.data.detail
            const errorMessages = Object.values(errorDetail).join(', ')
            toast.error(`Validation error: ${errorMessages}`)
         } else {
            toast.error('Failed to update project revenue. Please try again.')
         }
      }
   }

   return {
      // Data
      formData,
      isLoadingUpdateMyProject,

      // Functions
      handleChange,
      handleAddRevenue,
      handleRemoveForm,
      handleSaveChanges,
   }
}

// Export types for component
export type { FormRevenue, SelectEvent }
