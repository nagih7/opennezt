import { Link } from 'react-router-dom'
import { IconlyArrowDown2, IconlyArrowUp2, IconlyProfile } from 'components/UI/Iconly'
import React from 'react'
import useProfileEditMenu from './hooks/useProfileEditMenu'
import { ROUTE_CONFIG } from '~/config/constants'

const ProfileEditMenu: React.FC = () => {
   const {
      isOpen,
      setIsOpen,
   } = useProfileEditMenu()
   // ========== COMPONENT RENDER ========== //
   return (
      <div className="w-full md:w-4/12">
         {/* ========== Profile Edit Menu ========== */}
         <h6>
            <div
               className="flex items-center justify-between text-[#ffffff] bg-[#2f65b9] py-[16px] px-[20px] rounded-md cursor-pointer"
               onClick={() => setIsOpen(!isOpen)}
            >
               <div className="flex items-center gap-2">
                  <IconlyProfile size={18} color={'#ffffff'} />
                  Profile Settings
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
                     <li className="w-full text-sm py-[21px] border-b-[1px] border-gray-200">
                        <Link
                           to={ROUTE_CONFIG.USER.PROFILE.EDIT.PROFESSIONAL_BACKGROUND}
                           className="text-[#6f7f92] no-underline"
                        >
                           Professional Background
                        </Link>
                     </li>
                     <li className="w-full text-sm py-[21px] border-b-[1px] border-gray-200">
                        <Link to={ROUTE_CONFIG.USER.PROFILE.EDIT.EDUCATION} className="text-[#6f7f92] no-underline">
                           Educations
                        </Link>
                     </li>
                     <li className="w-full text-sm py-[21px] border-b-[1px] border-gray-200">
                        <Link to={ROUTE_CONFIG.USER.PROFILE.EDIT.CERTIFICATION} className="text-[#6f7f92] no-underline">
                           Certifications
                        </Link>
                     </li>
                     <li className="w-full text-sm py-[21px] border-b-[1px] border-gray-200">
                        <Link to={ROUTE_CONFIG.USER.PROFILE.EDIT.SKILL} className="text-[#6f7f92] no-underline">
                           Skills
                        </Link>
                     </li>
                     <li className="w-full text-sm py-[21px]">
                        <Link to={ROUTE_CONFIG.USER.PROFILE.EDIT.DESCRIPTION} className="text-[#6f7f92] no-underline">
                           More
                        </Link>
                     </li>
                     {/* <li className="w-full text-sm py-[21px]">
                                <Link to={'/profile/edit-profile/cv'} className="text-[#6f7f92] no-underline">
                                    CV
                                </Link>
                            </li> */}
                  </ul>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ProfileEditMenu
