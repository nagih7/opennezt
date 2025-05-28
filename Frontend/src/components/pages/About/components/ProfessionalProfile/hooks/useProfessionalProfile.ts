import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { getAccessToMyProfile } from "~/api/activity"
import { getProfile } from "~/api/profile"
import { AppDispatch, RootState } from "~/store"

const useProfessionalProfile = () => {
       const dispatch = useDispatch<AppDispatch>()
   // ========== STATE FROM REDUX STORE ========== //
   const { profile } = useSelector((state: RootState) => state.profile)
   // ========== ACCESS TO MY PROFILE ========== //
   const [accessToMyProfile, setAccessToMyProfile] = useState([])

   // ========== USE EFFECT ========== //
   useEffect(() => {
      if (!profile) dispatch(getProfile())
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [dispatch])

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
   }, []) // Remove accessToMyProfile from dependencies

   return {
        profile,
        accessToMyProfile
   }
}

export default useProfessionalProfile
