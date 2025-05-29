import { useEffect, useState } from "react"
import { getAccessToMyProfile } from "~/api/activity"
import { getProfile } from "~/api/profile"

const useProfessionalProfile = () => {
   // ========== ACCESS TO MY PROFILE ========== //
   const [accessToMyProfile, setAccessToMyProfile] = useState([])
   const [profile, setProfile] = useState<any>(null)
   useEffect(() => {
      if (!profile) {
         const fetchProfile = async () => {
            const response = await getProfile()
            if (response && response.data) {
               setProfile(response.data)
            }
         }
         if (profile === null) {
            fetchProfile()
         }
   }}, [profile, getProfile])

   useEffect(() => {
      const fetchAccessToMyProfile = async () => {
         try {
            const response = await getAccessToMyProfile()
            if (response?.data) {
               setAccessToMyProfile(response.data)
            }
         } catch (error) {
            console.error("Failed to fetch access to my profile:", error)
         }
      }

      if (accessToMyProfile.length === 0) {
         fetchAccessToMyProfile()
      }
   }, [])

   return {
        profile,
        accessToMyProfile
   }
}

export default useProfessionalProfile
