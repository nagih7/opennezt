import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getListMyProjects } from 'api/project'
import ProjectBox from './ProjectBox'
import { RootState } from 'store/types'
import { AppDispatch } from 'store/configureStore'

interface MyProjectsProps {
   isBottom: boolean
   setIsBottom: (value: boolean) => void
}

const MyProjects: React.FC<MyProjectsProps> = ({ isBottom, setIsBottom }) => {
   const dispatch = useDispatch<AppDispatch>()

   // ========== STATE FROM REDUX ========== //
   const { myProjects, paginationListMyProjects, isLoadingGetListMyProjects } = useSelector(
      (state: RootState) => state.project
   )

   // LOẠI BỎ useEffect ban đầu để tránh gọi API trùng lặp
   // Component cha (Project/index.tsx) đã xử lý việc tải dữ liệu ban đầu

   // Theo dõi sự kiện scroll
   useEffect(() => {
      if (isBottom && !isLoadingGetListMyProjects) {
         // Call API hoặc load thêm dữ liệu khi scroll xuống cuối
         const nextPage = paginationListMyProjects.currentPage + 1 // Chuyển thành number
         dispatch(
            getListMyProjects({
               ...paginationListMyProjects,
               currentPage: nextPage,
            })
         )
         setIsBottom(false)
      }
   }, [isBottom, dispatch, paginationListMyProjects, setIsBottom, isLoadingGetListMyProjects])

   return (
      <>
         {myProjects && myProjects.length === 0 && !isLoadingGetListMyProjects && (
            <div className="flex flex-col items-center justify-center">
               <img
                  alt="Not found"
                  src="https://homepage.momocdn.net/next-js/_next/static/public/cinema/not-found.svg"
                  className="object-cover w-[200px] h-[200px]"
               />
               <p className="text-2xl text-center font-semibold text-[#6f7f92] ">
                  Create a project or participate in a project
               </p>
            </div>
         )}
         <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
            {myProjects && myProjects.length > 0 ? (
               myProjects.map((project, index) => <ProjectBox project={project} key={index} />)
            ) : (
               <div className="hidden text-center text-gray-500 "></div>
            )}
         </div>
         {isLoadingGetListMyProjects && <div className="text-center">Loading...</div>}
      </>
   )
}

export default MyProjects
