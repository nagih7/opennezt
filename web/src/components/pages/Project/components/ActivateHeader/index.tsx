import { Tabs } from '@chakra-ui/react'
import React from 'react'
import MyProjects from '../MyProjects'
import ProjectsParticipated from '../ProjectsParticipated'
import { useActivateHeader, UseActivateHeaderProps } from './useActivateHeader'

const ActivateHeader: React.FC<UseActivateHeaderProps> = (props) => {
   const { activeTab, setActive, isBottom, setIsBottom, handleCreateProject } = useActivateHeader(props)

   return (
      <div className="mx-[-16px] px-[16px] mb-8">
         <div className="flex items-center justify-between border-b-[1px] border-[#f3f4f5]">
            <Tabs.Root defaultValue={activeTab} value={activeTab} className="w-full p-2">
               <Tabs.List className="flex items-center justify-between border-b-[1px] border-[#f3f4f5]">
                  <div className="flex w-full sm:flex-row flex-col justify-center sm:justify-start items-center text-nowrap mt-[1rem] font-bold gap-8">
                     <Tabs.Trigger value="my-projects">
                        <span onClick={() => setActive('my-projects')} className="font-medium">
                           My Projects
                        </span>
                     </Tabs.Trigger>
                     <Tabs.Trigger value="projects-participated">
                        <span onClick={() => setActive('projects-participated')} className="font-medium">
                           Projects Participated
                        </span>
                     </Tabs.Trigger>
                     <Tabs.Trigger value="create-project">
                        <span onClick={handleCreateProject} className="font-medium">
                           Create a Project
                        </span>
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
