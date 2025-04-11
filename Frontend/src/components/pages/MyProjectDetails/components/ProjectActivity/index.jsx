import React, { useEffect } from 'react'
import RightSidebar from 'components/common/RightSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getProjectDetailsActivities } from 'api/activity'
import { useParams } from 'react-router-dom'

// Hàm hiển thị nội dung hoạt động tùy theo loại
const getActivityMessage = (activity) => {
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
        default:
            return (
                <div>
                    interact with the project <b>{projectName}</b>
                </div>
            )
    }
}

const ProjectActivity = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const { projectDetailsActivity } = useSelector((state) => state.activity)

    // Ghép tất cả hoạt động từ các mảng con thành một mảng duy nhất và sắp xếp theo thời gian
    const allActivities = React.useMemo(() => {
        if (!projectDetailsActivity) return []

        // Lấy tất cả các hoạt động từ tất cả các loại và gộp lại
        const activities = Object.values(projectDetailsActivity).flat()

        // Sắp xếp theo thời gian mới nhất
        return activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    }, [projectDetailsActivity])

    useEffect(() => {
        dispatch(getProjectDetailsActivities(id))
    }, [id, dispatch])

    return <RightSidebar activities={allActivities} action={getActivityMessage} />
}

export default ProjectActivity
