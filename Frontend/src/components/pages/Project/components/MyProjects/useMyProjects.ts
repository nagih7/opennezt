import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getListMyProjects } from 'api/project'
import { RootState } from 'store/types'
import { AppDispatch } from '~/store'

export interface UseMyProjectsProps {
   isBottom: boolean
   setIsBottom: (value: boolean) => void
}

export const useMyProjects = ({ isBottom, setIsBottom }: UseMyProjectsProps) => {
   const dispatch = useDispatch<AppDispatch>()

   // ========== STATE FROM REDUX ========== //
   const { myProjects, paginationListMyProjects, isLoadingGetListMyProjects } = useSelector(
      (state: RootState) => state.project
   )

   // Theo dõi sự kiện scroll
   useEffect(() => {
      if (isBottom && !isLoadingGetListMyProjects) {
         // Call API hoặc load thêm dữ liệu khi scroll xuống cuối
         const nextPage = paginationListMyProjects.currentPage + 1
         dispatch(
            getListMyProjects({
               ...paginationListMyProjects,
               currentPage: nextPage,
            })
         )
         setIsBottom(false)
      }
   }, [isBottom, dispatch, paginationListMyProjects, setIsBottom, isLoadingGetListMyProjects])

   return {
      myProjects,
      isLoadingGetListMyProjects,
   }
}
