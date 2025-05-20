import React, { useCallback, useEffect, useRef, useState } from 'react'
import RightSidebar from 'components/common/RightSidebar'
import ActiveBanner from './components/ActiveBanner'
import SearchProjectHeader from './components/SearchProjectHeader'
import ActivateHeader from './components/ActivateHeader'
import { useDispatch, useSelector } from 'react-redux'
import { getAccessToMyProjects } from 'api/activity'
import { getListMyProjects, getListProjectsParticipated } from 'api/project'
import { RootState } from 'store/types'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

const action = (project: string) => {
   return (
      <div>
         has accessed your <b>{project}</b> project
      </div>
   )
}

let hasInitialized = false

const Projects: React.FC = () => {
   const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>()

   // ========== STATE FROM REDUX STORE ========== //
   const {
      myProjects,
      paginationListMyProjects,
      isLoadingGetListMyProjects,
      projectsParticipated,
      paginationProjectsParticipated,
   } = useSelector((state: RootState) => state.project)

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
   // Chỉ gọi API một lần duy nhất, không phụ thuộc vào re-render
   useEffect(() => {
      // Chặn gọi API khi Strict Mode gây ra double-mounting
      if (hasInitialized) return
      hasInitialized = true

      const initializeData = () => {
         // Tải dữ liệu "My Projects" ban đầu
         if (myProjects.length === 0) {
            console.log('Calling API getListMyProjects')
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

   return (
      <div className="w-full py-[16px] px-[16px] overflow-y-scroll overflow-x-hidden" ref={scrollContainerRef}>
         <ActiveBanner />
         <div className="flex gap-[16px] mt-[16px]">
            <div className="flex flex-col w-full lg:w-10/12">
               <SearchProjectHeader onSearch={handleSearch} />
               <div className="pb-8 px-8 bg-[#fbfbfb] rounded-md mt-[16px] flex-1">
                  <ActivateHeader
                     isBottom={isBottom}
                     setIsBottom={setIsBottom}
                     onTabChange={handleTabChange}
                     activeTab={activeTab}
                  />
               </div>
            </div>
            <RightSidebar activities={accessToMyProjects} action={action} />
         </div>
      </div>
   )
}

export default Projects
