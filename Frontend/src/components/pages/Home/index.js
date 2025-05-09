import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { WelcomeSection } from './components/WelcomeSection'
import { InterviewCard } from './components/InterviewCard'
import { getListProjectPracticeInterview } from 'api/project'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const { authUser } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const [latestProjects, setLatestProjects] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchPracticeInterviewProjects = async () => {
            setIsLoading(true)
            try {
                const params = {
                    page: 1,
                    per_page: 10,
                    field: 'created_at',
                    order: '-1',
                }

                const response = await getListProjectPracticeInterview(params)

                if (response && response.data) {
                    // Check different possible locations for the projects array
                    let projectsArray = null

                    if (response.data.projects && Array.isArray(response.data.projects)) {
                        projectsArray = response.data.projects
                    } else if (response.data.data && response.data.data.projects) {
                        projectsArray = response.data.data.projects
                    } else if (Array.isArray(response.data)) {
                        projectsArray = response.data
                    } else {
                        // Try to find any array that might contain projects
                        for (const key in response.data) {
                            if (Array.isArray(response.data[key])) {
                                projectsArray = response.data[key]
                                break
                            }
                        }
                    }

                    if (projectsArray && projectsArray.length > 0) {
                        // Sort by created_at in descending order (newest first)
                        const sortedProjects = [...projectsArray].sort((a, b) => {
                            const dateA = new Date(a.created_at || a.createdAt || 0)
                            const dateB = new Date(b.created_at || b.createdAt || 0)
                            return dateB - dateA // Descending order
                        })

                        const newestThreeProjects = sortedProjects.slice(0, 3)

                        setLatestProjects(newestThreeProjects)
                    } else {
                        console.error('No projects found in the response')
                    }
                } else {
                    console.error('Invalid response structure')
                }
            } catch (error) {
                console.error('Error fetching practice interview projects:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchPracticeInterviewProjects()
    }, [])

    // Hàm xử lý khi người dùng nhấp vào dự án
    const handleProjectClick = (projectId) => {
        navigate(`/projects/${projectId}/details`)
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
                        latestProjects.map((project, index) => (
                            <div
                                key={project._id}
                                onClick={() => handleProjectClick(project._id)}
                                className="cursor-pointer"
                            >
                                <InterviewCard
                                    title={project.name}
                                    description={
                                        project.description && project.description.length > 50
                                            ? `${project.description.substring(0, 150)}...`
                                            : project.description || 'Xem chi tiết dự án này'
                                    }
                                    time="30m"
                                    color={projectColors[index % projectColors.length]}
                                    projectImage={project.logo || null}
                                    projectBackground={project.background || null}
                                />
                            </div>
                        ))
                    ) : isLoading ? (
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
                            <p className="text-gray-500 text-lg">We will notify you when there is a new project!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home
