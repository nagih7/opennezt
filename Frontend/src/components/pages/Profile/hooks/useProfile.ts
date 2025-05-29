import { useEffect, useState } from "react"
import { useAppSelector, useAppDispatch } from "~/store/hooks"
import { changeAvatar, changeBackground, getProfile } from "~/api/profile"
import resizeBackground from "~/utils/files/resizeBackground"
import resizeLogo from "~/utils/files/resizeLogo"
import { OPENNEZT_LOGO_GRADIENT, OPENNEZT_LOGO } from "~/utils/constants/asset"

interface AuthAccount {
   name: string
   avatar?: string
   background?: string
}

const useProfile = () => {
   const authUser = useAppSelector((state: any) => state.auth.authUser) as AuthAccount
   const dispatch = useAppDispatch()
   const [avatar, setAvatar] = useState<string>(OPENNEZT_LOGO)
   const [background, setBackground] = useState<string>(OPENNEZT_LOGO_GRADIENT)
   const [keyTable, setKeyTable] = useState<string>('1')

   useEffect(() => {
      if (authUser.avatar) {
         setAvatar(authUser.avatar)
      } else {
         // Set default avatar when no avatar is provided
         setAvatar(OPENNEZT_LOGO)
      }
      if (authUser.background) {
         setBackground(authUser.background)
      } else {
         // Set default background when no background is provided
         setBackground(OPENNEZT_LOGO_GRADIENT)
      }
   }, [authUser])

   const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
         try {
            const resizedAvatar = await resizeLogo(file)
            const formData = new FormData()
            formData.append('avatar', resizedAvatar)
            await changeAvatar(formData)
            
            // Update local state immediately for better UX
            setAvatar(URL.createObjectURL(resizedAvatar))
            
            // Refresh profile data from server to get updated avatar URL
            const profileData = await getProfile()
            if (profileData?.data?.avatar) {
               setAvatar(profileData.data.avatar)
            }
            
         } catch (error) {
            // Handle error silently or show user notification
         }
      }
   }

   const handleBackgroundChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
         try {
            const resizedBackground = await resizeBackground(file)
            const formData = new FormData()
            formData.append('background', resizedBackground)
            await dispatch(changeBackground(formData))
            
            // Update local state immediately for better UX
            setBackground(URL.createObjectURL(resizedBackground))
            
            // Refresh profile data from server to get updated background URL
            const profileData = await getProfile()
            if (profileData?.data?.background) {
               setBackground(profileData.data.background)
            }
            
         } catch (error) {
            // Handle error silently or show user notification
         }
      }
   }

   const handleAvatarError = () => {
      setAvatar(OPENNEZT_LOGO)
   }

   const handleBackgroundError = () => {
      setBackground(OPENNEZT_LOGO_GRADIENT)
   }

   return {
      authUser,
      avatar,
      background,
      keyTable,
      setKeyTable,
      handleAvatarChange,
      handleBackgroundChange,
      handleAvatarError,
      handleBackgroundError,
   }
}

export default useProfile
   