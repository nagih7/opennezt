import { useEffect, useState } from 'react'
import { getAccessToMyProfile } from '~/api/activity'

export const useProfileActive = () => {
   // State
   const [accessToMyProfile, setAccessToMyProfile] = useState([])

   useEffect(() => {
      const fetchAccessToMyProfile = async () => {
         try {
            const response = await getAccessToMyProfile()
            if (response?.data) {
               setAccessToMyProfile(response.data)
            }
         } catch (error) {
            console.error('Failed to fetch access to my profile:', error)
         }
      }

      if (accessToMyProfile.length === 0) {
         fetchAccessToMyProfile()
      }
   }, [])

   return {
      accessToMyProfile,
   }
}
