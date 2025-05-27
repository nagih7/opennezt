import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getListProjectsParticipated } from 'api/project'
import { RootState } from 'store/types'
import { AppDispatch } from '~/store'

export interface UseProjectsParticipatedProps {
   isBottom: boolean
   setIsBottom: (value: boolean) => void
}

export const useProjectsParticipated = ({ isBottom, setIsBottom }: UseProjectsParticipatedProps) => {
   const dispatch = useDispatch<AppDispatch>()

   // ========== STATE FROM REDUX ========== //
   const { projectsParticipated, paginationProjectsParticipated, isLoadingGetListProjectsParticipated } = useSelector(
      (state: RootState) => state.project
   )

   // ========== USE EFFECT ========== //
   useEffect(() => {
      if (!projectsParticipated || projectsParticipated.length === 0) {
         dispatch(getListProjectsParticipated(paginationProjectsParticipated))
      }
      // eslint-disable-next-line
   }, [dispatch])

   // Theo dõi sự kiện scroll
   useEffect(() => {
      if (isBottom) {
         // Call API hoặc load thêm dữ liệu
         dispatch(
            getListProjectsParticipated({
               ...paginationProjectsParticipated,
               currentPage: parseInt(paginationProjectsParticipated.currentPage) + 1,
            })
         )
         setIsBottom(false)
      }
   }, [isBottom, dispatch, paginationProjectsParticipated, setIsBottom])

   return {
      projectsParticipated,
      isLoadingGetListProjectsParticipated,
   }
}
