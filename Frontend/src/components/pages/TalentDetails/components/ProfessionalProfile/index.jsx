import RightSidebar from 'components/common/RightSidebar'
import React from 'react'
import { DataList } from '@chakra-ui/react'
import Profile from 'components/pages/Profile'
import ProfileDetails from 'components/UI/ProfileDetails'
const ProfessionalProfile = ({ profile }) => {
    // ========== STATE FROM REDUX STORE ========== //
    return (
        <div className="flex gap-8 mt-4">
            <ProfileDetails profile={profile} />
            <RightSidebar />
        </div>
    )
}

export default ProfessionalProfile
