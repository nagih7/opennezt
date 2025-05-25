import React, { useEffect } from 'react'
import { FaCircleCheck } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux'
import { Avatar } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { getMyProjectDetails } from 'api/project'
import { RootState } from 'store/types' // Add appropriate type for your Redux store

const ProjectCard: React.FC = () => {
   const dispatch = useDispatch()
   const params = useParams<{ id: string }>()
   const { id } = params
   // ========== STATE FROM REDUX STORE ========== //
   const project = useSelector((state: RootState) => state.project.myProjectDetails)

   // ========== USE EFFECT ========== //
   useEffect(() => {
      if (!project || project?._id !== id) {
         dispatch(getMyProjectDetails(id))
      }
      // eslint-disable-next-line
   }, [dispatch, id])
   // ========== COMPONENT RENDER ========== //
   return (
      <div className="flex items-center gap-3 pb-8 border-b-[1px] border-gray-200 mb-8">
         <div>
            <Avatar.Root shape={'rounded'} size={'2xl'}>
               <Avatar.Fallback name={project?.name} />
               <Avatar.Image src={project?.logo} />
            </Avatar.Root>
         </div>
         <div>
            <h4 className="flex items-center">
               {project?.name}
               <FaCircleCheck className="text-[#3897f0] ml-2" />
            </h4>
            <span className="text-[#6f7f92]">
               {project?.created_at ? `Created since ${new Date(project.created_at).getFullYear()}` : ''}
            </span>
         </div>
      </div>
   )
}

export default ProjectCard
