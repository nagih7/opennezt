import React from 'react'
import styles from './styles.module.scss'
import { useSelector } from 'react-redux'
import ProjectBox from './ProjectBox'
import ProjectInvitationsSkeleton from '../ProjectInvitationsSkeleton'
import { RootState } from '~/store'

interface ProjectsProps {
   inviteeId: string
}

interface Project {
   // Add specific properties based on your project structure
   id: string
   [key: string]: any
}

const Projects: React.FC<ProjectsProps> = ({ inviteeId }) => {
   const { projects, loadingGetProjectInvitations } = useSelector((state: RootState) => state.project)

   return (
      <div className={styles.projectsWrap}>
         {loadingGetProjectInvitations ? (
            <ProjectInvitationsSkeleton count={projects.length} />
         ) : (
            projects.map((project, index) => <ProjectBox key={index} project={project} inviteeId={inviteeId} />)
         )}
      </div>
   )
}

export default Projects
