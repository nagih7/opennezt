import React from 'react'
import RightSidebar from '~/components/common/RightSidebar'
import ProfileDetails from '~/components/pages/About/components/ProfileDetails'
import { TalentProfile } from 'types/talent'
import { Activity, SidebarAction } from 'types/activity'

interface ProfessionalProfileProps {
   profile: TalentProfile | null
}

const ProfessionalProfile: React.FC<ProfessionalProfileProps> = ({ profile }) => {
   const activities: Activity[] = []
   const action: SidebarAction = {
      onAction: () => {},
      label: '',
   }

   return (
      <div className="flex gap-8 mt-4">
         <ProfileDetails profile={profile} />
         <RightSidebar activities={activities} action={action} />
      </div>
   )
}

export default ProfessionalProfile
