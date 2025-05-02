import { accessToProject } from 'api/activity'
import { seekProjects } from 'api/project'
import PaginationCustom from 'components/UI/PaginationCustom'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ProjectGrid from './ProjectGrid'
import ProjectList from './ProjectList'

const ListProjects = ({ action }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // ========== STATE FROM REDUX ========== //
    const projects = useSelector((state) => state.project.projectsBySeek)
    const { paginationSeekProjects, filterSeekProjects } = useSelector((state) => state.project)

    // ========== HANDLE FUNCTION ========== //
    const onPageChange = (pageData) => {
        dispatch(
            seekProjects({
                ...filterSeekProjects,
                page: pageData.page,
                perPage: pageData.pageSize,
            })
        )
    }

    const handleViewProjectDetails = useCallback(
        (project) => {
            dispatch(accessToProject(project._id))
            navigate(`/projects/${project._id}/details`)
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
                                {projects.map((project, index) => (
                                    <ProjectGrid
                                        project={project}
                                        key={index}
                                        handleViewProjectDetails={handleViewProjectDetails}
                                    />
                                ))}
                            </ul>
                        )
                    case 'list':
                        return (
                            <ul className="flex flex-col w-full gap-6 pl-0 mt-4">
                                {projects.map((project, index) => (
                                    <ProjectList
                                        project={project}
                                        key={index}
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
