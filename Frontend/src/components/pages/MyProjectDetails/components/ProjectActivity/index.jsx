import React, { useEffect } from 'react'
import RightSidebar from 'components/common/RightSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getAccessToMyProjects } from 'api/activity'

const action = (project) => {
    return (
        <div>
            has accessed your <b>{project}</b> project
        </div>
    )
}

const ProjectActivity = () => {
    const dispatch = useDispatch()
    const { accessToMyProjects } = useSelector((state) => state.activity)

    useEffect(() => {
        if (accessToMyProjects?.length === 0) dispatch(getAccessToMyProjects())
        // eslint-disable-next-line
    }, [dispatch])

    return <RightSidebar activities={accessToMyProjects} action={action} />
}

export default ProjectActivity
