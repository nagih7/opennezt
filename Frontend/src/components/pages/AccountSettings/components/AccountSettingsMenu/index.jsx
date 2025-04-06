import { IconlyArrowDown2, IconlyArrowUp2, IconlySetting } from 'components/UI/Iconly'
import React , {useState} from 'react'
import { Link } from 'react-router-dom'

const AccountSettingsMenu = () => {
     const [isOpen, setIsOpen] = useState(true)
    return (
        <div className="w-4/12">
            <h6>
                <div
                    className="flex items-center justify-between text-[#ffffff] bg-[#2f65b9] py-[16px] px-[20px] rounded-md cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="flex items-center gap-2">
                        <IconlySetting size={18} color={'#ffffff'} />
                        Account Settings
                    </div>
                    <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                        {isOpen ? (
                            <IconlyArrowUp2 size={18} color={'#ffffff'} />
                        ) : (
                            <IconlyArrowDown2 size={18} color={'#ffffff'} />
                        )}
                    </div>
                </div>
            </h6>
            <div
                className={`mt-3 bg-[#ffffff] overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? 'max-h-screen' : 'max-h-0'
                }`}
            >
                <div className="px-[24px]">
                    <div className="px-[24px]">
                        <ul className="flex flex-col items-center pl-0 mb-0">
                            <li className=" w-full text-sm py-[21px] border-b-[1px]  border-gray-200 ">
                                <Link
                                    to={'/account-settings/profile-visibility'}
                                    className="text-[#6f7f92] no-underline "
                                >
                                    Profile Visibility
                                </Link>
                            </li>
                            <li className=" w-full text-sm py-[21px] border-b-[1px]  border-gray-200 ">
                                <Link to={'/account-settings/privacy-and-security'} className="text-[#6f7f92]  no-underline ">
                                    Privacy and security
                                </Link>
                            </li>
                            <li className=" w-full text-sm py-[21px] border-b-[1px]  border-gray-200 ">
                                <Link
                                    to={'/account-settings/shop'}
                                    className="text-[#6f7f92]  no-underline "
                                >
                                    Shop
                                </Link>
                            </li>
                            <li className=" w-full text-sm py-[21px] border-b-[1px]  border-gray-200 ">
                                <Link to={'/account-settings/block-list'} className="text-[#6f7f92]  no-underline ">
                                    Block List
                                </Link>
                            </li>
                            <li className=" w-full text-sm py-[21px] ">
                                <Link to={'/account-settings/export-data'} className="text-[#6f7f92]  no-underline ">
                                    Export Data
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountSettingsMenu
