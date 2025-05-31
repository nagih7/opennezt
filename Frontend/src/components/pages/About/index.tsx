import React from 'react'
import ProfileGroup from './components/ProfileGroup'
import ProfileOverview from './components/ProfileOverview'
import { OPENNEZT_LOGO_GRADIENT } from 'utils/constants'
import { useProfile, useProfileActive } from './hooks'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/UI/tabs'
import { IconlyMessage, IconlyProfile, IconlyUser } from '~/components/UI/Iconly'
import { useNavigate } from 'react-router-dom'
import { ROUTE_CONFIG } from '~/config/constants'
import ProfileDetails from './components/ProfileDetails'
import RightSidebar from '~/components/common/RightSidebar'
import ProfileFriends from './components/ProfileFriends'

const StyleTabsTrigger = 'flex flex-col items-center gap-3 py-[40px] cursor-pointer'

const About: React.FC = () => {
   const navigate = useNavigate()
   const { authUser, profile } = useProfile()
   const { accessToMyProfile } = useProfileActive()

   const StyleSpanTrigger =
      'no-underline p-0 mx-[60px] w-12 h-12 rounded-md flex flex-col justify-center items-center gap-2 bg-[#F4F5F6] '
   // ` ${changeTab === tab && ' !bg-[#4374c0]'}`

   const action = () => {
      return <div>has accessed your profile.</div>
   }

   if (!profile) return null

   return (
      <div className="relative bg-[#ffffff] w-full max-h-full mb-8">
         <img
            className="h-[400px] object-cover bg-cover bg-center w-full"
            src={authUser?.background || OPENNEZT_LOGO_GRADIENT}
            alt={authUser?.name || ''}
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
               e.currentTarget.src = OPENNEZT_LOGO_GRADIENT
            }}
         />
         <div className="absolute w-full top-[275px] px-[16px]">
            <ProfileOverview />
            <Tabs defaultValue="About" onChange={(e) => console.log(e)}>
               <TabsList className="px-4 bg-[#ffffff] rounded-md my-8 flex items-center max-w-full overflow-x-scroll scrollbar-hide h-auto justify-start">
                  <TabsTrigger value="About" className={StyleTabsTrigger}>
                     <span className={StyleSpanTrigger}>
                        <IconlyProfile size={20} color={'#042713'} />
                     </span>
                     About
                  </TabsTrigger>
                  <TabsTrigger value="Friends" className={StyleTabsTrigger}>
                     <span className={StyleSpanTrigger}>
                        <IconlyUser size={20} color={'#042713'} />
                     </span>
                     Friends
                  </TabsTrigger>
                  <TabsTrigger value="Groups" className={StyleTabsTrigger}>
                     <span className={StyleSpanTrigger}>
                        <IconlyUser size={20} color={'#042713'} />
                     </span>
                     Groups
                  </TabsTrigger>
                  <TabsTrigger
                     value="Messages"
                     className={StyleTabsTrigger}
                     onClick={() => navigate(ROUTE_CONFIG.USER.CONVERSATION.PREFIX)}
                  >
                     <span className={StyleSpanTrigger}>
                        <IconlyMessage size={20} color={'#042713'} />
                     </span>
                     Messages
                  </TabsTrigger>
               </TabsList>
               <TabsContent value="About" className="flex gap-3">
                  <ProfileDetails profile={profile} />
                  <RightSidebar activities={accessToMyProfile} action={action} />
               </TabsContent>
               <TabsContent value="Friends" className="flex gap-3">
                  <ProfileFriends />
                  <RightSidebar activities={accessToMyProfile} action={action} />
               </TabsContent>
               <TabsContent value="Groups" className="flex gap-3">
                  <ProfileGroup />
                  <RightSidebar activities={accessToMyProfile} action={action} />
               </TabsContent>
            </Tabs>
         </div>
      </div>
   )
}

export default About
