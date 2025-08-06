import { useCallback, useEffect, useRef, useState } from 'react'
import { getAccessToMyProjects } from '~/api/activity'
import { getListMyProjects, getListProjectsParticipated } from '~/api/project'

let hasInitialized = false

export const useProjects = () => {
   // ========== state ========== //
   const [myProjects, setMyProjects] = useState<any[]>([])
   const [paginationListMyProjects, setPaginationListMyProjects] = useState({
      currentPage: 1,
      perPage: 6,
      totalPage: 1,
      totalRecord: 0,
   })
   const [isLoadingGetListMyProjects, setIsLoadingGetListMyProjects] = useState<boolean>(false)
   const [paginationProjectsParticipated, setPaginationProjectsParticipated] = useState({
      currentPage: 1,
      perPage: 6,
      totalPage: 1,
      totalRecord: 0,
   })
   const [accessToMyProjects, setAccessToMyProjects] = useState<any[]>([])

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
   const scrollContainerRef = useRef<HTMLDivElement>(null) // ====== KHỞI TẠO DỮ LIỆU ======
   useEffect(() => {
      // Chặn gọi API khi Strict Mode gây ra double-mounting
      if (hasInitialized) return
      hasInitialized = true

      const initializeData = async () => {
         // Tải dữ liệu "My Projects" ban đầu
         if (myProjects.length === 0) {
            // TODO: Replace with API call using fetch/axios
            await getListMyProjects({
               ...paginationListMyProjects,
               currentPage: 1,
               keySearch: '',
            })
         }

         // Tải danh sách activity nếu cần
         if (!accessToMyProjects || accessToMyProjects.length === 0) {
            // TODO: Replace with API call using fetch/axios
            await getAccessToMyProjects()
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
   }, [checkScroll]) // Hàm tìm kiếm memoized
   const handleSearch = useCallback(
      (term: string) => {
         // Tránh gọi API nếu searchTerm không thay đổi
         if (term === searchTerm) return

         setSearchTerm(term)

         if (activeTab === 'my-projects') {
            getListMyProjects({
               ...paginationListMyProjects,
               currentPage: 1,
               keySearch: term,
            })
         } else if (activeTab === 'projects-participated') {
            getListProjectsParticipated({
               ...paginationProjectsParticipated,
               currentPage: 1,
               keySearch: term,
            })
         }
      },
      [activeTab, paginationListMyProjects, paginationProjectsParticipated, searchTerm]
   ) // Hàm thay đổi tab memoized
   const handleTabChange = useCallback(
      (tab: string) => {
         // Tránh re-render nếu tab không thay đổi
         if (tab === activeTab) return

         setActiveTab(tab)

         // Khi chuyển tab, chỉ tải dữ liệu của tab mới nếu chưa tải
         if (tab === 'projects-participated' && !initializedRef.current.projectsParticipated) {
            initializedRef.current.projectsParticipated = true
            // TODO: Replace with API call using fetch/axios
            // dispatch(
            //    getListProjectsParticipated({
            //       ...paginationProjectsParticipated,
            //       currentPage: 1,
            //       keySearch: searchTerm,
            //    })
            // )
         }
      },
      [activeTab, paginationProjectsParticipated, searchTerm]
   )

   return {
      isBottom,
      setIsBottom,
      activeTab,
      scrollContainerRef,
      accessToMyProjects,
      handleSearch,
      handleTabChange,
      // Additional state and setters for API data
      myProjects,
      setMyProjects,
      paginationListMyProjects,
      setPaginationListMyProjects,
      isLoadingGetListMyProjects,
      setIsLoadingGetListMyProjects,
      paginationProjectsParticipated,
      setPaginationProjectsParticipated,
      setAccessToMyProjects,
   }
}
