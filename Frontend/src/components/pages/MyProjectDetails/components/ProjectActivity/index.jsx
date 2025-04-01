import React from 'react'
import fb_img from '../../../../../assets/images/background/left-banner.webp'
import Logo from '../../../../../assets/images/logo/opennezt_full_black.png'
import { CheckCircleFilled, CloseOutlined, PlusOutlined } from '@ant-design/icons'
import { OPENNEZT_LOGO } from 'utils/constants'

const ProjectActivity = () => {
    return (
        <div>
            <div className="p-8 mb-8 bg-[#ffffff] rounded-md">
                <h5 className="pb-[20px] border-b border-gray-200 mb-[20px] ">
                    <span>Project Administrators</span>
                </h5>
                <div>
                    <ul className="flex flex-col pl-0 mb-0">
                        <li className="flex items-center gap-3">
                            <div>
                                <img src={OPENNEZT_LOGO} alt="" className="w-[60px] h-[60px] rounded-full" />
                            </div>
                            <div>
                                <div href="#" className="flex items-center gap-2 text-black no-underline text-nowrap">
                                    <span className="font-semibold">Vuong Manh Nghia</span>
                                    <CheckCircleFilled className="text-blue-500" />
                                </div>
                                <div className="text-xs text-gray-500">vuongmanhnghia@gmail.com</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="p-8 mb-8 bg-[#ffffff] rounded-md">
                <h5 className="pb-[20px] border-b border-gray-200 mb-[20px] ">
                    <span>Project Administrators</span>
                </h5>
                <div>
                    <div className="flex items-center w-full gap-3">
                        <div className="w-3/12">
                            <div>
                                <a href="#">
                                    <img src={OPENNEZT_LOGO} alt="" className="w-[60px] h-[60px] rounded-full" />
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <div>
                                <h6>
                                    <a href="#" className="text-black no-underline">
                                        Game Of Phones
                                    </a>
                                </h6>
                                <p className="mb-0 text-xs">Public</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center justify-center rounded-md w-7 h-7 ml-[6px] bg-[#eaeff8]">
                                    <a href="#">
                                        <PlusOutlined className="text-[#2f65b9] w-4 h-4" />
                                    </a>
                                </div>
                                <div className="ml-[6px] flex items-center justify-center rounded-md w-7 h-7 bg-[#f8eaea]">
                                    <a href="#">
                                        <CloseOutlined className="text-[#f14646] h-4 w-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center w-full gap-3 mt-[16px]">
                        <div className="w-3/12">
                            <div>
                                <a href="#">
                                    <img src={OPENNEZT_LOGO} alt="" className="w-[60px] h-[60px] rounded-full" />
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <div>
                                <h6>
                                    <a href="#" className="text-black no-underline">
                                        Game Of Phones
                                    </a>
                                </h6>
                                <p className="mb-0 text-xs">Public</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center justify-center rounded-md w-7 h-7 ml-[6px] bg-[#eaeff8]">
                                    <a href="#">
                                        <PlusOutlined className="text-[#2f65b9] w-4 h-4" />
                                    </a>
                                </div>
                                <div className="ml-[6px] flex items-center justify-center rounded-md w-7 h-7 bg-[#f8eaea]">
                                    <a href="#">
                                        <CloseOutlined className="text-[#f14646] h-4 w-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center w-full gap-3 mt-[16px]">
                        <div className="w-3/12">
                            <div>
                                <a href="#">
                                    <img src={OPENNEZT_LOGO} alt="" className="w-[60px] h-[60px] rounded-full" />
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <div>
                                <h6>
                                    <a href="#" className="text-black no-underline">
                                        Game Of Phones
                                    </a>
                                </h6>
                                <p className="mb-0 text-xs">Public</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center justify-center rounded-md w-7 h-7 ml-[6px] bg-[#eaeff8]">
                                    <a href="#">
                                        <PlusOutlined className="text-[#2f65b9] w-4 h-4" />
                                    </a>
                                </div>
                                <div className="ml-[6px] flex items-center justify-center rounded-md w-7 h-7 bg-[#f8eaea]">
                                    <a href="#">
                                        <CloseOutlined className="text-[#f14646] h-4 w-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative w-full">
                <img src={fb_img} alt="logo-fb_img" className="w-full h-[450px] rounded-md mt-4" />
                <img src={Logo} alt="logo-opennezt" className={`$styles.logo, absolute top-0 py-14 px-12 left-0`} />
                <div className="absolute left-0 flex flex-col items-center gap-3 px-12 text-white top-32">
                    Feel free to reach us anytime. we are avaliable 24 hours
                    <button className="bg-[#ffffff] px-3 py-3 text-black font-medium rounded-md">CONTACT US</button>
                </div>
            </div>
        </div>
    )
}

export default ProjectActivity
