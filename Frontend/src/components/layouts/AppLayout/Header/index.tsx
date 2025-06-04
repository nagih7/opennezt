import React from 'react'
import { IconlyChat, IconlyNotification } from 'components/UI/Iconly'
import { Avatar, Popover, Portal } from '@chakra-ui/react'
import Logo from 'assets/images/logo/opennezt_full_black_old.png'
import PopoverProfile from './components/PopoverProfile.tsx'
import PopoverMessage from './components/PopoverMessage.tsx'
import PopoverNotification from './components/PopoverNotification.tsx'
import useHeader from './useHeader.ts'

const Header: React.FC = () => {
   const { authUser, unreadNotifications } = useHeader()

   return (
      <header className="bg-[#ffffff] w-full flex h-header justify-between">
         <div
            className="justify-center hidden h-full cursor-pointer md:flex"
            onClick={() => (window.location.href = '/')}
         >
            <img src={Logo} alt="logo-opennezt" className="py-[18px] px-8 bg-[#ffffff] h-full" />
         </div>
         <div className="flex justify-end flex-1 h-full mx-6">
            <div className="flex items-center gap-4">
               <Popover.Root positioning={{ placement: 'bottom-end' }}>
                  <Popover.Trigger asChild>
                     <span className="cursor-pointer">
                        <IconlyChat size={26} color="#6f7f92" />
                     </span>
                  </Popover.Trigger>
                  <Portal>
                     <Popover.Positioner>
                        <Popover.Content>
                           <Popover.Body className="bg-white">
                              <PopoverMessage />
                           </Popover.Body>
                        </Popover.Content>
                     </Popover.Positioner>
                  </Portal>
               </Popover.Root>

               <Popover.Root positioning={{ placement: 'bottom-end' }} size={'lg'}>
                  <Popover.Trigger asChild>
                     <span className="p-2 cursor-pointer">
                        <IconlyNotification size={26} color="#6f7f92" />
                     </span>
                  </Popover.Trigger>
                  {unreadNotifications.length > 0 && (
                     <span className="absolute top-[1rem] right-[4.5rem] bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full select-none">
                        {unreadNotifications?.length}
                     </span>
                  )}
                  <Portal>
                     <Popover.Positioner>
                        <Popover.Content>
                           <Popover.Body className="bg-white ">
                              <PopoverNotification />
                           </Popover.Body>
                        </Popover.Content>
                     </Popover.Positioner>
                  </Portal>
               </Popover.Root>

               <Popover.Root positioning={{ placement: 'bottom-end' }}>
                  <Popover.Trigger asChild>
                     <span className="cursor-pointer">
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
                              <PopoverProfile />
                           </Popover.Body>
                        </Popover.Content>
                     </Popover.Positioner>
                  </Portal>
               </Popover.Root>
            </div>
         </div>
      </header>
   )
}

export default Header
