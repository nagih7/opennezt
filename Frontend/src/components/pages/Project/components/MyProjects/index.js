import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getListMyProjects } from 'api/project'
import ProjectBox from './ProjectBox'

const MyProjects = ({ isBottom, setIsBottom }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // ========== STATE FROM REDUX ========== //
    const { myProjects, paginationListMyProjects, isLoadingGetListMyProjects } = useSelector((state) => state.project)

    // ========== USE EFFECT ========== //
    useEffect(() => {
        if (!myProjects || myProjects.length === 0) {
            dispatch(getListMyProjects(paginationListMyProjects))
        }
        // eslint-disable-next-line
    }, [dispatch])

    // Theo dõi sự kiện scroll
    useEffect(() => {
        if (isBottom) {
            // Call API hoặc load thêm dữ liệu
            dispatch()
            getListMyProjects({
                ...paginationListMyProjects,
                currentPage: parseInt(paginationListMyProjects.currentPage) + 1,
            })
            setIsBottom(false)
        }
    }, [isBottom, dispatch, paginationListMyProjects, setIsBottom])

    const handleNavigateToProjectDetails = (project) => {
        navigate(`/projects/me/${project._id}/details`)
    }

    return (
        <>
            {myProjects && myProjects.length === 0 && !isLoadingGetListMyProjects && (
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
            <div className="grid grid-cols-2 gap-8">
                {myProjects && myProjects.length > 0 ? (
                    myProjects.map((project, index) => (
                        <ProjectBox
                            project={project}
                            key={index}
                            onClick={() => handleNavigateToProjectDetails(project)}
                        />
                    ))
                ) : (
                    <div className="hidden text-center text-gray-500 "></div>
                )}
            </div>
            {isLoadingGetListMyProjects && <div className="text-center">Loading...</div>}
        </>
    )
}

export default MyProjects
