import React, { useState, useEffect, useRef } from 'react'
import { FaCircleCheck } from "react-icons/fa6";
import fb_img from 'assets/images/background/left-banner.webp'
import Logo from 'assets/images/logo/opennezt_full_black_old.png'
import moment from 'moment'
import { Avatar } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { AnyAction } from 'redux'

interface User {
   _id: string
   name: string
   avatar?: string
   [key: string]: any
}

interface Project {
   _id: string
   name: string
   [key: string]: any
}

interface Activity {
   user?: User
   project?: Project
   timestamp: string | Date
   [key: string]: any
}

interface RightSidebarProps {
   activities: any[]
   action: any
}

const RightSidebar: React.FC<RightSidebarProps> = ({ activities, action }) => {
   const navigate = useNavigate()
   const [displayedActivities, setDisplayedActivities] = useState<Activity[]>([])
   const activitiesContainerRef = useRef<HTMLDivElement>(null)

   // ========== HANDLE FUNCTION ========== //
   const handleViewTalentDetails = (user: User) => {
      navigate(`/talents/${user._id}/details`)
   }

   useEffect(() => {
      if (activities && activities.length > 0) {
         setDisplayedActivities(activities)
         // setHasMore(activities.length >= 10)
      }
   }, [activities])

   // ========== RENDER COMPONENT ========== //
   return (
      <div className="hidden w-4/12 lg:block">
         <div className="bg-[#ffffff] p-8 rounded-md mb-4">
            <div className="flex flex-col">
               <span className="text-xl font-semibold border-b-[1px] border-gray-200 pb-3">Active Users</span>
               <span className="pt-4 font-light text-gray-500">There are no recently active members</span>
            </div>
         </div>
         <div className="flex flex-col bg-[#ffffff] p-8 rounded-md mt-3 mb-4">
            <span className="mb-3 text-xl font-semibold">Latest Activities</span>
            <div ref={activitiesContainerRef}>
               {displayedActivities?.map((activity, index) => (
                  <div className="border-gray-200 border-t-[1px]" key={index}>
                     <div className="flex items-center gap-3 my-3">
                        <Avatar.Root
                           className="w-[50px] h-[50px] rounded-full cursor-pointer"
                           onClick={() => activity.user && handleViewTalentDetails(activity.user)}
                        >
                           <Avatar.Fallback name={activity.user?.name} />
                           <Avatar.Image src={activity.user?.avatar} />
                        </Avatar.Root>
                        <p className="text-[#6f7f92] text-sm mb-0">
                           <a href="#" className="text-black no-underline">
                              {activity.user?.name}
                           </a>
                           <FaCircleCheck className="text-[#3897f0] mx-1" />
                           {action(activity.project ? activity.project : activity)}{' '}
                           <a href="#" className="no-underline text-[#6f7f92]">
                              <span className="text-xs">{moment(activity.timestamp).fromNow()}</span>
                           </a>
                        </p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
         <div className="relative w-full ">
            <img src={fb_img} alt="logo-fb_img" className="w-full rounded-md" />
            <div className="absolute top-0 h-3/4 flex flex-col items-center justify-center bg-gradient-to-b from-[#000000] to-[#00000000] rounded-md px-20 gap-4">
               <img src={Logo} alt="logo-opennezt" />
               <div className="items-center text-center text-white">
                  Feel free to reach us anytime. we are avaliable 24 hours
               </div>
               <button className="bg-[#ffffff] px-4 py-2.5 text-black font-medium rounded-md">CONTACT US</button>
            </div>
         </div>
      </div>
   )
}
export default RightSidebar
