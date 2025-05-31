import { useEffect, useState } from 'react'
import { getProfile } from '~/api/profile'
import { useAppSelector } from '~/store'
import { Profile } from '~/types'

// export type TabType = 'About' | 'Friends' | 'Groups' | 'Timeline' | 'Badges' | 'Messages' | 'Notifications' | 'Courses'

export const useProfile = () => {
   const { authUser } = useAppSelector((state) => state.auth)

   const [profile, setProfile] = useState<Profile | null>(null)
   const [loading, setLoading] = useState<boolean>(true)

   useEffect(() => {
      const fetchProfile = async () => {
         setLoading(true)
         try {
            const response = await getProfile()
            if (response && response.data) {
               setProfile(response.data)
            }
         } catch (error) {
            console.error('Failed to fetch profile:', error)
            setProfile(null)
         } finally {
            setLoading(false)
         }
      }
      fetchProfile()
   }, [getProfile])

   return {
      authUser,
      profile,
      loading,
   }
}
