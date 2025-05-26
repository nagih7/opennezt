import { IconlyMessage, IconlyProfile, IconlyUser } from 'components/UI/Iconly'
import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTE_CONFIG } from '~/config/constants/routes'

type TabType = 'About' | 'Friends' | 'Groups' | 'Timeline' | 'Badges' | 'Messages' | 'Notifications' | 'Courses'

interface ProfileMenuProps {
   changeTab: TabType
   setChangeTab: (tab: TabType) => void
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ changeTab, setChangeTab }) => {
   return (
      <div className="px-4 bg-[#ffffff] rounded-md my-8">
         <ul className="flex items-center max-w-full p-0 m-0 overflow-x-scroll scrollbar-hide">
            <li
               onClick={() => setChangeTab('About')}
               className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]"
            >
               <a
                  href="#"
                  className={`no-underline  ${
                     changeTab === 'About' ? 'bg-[#4374c0]' : 'bg-[#F4F5F6]'
                  }   mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2`}
               >
                  <IconlyProfile size={20} color={'#042713'} />
               </a>
               <span className={` ${changeTab === 'About' ? 'text-[#4374c0]' : 'text-[#6f7f92]'} text-sm font-medium`}>
                  About
               </span>
            </li>
            <li
               onClick={() => setChangeTab('Friends')}
               className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]"
            >
               <a
                  href="#"
                  className={`no-underline  ${
                     changeTab === 'Friends' ? 'bg-[#4374c0]' : 'bg-[#F4F5F6]'
                  }   mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2`}
               >
                  <IconlyUser size={20} color={'#042713'} />
               </a>
               <span
                  className={` ${changeTab === 'Friends' ? 'text-[#4374c0]' : 'text-[#6f7f92]'} text-sm font-medium`}
               >
                  Friends
               </span>
            </li>
            <li
               onClick={() => setChangeTab('Groups')}
               className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]"
            >
               <a
                  href="#"
                  className={`no-underline  ${
                     changeTab === 'Groups' ? 'bg-[#4374c0]' : 'bg-[#F4F5F6]'
                  }   mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2`}
               >
                  <IconlyUser size={20} color={'#042713'} />
               </a>
               <span className={` ${changeTab === 'Groups' ? 'text-[#4374c0]' : 'text-[#6f7f92]'} text-sm font-medium`}>
                  Groups
               </span>
            </li>

            <Link className="no-underline" to={ROUTE_CONFIG.USER.CONVERSATION.PREFIX}>
               <li
                  onClick={() => setChangeTab('Messages')}
                  className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]"
               >
                  <a
                     href="#"
                     className={`no-underline  ${
                        changeTab === 'Messages' ? 'bg-[#4374c0]' : 'bg-[#F4F5F6]'
                     }   mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2`}
                  >
                     <IconlyMessage size={20} color={'#042713'} />
                  </a>
                  <span
                     className={` ${
                        changeTab === 'Messages' ? 'text-[#4374c0]' : 'text-[#6f7f92]'
                     } text-sm font-medium`}
                  >
                     Messages
                  </span>
               </li>
            </Link>
         </ul>
      </div>
   )
}

export default ProfileMenu
