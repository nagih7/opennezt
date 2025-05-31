import RightSidebar from 'components/common/RightSidebar'
import ProfileDetails from '~/components/pages/About/components/ProfileDetails'
import useProfessionalProfile from './hooks/useProfessionalProfile'

const action = () => {
   return <div>has accessed your profile.</div>
}

const ProfessionalProfile = () => {
   const {
      profile,
      accessToMyProfile
   } = useProfessionalProfile()
   return (
      <div className="flex gap-3">
         <ProfileDetails profile={profile} />
         <RightSidebar activities={accessToMyProfile} action={action} />
      </div>
   )
}

export default ProfessionalProfile
