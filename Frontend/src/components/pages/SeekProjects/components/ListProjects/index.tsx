import { accessToProject } from '~/api/activity'
import { seekProjects } from '~/api/project'
import PaginationCustom from 'components/UI/PaginationCustom'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Project } from 'types'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import ProjectGrid from './ProjectGrid'
import ProjectList from './ProjectList'
import { ROUTE_CONFIG } from '~/config/constants'

interface ListProjectsProps {
   action: 'grid' | 'list'
}

interface PageData {
   page: number
   pageSize: number
}

const ListProjects = ({ action }: ListProjectsProps) => {
   const dispatch = useAppDispatch()
   const navigate = useNavigate()

   // ========== STATE FROM REDUX ========== //
   const projects = useAppSelector((state) => state.project.projectsBySeek)
   const { paginationSeekProjects, filterSeekProjects } = useAppSelector((state) => state.project)

   // ========== HANDLE FUNCTION ========== //
   const onPageChange = (pageData: PageData) => {
      dispatch(
         seekProjects({
            ...filterSeekProjects,
            page: pageData.page,
            perPage: pageData.pageSize,
         })
      )
   }

   const handleViewProjectDetails = useCallback(
      (project: Project) => {
         dispatch(accessToProject(project._id))
         navigate(ROUTE_CONFIG.USER.PROJECT.PREFIX + project._id)
      },
      [dispatch, navigate]
   )

   // ========== RENDER COMPONENT ========== //
   return (
      <div className="flex flex-col items-center gap-4 mt-6">
         {(() => {
            switch (action) {
               case 'grid':
                  return (
                     <ul className="grid w-full grid-cols-1 gap-10 pl-0 mt-4 md:grid-cols-2 lg:grid-cols-3">
                        {projects.map((project: Project) => (
                           <ProjectGrid
                              project={project}
                              key={project._id}
                              handleViewProjectDetails={handleViewProjectDetails}
                           />
                        ))}
                     </ul>
                  )
               case 'list':
                  return (
                     <ul className="flex flex-col w-full gap-6 pl-0 mt-4">
                        {projects.map((project: Project) => (
                           <ProjectList
                              project={project}
                              key={project._id}
                              handleViewProjectDetails={handleViewProjectDetails}
                           />
                        ))}
                     </ul>
                  )
               default:
                  return null
            }
         })()}
         <div className="flex justify-center w-full pb-10">
            <PaginationCustom pagination={paginationSeekProjects} onPageChange={onPageChange} />
         </div>
      </div>
   )
}

export default ListProjects
