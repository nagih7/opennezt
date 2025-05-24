import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAccessToMyProjects } from 'api/activity'
import { getListMyProjects, getListProjectsParticipated } from 'api/project'
import { AppDispatch, RootState } from 'store/types'

let hasInitialized = false

export const useProjects = () => {
   const dispatch = useDispatch<AppDispatch>()

   // ========== STATE FROM REDUX STORE ========== //
   const { myProjects, paginationListMyProjects, isLoadingGetListMyProjects, paginationProjectsParticipated } =
      useSelector((state: RootState) => state.project)

   const { accessToMyProjects } = useSelector((state: RootState) => state.activity)

   // ========== STATE ========== //
   const [isBottom, setIsBottom] = useState<boolean>(false)
   const [searchTerm, setSearchTerm] = useState<string>('')
   const [activeTab, setActiveTab] = useState<string>('my-projects')

   // Ref để theo dõi trạng thái khởi tạo - tránh gọi API nhiều lần
   const initializedRef = useRef<{
      myProjects: boolean
      projectsParticipated: boolean
      activities: boolean
   }>({
      myProjects: false,
      projectsParticipated: false,
      activities: false,
   })

   // Ref cho container scroll
   const scrollContainerRef = useRef<HTMLDivElement>(null)

   // ====== KHỞI TẠO DỮ LIỆU ======
   useEffect(() => {
      // Chặn gọi API khi Strict Mode gây ra double-mounting
      if (hasInitialized) return
      hasInitialized = true

      const initializeData = () => {
         // Tải dữ liệu "My Projects" ban đầu
         if (myProjects.length === 0) {
            dispatch(
               getListMyProjects({
                  ...paginationListMyProjects,
                  currentPage: 1,
                  keySearch: '',
               })
            )
         }

         // Tải danh sách activity nếu cần
         if (!accessToMyProjects || accessToMyProjects.length === 0) {
            dispatch(getAccessToMyProjects())
         }
      }

      // Gọi hàm khởi tạo
      initializeData()
   }, [])

   // Hàm kiểm tra cuộn khi người dùng cuộn xuống dưới cùng
   const checkScroll = useCallback(() => {
      if (!scrollContainerRef.current) return

      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current

      const currentPagination = activeTab === 'my-projects' ? paginationListMyProjects : paginationProjectsParticipated

      const isLoading = activeTab === 'my-projects' ? isLoadingGetListMyProjects : false

      if (!isLoading && currentPagination) {
         if (currentPagination.totalPage !== 0 && currentPagination.totalRecord !== 0) {
            const shouldLoadMore =
               scrollTop + clientHeight >= scrollHeight - 50 &&
               currentPagination.currentPage < currentPagination.totalPage

            setIsBottom(shouldLoadMore)
         }
      }
   }, [activeTab, isLoadingGetListMyProjects, paginationListMyProjects, paginationProjectsParticipated])

   // Theo dõi sự kiện scroll
   useEffect(() => {
      const container = scrollContainerRef.current
      if (container) {
         container.addEventListener('scroll', checkScroll)

         return () => {
            container.removeEventListener('scroll', checkScroll)
         }
      }
   }, [checkScroll])

   // Hàm tìm kiếm memoized
   const handleSearch = useCallback(
      (term: string) => {
         // Tránh gọi API nếu searchTerm không thay đổi
         if (term === searchTerm) return

         setSearchTerm(term)

         if (activeTab === 'my-projects') {
            dispatch(
               getListMyProjects({
                  ...paginationListMyProjects,
                  currentPage: 1,
                  keySearch: term,
               })
            )
         } else if (activeTab === 'projects-participated') {
            dispatch(
               getListProjectsParticipated({
                  ...paginationProjectsParticipated,
                  currentPage: 1,
                  keySearch: term,
               })
            )
         }
      },
      [activeTab, dispatch, paginationListMyProjects, paginationProjectsParticipated, searchTerm]
   )

   // Hàm thay đổi tab memoized
   const handleTabChange = useCallback(
      (tab: string) => {
         // Tránh re-render nếu tab không thay đổi
         if (tab === activeTab) return

         setActiveTab(tab)

         // Khi chuyển tab, chỉ tải dữ liệu của tab mới nếu chưa tải
         if (tab === 'projects-participated' && !initializedRef.current.projectsParticipated) {
            initializedRef.current.projectsParticipated = true
            dispatch(
               getListProjectsParticipated({
                  ...paginationProjectsParticipated,
                  currentPage: 1,
                  keySearch: searchTerm,
               })
            )
         }
      },
      [activeTab, dispatch, paginationProjectsParticipated, searchTerm]
   )

   return {
      isBottom,
      setIsBottom,
      activeTab,
      scrollContainerRef,
      accessToMyProjects,
      handleSearch,
      handleTabChange,
   }
}
