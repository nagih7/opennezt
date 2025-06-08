import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getMyProjectDetails, updateProjectSector } from '~/api/project'
import { getIndustryFramework, getStageFrameworkDirect } from '~/api/user'
import { postProjectDetailsActivitiesSector } from '~/api/activity'
import { AppDispatch, RootState } from '~/store'
import { toast } from 'sonner'
import { createListCollection } from '@chakra-ui/react'

// Define types for the hook
interface Industry {
   _id: string
   name?: string
}

interface Stage {
   _id: string
   name?: string
}

interface FormData {
   industries: string[]
   stage: string[]
}

interface SelectEvent {
   value: string[]
}

export const useEditStage = () => {
   const dispatch = useDispatch<AppDispatch>()
   const params = useParams<{ id: string }>()
   const { id } = params

   // ========== STATE FROM REDUX STORE ========== //
   const { myProjectDetails, isLoadingUpdateMyProject } = useSelector((state: RootState) => state.project)
   const project = myProjectDetails

   // ========== LOCAL STATE FOR FRAMEWORKS ========== //
   const [industryFramework, setIndustryFramework] = useState<any>(
      createListCollection({
         items: [],
      })
   )
   const [stageFramework, setStageFramework] = useState<any>(
      createListCollection({
         items: [],
      })
   )

   // ========== STATE ========== //
   const [formData, setFormData] = useState<FormData>({
      industries: [],
      stage: [],
   })
   const loadedProjectId = useRef<string | null>(null)

   // ========== FETCH FRAMEWORKS ========== //
   const fetchIndustryFramework = async () => {
      try {
         const response = await getIndustryFramework()
         if (response && response.data) {
            setIndustryFramework(
               createListCollection({
                  items: response.data.map((industry: any) => ({
                     label: industry.name,
                     value: industry._id,
                  })),
               })
            )
         }
      } catch (error) {
         console.error('Error fetching industry framework:', error)
      }
   }

   const fetchStageFramework = async () => {
      try {
         const response = await getStageFrameworkDirect()
         if (response && response.data) {
            setStageFramework(
               createListCollection({
                  items: response.data.map((stage: any) => ({
                     label: stage.name,
                     value: stage._id,
                  })),
               })
            )
         }
      } catch (error) {
         console.error('Error fetching stage framework:', error)
      }
   } // ========== USE EFFECT ========== //
   useEffect(() => {
      if (!project || project?.id !== id) {
         dispatch(getMyProjectDetails(id!))
      }
   }, [dispatch, id])

   useEffect(() => {
      // CHỈ LOAD KHI project ID khác với đã load
      if (project && project._id === id && loadedProjectId.current !== id) {
         console.log('Loading stage data for project:', id)

         setFormData({
            industries: project?.industries?.map((item: any) => item._id) || [],
            stage: project?.stage?._id ? [project.stage._id] : [],
         })

         loadedProjectId.current = id || null
      }
   }, [project, id])

   useEffect(() => {
      if (!industryFramework.items?.length) {
         fetchIndustryFramework()
      }
   }, [industryFramework.items?.length])

   useEffect(() => {
      if (!stageFramework.items?.length) {
         fetchStageFramework()
      }
   }, [stageFramework.items?.length])

   // ========== HANDLE CHANGE FUNCTION ========== //
   const handleChange = (event: SelectEvent, nameSelect?: string) => {
      console.log('handleChange called:', { nameSelect, event })

      if (nameSelect === 'industries') {
         if (event.value.length > 2) {
            // toaster.create({
            //    type: 'error',
            //    title: 'You can only select up to 2 industries',
            // })
            return
         }
      }

      if (nameSelect) {
         setFormData((prev) => ({
            ...prev,
            [nameSelect]: event.value,
         }))
         console.log('Updated form data:', { ...formData, [nameSelect]: event.value })
      }
   }

   const handleSaveChanges = async () => {
      try {
         // Validate data trước khi gửi
         if (formData.industries.length === 0) {
            toast.error('Please select at least one industry.')
            return
         }

         if (formData.stage.length === 0) {
            toast.error('Please select a stage.')
            return
         }

         console.log('Sending stage data:', {
            industries: formData.industries,
            stage: formData.stage[0],
         })

         await updateProjectSector(id!, {
            industries: formData.industries,
            stage: formData.stage[0],
         })

         await postProjectDetailsActivitiesSector(id!, {
            industries: formData.industries,
            stage: formData.stage[0],
         })

         toast.success('Update project sector successfully!')
      } catch (error: any) {
         console.error('Save stage error:', error)

         // Hiển thị lỗi chi tiết từ backend nếu có
         if (error.response?.data?.detail) {
            const errorDetail = error.response.data.detail
            const errorMessages = Object.values(errorDetail).join(', ')
            toast.error(`Validation error: ${errorMessages}`)
         } else {
            toast.error('Failed to update project sector. Please try again.')
         }
      }
   }

   return {
      // Data
      formData,
      isLoadingUpdateMyProject,
      industryFramework,
      stageFramework,

      // Functions
      handleChange,
      handleSaveChanges,
   }
}

// Export types for component
export type { Industry, Stage, FormData, SelectEvent }
