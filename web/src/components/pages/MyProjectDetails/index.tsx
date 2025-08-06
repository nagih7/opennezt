import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getMyProjectDetails } from '~/api/project'
import ProjectMenu from './components/ProjectMenu'
import ProjectCard from './components/ProjectCard'
import ProjectOverview from './components/ProjectOverview'
import ProjectManage from './components/ProjectManage'
import Members from './components/Members'
import Sendinvite from './components/Sendinvite'
import { RootState } from 'store/types'
import { AppDispatch } from '~/store'

// Define Project interface based on actual usage in the components
interface Project {
   id: string
   name: string
   description?: string
   logo?: string
   background?: string
   industries?: Array<{ id: string; name: string }>
   stage?: { name: string }
   revenues?: Array<{ date: string; amount: string; currency: string }>
   funding_sources?: Array<{ name: string; amount: string; currency: string }>
   additional_infos?: Array<{ name: string; content: string }>
   members?: Array<{
      user: { name: string; avatar: string }
      team_role: string
      role: string
      friend?: boolean
   }>
}

const MyProjectDetails: React.FC = () => {
   const { id } = useParams<{ id: string }>()
   const dispatch = useDispatch<AppDispatch>()
   // ========== STATE FROM REDUX ========== //
   const project = useSelector((state: RootState) => state.project.myProjectDetails)
   // ========== STATE ========== //
   const [tab, setTab] = useState<string>('overview')

   useEffect(() => {
      window.scrollTo(0, 0)
   }, [])

   useEffect(() => {
      if (id) {
         dispatch(getMyProjectDetails(id))
      }
   }, [id, dispatch])

   return (
      <div className="w-full h-full">
         <ProjectCard project={project} />
         <ProjectMenu setTab={setTab} />
         {tab === 'overview' && <ProjectOverview project={project} />}
         {tab === 'manage' && <ProjectManage />}
         {tab === 'forum' && <ProjectOverview project={project} />}
         {tab === 'members' && <Members />}
         {tab === 'media' && <ProjectOverview project={project} />}
         {tab === 'invite' && <Sendinvite />}
      </div>
   )
}

export default MyProjectDetails
