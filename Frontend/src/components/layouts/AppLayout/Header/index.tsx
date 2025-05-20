import React, { useEffect, useRef, useState, useMemo } from 'react'
import PopoverProfile from './components/PopoverProfile'
import PopoverMessage from './components/PopoverMessage'
import PopoverNotification from './components/PopoverNotification'
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap'
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap'
import { useSelector, useDispatch } from 'react-redux'
import {
   IconlyActivity,
   IconlyAddUser,
   IconlyArrowLeft,
   IconlyChat,
   IconlyFolder,
   IconlyGraph,
   IconlyLogout,
   IconlyNotification,
   IconlyProfile,
   IconlySearch,
   IconlySetting,
   IconlyTimeCircle,
   IconlyUser,
   IconlyWork,
} from 'components/UI/Iconly'
import { Avatar, Button, CloseButton, Drawer, For, HStack, Popover, Portal, Stack } from '@chakra-ui/react'
import Logo from 'assets/images/logo/opennezt_full_black_old.png'
import { HiMenuAlt1 } from 'react-icons/hi'
import ProfileCardSidebar from '../SiderBar/components/ProfileCardSidebar'
import NavItem from '../SiderBar/components/NavItem'
import appRouteMap from 'routes/appRouteMap'
import manageRouteMap from 'routes/manageRouteMap'
import { handleCheckRoute } from 'utils/helper'
import { useNavigate, useLocation } from 'react-router-dom'
import { logout } from 'api/auth'
import { AppDispatch } from '~/store'
import styles from './styles.module.scss'
import { NAVBAR, SEARCH } from 'utils/constants/app'
import { RootState } from '~/store'

// Define types for state
interface RecentSearch {
   text: string
   path: string
}

interface SearchResult {
   key: string
   text: string
   path: string
   icon: React.ReactElement
}

interface NavRoute {
   path: string
   children?: NavRoute[]
   routeActive?: string[]
}

interface NotificationMetadata {
   read: boolean
}

interface Notification {
   metadata?: NotificationMetadata
   id: string
}

const Header: React.FC = () => {
   const dispatch = useDispatch<AppDispatch>()
   const [isFullScreen, setIsFullScreen] = useState<boolean>(false)
   const authUser = useSelector((state: RootState) => state.auth.authUser)
   const [indexNavItemSelect, setIndexNavItemSelect] = useState<number | null>(null)
   const { language } = useSelector((state: RootState) => state.app)
   const { notifications } = useSelector((state: RootState) => state.notification)
   const location = useLocation()
   const [isShowSideBar, setIsShowSideBar] = useState<boolean>(false)
   const unreadNotifications = notifications.filter((notification) => notification.metadata?.read === false)

   useEffect(() => {
      const handleFullScreenChange = () => {
         setIsFullScreen(!!document.fullscreenElement)
      }
      document.addEventListener('fullscreenchange', handleFullScreenChange)
      document.addEventListener('webkitfullscreenchange', handleFullScreenChange) // Safari
      document.addEventListener('mozfullscreenchange', handleFullScreenChange) // Firefox
      document.addEventListener('MSFullscreenChange', handleFullScreenChange) // IE

      // Cleanup event listener khi component unmount
      return () => {
         document.removeEventListener('fullscreenchange', handleFullScreenChange)
         document.removeEventListener('webkitfullscreenchange', handleFullScreenChange)
         document.removeEventListener('mozfullscreenchange', handleFullScreenChange)
         document.removeEventListener('MSFullscreenChange', handleFullScreenChange)
      }
   }, [])

   const openFullScreen = () => {
      if (!document.fullscreenElement) {
         if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen()
         } else if (document.documentElement.webkitRequestFullscreen) {
            /* Safari */
            document.documentElement.webkitRequestFullscreen()
         } else if (document.documentElement.msRequestFullscreen) {
            /* IE11 */
            document.documentElement.msRequestFullscreen()
         }
      } else {
         if (document.exitFullscreen) {
            document.exitFullscreen()
         } else if (document.webkitExitFullscreen) {
            /* Safari */
            document.webkitExitFullscreen()
         } else if (document.msExitFullscreen) {
            /* IE11 */
            document.msExitFullscreen()
         }
      }
   }

   //Siderbar
   const navigate = useNavigate()
   const { authRole } = useSelector((state: RootState) => state.auth)
   const handleToggleMenu = (indexNavItem: number, menuNavItem: NavRoute) => {
      if (menuNavItem.path) {
         navigate(menuNavItem.path)
      }
      if (isShowSideBar) {
         setIndexNavItemSelect(indexNavItem !== indexNavItemSelect ? indexNavItem : null)
      }
   }

   const handleConfirmLogOut = () => {
      dispatch(logout())
      window.location.reload()
   }
   //Search
   const [searchQuery, setSearchQuery] = useState<string>('')
   const [searchResults, setSearchResults] = useState<SearchResult[]>([])
   const [showResults, setShowResults] = useState<boolean>(false)
   const searchRef = useRef<HTMLDivElement | null>(null)
   const [isSearchActive, setIsSearchActive] = useState<boolean>(false)
   const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([])

   // Generate navigation mapping from route keys to paths
   const navRoutes = useMemo<Record<string, string>>(
      () => ({
         ACTIVITY: '/activity',
         ADMIN: '/admin/manage',
         ABOUT_ME: '/about',
         PROJECT: '/projects',
         RECRUIT_TALENTS: '/recruit-talents',
         SEEK_PROJECTS: '/seek-projects',
         MESSAGES: '/conversation',
      }),
      []
   )

   const routeIcons = useMemo<Record<string, React.ReactElement>>(
      () => ({
         ACTIVITY: <IconlyActivity size={16} color={'#6f7f92'} />,
         ADMIN: <IconlyGraph size={16} color={'#6f7f92'} />,
         ABOUT_ME: <IconlyProfile size={16} color={'#6f7f92'} />,
         PROJECT: <IconlyFolder size={16} color={'#6f7f92'} />,
         RECRUIT_TALENTS: <IconlyAddUser size={16} color={'#6f7f92'} />,
         SEEK_PROJECTS: <IconlyWork size={16} color={'#6f7f92'} />,
         MESSAGES: <IconlyChat size={16} color={'#6f7f92'} />,
         // Add a default icon for any path that doesn't have a specific mapping
         default: <IconlySearch size={16} color={'#6f7f92'} />,
      }),
      []
   )

   // Handle search functionality
   useEffect(() => {
      if (searchQuery.trim() === '') {
         setSearchResults([])
         setShowResults(false)
         return
      }
      const results = Object.entries(NAVBAR)
         .filter(([key, value]: [string, any]) => {
            const searchTerm = searchQuery.toLowerCase()
            const itemText = value[language]?.toLowerCase() || ''
            return itemText.includes(searchTerm)
         })
         .map(([key, value]: [string, any]) => ({
            key,
            text: value[language],
            path: navRoutes[key] || '/',
            icon: routeIcons[key] || routeIcons.default, // Add the icon here
         }))

      setSearchResults(results)
      setShowResults(results.length > 0)
   }, [searchQuery, language, navRoutes, routeIcons])

   // Close search results when clicking outside
   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
            setShowResults(false)
            // Also reset the search active state when clicking outside
            setIsSearchActive(false)
         }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
   }, [searchQuery]) // Add searchQuery as a dependency since we're using it in the effect

   const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (searchResults.length > 0) {
         const result = searchResults[0]
         navigate(result.path)

         // Save this search to recent searches
         const newRecentSearches = [
            { text: searchQuery, path: result.path },
            ...recentSearches.filter((item) => item.text !== searchQuery).slice(0, 4),
         ]
         localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches))
         setRecentSearches(newRecentSearches)

         setSearchQuery('')
         setShowResults(false)
         setIsSearchActive(false)
      }
   }

   useEffect(() => {
      const savedSearches = localStorage.getItem('recentSearches')
      if (savedSearches) {
         try {
            setRecentSearches(JSON.parse(savedSearches))
         } catch (e) {
            // console.error('Error parsing recent searches:', e)
            setRecentSearches([])
         }
      }
   }, [])

   const handleResultClick = (path: string) => {
      navigate(path)

      // Save this search to recent searches
      const newRecentSearches = [
         { text: searchQuery, path },
         ...recentSearches.filter((item) => item.text !== searchQuery).slice(0, 4),
      ]
      localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches))
      setRecentSearches(newRecentSearches)

      setSearchQuery('')
      setShowResults(false)
      setIsSearchActive(false)
   }

   const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value
      setSearchQuery(query)

      // Check if query exactly matches a defined route path
      const exactPathMatch = Object.entries(navRoutes).find(([_, path]) => query.toLowerCase() === path.toLowerCase())

      if (exactPathMatch) {
         // If we have an exact match to a path, navigate immediately
         navigate(exactPathMatch[1])
         setSearchQuery('')
         setShowResults(false)
         setIsSearchActive(false)
      }
   }

   return (
      <header className="bg-[#ffffff] w-full">
         <div className="relative flex justify-center items-center h-[70px] pr-4">
            <div className="lg:hidden md:absolute md:left-0">
               <HStack wrap="wrap">
                  <For each={['start']}>
                     {(placement) => (
                        <Drawer.Root key={placement} placement={placement}>
                           <Drawer.Trigger asChild>
                              <Button variant="outline" size="sm">
                                 <HiMenuAlt1 className="w-5 h-5" />
                              </Button>
                           </Drawer.Trigger>
                           <Portal>
                              <Drawer.Backdrop />
                              <Drawer.Positioner>
                                 <Drawer.Content
                                    roundedTop={placement === 'bottom' ? 'l3' : undefined}
                                    roundedBottom={placement === 'top' ? 'l3' : undefined}
                                 >
                                    <div className="relative flex flex-col h-full">
                                       <div className="flex-1 max-h-[610px] 2xl:max-h-full overflow-y-scroll scrollbar-hide bg-[#ffffff] p-8">
                                          <ProfileCardSidebar />

                                          <div className="border-b-[1px] border-gray-200">
                                             <span className="text-xs font-semibold text-gray-400">MENU</span>
                                             <div className="flex flex-col gap-2 mt-2 mb-6 text-sm font-semibold">
                                                {authRole === 'Super Admin'
                                                   ? manageRouteMap.map((route, index) => {
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
                                                              <NavItem
                                                                 route={route}
                                                                 isShowMenu={index === indexNavItemSelect}
                                                              />
                                                           </div>
                                                        )
                                                     })
                                                   : appRouteMap.map((route, index) => {
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
                                                              <NavItem
                                                                 route={route}
                                                                 isShowMenu={index === indexNavItemSelect}
                                                              />
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
                                                <li
                                                   style={{ cursor: 'pointer' }}
                                                   onClick={() => navigate('/account-settings')}
                                                >
                                                   <IconlySetting
                                                      size={24}
                                                      color={'rgb(107 114 128 / var(--tw-text-opacity, 1))'}
                                                   />
                                                </li>
                                                <li style={{ cursor: 'pointer' }} onClick={() => navigate('/profile')}>
                                                   <IconlyUser
                                                      size={24}
                                                      color={'rgb(107 114 128 / var(--tw-text-opacity, 1))'}
                                                   />
                                                </li>
                                                <li style={{ cursor: 'pointer' }} onClick={() => handleConfirmLogOut()}>
                                                   <IconlyLogout
                                                      size={24}
                                                      color={'rgb(107 114 128 / var(--tw-text-opacity, 1))'}
                                                   />
                                                </li>
                                             </ul>
                                          </div>
                                       </div>
                                    </div>
                                    <Drawer.CloseTrigger asChild>
                                       <CloseButton size="sm" />
                                    </Drawer.CloseTrigger>
                                 </Drawer.Content>
                              </Drawer.Positioner>
                           </Portal>
                        </Drawer.Root>
                     )}
                  </For>
               </HStack>
            </div>
            <div
               className="justify-center hidden h-full cursor-pointer md:flex"
               onClick={() => (window.location.href = '/')}
            >
               <img src={Logo} alt="logo-opennezt" className="py-[18px] px-8 bg-[#ffffff]  h-full" />
            </div>
            <div className="flex items-center justify-between flex-1 md:absolute md:right-0 lg:static">
               <div className="flex items-center gap-4 text-sm font-semibold text-[#6f7f92]" />
               <div className="flex items-center gap-4">
                  <div className="relative flex" ref={searchRef}>
                     {isSearchActive && (
                        <div
                           className="bg-[#ffffff] cursor-pointer h-[40px] w-[40px] flex items-center justify-center rounded-l-md"
                           onClick={() => {
                              setSearchQuery('')
                              setIsSearchActive(false)
                              setShowResults(false)
                           }}
                        >
                           <IconlyArrowLeft size={20} color={'#6f7f92'} />
                        </div>
                     )}
                     <form
                        onSubmit={handleSearchSubmit}
                        className="hidden lg:flex items-center bg-[#f8f9fa] rounded-md w-[240px] h-[40px] border-[1px] border-gray-200"
                     >
                        {/* Search icon button - only shown when search is NOT active */}
                        {!isSearchActive && (
                           <button
                              type="button"
                              className="flex items-center justify-center w-10 h-10"
                              onClick={() => {
                                 setIsSearchActive(true)
                                 setTimeout(
                                    () => (document.querySelector('input[type="text"]') as HTMLInputElement)?.focus(),
                                    10
                                 )
                              }}
                           >
                              <IconlySearch size={16} color={'#6f7f92'} className="text-gray-400" />
                           </button>
                        )}
                        <input
                           type="text"
                           value={searchQuery}
                           onChange={handleSearchQueryChange}
                           placeholder={SEARCH[language] || 'Search'}
                           className={`bg-[#f8f9fa] outline-none text-sm font-medium text-[#6f7f92] w-full ${
                              isSearchActive ? 'pl-3' : 'pr-4'
                           }`}
                           onFocus={() => {
                              setIsSearchActive(true)
                              setShowResults(true)
                           }}
                        />
                        {showResults && (
                           <div className="absolute top-[50px] right-[-18px] w-[300px] bg-white rounded-b-md z-50">
                              {searchQuery.trim() === '' ? (
                                 <>
                                    <span className="p-3 text-[#6f7f92] text-sm font-medium">Recent searches</span>
                                    {recentSearches.map((item, index) => (
                                       <div
                                          key={index}
                                          className="px-3 py-2 hover:bg-[#f8f9fa] hover:rounded-md cursor-pointer text-[#6f7f92] text-sm"
                                          onClick={() => {
                                             setSearchQuery(item.text)

                                             setIsSearchActive(true)

                                             setShowResults(true)(
                                                document.querySelector('input[type="text"]') as HTMLInputElement
                                             )?.focus()
                                          }}
                                       >
                                          <div className="flex items-center gap-1">
                                             <IconlyTimeCircle size={16} color={'#6f7f92'} />
                                             {item.text}
                                          </div>
                                       </div>
                                    ))}
                                 </>
                              ) : (
                                 searchResults.map((result) => (
                                    <div
                                       key={result.key}
                                       className="flex items-center gap-2 px-3 py-2 hover:bg-[#f8f9fa] hover:rounded-md cursor-pointer text-[#6f7f92] text-sm"
                                       onClick={() => handleResultClick(result.path)}
                                    >
                                       {result.icon}
                                       {result.text}
                                    </div>
                                 ))
                              )}
                           </div>
                        )}
                     </form>
                  </div>
                  <div onClick={() => openFullScreen()}>
                     <div className="cursor-pointer">
                        {isFullScreen ? (
                           <ZoomInMapIcon className="text-[#6f7f92]" />
                        ) : (
                           <ZoomOutMapIcon className="text-[#6f7f92]" />
                        )}
                     </div>
                  </div>
                  <Popover.Root positioning={{ placement: 'bottom-end' }} size={'lg'}>
                     <Popover.Trigger asChild>
                        <span>
                           <IconlyNotification size={24} color="#6f7f92" />
                        </span>
                     </Popover.Trigger>
                     {unreadNotifications.length > 0 && (
                        <span className="absolute top-[1rem] right-[7.5rem] bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full user-select-none">
                           {unreadNotifications?.length}
                        </span>
                     )}
                     <Portal>
                        <Popover.Positioner>
                           <Popover.Content>
                              <Popover.Body className="p-0 bg-white">
                                 <PopoverNotification />
                              </Popover.Body>
                           </Popover.Content>
                        </Popover.Positioner>
                     </Portal>
                  </Popover.Root>

                  <Popover.Root positioning={{ placement: 'bottom-end' }}>
                     <Popover.Trigger asChild>
                        <span>
                           <IconlyChat size={24} color="#6f7f92" />
                        </span>
                     </Popover.Trigger>
                     <Portal>
                        <Popover.Positioner>
                           <Popover.Content>
                              <Popover.Body className="bg-white">
                                 <Stack spacing={4}>
                                    <PopoverMessage />
                                 </Stack>
                              </Popover.Body>
                           </Popover.Content>
                        </Popover.Positioner>
                     </Portal>
                  </Popover.Root>

                  <Popover.Root positioning={{ placement: 'bottom-end' }}>
                     <Popover.Trigger asChild>
                        <span>
                           <Avatar.Root size={'md'}>
                              <Avatar.Fallback name={authUser?.name} />
                              <Avatar.Image src={authUser?.avatar} />
                           </Avatar.Root>
                        </span>
                     </Popover.Trigger>
                     <Portal>
                        <Popover.Positioner>
                           <Popover.Content>
                              <Popover.Body className="bg-white">
                                 <Stack spacing={4}>
                                    <PopoverProfile />
                                 </Stack>
                              </Popover.Body>
                           </Popover.Content>
                        </Popover.Positioner>
                     </Portal>
                  </Popover.Root>
               </div>
            </div>
         </div>
      </header>
   )
}

export default Header
