import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getListProjectsParticipated } from 'api/project'
import ProjectBox from './ProjectBox'

const ProjectsParticipated = ({ isBottom, setIsBottom }) => {
    const dispatch = useDispatch()

    // ========== STATE FROM REDUX ========== //
    const { projectsParticipated, paginationProjectsParticipated, isLoadingGetListProjectsParticipated } = useSelector(
        (state) => state.project
    )

    // ========== USE EFFECT ========== //
    useEffect(() => {
        if (!projectsParticipated || projectsParticipated.length === 0) {
            dispatch(getListProjectsParticipated(paginationProjectsParticipated))
        }
        // eslint-disable-next-line
    }, [dispatch])

    // Theo dõi sự kiện scroll
    useEffect(() => {
        if (isBottom) {
            // Call API hoặc load thêm dữ liệu
            dispatch(
                getListProjectsParticipated({
                    ...paginationProjectsParticipated,
                    currentPage: parseInt(paginationProjectsParticipated.currentPage) + 1,
                })
            )
            setIsBottom(false)
        }
    }, [isBottom, dispatch, paginationProjectsParticipated, setIsBottom])

    return (
        <>
            {projectsParticipated && projectsParticipated.length === 0 && !isLoadingGetListProjectsParticipated && (
                <div className="flex flex-col items-center justify-center">
                    <img
                        alt="Not found"
                        src="https://homepage.momocdn.net/next-js/_next/static/public/cinema/not-found.svg"
                        className="object-cover w-[200px] h-[200px]"
                    />
                    <p className="text-2xl text-center font-semibold text-[#6f7f92] ">
                        Create a project or participate in a project
                    </p>
                </div>
            )}
            <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
                {projectsParticipated && projectsParticipated.length > 0 ? (
                    projectsParticipated.map((project, index) => <ProjectBox project={project} key={index} />)
                ) : (
                    <div className="hidden text-center text-gray-500 "></div>
                )}
            </div>
            {isLoadingGetListProjectsParticipated && <div className="text-center">Loading...</div>}
        </>
    )
}

export default ProjectsParticipated
