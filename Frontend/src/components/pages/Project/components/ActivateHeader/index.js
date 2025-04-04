import { Tabs } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import MyProjects from '../MyProjects'
import ProjectsParticipated from '../ProjectsParticipated'

const ActivateHeader = ({ isBottom, setIsBottom }) => {
    // ========== STATE ========== //
    const [isActive, setIsActive] = useState('my-projects')

    // ========== RENDER ========== //
    return (
        <div className="mx-[-16px] px-[16px] mb-8">
            <div className="flex items-center justify-between border-b-[1px] border-[#f3f4f5]">
                <Tabs.Root defaultValue={isActive} className="w-full p-2">
                    <Tabs.List className="flex items-center justify-between border-b-[1px] border-[#f3f4f5]">
                        <div className="mt-[1rem] font-bold flex gap-5">
                            <Tabs.Trigger value="my-projects">
                                <span onClick={() => setIsActive('my-projects')}>My Projects</span>
                            </Tabs.Trigger>
                            <Tabs.Trigger value="projects-participated">
                                <span onClick={() => setIsActive('projects-participated')}>Projects Participated</span>
                            </Tabs.Trigger>
                            <Tabs.Trigger value="create-project">
                                <Link to={'/project/details'} className="no-underline text-[#6f7f92] font-medium">
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
                            {isActive === 'my-projects' && <MyProjects isBottom={isBottom} setIsBottom={setIsBottom} />}
                        </Tabs.Content>
                        <Tabs.Content value="projects-participated">
                            {isActive === 'projects-participated' && (
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
