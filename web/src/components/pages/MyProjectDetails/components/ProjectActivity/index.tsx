import React, { useEffect } from 'react'
import RightSidebar from '~/components/common/RightSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getProjectDetailsActivities } from '~/api/activity'
import { useParams } from 'react-router-dom'
import { RootState } from 'store/types'
import { AppDispatch } from '~/store'

interface Activity {
   type: {
      name: string
   }
   data: {
      project?: {
         name: string
      }
   }
   timestamp: string
}

// Function to display activity message based on type
const getActivityMessage = (activity: Activity): React.ReactNode => {
   const activityType = activity.type.name
   const projectName = activity.data.project?.name || 'an project'

   switch (activityType) {
      case 'project_activity_basic':
         return (
            <div>
               you has updated <b>basic information</b> of project <b>{projectName}</b>
            </div>
         )
      case 'project_activity_sector':
         return (
            <div>
               you has updated <b>sector</b> of project <b>{projectName}</b>
            </div>
         )
      case 'project_activity_revenue':
         return (
            <div>
               you has updated <b>revenue</b> of project <b>{projectName}</b>
            </div>
         )
      case 'project_activity_funding':
         return (
            <div>
               you has updated <b>funding sources</b> of project <b>{projectName}</b>
            </div>
         )
      case 'project_activity_additional':
         return (
            <div>
               you has updated <b>additional information</b> of project <b>{projectName}</b>
            </div>
         )
      case 'project_activity_logo':
         return (
            <div>
               you has updated <b>logo</b> of project <b>{projectName}</b>
            </div>
         )
      case 'project_activity_background':
         return (
            <div>
               you has updated <b>background</b> of project <b>{projectName}</b>
            </div>
         )
      case 'project_activity_requirement':
         return (
            <div>
               you has updated <b>project requirement</b> of project <b>{projectName}</b>
            </div>
         )
      case 'project_activity_new_member':
         return (
            <div>
               participated in the project <b>{projectName}</b>
            </div>
         )
      default:
         return (
            <div>
               interact with the project <b>{projectName}</b>
            </div>
         )
   }
}

const ProjectActivity: React.FC = () => {
   const dispatch = useDispatch<AppDispatch>()
   const { id } = useParams<{ id: string }>()
   const { projectDetailsActivity } = useSelector((state: RootState) => state.activity)

   // Combine all activities from sub-arrays into a single array and sort by time
   const allActivities = React.useMemo(() => {
      if (!projectDetailsActivity) return []

      // Get all activities from all types and combine them
      const activities = Object.values(projectDetailsActivity).flat() as Activity[]

      // Sort by newest time
      return activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
   }, [projectDetailsActivity])

   useEffect(() => {
      if (id) {
         dispatch(getProjectDetailsActivities(id))
      }
   }, [id, dispatch])

   return <RightSidebar activities={allActivities} action={getActivityMessage} />
}

export default ProjectActivity
