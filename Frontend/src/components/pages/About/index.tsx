import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ProfileMenu from './components/ProfileMenu'
import ProfessionalProfile from './components/ProfessionalProfile'
import Friends from './components/Friends'
import { Image } from '@chakra-ui/react'
import Groups from './components/Groups'
import ProfileOverview from './components/ProfileOverview'
import { OPENNEZT_BG_BLACK } from 'utils/constants'
import { RootState } from 'store/types'

type TabType = 'About' | 'Friends' | 'Groups' | 'Timeline' | 'Badges' | 'Messages' | 'Notifications' | 'Courses'

const About: React.FC = () => {
   // ========== STATE FROM REDUX STORE ========== //
   const { authUser } = useSelector((state: RootState) => state.auth)

   // ========== STATE ========== //
   const [changeTab, setChangeTab] = useState<TabType>('About')
   const [imageError, setImageError] = useState<boolean>(false)

   // ========== RENDER ========== //
   return (
      <div className="relative bg-[#ffffff] w-full max-h-full mb-8">
         {!imageError ? (
            <Image
               className="h-[400px] object-cover bg-cover bg-center"
               src={authUser?.background || ''}
               alt={authUser?.name || ''}
               aspectRatio={16 / 9}
               width="100%"
               onError={() => setImageError(true)}
            />
         ) : (
            <Image
               className="h-[400px] object-cover bg-cover bg-center"
               alt={authUser?.name || ''}
               aspectRatio={16 / 9}
               width="100%"
               src={OPENNEZT_BG_BLACK}
            />
         )}
         <div className="absolute w-full top-[275px] px-[16px]">
            <ProfileOverview />
            <ProfileMenu changeTab={changeTab} setChangeTab={setChangeTab} />
            {changeTab === 'About' && <ProfessionalProfile />}
            {changeTab === 'Friends' && <Friends />}
            {/* {changeTab === 'Timeline' && <Timeline />} */}
            {changeTab === 'Groups' && <Groups />}
            {/* {changeTab === 'Badges' && <Badges />} */}
         </div>
      </div>
   )
}

export default About
