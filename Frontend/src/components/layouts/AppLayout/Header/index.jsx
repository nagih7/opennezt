import React, { useEffect, useRef, useState } from 'react'
import PopoverProfile from './components/PopoverProfile'
import PopoverMessage from './components/PopoverMessage'
import PopoverNotification from './components/PopoverNotification'
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap'
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap'
import { useSelector, useDispatch } from 'react-redux'
import { LANG } from 'utils/constants'
import { setLanguage } from 'states/modules/app'
import { IconlyChat, IconlyLogout, IconlyNotification, IconlySearch, IconlySetting, IconlyUser } from 'components/UI/Iconly'
import { Avatar, Button, CloseButton, Drawer, For, HStack, Popover, Portal, Stack } from '@chakra-ui/react'
import Logo from 'assets/images/logo/opennezt_full_black_old.png'
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 8eee5f5d07d252c31aae3682ce3600a47d7557ae
import { HiMenuAlt1 } from 'react-icons/hi'
import ProfileCardSidebar from '../SiderBar/components/ProfileCardSidebar'
import NavItem from '../SiderBar/components/NavItem'
import appRouteMap from 'router/appRouteMap'
import manageRouteMap from 'router/manageRouteMap'
import { handleCheckRoute } from 'utils/helper'
import { useNavigate } from 'react-router-dom'
import { logout } from 'api/auth'
import store from 'states/configureStore'
<<<<<<< HEAD
import styles from './styles.module.scss'
=======
=======
>>>>>>> f4da3f9c2720a18179b23875b7b279546eb85b56
>>>>>>> 8eee5f5d07d252c31aae3682ce3600a47d7557ae

const Header = () => {
    const dispatch = useDispatch()
    // const [isShowThemeLight, setIsShowThemeLight] = useState(true);
    const [isFullScreen, setIsFullScreen] = useState(false)
    const authUser = useSelector((state) => state.auth.authUser)
    const [indexNavItemSelect, setIndexNavItemSelect] = useState(null)
    const { language } = useSelector((state) => state.app)
    const { notifications } = useSelector((state) => state.notification)
    const chatListRef = useRef(null)
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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (chatListRef.current && !chatListRef.current.contains(event.target)) {
                setIsShowChatList(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
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
<<<<<<< HEAD
=======

<<<<<<< HEAD
>>>>>>> 8eee5f5d07d252c31aae3682ce3600a47d7557ae
    const { authRole } = useSelector((state) => state.auth)
    const handleToggleMenu = (indexNavItem, menuNavItem) => {
        if (menuNavItem.path) {
            navigate(menuNavItem.path)
        }
        if (isShowSideBar) {
            setIndexNavItemSelect(indexNavItem !== indexNavItemSelect ? indexNavItem : null)
        }
    }

    const handleHoverMenuNavItem = (e, menuNavItem) => {
        const { top } = e.target.getBoundingClientRect()
        setTopMenuSub(top)
        if (menuNavItem.children) {
            setMenuSub(menuNavItem.children)
        } else {
            setMenuSub([])
        }
    }
    const handleConfirmLogOut = async () => {
        await store.dispatch(logout())
        window.location.reload()
    }

    return (
        <header className="bg-[#ffffff] w-full">
            <div className="relative flex justify-center items-center h-[70px] pr-4">
                <div className="lg:hidden md:absolute  md:left-0">
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
                                                            <span className="text-xs font-semibold text-gray-400">
                                                                MENU
                                                            </span>
                                                            <div className="flex flex-col gap-2 mt-2 mb-6 text-sm font-semibold">
                                                                {authRole === 'Super Admin'
                                                                    ? manageRouteMap.map((route, index) => {
                                                                          return (
                                                                              <div
                                                                                  className={`flex items-center px-3 py-[10px] rounded-md text-gray-500  hover:text-[#2f65b9] cursor-pointer gap-2 ${
                                                                                      handleCheckRoute(
                                                                                          route.routeActive,
                                                                                          location.pathname
                                                                                      )
                                                                                          ? styles.menuNavItemActive
                                                                                          : styles.menuNavItem
                                                                                  }`}
                                                                                  key={route.path}
                                                                                  onMouseEnter={(e) =>
                                                                                      handleHoverMenuNavItem(e, route)
                                                                                  }
                                                                                  onClick={() =>
                                                                                      handleToggleMenu(index, route)
                                                                                  }
                                                                              >
                                                                                  <NavItem
                                                                                      route={route}
                                                                                      isShowMenu={
                                                                                          index === indexNavItemSelect
                                                                                      }
                                                                                  />
                                                                              </div>
                                                                          )
                                                                      })
                                                                    : appRouteMap.map((route, index) => {
                                                                          return (
                                                                              <div
                                                                                  className={`flex items-center px-3 py-[10px] rounded-md text-gray-500  hover:text-[#2f65b9] cursor-pointer gap-2 ${
                                                                                      handleCheckRoute(
                                                                                          route.routeActive,
                                                                                          location.pathname
                                                                                      )
                                                                                          ? styles.menuNavItemActive
                                                                                          : styles.menuNavItem
                                                                                  }`}
                                                                                  key={route.path}
                                                                                  onMouseEnter={(e) =>
                                                                                      handleHoverMenuNavItem(e, route)
                                                                                  }
                                                                                  onClick={() =>
                                                                                      handleToggleMenu(index, route)
                                                                                  }
                                                                              >
                                                                                  <NavItem
                                                                                      route={route}
                                                                                      isShowMenu={
                                                                                          index === indexNavItemSelect
                                                                                      }
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
                                                                        color={
                                                                            'rgb(107 114 128 / var(--tw-text-opacity, 1))'
                                                                        }
                                                                    />
                                                                </li>
                                                                <li
                                                                    style={{ cursor: 'pointer' }}
                                                                    onClick={() => navigate('/profile')}
                                                                >
                                                                    <IconlyUser
                                                                        size={24}
                                                                        color={
                                                                            'rgb(107 114 128 / var(--tw-text-opacity, 1))'
                                                                        }
                                                                    />
                                                                </li>
                                                                <li
                                                                    style={{ cursor: 'pointer' }}
                                                                    onClick={() => handleConfirmLogOut()}
                                                                >
                                                                    <IconlyLogout
                                                                        size={24}
                                                                        color={
                                                                            'rgb(107 114 128 / var(--tw-text-opacity, 1))'
                                                                        }
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
                    className="h-full hidden md:flex justify-center  cursor-pointer"
                    onClick={() => (window.location.href = '/')}
                >
                    <img src={Logo} alt="logo-opennezt" className="py-[18px] px-8 bg-[#ffffff]  h-full" />
                </div>
                <div className="md:absolute md:right-0 lg:static flex items-center justify-between flex-1">
<<<<<<< HEAD
=======
=======
    return (
        <header className="bg-[#ffffff] w-full">
            <div className="flex items-center h-[70px] pr-4">
                <div className="h-full cursor-pointer" onClick={() => (window.location.href = '/')}>
                    <img src={Logo} alt="logo-opennezt" className="py-[18px] px-8 bg-[#ffffff]  h-full" />
                </div>
                <div className="flex items-center justify-between flex-1">
>>>>>>> f4da3f9c2720a18179b23875b7b279546eb85b56
>>>>>>> 8eee5f5d07d252c31aae3682ce3600a47d7557ae
                    <div className="flex items-center gap-4 text-sm font-semibold text-[#6f7f92]" />
                    <div className="flex items-center gap-4">
                        <form
                            action=""
                            className="hidden lg:flex items-center bg-[#f8f9fa] rounded-md w-[240px] h-[40px] border-[1px]  border-gray-200 "
                        >
                            <button className="flex items-center justify-center w-10 h-10">
                                <IconlySearch size={16} color={'#6f7f92'} className="text-gray-400" />
                            </button>
                            <input
                                type="text"
                                placeholder="Search Here"
                                className="bg-[#f8f9fa] outline-none text-sm font-medium pr-4 text-[#6f7f92]"
                            />
                        </form>
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 8eee5f5d07d252c31aae3682ce3600a47d7557ae
                {/* <div className="lg:hidden absolute right-0">
                    <HStack wrap="wrap">
                        <For each={['top']}>
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
                                                <div className="flex items-center justify-between flex-1">
                                                    <div className="flex items-center gap-4 text-sm font-semibold text-[#6f7f92]" />
                                                    <div className="flex items-center gap-4">
                                                        <form
                                                            action=""
                                                            className="flex items-center bg-[#f8f9fa] rounded-md w-[240px] h-[40px] border-[1px]  border-gray-200 "
                                                        >
                                                            <button className="flex items-center justify-center w-10 h-10">
                                                                <IconlySearch
                                                                    size={16}
                                                                    color={'#6f7f92'}
                                                                    className="text-gray-400"
                                                                />
                                                            </button>
                                                            <input
                                                                type="text"
                                                                placeholder="Search Here"
                                                                className="bg-[#f8f9fa] outline-none text-sm font-medium pr-4 text-[#6f7f92]"
                                                            />
                                                        </form>
                                                        <div onClick={() => openFullScreen()}>
                                                            <div className="cursor-pointer">
                                                                {isFullScreen ? (
                                                                    <ZoomInMapIcon className="text-[#6f7f92]" />
                                                                ) : (
                                                                    <ZoomOutMapIcon className="text-[#6f7f92]" />
                                                                )}
                                                            </div>
                                                        </div>
                                                        <Popover.Root
                                                            positioning={{ placement: 'bottom-end' }}
                                                            size={'lg'}
                                                        >
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
                                                                        <Avatar.Fallback name={authUser.name} />
                                                                        <Avatar.Image src={authUser.avatar} />
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
                </div> */}
<<<<<<< HEAD
=======
=======
>>>>>>> f4da3f9c2720a18179b23875b7b279546eb85b56
>>>>>>> 8eee5f5d07d252c31aae3682ce3600a47d7557ae
            </div>
        </header>
    )
}

export default Header
