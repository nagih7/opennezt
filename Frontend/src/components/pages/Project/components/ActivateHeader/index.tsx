import { Tabs } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import MyProjects from '../MyProjects'
import ProjectsParticipated from '../ProjectsParticipated'
import { ROUTE_CONFIG } from '~/config/constants/routes'

interface ActivateHeaderProps {
   isBottom: boolean
   setIsBottom: (value: boolean) => void
   onTabChange?: (tab: string) => void
   activeTab?: string
}

const ActivateHeader: React.FC<ActivateHeaderProps> = ({
   isBottom,
   setIsBottom,
   onTabChange,
   activeTab = 'my-projects',
}) => {
   // Chỉ gọi onTabChange khi tab thay đổi
   const handleTabChange = (tab: string) => {
      if (onTabChange) {
         onTabChange(tab)
      }
   }

   // ========== RENDER ========== //
   return (
      <div className="mx-[-16px] px-[16px] mb-8">
         <div className="flex items-center justify-between border-b-[1px] border-[#f3f4f5]">
            <Tabs.Root defaultValue={activeTab} value={activeTab} className="w-full p-2">
               <Tabs.List className="flex items-center justify-between border-b-[1px] border-[#f3f4f5]">
                  <div className="flex w-full sm:flex-row flex-col justify-center sm:justify-start items-center text-nowrap mt-[1rem] font-bold gap-8">
                     <Tabs.Trigger value="my-projects">
                        <span onClick={() => handleTabChange('my-projects')}>My Projects</span>
                     </Tabs.Trigger>
                     <Tabs.Trigger value="projects-participated">
                        <span onClick={() => handleTabChange('projects-participated')}>Projects Participated</span>
                     </Tabs.Trigger>
                     <Tabs.Trigger value="create-project">
                        <Link
                           to={ROUTE_CONFIG.USER.PROJECT.CREATE.BASIC}
                           className="no-underline text-[#6f7f92] font-medium"
                        >
                           Create a Project
                        </Link>
                     </Tabs.Trigger>
                  </div>
                  {/* <div className="px-[16px]">
                            <ul className="p-0 mb-0">
                                <label htmlFor="" className="outline-none ">
                                    Sort By:
                                </label>
                                <select
                                    name=""
                                    id=""
                                    className="ml-4 outline-none border-[1px] py-[10px] rounded-md pl-3 border-[#f3f4f5] bg-white"
                                >
                                    <option value="">Last Active</option>
                                    <option value="">Most Members</option>
                                    <option value="">Newly Created</option>
                                    <option value="">Alphabetical</option>
                                </select>
                            </ul>
                        </div> */}
               </Tabs.List>

               <div className=" mt-[2.5rem]">
                  <Tabs.Content value="my-projects">
                     {activeTab === 'my-projects' && <MyProjects isBottom={isBottom} setIsBottom={setIsBottom} />}
                  </Tabs.Content>
                  <Tabs.Content value="projects-participated">
                     {activeTab === 'projects-participated' && (
                        <ProjectsParticipated isBottom={isBottom} setIsBottom={setIsBottom} />
                     )}
                  </Tabs.Content>
                  {/* <Tabs.Content value="create-project"></Tabs.Content> */}
               </div>
            </Tabs.Root>
         </div>
      </div>
   )
}

export default ActivateHeader
