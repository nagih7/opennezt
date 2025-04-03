import { Tabs } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import MyProjects from '../MyProjects'

const ActivateHeader = ({ isBottom, setIsBottom }) => {
    return (
        <div className="mx-[-16px] px-[16px] mb-8">
            <div className="flex items-center justify-between border-b-[1px] border-[#f3f4f5]">
                <Tabs.Root defaultValue="Overview" className="w-full p-2">
                    <Tabs.List className="flex items-center justify-between border-b-[1px] border-[#f3f4f5]">
                        <div className="mt-[1rem] font-bold flex gap-5">
                            <Tabs.Trigger value="Overview" className="text-black ">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-[1.2rem] mr-2"
                                    width="24px"
                                    height="24px"
                                    viewBox="0 0 576 512"
                                >
                                    <path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z" />
                                </svg>
                                My Projects
                            </Tabs.Trigger>
                            <Tabs.Trigger value="Project" className="text-black ">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-[1.2rem] mr-2"
                                    version="1.1"
                                    id="mdi-school"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z" />
                                </svg>
                                Projects Participated
                            </Tabs.Trigger>
                            <Tabs.Trigger value="Creator" className="text-black">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-[1.2rem] mr-2"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 448 512"
                                >
                                    <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm95.8 32.6L272 480l-32-136 32-56h-96l32 56-32 136-47.8-191.4C56.9 292 0 350.3 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-72.1-56.9-130.4-128.2-133.8z" />
                                </svg>
                                <Link to={'/project/details'} className="no-underline text-[#6f7f92] font-medium">
                                    Create a Project
                                </Link>
                            </Tabs.Trigger>
                        </div>
                        <div className="px-[16px]">
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
                        </div>
                    </Tabs.List>

                    <div className=" mt-[2.5rem]">
                        <Tabs.Content value="Overview">
                            <MyProjects />
                        </Tabs.Content>
                        <Tabs.Content value="Creator"></Tabs.Content>
                        <Tabs.Content value="Reviews"></Tabs.Content>
                        <Tabs.Content value="Project"></Tabs.Content>
                    </div>
                </Tabs.Root>
            </div>
        </div>
    )
}

export default ActivateHeader
