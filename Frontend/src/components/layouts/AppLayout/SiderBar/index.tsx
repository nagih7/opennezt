import React from 'react'
import { handleCheckRoute } from '../../../../utils/helper'
import { IconlyLogout, IconlySetting, IconlyUser } from 'components/UI/Iconly'
import useSidebar from './useSidebar'
import { RouteConfig } from '~/types'
import { useLocation } from 'react-router-dom'
import { FaCircleCheck } from 'react-icons/fa6'
import { AVATAR_DEFAULT } from '~/utils/constants'
import { Avatar, AvatarImage } from '~/components/UI/avatar'
import { ROUTE_CONFIG } from '~/config/constants'

const SideBar: React.FC = () => {
   const location = useLocation()
   const { authUser, routes, navigate, handleToggleMenu, handleConfirmLogOut } = useSidebar()

   return (
      <div className="flex-col hidden h-full p-5 overflow-hidden border-t-2 border-gray-100 w-navbar lg:flex">
         <div className="flex-1 overflow-y-scroll scrollbar-hide bg-[#ffffff] p-8">
            <div
               style={{ cursor: 'pointer' }}
               className="flex items-center gap-3 pb-4 mb-6 border-b-[1px] border-gray-200"
               onClick={() => navigate('/profile')}
            >
               <Avatar className="w-[48px] h-[48px]">
                  <AvatarImage src={authUser?.avatar || undefined} />
                  <AvatarImage src={AVATAR_DEFAULT} />
               </Avatar>
               <div>
                  <div className="flex items-center gap-2 text-black no-underline text-nowrap">
                     <span className="font-semibold truncate w-36">{authUser?.name}</span>
                     <FaCircleCheck className="text-blue-500" />
                  </div>
                  <div className="w-40 text-xs text-gray-500 truncate">@{authUser?.email}</div>
               </div>
            </div>

            <div className="border-b-[1px] border-gray-200">
               <span className="text-xs font-semibold text-gray-400">MENU</span>
               <div className="flex flex-col gap-2 mt-2 mb-6 text-sm font-semibold">
                  {routes.map((route: RouteConfig) => {
                     return (
                        <div
                           className={`flex items-center px-3 py-[10px] rounded-md text-gray-500 cursor-pointer gap-2 ${
                              handleCheckRoute(route.routeActive, location.pathname)
                                 ? 'bg-[#2f65b9] text-text-sidebar-active'
                                 : 'hover:bg-bg-sidebar-hover text-text-sidebar'
                           }`}
                           key={route.path}
                           onClick={() => handleToggleMenu(route)}
                        >
                           <div className="flex items-center gap-2">
                              <div>
                                 {route.icon &&
                                    React.cloneElement(route.icon, {
                                       color: handleCheckRoute(route.routeActive, location.pathname)
                                          ? '#ffffff'
                                          : '#6b7280',
                                    })}
                              </div>
                              <span>{route.label}</span>
                           </div>
                        </div>
                     )
                  })}
               </div>
            </div>
         </div>

         <div className="w-full py-4 px-3 bg-[#ffffff] text-gray-500">
            <ul className="flex items-center justify-around w-full list-none p-3 bg-[#f8f9fa] rounded-md">
               <li className="cursor-pointer" onClick={() => navigate(ROUTE_CONFIG.USER.SETTING.PREFIX)}>
                  <IconlySetting size={24} color={'rgb(107 114 128 / var(--tw-text-opacity, 1))'} />
               </li>
               <li className="cursor-pointer" onClick={() => navigate(ROUTE_CONFIG.USER.PROFILE.PREFIX)}>
                  <IconlyUser size={24} color={'rgb(107 114 128 / var(--tw-text-opacity, 1))'} />
               </li>
               <li className="cursor-pointer" onClick={() => handleConfirmLogOut()}>
                  <IconlyLogout size={24} color={'rgb(107 114 128 / var(--tw-text-opacity, 1))'} />
               </li>
            </ul>
         </div>
      </div>
   )
}

export default SideBar
