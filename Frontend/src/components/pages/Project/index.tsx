import React from 'react'
import RightSidebar from 'components/common/RightSidebar'
import ActiveBanner from './components/ActiveBanner'
import SearchProjectHeader from './components/SearchProjectHeader'
import ActivateHeader from './components/ActivateHeader'
import { useProjects } from './useProjects'

const action = (project: any) => {
   return (
      <div>
         has accessed your <b>{project.name}</b> project
      </div>
   )
}

const Projects: React.FC = () => {
   const { isBottom, setIsBottom, activeTab, scrollContainerRef, accessToMyProjects, handleSearch, handleTabChange } =
      useProjects()

   return (
      <div className="w-full py-[16px] px-[16px] overflow-y-scroll overflow-x-hidden" ref={scrollContainerRef}>
         <ActiveBanner />
         <div className="flex gap-[16px] mt-[16px]">
            <div className="flex flex-col w-full lg:w-10/12">
               <SearchProjectHeader onSearch={handleSearch} />
               <div className="pb-8 px-8 bg-[#fbfbfb] rounded-md mt-[16px] flex-1">
                  <ActivateHeader
                     isBottom={isBottom}
                     setIsBottom={setIsBottom}
                     onTabChange={handleTabChange}
                     activeTab={activeTab}
                  />
               </div>
            </div>
            <RightSidebar activities={accessToMyProjects} action={action} />
         </div>
      </div>
   )
}

export default Projects
