import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ProfileMenu from './components/ProfileMenu'
import ProfessionalProfile from './components/ProfessionalProfile'
import Friends from './components/Friends'
import { Image } from '@chakra-ui/react'
// import Timeline from './components/Timeline'
import Groups from './components/Groups'
// import Badges from './components/Badges'
import ProfileOverview from './components/ProfileOverview'
import { OPENNEZT_BG_BLACK } from 'utils/constants'

const About = () => {
    // ========== STATE FROM REDUX STORE ========== //
    const { authUser } = useSelector((state) => state.auth)

    // ========== STATE ========== //
    const [changeTab, setChangeTab] = useState('About')
    const [imageError, setImageError] = useState(false)

    // ========== RENDER ========== //
    return (
        <div className="relative bg-[#ffffff] w-full max-h-full mb-8">
            {!imageError ? (
                <Image
                    className="h-[400px] object-cover bg-cover bg-center"
                    src={authUser.background}
                    alt={authUser?.name}
                    aspectRatio={16 / 9}
                    width="100%"
                    onError={() => setImageError(true)}
                />
            ) : (
                <Image
                    className="h-[400px] object-cover bg-cover bg-center"
                    alt={authUser?.name}
                    aspectRatio={16 / 9}
                    width="100%"
                    src={OPENNEZT_BG_BLACK}
                />
            )}
            <div className="absolute w-full top-[275px] px-[16px]">
                <ProfileOverview />
                <ProfileMenu changeTab={changeTab} setChangeTab={setChangeTab} />
                {changeTab == 'About' && <ProfessionalProfile />}
                {changeTab == 'Friends' && <Friends />}
                {/* {changeTab == 'Timeline' && <Timeline />} */}
                {changeTab == 'Groups' && <Groups />}
                {/* {changeTab == 'Badges' && <Badges />} */}
            </div>
        </div>
    )
}

export default About
