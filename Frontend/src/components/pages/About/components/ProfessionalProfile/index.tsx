import { getAccessToMyProfile } from 'api/activity'
import RightSidebar from 'components/common/RightSidebar'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from 'api/profile'
import ProfileDetails from 'components/UI/ProfileDetails'
import { AppDispatch } from '~/store/configureStore'
import { RootState } from '~/store/store.types'

const action = () => {
   return <div>has accessed your profile.</div>
}

const ProfessionalProfile = () => {
   const dispatch = useDispatch<AppDispatch>()
   // ========== STATE FROM REDUX STORE ========== //
   const { profile } = useSelector((state: RootState) => state.profile)
   const { accessToMyProfile } = useSelector((state: RootState) => state.activity)

   // ========== USE EFFECT ========== //
   useEffect(() => {
      if (!profile) dispatch(getProfile())
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [dispatch])

   useEffect(() => {
      if (accessToMyProfile?.length === 0) dispatch(getAccessToMyProfile())
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <div className="flex gap-3">
         <ProfileDetails profile={profile} />
         <RightSidebar activities={accessToMyProfile} action={action} />
      </div>
   )
}

export default ProfessionalProfile
