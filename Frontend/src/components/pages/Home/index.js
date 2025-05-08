import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { WelcomeSection } from './components/WelcomeSection'
import { InterviewCard } from './components/InterviewCard'
import { getListMyProjects } from 'api/project'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const { authUser } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { myProjects, paginationListMyProjects, isLoadingGetListMyProjects } = useSelector((state) => state.project)
    const [latestProjects, setLatestProjects] = useState([])

    useEffect(() => {
        const params = {
            ...paginationListMyProjects,
            perPage: 10, // Lấy nhiều dự án hơn để đảm bảo có đủ dữ liệu
            column: 'created_at', // Sắp xếp theo thời gian tạo
            order: '-1', // Sắp xếp giảm dần (-1)
        }
        dispatch(getListMyProjects(params))
        // eslint-disable-next-line
    }, [dispatch])

    useEffect(() => {
        if (myProjects && myProjects.length > 0) {
            // Lọc để loại bỏ các dự án trùng lặp theo ID
            const uniqueProjects = Array.from(new Map(myProjects.map((project) => [project._id, project])).values())

            // Sắp xếp dự án theo thời gian tạo mới nhất
            const sortedProjects = [...uniqueProjects].sort((a, b) => {
                // Hàm lấy timestamp hợp lệ cho mỗi dự án
                function getValidTimestamp(project) {
                    // Kiểm tra các trường thời gian
                    const dateFields = ['created_at', 'createdAt', 'updatedAt']
                    for (const field of dateFields) {
                        if (project[field] && !isNaN(new Date(project[field]).getTime())) {
                            return new Date(project[field]).getTime()
                        }
                    }

                    if (project._id) {
                        try {
                            const timestamp = parseInt(project._id.substring(0, 8), 16) * 1000
                            if (!isNaN(timestamp)) return timestamp
                        } catch (e) {
                            return 0
                        }
                    }
                    return 0
                }

                // Lấy timestamp và sắp xếp giảm dần (mới nhất trước)
                return getValidTimestamp(b) - getValidTimestamp(a)
            })

            setLatestProjects(sortedProjects.slice(0, 3))
        }
    }, [myProjects])

    // Hàm xử lý khi người dùng nhấp vào dự án
    const handleProjectClick = (projectId) => {
        navigate(`/projects/me/${projectId}/details`)
    }

    // Mảng các màu sắc để luân phiên cho các dự án
    const projectColors = ['pink', 'blue', 'purple']

    return (
        <div className="mt-[2px] ml-[16px] p-8 bg-[#ffffff] w-full h-100vh 2xl:h-full">
            <WelcomeSection user={authUser} />
            <div className="flex flex-col mt-8">
                <span className="text-2xl font-bold">Practice interview</span>
                <span className="text-[#6f7f92]">Practice real interview questions and pave your startup journey</span>
                <div className="grid grid-cols-3 2xl:gap-10 gap-8 mt-4 pb-8">
                    {latestProjects && latestProjects.length > 0 ? (
                        // Sử dụng state latestProjects đã được sắp xếp
                        latestProjects.map((project, index) => (
                            <div key={project._id} onClick={() => handleProjectClick(project._id)}>
                                <InterviewCard
                                    title={project.name}
                                    description={
                                        project.description && project.description.length > 50
                                            ? `${project.description.substring(0, 50)}...`
                                            : project.description || 'Xem chi tiết dự án này'
                                    }
                                    time={`${project.members?.length || 1} thành viên`}
                                    color={projectColors[index % projectColors.length]}
                                    projectImage={project.logo || null}
                                    projectBackground={project.background || null}
                                />
                            </div>
                        ))
                    ) : isLoadingGetListMyProjects ? (
                        // Hiển thị trạng thái đang tải
                        Array(3)
                            .fill(0)
                            .map((_, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col border-[2px] h-[290px] 2xl:h-[310px] rounded-xl animate-pulse bg-gray-100"
                                >
                                    <div className="h-1/2 bg-gray-200 rounded-t-xl"></div>
                                    <div className="p-[10px]">
                                        <div className="h-5 bg-gray-300 rounded w-1/2 mb-2"></div>
                                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                        <div className="h-8 bg-gray-200 rounded w-1/3 mt-4"></div>
                                    </div>
                                </div>
                            ))
                    ) : (
                        // Hiển thị thông báo khi không có dự án nào
                        <div className="col-span-3 text-center py-10">
                            <p className="text-gray-500 text-lg">
                                Bạn chưa có dự án nào. Hãy tạo dự án đầu tiên của bạn!
                            </p>
                            <button
                                onClick={() => navigate('/project/details')}
                                className="mt-4 bg-[#2f65b9] text-white rounded-lg px-6 py-2 font-semibold"
                            >
                                Tạo dự án mới
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home
