import React, { useState, useEffect, useRef, useCallback } from 'react'
import { CheckCircleFilled } from '@ant-design/icons'
import fb_img from 'assets/images/background/left-banner.webp'
import Logo from 'assets/images/logo/opennezt_full_black_old.png'
import moment from 'moment'
import { Avatar } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

function RightSidebar({ activities, action }) {
    const navigate = useNavigate()
    const [displayedActivities, setDisplayedActivities] = useState([])
    // const [page, setPage] = useState(1)
    // const [loading, setLoading] = useState(false)
    // const [hasMore, setHasMore] = useState(true)
    const activitiesContainerRef = useRef(null)

    // ========== HANDLE FUNCTION ========== //
    const handleViewTalentDetails = (user) => {
        navigate(`/talents/${user._id}/details`)
    }

    useEffect(() => {
        if (activities && activities.length > 0) {
            setDisplayedActivities(activities)
            // setHasMore(activities.length >= 10)
        }
    }, [activities])

    // const loadMoreActivities = useCallback(async () => {
    //     if (loading || !hasMore) return

    //     setLoading(true)

    //     try {
    //         const nextPage = page + 1
    //         const newActivities = await fetchMoreActivities(nextPage)

    //         if (newActivities && newActivities.length > 0) {
    //             setDisplayedActivities((prev) => [...prev, ...newActivities])
    //             setPage(nextPage)
    //             setHasMore(newActivities.length >= 10)
    //         } else {
    //             setHasMore(false)
    //         }
    //     } catch (error) {
    //         console.error('Lỗi khi tải thêm activities:', error)
    //     } finally {
    //         setLoading(false)
    //     }
    // }, [loading, hasMore, page, fetchMoreActivities])

    // useEffect(() => {
    //     const container = activitiesContainerRef.current
    //     if (!container) return

    //     const handleScroll = () => {
    //         const { scrollTop, scrollHeight, clientHeight } = container
    //         if (scrollHeight - scrollTop - clientHeight < 50 && !loading && hasMore) {
    //             loadMoreActivities()
    //         }
    //     }

    //     container.addEventListener('scroll', handleScroll)
    //     return () => container.removeEventListener('scroll', handleScroll)
    // }, [loading, hasMore, loadMoreActivities])

    // ========== RENDER COMPONENT ========== //
    return (
        <div className="hidden w-4/12 lg:block">
            <div className="bg-[#ffffff] p-8 rounded-md mb-4">
                <div className="flex flex-col">
                    <span className="text-xl font-semibold border-b-[1px] border-gray-200 pb-3">Active Users</span>
                    <span className="pt-4 font-light text-gray-500">There are no recently active members</span>
                </div>
            </div>
            <div className="flex flex-col bg-[#ffffff] p-8 rounded-md mt-3 mb-4">
                <span className="mb-3 text-xl font-semibold">Latest Activities</span>
                <div ref={activitiesContainerRef}>
                    {displayedActivities?.map((activity, index) => (
                        <div className="border-gray-200 border-t-[1px]" key={index}>
                            <div className="flex items-center gap-3 my-3">
                                <Avatar.Root
                                    className="w-[50px] h-[50px] rounded-full cursor-pointer"
                                    onClick={() => handleViewTalentDetails(activity.user)}
                                >
                                    <Avatar.Fallback name={activity.user?.name} />
                                    <Avatar.Image src={activity.user?.avatar} />
                                </Avatar.Root>
                                <p className="text-[#6f7f92] text-sm mb-0">
                                    <a href="#" className="text-black no-underline">
                                        {activity.user?.name}
                                    </a>
                                    <CheckCircleFilled className="text-[#3897f0] mx-1" />
                                    {action(activity.project ? activity.project?.name : activity)}{' '}
                                    <a href="#" className="no-underline text-[#6f7f92]">
                                        <span className="text-xs">{moment(activity.timestamp).fromNow()}</span>
                                    </a>
                                </p>
                            </div>
                        </div>
                    ))}
                    {/* {loading && (
                        <div className="flex justify-center py-2">
                            <Spinner size="sm" color="blue.500" />
                        </div>
                    )}
                    {!hasMore && displayedActivities.length > 0 && (
                        <div className="py-2 text-sm text-center text-gray-500">All activities shown</div>
                    )} */}
                </div>
            </div>
            <div className="relative w-full">
                <img src={fb_img} alt="logo-fb_img" className="w-full h-[450px] rounded-md mt-4" />
                <img src={Logo} alt="logo-opennezt" className={`$styles.logo, absolute top-0 py-14 px-12 left-0`} />
                <div className="absolute left-0 flex flex-col items-center gap-3 px-12 text-center text-white 2xl:left-5 2xl:mt-8 2xl:px-10 top-32">
                    Feel free to reach us anytime. we are avaliable 24 hours
                    <button className="bg-[#ffffff] px-3 py-3 text-black font-medium rounded-md">CONTACT US</button>
                </div>
            </div>
        </div>
    )
}
export default RightSidebar
