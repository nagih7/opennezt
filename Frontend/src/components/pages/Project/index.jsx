import React, { useCallback, useEffect, useRef, useState } from 'react'
import RightSidebar from 'components/common/RightSidebar'
import ActiveBanner from './components/ActiveBanner'
import SearchProjectHeader from './components/SearchProjectHeader'
import ActivateHeader from './components/ActivateHeader'
import { useDispatch, useSelector } from 'react-redux'
import { getAccessToMyProjects } from 'api/activity'

const action = (project) => {
    return (
        <div>
            has accessed your <b>{project}</b> project
        </div>
    )
}

function Projects() {
    const dispatch = useDispatch()
    // ========== STATE FROM REDUX STORE ========== //
    const { paginationListMyProjects, isLoadingGetListMyProjects } = useSelector((state) => state.project)
    const { accessToMyProjects } = useSelector((state) => state.activity)

    // ========== STATE ========== //
    const [isBottom, setIsBottom] = useState(false)
    // Ref cho container scroll
    const scrollContainerRef = useRef(null)

    // Hàm kiểm tra cuộn khi người dùng cuộn xuống dưới cùng
    const checkScroll = useCallback(() => {
        if (!scrollContainerRef.current) return
        const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current
        if (!isLoadingGetListMyProjects)
            if (paginationListMyProjects.lastPage !== 0 && paginationListMyProjects.totalRecord !== 0)
                if (
                    scrollTop + clientHeight >= scrollHeight - 50 &&
                    paginationListMyProjects.currentPage < paginationListMyProjects.lastPage
                ) {
                    setIsBottom(true)
                } else {
                    setIsBottom(false)
                }
    }, [isLoadingGetListMyProjects, paginationListMyProjects])

    // Theo dõi sự kiện scroll khi cuộn
    useEffect(() => {
        const container = scrollContainerRef.current
        if (container) {
            container.addEventListener('scroll', checkScroll)
        }

        // Cleanup khi component unmount
        return () => {
            if (container) {
                container.removeEventListener('scroll', checkScroll)
            }
        }
    }, [checkScroll])

    useEffect(() => {
        if (accessToMyProjects?.length === 0) dispatch(getAccessToMyProjects())
        // eslint-disable-next-line
    }, [dispatch])

    return (
        <div className="w-full py-[16px] px-[16px] overflow-y-scroll overflow-x-hidden" ref={scrollContainerRef}>
            <ActiveBanner />
            <div className="flex gap-[16px] mt-[16px]">
                <div className="flex flex-col lg:w-8/12 w-full">
                    <SearchProjectHeader />
                    <div className="pb-8 px-8 bg-[#fbfbfb] rounded-md mt-[16px] flex-1">
                        <ActivateHeader isBottom={isBottom} setIsBottom={setIsBottom} />
                    </div>
                </div>
                <RightSidebar activities={accessToMyProjects} action={action} />
            </div>
        </div>
    )
}

export default Projects
