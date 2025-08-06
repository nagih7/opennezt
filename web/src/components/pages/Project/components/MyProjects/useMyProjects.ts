import { useEffect, useState } from 'react'
import { getListMyProjects } from '~/api/project'

export interface UseMyProjectsProps {
   isBottom: boolean
   setIsBottom: (value: boolean) => void
}

export const useMyProjects = ({ isBottom, setIsBottom }: UseMyProjectsProps) => {
   // ========== STATE ========== //
   const [myProjects, setMyProjects] = useState<any[]>([])
   const [paginationListMyProjects, setPaginationListMyProjects] = useState({
      currentPage: 1,
      perPage: 6,
      totalPage: 1,
      totalRecord: 0,
   })
   const [isLoadingGetListMyProjects, setIsLoadingGetListMyProjects] = useState<boolean>(false)

   // ========== EFFECTS ========== //
   useEffect(() => {
      // Chỉ tải dữ liệu khi component được mount lần đầu
      if (myProjects.length === 0) {
         loadProjects(1, true)
      }
   }, [])

   useEffect(() => {
      if (isBottom && !isLoadingGetListMyProjects) {
         getListMyProjects({
            ...paginationListMyProjects,
            currentPage: paginationListMyProjects.currentPage + 1,
         })

         setIsBottom(false)
      }
   }, [isBottom, paginationListMyProjects, setIsBottom, isLoadingGetListMyProjects])

   const loadProjects = async (page: number, isInitial: boolean = false) => {
      try {
         setIsLoadingGetListMyProjects(true)

         const response = await getListMyProjects({
            currentPage: page,
            perPage: paginationListMyProjects.perPage,
            keySearch: '',
         })

         if (response?.status === 200 && response?.data) {
            const { projects } = response.data

            if (isInitial) {
               // Gán dữ liệu ban đầu
               setMyProjects(projects || [])
            } else {
               // Thêm dữ liệu vào danh sách hiện tại (cho infinite scroll)
               setMyProjects((prev) => [...prev, ...(projects || [])])
            }
         }
      } catch (error) {
         console.error('Lỗi khi tải projects:', error)
      } finally {
         setIsLoadingGetListMyProjects(false)
      }
   }

   return {
      myProjects,
      setMyProjects,
      paginationListMyProjects,
      setPaginationListMyProjects,
      isLoadingGetListMyProjects,
      setIsLoadingGetListMyProjects,
      loadProjects,
   }
}
