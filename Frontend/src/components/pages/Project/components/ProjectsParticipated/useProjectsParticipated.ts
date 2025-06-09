import { useEffect, useState } from 'react'
import { getListProjectsParticipated } from '~/api/project'

export interface UseProjectsParticipatedProps {
   isBottom: boolean
   setIsBottom: (value: boolean) => void
}

export const useProjectsParticipated = ({ isBottom, setIsBottom }: UseProjectsParticipatedProps) => {
   // ========== STATE ========== //
   const [projectsParticipated, setProjectsParticipated] = useState<any[]>([])
   const [paginationProjectsParticipated, setPaginationProjectsParticipated] = useState({
      currentPage: 1,
      perPage: 6,
      totalPage: 1,
      totalRecord: 0,
   })
   const [isLoadingGetListProjectsParticipated, setIsLoadingGetListProjectsParticipated] = useState<boolean>(false)

   const loadProjectsParticipated = async (page: number, isInitial: boolean = false) => {
      try {
         setIsLoadingGetListProjectsParticipated(true)

         const response = await getListProjectsParticipated({
            currentPage: page,
            perPage: paginationProjectsParticipated.perPage,
            keySearch: '',
         })

         if (response?.status === 200 && response?.data) {
            const { projects } = response.data
            console.log('Projects participated loaded:', projects)

            if (isInitial) {
               // Gán dữ liệu ban đầu
               setProjectsParticipated(projects || [])
            } else {
               // Thêm dữ liệu vào danh sách hiện tại (cho infinite scroll)
               setProjectsParticipated((prev) => [...prev, ...(projects || [])])
            }
         }
      } catch (error) {
         console.error('Error loading projects participated:', error)
      } finally {
         setIsLoadingGetListProjectsParticipated(false)
      }
   }

   // ========== USE EFFECT ========== //
   useEffect(() => {
      // Chỉ tải dữ liệu khi component được mount lần đầu
      if (projectsParticipated.length === 0) {
         loadProjectsParticipated(1, true)
      }
   }, [])

   useEffect(() => {
      if (
         isBottom &&
         !isLoadingGetListProjectsParticipated &&
         paginationProjectsParticipated.currentPage < paginationProjectsParticipated.totalPage
      ) {
         loadProjectsParticipated(paginationProjectsParticipated.currentPage + 1, false)
         setIsBottom(false)
      }
   }, [isBottom, paginationProjectsParticipated, setIsBottom, isLoadingGetListProjectsParticipated])

   return {
      projectsParticipated,
      isLoadingGetListProjectsParticipated,
      setProjectsParticipated,
      setPaginationProjectsParticipated,
   }
}
