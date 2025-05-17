import React from 'react'
import Skeleton from 'react-loading-skeleton'
import styles from './styles.module.scss'
import 'react-loading-skeleton/dist/skeleton.css'

interface ProjectInvitationsSkeletonProps {
   count: number
}

const ProjectInvitationsSkeleton: React.FC<ProjectInvitationsSkeletonProps> = ({ count }) => {
   return Array(count)
      .fill(0)
      .map((_, index) => (
         <div className={styles.projectInvitationsSkeletonWrap} key={index}>
            <Skeleton height={'100%'} />
         </div>
      ))
}

export default ProjectInvitationsSkeleton
