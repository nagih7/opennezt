import React, { useState, MouseEvent } from 'react'
import styles from './styles.module.scss'
import NavItem from './components/NavItem'
import manageRouteMap from '../../../../routes/manageRouteMap'
import { handleCheckRoute } from '../../../../utils/helper'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { logout } from '../../../../api/auth'
import store from 'store/configureStore'
import { IconlyLogout, IconlySetting, IconlyUser } from 'components/UI/Iconly'
import ProfileCardSidebar from './components/ProfileCardSidebar'
import appRouteMap from 'routes/appRouteMap'

interface SideBarProps {
   isShowSideBar: boolean
   handleToggleIsShowSideBar?: () => void
}

interface RouteItem {
   path: string
   label: string
   icon?: React.ReactNode
   routeActive?: string[]
   children?: RouteItem[]
}

interface RootState {
   auth: {
      authRole: string
   }
}

const SideBar: React.FC<SideBarProps> = ({ isShowSideBar = true, handleToggleIsShowSideBar }) => {
   const [indexNavItemSelect, setIndexNavItemSelect] = useState<number | null>(null)
   const [menuSub, setMenuSub] = useState<RouteItem[]>([])
   const [topMenuSub, setTopMenuSub] = useState<number>(0)
   const location = useLocation()
   const navigate = useNavigate()

   const { authRole } = useSelector((state: RootState) => state.auth)

   const handleToggleMenu = (indexNavItem: number, menuNavItem: RouteItem) => {
      if (menuNavItem.path) {
         navigate(menuNavItem.path)
      }
      if (isShowSideBar) {
         setIndexNavItemSelect(indexNavItem !== indexNavItemSelect ? indexNavItem : null)
      }
   }

   const handleHoverMenuNavItem = (e: MouseEvent<HTMLDivElement>, menuNavItem: RouteItem) => {
      const { top } = e.currentTarget.getBoundingClientRect()
      setTopMenuSub(top)
      if (menuNavItem.children) {
         setMenuSub(menuNavItem.children)
      } else {
         setMenuSub([])
      }
   }

   const handleLeaveMenuNavItem = () => {
      setMenuSub([])
   }

   const handleConfirmLogOut = async () => {
      await store.dispatch(logout())
      window.location.reload()
   }

   return (
      <div
         onMouseLeave={() => handleLeaveMenuNavItem()}
         className={`${styles.sideBarWrap} ${!isShowSideBar ? styles.sideBarWrapClose : ''} border-t-2 border-gray-100`}
      >
         <div className="relative flex flex-col h-full">
            <div className="flex-1 max-h-[610px] 2xl:max-h-full overflow-y-scroll scrollbar-hide bg-[#ffffff] p-8">
               <ProfileCardSidebar />
               {/* MENU */}
               <div className="border-b-[1px] border-gray-200">
                  <span className="text-xs font-semibold text-gray-400">MENU</span>
                  <div className="flex flex-col gap-2 mt-2 mb-6 text-sm font-semibold">
                     {authRole === 'Super Admin'
                        ? manageRouteMap.map((route: RouteItem, index: number) => {
                             return (
                                <div
                                   className={`flex items-center px-3 py-[10px] rounded-md text-gray-500  hover:text-[#2f65b9] cursor-pointer gap-2 ${
                                      handleCheckRoute(route.routeActive, location.pathname)
                                         ? styles.menuNavItemActive
                                         : styles.menuNavItem
                                   }`}
                                   key={route.path}
                                   onMouseEnter={(e) => handleHoverMenuNavItem(e, route)}
                                   onClick={() => handleToggleMenu(index, route)}
                                >
                                   <NavItem route={route} isShowMenu={index === indexNavItemSelect} />
                                </div>
                             )
                          })
                        : appRouteMap.map((route: RouteItem, index: number) => {
                             return (
                                <div
                                   className={`flex items-center px-3 py-[10px] rounded-md text-gray-500  hover:text-[#2f65b9] cursor-pointer gap-2 ${
                                      handleCheckRoute(route.routeActive, location.pathname)
                                         ? styles.menuNavItemActive
                                         : styles.menuNavItem
                                   }`}
                                   key={route.path}
                                   onMouseEnter={(e) => handleHoverMenuNavItem(e, route)}
                                   onClick={() => handleToggleMenu(index, route)}
                                >
                                   <NavItem route={route} isShowMenu={index === indexNavItemSelect} />
                                </div>
                             )
                          })}
                  </div>
               </div>
            </div>
            <div className="bottom-0 left-0 w-[270px] py-4 px-3 bg-[#ffffff] text-gray-500">
               <div className="flex items-center w-[240px] p-3 bg-[#f8f9fa] ] rounded-md">
                  <ul
                     className="flex items-center justify-around w-full"
                     style={{
                        width: '100%',
                        padding: '0',
                        listStyle: 'none',
                        margin: '0',
                     }}
                  >
                     <li style={{ cursor: 'pointer' }} onClick={() => navigate('/account-settings')}>
                        <IconlySetting size={24} color={'rgb(107 114 128 / var(--tw-text-opacity, 1))'} />
                     </li>
                     <li style={{ cursor: 'pointer' }} onClick={() => navigate('/profile')}>
                        <IconlyUser size={24} color={'rgb(107 114 128 / var(--tw-text-opacity, 1))'} />
                     </li>
                     <li style={{ cursor: 'pointer' }} onClick={() => handleConfirmLogOut()}>
                        <IconlyLogout size={24} color={'rgb(107 114 128 / var(--tw-text-opacity, 1))'} />
                     </li>
                  </ul>
               </div>
            </div>
         </div>

         {!isShowSideBar && menuSub && menuSub.length > 0 ? (
            <div
               className={`${styles.boxMenuSubWrap}`}
               style={{
                  top: `${topMenuSub}px`,
               }}
            >
               <div className={styles.listMenuSub}>
                  <ul className={styles.menuSubClose}>
                     {manageRouteMap.map((menuSubItem: RouteItem) => {
                        return (
                           <li className={styles.menuSubCloseItem} key={`close${menuSubItem.path}`}>
                              <div
                                 onClick={() => navigate(menuSubItem.path)}
                                 className={`
                              ${styles.contentSubItemWrap} 
                              ${
                                 handleCheckRoute(menuSubItem.routeActive, location.pathname)
                                    ? styles.menuSubItemActive
                                    : ''
                              }
                            `}
                              >
                                 <div className={styles.textWrap}>
                                    <span className={styles.text}>{menuSubItem.label}</span>
                                 </div>
                              </div>
                           </li>
                        )
                     })}
                  </ul>
               </div>
            </div>
         ) : (
            ''
         )}
      </div>
   )
}

export default SideBar
