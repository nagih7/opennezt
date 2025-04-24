import { Button, Dialog, Portal, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOpenModalMatchingProjects } from 'states/modules/artificialIntelligence'
import Statistical from './components/Statistical'
import fb_img from 'assets/images/background/left-banner.webp'
import Logo from 'assets/images/logo/opennezt_full_black_old.png'
import { useNavigate } from 'react-router-dom'
import ProjectDetails from './components/ProjectDetails'
import { IconlyEditSquare, IconlyFace, IconlyShieldDone } from 'components/UI/Iconly'
import { IoMdArrowDropdown } from 'react-icons/io'
import { RiArrowRightSFill } from 'react-icons/ri'
import { FaCheck } from 'react-icons/fa6'
import avt_img from '../../../assets/images/background/avt.jpg'
import logo_linkedin from '../../../assets/images/background/linkedin.png'

const ModalMatchingProjects = () => {
    const dispatch = useDispatch()
    // ========== STATE FROM REDUX ========== //
    const { projects, isOpenModalMatchingProjects } = useSelector((state) => state.artificialIntelligence)
    // ========== STATE ========== //
    const [projectSelected, setProjectSelected] = useState(null)
    const [openSections, setOpenSections] = useState({
        humanResources: false,
        international: false,
        lawAndLegal: false,
        accountingAndFinance: false,
    })
    const [checkedItems, setCheckedItems] = useState({})
    const navigate = useNavigate()

    const toggleCheck = (itemName) => {
        setCheckedItems((prev) => ({
            ...prev,
            [itemName]: !prev[itemName],
        }))
    }

    // ========== EFFECT ========== //
    useEffect(() => {
        if (projects.length > 0) {
            setProjectSelected(projects[0])
        }
    }, [projects])

    // ========== RENDER ========== //
    return (
        <Dialog.Root
            scrollBehavior="inside"
            size="full"
            motionPreset="slide-in-bottom"
            open={isOpenModalMatchingProjects}
            placement={'center'}
        >
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content className="bg-[#f4f5f6] max-h-full p-0 m-0 ">
                        <Dialog.Body className="px-[16px] pt-[16px]">
                        <div className="flex w-full h-full">
                            <div className="w-10/12">
                                <div className="pl-[16px] py-[16px]">
                                    <div className="bg-[#ffffff] rounded-md">
                                        <img
                                            className="rounded-t-md object-cover w-full"
                                            src="https://s3-alpha-sig.figma.com/img/c377/bd48/ed7377f44f86ace76c78d5c6a86f232c?Expires=1746403200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=m3O70Ksu0SsKqzXMs2D3wi1elOc3QHGVZE2spFLjuBDq47b5ua1eEeOiBh12KU4on3~rDUZBRRw00Gg2DCvcC5zjd2pvtWwxGSrICljy77Bi~jOLqmJYjccrn0Q6g50wh3zqqx81qDDKcX5QgAYJQ~8jB4fkD1kAJ2ECeMG7qFeOp2UfcDKjqiEfvD94cODVHNsReWUx3Wyc57SdErHGYbKovTeKdBHnI7H9c~e2p8d-d01iXBY6e11fSzcKXK~oCB1XMHFqLiZx5goB0qJgq0bLvg4oSZ-crM5WxxAlhrGP3rNO7tzhwMd2rGOfEDBEaVUlOtR~5HIF8FABTiiH1A__"
                                        />
                                        <div className="flex justify-between p-8">
                                            <div className="flex flex-col gap-2">
                                                <div className="mt-[-130px] w-[150px] h-[150px] rounded-full p-[2px] bg-[#ffffff]">
                                                    <img className="rounded-full" src={avt_img} />
                                                </div>
                                                <div>
                                                    <div className="flex flex-col gap-2">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-2xl font-semibold">
                                                                OpenNezt, Inc
                                                            </span>
                                                            <IconlyShieldDone size={24} color="#3897f0" />
                                                        </div>
                                                        <span className="text-start font-semibold">
                                                            Saas Indsutry I Serie A
                                                        </span>
                                                        <span className="text-[#6f7f92] font-semibold text-xs">
                                                            Hanoi, VietNam
                                                        </span>
                                                    </div>
                                                    <button
                                                        onClick={() => navigate('/interview')}
                                                        className="bg-[#4374c0] text-[#ffffff] text-sm font-medium mt-3 rounded-lg px-3 py-2 flex items-center gap-1"
                                                    >
                                                        <IconlyFace size={20} color={'#ffffff'} />
                                                        Interview
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex flex-col justify-between">
                                                <div className="bg-[#4374c0] p-2 rounded-full">
                                                    <IconlyEditSquare size={20} color={'#ffffff'} />
                                                </div>
                                                <img className="w-8 h-8" src={logo_linkedin} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-8">
                                        <div className="bg-[#ffffff] rounded-md">
                                            <div className="border-b p-8">
                                                <span className="text-2xl font-semibold ">Startup Overview</span>
                                            </div>
                                            <div className="p-8">
                                                <ul className="pl-0 mb-0">
                                                    <li>
                                                        <span className="text-lg text-[#6f7f92] font-semibold">
                                                            PROBLEM STATEMENT
                                                        </span>
                                                        <p>
                                                            EcoTech Innovations aims to tackle the inefficiency in
                                                            energy consumption and the high carbon footprint of small to
                                                            medium-sized enterprises (SMEs). Many businesses lack the
                                                            tools and knowledge to monitor and reduce their
                                                            environmental impact effectively.
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <span className="text-lg text-[#6f7f92] font-semibold">
                                                            SOLUTION
                                                        </span>
                                                        <p>
                                                            We are developing an advanced energy management platform
                                                            that leverages IoT and AI to provide real-time insights and
                                                            recommendations for optimizing energy use. This includes
                                                            automated energy auditing, predictive maintenance for
                                                            equipment, and personalized sustainability strategies.
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <span className="text-lg text-[#6f7f92] font-semibold">
                                                            PRODUCT/SERVICE DESCRIPTION
                                                        </span>
                                                        <p>
                                                            Our platform features real-time energy consumption
                                                            monitoring, predictive maintenance alerts, automated
                                                            sustainability reports, and actionable recommendations to
                                                            reduce carbon footprint and energy costs. By integrating IoT
                                                            sensors with AI analytics, we empower businesses to make
                                                            data-driven decisions for a greener future.
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <span className="text-lg text-[#6f7f92] font-semibold">
                                                            INCORPORATION STATUS
                                                        </span>
                                                        <p>Incorporated</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-8">
                                        <div className="bg-[#ffffff] rounded-md">
                                            <div className="border-b p-8">
                                                <span className="text-2xl font-semibold">Experise Request</span>
                                            </div>
                                            <div className="p-8">
                                                <ul className="pl-0 mb-0 space-y-4">
                                                    <li className="flex flex-col">
                                                        <div
                                                            onClick={() =>
                                                                setOpenSections({
                                                                    ...openSections,
                                                                    humanResources: !openSections.humanResources,
                                                                })
                                                            }
                                                            className="flex items-center gap-2 cursor-pointer"
                                                        >
                                                            <div
                                                                className={`transition-transform duration-300 ${
                                                                    openSections.humanResources
                                                                        ? 'rotate-180'
                                                                        : 'rotate-0'
                                                                }`}
                                                            >
                                                                {openSections.humanResources ? (
                                                                    <IoMdArrowDropdown className="w-10 h-10 text-[#6f7f92]" />
                                                                ) : (
                                                                    <RiArrowRightSFill className="w-10 h-10 text-[#6f7f92]" />
                                                                )}
                                                            </div>
                                                            <span className="text-lg text-[#6f7f92] font-semibold">
                                                                HUMAN RESOURCES
                                                            </span>
                                                        </div>
                                                        <div
                                                            className={`mt-3 bg-[#ffffff] p-0 m-0 overflow-y-scroll w-full overflow-hidden transition-all duration-500 ease-in-out ${
                                                                openSections.humanResources
                                                                    ? 'max-h-[200px]'
                                                                    : 'max-h-0'
                                                            }`}
                                                        >
                                                            <div className="px-[24px]">
                                                                <div className="px-[24px]">
                                                                    <ul className="flex cursor-pointer flex-col items-center pl-0 mb-0">
                                                                        <li
                                                                            className="flex items-center justify-between w-full text-sm py-[21px] border-b-[1px] border-gray-200"
                                                                            onClick={() => toggleCheck('basic')}
                                                                        >
                                                                            Basic
                                                                            {checkedItems['basic'] && (
                                                                                <FaCheck className="text-[#4374c0]" />
                                                                            )}
                                                                        </li>
                                                                        <li
                                                                            className="flex items-center justify-between w-full text-sm py-[21px] border-b-[1px] border-gray-200"
                                                                            onClick={() => toggleCheck('sector')}
                                                                        >
                                                                            Sector
                                                                            {checkedItems['sector'] && (
                                                                                <FaCheck className="text-[#4374c0]" />
                                                                            )}
                                                                        </li>
                                                                        <li
                                                                            className="flex items-center justify-between w-full text-sm py-[21px] border-b-[1px] border-gray-200"
                                                                            onClick={() => toggleCheck('revenue')}
                                                                        >
                                                                            Revenue
                                                                            {checkedItems['revenue'] && (
                                                                                <FaCheck className="text-[#4374c0]" />
                                                                            )}
                                                                        </li>
                                                                        <li
                                                                            className="flex items-center justify-between w-full text-sm py-[21px] border-b-[1px] border-gray-200"
                                                                            onClick={() =>
                                                                                toggleCheck('fundingSources')
                                                                            }
                                                                        >
                                                                            Funding Sources
                                                                            {checkedItems['fundingSources'] && (
                                                                                <FaCheck className="text-[#4374c0]" />
                                                                            )}
                                                                        </li>
                                                                        <li
                                                                            className="flex items-center justify-between w-full text-sm py-[21px] border-b-[1px] border-gray-200"
                                                                            onClick={() => toggleCheck('more')}
                                                                        >
                                                                            More
                                                                            {checkedItems['more'] && (
                                                                                <FaCheck className="text-[#4374c0]" />
                                                                            )}
                                                                        </li>
                                                                        <li
                                                                            className="flex items-center justify-between w-full text-sm py-[21px] border-b-[1px] border-gray-200"
                                                                            onClick={() => toggleCheck('logo')}
                                                                        >
                                                                            Logo
                                                                            {checkedItems['logo'] && (
                                                                                <FaCheck className="text-[#4374c0]" />
                                                                            )}
                                                                        </li>
                                                                        <li
                                                                            className="flex items-center justify-between w-full text-sm py-[21px]"
                                                                            onClick={() => toggleCheck('background')}
                                                                        >
                                                                            Background
                                                                            {checkedItems['background'] && (
                                                                                <FaCheck className="text-[#4374c0]" />
                                                                            )}
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="flex flex-col">
                                                        <div
                                                            onClick={() =>
                                                                setOpenSections({
                                                                    ...openSections,
                                                                    international: !openSections.international,
                                                                })
                                                            }
                                                            className="flex items-center gap-2 cursor-pointer"
                                                        >
                                                            <div
                                                                className={`transition-transform duration-300 ${
                                                                    openSections.international
                                                                        ? 'rotate-180'
                                                                        : 'rotate-0'
                                                                }`}
                                                            >
                                                                {openSections.international ? (
                                                                    <IoMdArrowDropdown className="w-10 h-10 text-[#6f7f92]" />
                                                                ) : (
                                                                    <RiArrowRightSFill className="w-10 h-10 text-[#6f7f92]" />
                                                                )}
                                                            </div>
                                                            <span className="text-lg text-[#6f7f92] font-semibold">
                                                                INTERNATIONAL
                                                            </span>
                                                        </div>
                                                        <div
                                                            className={`mt-3 bg-[#ffffff] p-0 m-0 overflow-y-scroll w-full overflow-hidden transition-all duration-500 ease-in-out ${
                                                                openSections.international ? 'max-h-[200px]' : 'max-h-0'
                                                            }`}
                                                        >
                                                            <div className="px-[24px]">
                                                                <div className="px-[24px]">
                                                                    <ul className="flex cursor-pointer flex-col items-center pl-0 mb-0">
                                                                        <li
                                                                            className="flex items-center justify-between w-full text-sm py-[21px] border-b-[1px] border-gray-200"
                                                                            onClick={() => toggleCheck('hihi')}
                                                                        >
                                                                            hihi
                                                                            {checkedItems['hihi'] && (
                                                                                <FaCheck className="text-[#4374c0]" />
                                                                            )}
                                                                        </li>
                                                                        <li
                                                                            className="flex items-center justify-between w-full text-sm py-[21px] border-b-[1px] border-gray-200"
                                                                            onClick={() => toggleCheck('haha')}
                                                                        >
                                                                            haha
                                                                            {checkedItems['haha'] && (
                                                                                <FaCheck className="text-[#4374c0]" />
                                                                            )}
                                                                        </li>
                                                                        <li
                                                                            className="flex items-center justify-between w-full text-sm py-[21px] border-b-[1px] border-gray-200"
                                                                            onClick={() => toggleCheck('huhu')}
                                                                        >
                                                                            huhu
                                                                            {checkedItems['huhu'] && (
                                                                                <FaCheck className="text-[#4374c0]" />
                                                                            )}
                                                                        </li>
                                                                        <li
                                                                            className="flex items-center justify-between w-full text-sm py-[21px] border-b-[1px] border-gray-200"
                                                                            onClick={() => toggleCheck('haizzz')}
                                                                        >
                                                                            haizzz
                                                                            {checkedItems['haizzz'] && (
                                                                                <FaCheck className="text-[#4374c0]" />
                                                                            )}
                                                                        </li>
                                                                        <li
                                                                            className="flex items-center justify-between w-full text-sm py-[21px] border-b-[1px] border-gray-200"
                                                                            onClick={() => toggleCheck('sad')}
                                                                        >
                                                                            sad
                                                                            {checkedItems['sad'] && (
                                                                                <FaCheck className="text-[#4374c0]" />
                                                                            )}
                                                                        </li>
                                                                        <li
                                                                            className="flex items-center justify-between w-full text-sm py-[21px] border-b-[1px] border-gray-200"
                                                                            onClick={() => toggleCheck('cry')}
                                                                        >
                                                                            cry
                                                                            {checkedItems['cry'] && (
                                                                                <FaCheck className="text-[#4374c0]" />
                                                                            )}
                                                                        </li>
                                                                        <li
                                                                            className="flex items-center justify-between w-full text-sm py-[21px]"
                                                                            onClick={() => toggleCheck('mybad')}
                                                                        >
                                                                            mybad
                                                                            {checkedItems['mybad'] && (
                                                                                <FaCheck className="text-[#4374c0]" />
                                                                            )}
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="flex flex-col">
                                                        <div
                                                            onClick={() =>
                                                                setOpenSections({
                                                                    ...openSections,
                                                                    lawAndLegal: !openSections.lawAndLegal,
                                                                })
                                                            }
                                                            className="flex items-center gap-2 cursor-pointer"
                                                        >
                                                            <div
                                                                className={`transition-transform duration-300 ${
                                                                    openSections.lawAndLegal ? 'rotate-180' : 'rotate-0'
                                                                }`}
                                                            >
                                                                {openSections.lawAndLegal ? (
                                                                    <IoMdArrowDropdown className="w-10 h-10 text-[#6f7f92]" />
                                                                ) : (
                                                                    <RiArrowRightSFill className="w-10 h-10 text-[#6f7f92]" />
                                                                )}
                                                            </div>
                                                            <span className="text-lg text-[#6f7f92] font-semibold">
                                                                LAW AND LEGAL
                                                            </span>
                                                        </div>
                                                        <div
                                                            className={`mt-3 bg-[#ffffff] p-0 m-0 overflow-y-scroll w-full overflow-hidden transition-all duration-500 ease-in-out ${
                                                                openSections.lawAndLegal ? 'max-h-[200px]' : 'max-h-0'
                                                            }`}
                                                        >
                                                            <div className="px-[24px]">
                                                                <div className="px-[24px]">
                                                                    <ul className="flex cursor-pointer flex-col items-center pl-0 mb-0">
                                                                        <li
                                                                            className="flex items-center justify-between w-full text-sm py-[21px] border-b-[1px] border-gray-200"
                                                                            onClick={() => toggleCheck('l')}
                                                                        >
                                                                            l
                                                                            {checkedItems['l'] && (
                                                                                <FaCheck className="text-[#4374c0]" />
                                                                            )}
                                                                        </li>
                                                                        <li
                                                                            className="flex items-center justify-between w-full text-sm py-[21px] border-b-[1px] border-gray-200"
                                                                            onClick={() => toggleCheck('tân')}
                                                                        >
                                                                            tân
                                                                            {checkedItems['tân'] && (
                                                                                <FaCheck className="text-[#4374c0]" />
                                                                            )}
                                                                        </li>
                                                                        <li
                                                                            className="flex items-center justify-between w-full text-sm py-[21px] border-b-[1px] border-gray-200"
                                                                            onClick={() => toggleCheck('duy')}
                                                                        >
                                                                            duy
                                                                            {checkedItems['duy'] && (
                                                                                <FaCheck className="text-[#4374c0]" />
                                                                            )}
                                                                        </li>
                                                                        <li
                                                                            className="flex items-center justify-between w-full text-sm py-[21px] border-b-[1px] border-gray-200"
                                                                            onClick={() => toggleCheck('cường')}
                                                                        >
                                                                            cường
                                                                            {checkedItems['cường'] && (
                                                                                <FaCheck className="text-[#4374c0]" />
                                                                            )}
                                                                        </li>
                                                                        <li
                                                                            className="flex items-center justify-between w-full text-sm py-[21px] border-b-[1px] border-gray-200"
                                                                            onClick={() => toggleCheck('nghĩa')}
                                                                        >
                                                                            nghĩa
                                                                            {checkedItems['nghĩa'] && (
                                                                                <FaCheck className="text-[#4374c0]" />
                                                                            )}
                                                                        </li>
                                                                        <li
                                                                            className="flex items-center justify-between w-full text-sm py-[21px] border-b-[1px] border-gray-200"
                                                                            onClick={() => toggleCheck('hoàng')}
                                                                        >
                                                                            hoàng
                                                                            {checkedItems['hoàng'] && (
                                                                                <FaCheck className="text-[#4374c0]" />
                                                                            )}
                                                                        </li>
                                                                        <li
                                                                            className="flex items-center justify-between w-full text-sm py-[21px]"
                                                                            onClick={() => toggleCheck('duy34')}
                                                                        >
                                                                            duy34
                                                                            {checkedItems['duy34'] && (
                                                                                <FaCheck className="text-[#4374c0]" />
                                                                            )}
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="flex flex-col">
                                                        <div
                                                            onClick={() =>
                                                                setOpenSections({
                                                                    ...openSections,
                                                                    accountingAndFinance:
                                                                        !openSections.accountingAndFinance,
                                                                })
                                                            }
                                                            className="flex items-center gap-2 cursor-pointer"
                                                        >
                                                            <div
                                                                className={`transition-transform duration-300 ${
                                                                    openSections.accountingAndFinance
                                                                        ? 'rotate-180'
                                                                        : 'rotate-0'
                                                                }`}
                                                            >
                                                                {openSections.accountingAndFinance ? (
                                                                    <IoMdArrowDropdown className="w-10 h-10 text-[#6f7f92]" />
                                                                ) : (
                                                                    <RiArrowRightSFill className="w-10 h-10 text-[#6f7f92]" />
                                                                )}
                                                            </div>
                                                            <span className="text-lg text-[#6f7f92] font-semibold">
                                                                ACCOUNTING AND FINANCE
                                                            </span>
                                                        </div>
                                                        <div
                                                            className={`mt-3 bg-[#ffffff] p-0 m-0 overflow-y-scroll w-full overflow-hidden transition-all duration-500 ease-in-out ${
                                                                openSections.accountingAndFinance
                                                                    ? 'max-h-[200px]'
                                                                    : 'max-h-0'
                                                            }`}
                                                        >
                                                            <div className="px-[24px]">
                                                                <div className="px-[24px]">
                                                                    <ul className="flex cursor-pointer flex-col items-center pl-0 mb-0">
                                                                        <li
                                                                            className="flex items-center justify-between w-full text-sm py-[21px] border-b-[1px] border-gray-200"
                                                                            onClick={() => toggleCheck('lap')}
                                                                        >
                                                                            lap
                                                                            {checkedItems['lap'] && (
                                                                                <FaCheck className="text-[#4374c0]" />
                                                                            )}
                                                                        </li>
                                                                        <li
                                                                            className="flex items-center justify-between w-full text-sm py-[21px] border-b-[1px] border-gray-200"
                                                                            onClick={() => toggleCheck('top')}
                                                                        >
                                                                            top
                                                                            {checkedItems['top'] && (
                                                                                <FaCheck className="text-[#4374c0]" />
                                                                            )}
                                                                        </li>
                                                                        <li
                                                                            className="flex items-center justify-between w-full text-sm py-[21px] border-b-[1px] border-gray-200"
                                                                            onClick={() =>
                                                                                toggleCheck('tralaleroTralala')
                                                                            }
                                                                        >
                                                                            tralalero tralala
                                                                            {checkedItems['tralaleroTralala'] && (
                                                                                <FaCheck className="text-[#4374c0]" />
                                                                            )}
                                                                        </li>
                                                                        <li
                                                                            className="flex items-center justify-between w-full text-sm py-[21px] border-b-[1px] border-gray-200"
                                                                            onClick={() =>
                                                                                toggleCheck('tungtungtungsahor')
                                                                            }
                                                                        >
                                                                            tung tung tung sahor
                                                                            {checkedItems['tungtungtungsahor'] && (
                                                                                <FaCheck className="text-[#4374c0]" />
                                                                            )}
                                                                        </li>
                                                                        <li
                                                                            className="flex items-center justify-between w-full text-sm py-[21px] border-b-[1px] border-gray-200"
                                                                            onClick={() => toggleCheck('skibidi')}
                                                                        >
                                                                            skibidi
                                                                            {checkedItems['skibidi'] && (
                                                                                <FaCheck className="text-[#4374c0]" />
                                                                            )}
                                                                        </li>
                                                                        <li
                                                                            className="flex items-center justify-between w-full text-sm py-[21px] border-b-[1px] border-gray-200"
                                                                            onClick={() => toggleCheck('shimpanzini')}
                                                                        >
                                                                            shimpanzini bnanananini
                                                                            {checkedItems['shimpanzini'] && (
                                                                                <FaCheck className="text-[#4374c0]" />
                                                                            )}
                                                                        </li>
                                                                        <li
                                                                            className="flex items-center justify-between w-full text-sm py-[21px]"
                                                                            onClick={() => toggleCheck('uuia')}
                                                                        >
                                                                            uuia
                                                                            {checkedItems['uuia'] && (
                                                                                <FaCheck className="text-[#4374c0]" />
                                                                            )}
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-8">
                                        <div className="bg-[#ffffff] rounded-md">
                                            <div className="border-b p-8">
                                                <span className="text-2xl font-semibold">Media</span>
                                            </div>
                                            <div className="p-8">
                                                <ul className="pl-0 mb-0 space-y-4 grid grid-cols-2">
                                                    <li className="flex flex-col gap-2">
                                                        <span className="text-lg text-[#6f7f92] font-semibold">
                                                            PRODUCT DEMO VIDEO
                                                        </span>
                                                        <a href="#" className="no-underline">
                                                            Watch Demo
                                                        </a>
                                                    </li>
                                                    <li className="flex flex-col gap-2">
                                                        <span className="text-lg text-[#6f7f92] font-semibold">
                                                            TEAM INTRODUCTION VIDEO
                                                        </span>
                                                        <a href="#" className="no-underline">
                                                            Meet the Team
                                                        </a>
                                                    </li>
                                                    <li className="flex flex-col gap-2">
                                                        <span className="text-lg text-[#6f7f92] font-semibold">
                                                            PITCH DECK
                                                        </span>
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
                                            <div className="border-b p-8">
                                                <span className="text-2xl font-semibold">Team Information</span>
                                            </div>
                                            <div className="p-8">
                                                <div>
                                                    <span className="text-lg font-semibold">Founding Team</span>
                                                    <div className="flex justify-center mt-8">
                                                        <div className="flex items-center gap-10">
                                                            <div className="relative flex flex-col items-center">
                                                                <img
                                                                    className="rounded-full w-[120px] h-[120px] bg-center object-cover"
                                                                    src="https://s3-alpha-sig.figma.com/img/29e5/9233/2f41fa8ce4ea37a9f868e3d5169dc787?Expires=1746403200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=OV~J6B7CExextG-AmA662mIk69NxMnQaPtTZ7zBedlXPFlONjnzGT9l-c67hl6t-jQ1tI900TNW3dXsCdQF4QLgAEaALxrGeIjx0bZZQ69zDoQ2cOJmGU7PGTpE-jHMOFTNp~GVZtcCeaLPvt~SYViyrw19JmGwpzVYTQojO-i4vV8MIs9by0rS-6Wr8nd8zLAZyPn8jwI-a7CLSgwlUe8IwrMFVZYCHsrgMmnrXuVu0tiEVf76tJVV0DPb2zd7W3rStXaYFxHvarqP0ZkAC0O~jy3NIFcxF6UZk2~C9mcX-q2sC59X-qZhFS2D4wOxRCGcKTkZhL9bhWPPHyBW8HQ__"
                                                                    alt=""
                                                                />
                                                                <span className="absolute bottom-[25px] left-0 text-xs font-semibold w-[120px] py-1 bg-[#ffffff] rounded-full text-center border ">
                                                                    CEO/Founder
                                                                </span>
                                                                <span className="mt-3">Giang Nguyen</span>
                                                            </div>
                                                            <div className="relative flex flex-col items-center">
                                                                <img
                                                                    className="rounded-full w-[120px] h-[120px] bg-center object-cover"
                                                                    src="https://s3-alpha-sig.figma.com/img/c396/b5cd/b4e01100fde051d7cc55ddaa3e52dac3?Expires=1746403200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FNRTjFUVpD45VD9tItfvao7c~FpfqW45c6o8LsVLgSqJgrVXRV4tqG1~7xQJMJ-CY5~bs8h00o4B7e6RYMc3OsJAaHSDYukphedPAS1kvGKEY9RjxeWUMQouwasO2ltB4sEj4Kyr8iCT6E9rZGk7IMYkvh1aJhwyaXkmeh6uyoWo32EsfgFnNEAJ3oogzqTJu-7MV1ddkiwFCVeApFMGTmo67cn80NzLuEH3N14JNPWJ0MhfSDbSJDh9KPufvCzvQ0DymfcYmTK0HZWWcLOGdAgBwbHOk9L-1t-2FGIZ1Ofu7ZUoz-c4ic1M4XOb9sIz79gxbG5~ES~s6EUKuV0cVQ__"
                                                                    alt=""
                                                                />
                                                                <span className="absolute bottom-[25px] left-0 text-xs font-semibold w-[120px] py-1 bg-[#ffffff] rounded-full text-center border ">
                                                                    CFO
                                                                </span>
                                                                <span className="mt-3">Daniel Bui</span>
                                                            </div>
                                                            <div className="relative flex flex-col items-center">
                                                                <img
                                                                    className="rounded-full w-[120px] h-[120px] bg-center object-cover"
                                                                    src="https://s3-alpha-sig.figma.com/img/b0d7/1944/e227773803fd7c19cb5b0e2641756bb6?Expires=1746403200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=RGvRS3F8OY6o9YP1WqRNpY6ntuAy3SvsJ6za5wGL9HhxQCMbeQrd45CEtCXmS0ycnlWP3QAGaqPlwnb3aWfvnEm6d7-66Yl6c5aTGHoDrOmEvhze0AmDov5aHmp6PP9tX7qLVOHOdJDn1lqg-MwHqz9zoPxKQv9bzAUZfORqAaVO5Q1bZxH~JEwSWCK44fqrGfPUdYl5IlMlZ-TJP9ntChUOPT02o29RQ-87JbGsjV8IzxpL9Q88eK7XzDB8LPQ9YZ8NeCbUr65vTBQGXDGEjJiZ60LEq2HUetDLVKknO5qd6WtSmqDorWb4~gwTU~DZmA7jjs4EZt82JxVerGDVEw__"
                                                                    alt=""
                                                                />
                                                                <span className="absolute bottom-[25px] left-0 text-xs font-semibold w-[120px] py-1 bg-[#ffffff] rounded-full text-center border ">
                                                                    CTO
                                                                </span>
                                                                <span className="mt-3">Tam Ne</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-8">
                                                    <span className="text-lg font-semibold">
                                                        Why is your team a winning team?
                                                    </span>
                                                    <p>
                                                        Our team combines deep industry expertise with technical
                                                        excellence. Giang {`'`} s extensive experience in environmental
                                                        science and sustainable technology, Daniel{`'`}s financial
                                                        acumen and success in securing funding for startups, and Tam
                                                        {`'`}s technical skills in software engineering and scalable
                                                        green tech solutions create a powerful synergy. Together, we
                                                        bring a unique blend of knowledge and skills that enable us to
                                                        develop innovative, sustainable solutions that drive both
                                                        environmental and financial benefits for our clients.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-4/12">
                                    <Stack className="w-full bg-gray-100 ">
                                        <Statistical project={projectSelected} />
                                        <div className="relative w-full">
                                            <img
                                                src={fb_img}
                                                alt="logo-fb_img"
                                                className="w-full h-[450px] rounded-md mt-4"
                                            />
                                            <img
                                                src={Logo}
                                                alt="logo-opennezt"
                                                className={`$styles.logo, absolute top-0 py-14 px-12 left-0`}
                                            />
                                            <div className="absolute left-0 flex flex-col items-center gap-3 px-12 text-center text-white xl:left-5 2xl:mt-8 xl:px-20 top-32">
                                                Feel free to reach us anytime. we are avaliable 24 hours
                                                <button className="bg-[#ffffff] px-3 py-3 text-black font-medium rounded-md">
                                                    CONTACT US
                                                </button>
                                            </div>
                                        </div>
                                    </Stack>
                                </div>
                            </div>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Button
                                className="border-[#F4F5F6] bg-[#2F65B9] text-white"
                                onClick={() =>
                                    setProjectSelected(projects[projects.indexOf(projectSelected) - 1] || projects[0])
                                }
                                borderRadius={4}
                                loading={false}
                            >
                                Previous
                            </Button>
                            <Button
                                className="border-[#F4F5F6] bg-[#2F65B9] text-white"
                                onClick={() =>
                                    setProjectSelected(projects[projects.indexOf(projectSelected) + 1] || projects[0])
                                }
                                borderRadius={4}
                                loading={false}
                            >
                                Next
                            </Button>
                            <Button
                                className="border-[#F4F5F6] bg-[#2F65B9] text-white"
                                onClick={() => dispatch(setOpenModalMatchingProjects(false))}
                                borderRadius={4}
                                loading={false}
                            >
                                OK
                            </Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}

export default ModalMatchingProjects
