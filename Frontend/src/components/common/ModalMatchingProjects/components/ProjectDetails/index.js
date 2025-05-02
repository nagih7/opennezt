import React, { useState } from 'react'
import { IconlyFace, IconlyShieldDone } from 'components/UI/Iconly'
import { RiArrowRightSFill } from 'react-icons/ri'
import { IoMdArrowDropdown } from 'react-icons/io'
import { FaCheck } from 'react-icons/fa6'
import { Avatar, Image } from '@chakra-ui/react'
import { OPENNEZT_BG_BLACK } from 'utils/constants'
import { toUpper } from 'lodash'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setOpenModalMatchingProjects } from 'states/modules/artificialIntelligence'
import { setProjectInterview } from 'states/modules/interview'

const ProjectDetails = ({ project }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // ========== STATE ========== //
    const [checkedItems, setCheckedItems] = useState({})
    const [errorBG, setErrorBG] = useState(false)
    const requirements = project?.requirement ? Object.keys(project?.requirement) : []
    const [openExpertiseRequest, setOpenExpertiseRequest] = useState(
        requirements.reduce((acc, item) => {
            acc[item] = false
            return acc
        }, {})
    )

    // ========== HANDLER ========== //
    const handleStartInterview = () => {
        dispatch(setOpenModalMatchingProjects(false))
        dispatch(setProjectInterview(project))
        navigate(`/interview/${project?._id}`)
    }

    // ========== RENDER ========== //
    return (
        <div className="px-[16px]">
            <div className="bg-[#ffffff] rounded-md">
                {!errorBG ? (
                    <Image
                        src={project?.background}
                        alt={project?.name}
                        aspectRatio={10 / 3}
                        width="full"
                        className="object-cover w-full rounded-t-md"
                        onError={() => setErrorBG(true)}
                    />
                ) : (
                    <Image
                        src={OPENNEZT_BG_BLACK}
                        alt="OpenNezt"
                        aspectRatio={10 / 3}
                        width="full"
                        className="object-cover w-full rounded-t-md"
                    />
                )}
                <div className="flex justify-between p-8">
                    <div className="flex flex-col gap-2">
                        <Avatar.Root className="mt-[-130px] w-[150px] h-[150px] rounded-full p-[2px] bg-[#ffffff]">
                            <Avatar.Fallback name={project?.name} />
                            <Avatar.Image src={project?.logo} />
                        </Avatar.Root>
                        <div>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-semibold">{project?.name}</span>
                                    <IconlyShieldDone size={24} color="#3897f0" />
                                </div>
                                <span className="font-semibold text-start">{project?.industries?.join(', ')}</span>
                                <span className="text-[#6f7f92] font-semibold text-xs">{project?.stage}</span>
                            </div>
                            <button
                                className="bg-[#4374c0] text-[#ffffff] text-sm font-medium mt-3 rounded-lg px-3 py-2 flex items-center gap-1"
                                onClick={handleStartInterview}
                            >
                                <IconlyFace size={20} color={'#ffffff'} />
                                Interview
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {project?.additional_infos && project?.additional_infos.length > 0 && (
                <div className="mt-8">
                    <div className="bg-[#ffffff] rounded-md">
                        <div className="p-8 border-b">
                            <span className="text-2xl font-semibold ">Startup Overview</span>
                        </div>
                        <div className="p-8">
                            <ul className="pl-0 mb-0">
                                {project?.additional_infos?.map((item, index) => (
                                    <li key={index} className="mb-4">
                                        <span className="text-lg text-[#6f7f92] font-semibold">
                                            {toUpper(item.name)}
                                        </span>
                                        <p>{item.content}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {requirements && requirements.length > 0 && (
                <div className="mt-8">
                    <div className="bg-[#ffffff] rounded-md">
                        <div className="p-8 border-b">
                            <span className="text-2xl font-semibold">Experise Request</span>
                        </div>
                        <div className="p-8">
                            <ul className="pl-0 mb-0 space-y-4">
                                {requirements.map((item, index) => (
                                    <li key={index} className="flex flex-col">
                                        <div
                                            onClick={() =>
                                                setOpenExpertiseRequest(
                                                    openExpertiseRequest[item]
                                                        ? { ...openExpertiseRequest, [item]: false }
                                                        : { ...openExpertiseRequest, [item]: true }
                                                )
                                            }
                                            className="flex items-center gap-2 cursor-pointer"
                                        >
                                            <div
                                                className={`transition-transform duration-300 ${
                                                    openExpertiseRequest[item] ? 'rotate-180' : 'rotate-0'
                                                }`}
                                            >
                                                {openExpertiseRequest[item] ? (
                                                    <IoMdArrowDropdown className="w-10 h-10 text-[#6f7f92]" />
                                                ) : (
                                                    <RiArrowRightSFill className="w-10 h-10 text-[#6f7f92]" />
                                                )}
                                            </div>
                                            <span className="text-lg text-[#6f7f92] font-semibold">
                                                {toUpper(item).replace(/_/g, ' ')}
                                            </span>
                                        </div>
                                        <div
                                            className={`mt-3 bg-[#ffffff] p-0 m-0 overflow-y-scroll w-full overflow-hidden transition-all duration-500 ease-in-out ${
                                                openExpertiseRequest[item] ? 'max-h-[200px]' : 'max-h-0'
                                            }`}
                                        >
                                            <div className="px-[24px]">
                                                <div className="px-[24px]">
                                                    <ul className="flex flex-col items-center pl-0 mb-0 cursor-pointer">
                                                        {project?.requirement[item]?.map((subItem, subIndex) => (
                                                            <li
                                                                key={subIndex}
                                                                className="flex items-center justify-between w-full text-sm py-[21px] border-b-[1px] border-gray-200"
                                                            >
                                                                {subItem}
                                                                {checkedItems['basic'] && (
                                                                    <FaCheck className="text-[#4374c0]" />
                                                                )}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-8">
                <div className="bg-[#ffffff] rounded-md">
                    <div className="p-8 border-b">
                        <span className="text-2xl font-semibold">Media</span>
                    </div>
                    <div className="p-8">
                        <ul className="grid grid-cols-2 pl-0 mb-0 space-y-4">
                            <li className="flex flex-col gap-2">
                                <span className="text-lg text-[#6f7f92] font-semibold">PRODUCT DEMO VIDEO</span>
                                <a href="#" className="no-underline">
                                    Watch Demo
                                </a>
                            </li>
                            <li className="flex flex-col gap-2">
                                <span className="text-lg text-[#6f7f92] font-semibold">TEAM INTRODUCTION VIDEO</span>
                                <a href="#" className="no-underline">
                                    Meet the Team
                                </a>
                            </li>
                            <li className="flex flex-col gap-2">
                                <span className="text-lg text-[#6f7f92] font-semibold">PITCH DECK</span>
                                <a href="#" className="no-underline">
                                    Pitch Deck
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <div className="bg-[#ffffff] rounded-md">
                    <div className="p-8 border-b">
                        <span className="text-2xl font-semibold">Team Information</span>
                    </div>
                    <div className="p-8">
                        <div>
                            <span className="text-lg font-semibold">Founding Team</span>
                            <div className="flex justify-center mt-8">
                                <div className="flex flex-wrap items-center justify-center gap-10">
                                    {project?.members?.map((member, index) => (
                                        <div key={index} className="relative flex flex-col items-center">
                                            <Avatar.Root className="w-[120px] h-[120px] bg-center object-cover">
                                                <Avatar.Fallback name={member?.name} />
                                                <Avatar.Image src={member?.avatar} />
                                            </Avatar.Root>
                                            <span className="absolute bottom-[25px] text-xs font-semibold  py-1 bg-[#ffffff] rounded-full text-center border ">
                                                {member?.role}/{member?.team_role}
                                            </span>
                                            <span className="mt-3">{member?.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* <div className="mt-8">
                            <span className="text-lg font-semibold">Why is your team a winning team?</span>
                            <p>
                                Our team combines deep industry expertise with technical excellence. Giang {`'`} s
                                extensive experience in environmental science and sustainable technology, Daniel
                                {`'`}s financial acumen and success in securing funding for startups, and Tam
                                {`'`}s technical skills in software engineering and scalable green tech solutions create
                                a powerful synergy. Together, we bring a unique blend of knowledge and skills that
                                enable us to develop innovative, sustainable solutions that drive both environmental and
                                financial benefits for our clients.
                            </p>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectDetails
