import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import BannerActive from './components/BannerActive'
import ProjectOverview from './components/ProjectOverview'
import ProjectMoreInfo from './components/ProjectMoreInfo'
import { getProjectDetails } from 'api/project'
import { AppDispatch } from 'store/configureStore'

const ProjectDetailsBySeek: React.FC = () => {
   const dispatch = useDispatch<AppDispatch>()
   const { id } = useParams<{ id: string }>()

   useEffect(() => {
      if (id) {
         dispatch(getProjectDetails(id))
      }
   }, [dispatch, id])

   return (
      <>
         <div className="">
            <BannerActive />
            <div className="grid grid-cols-3 gap-6 mt-[3.5rem]">
               <ProjectOverview />
               <ProjectMoreInfo />
            </div>
         </div>
      </>
   )
}
export default ProjectDetailsBySeek
