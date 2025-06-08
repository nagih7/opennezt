import { useEffect, useState } from 'react'
import { useAppSelector } from '~/store'
import { changeAvatar, changeBackground, getProfile } from '~/api/profile'
import resizeBackground from '~/utils/files/resizeBackground'
import resizeLogo from '~/utils/files/resizeLogo'

interface AuthAccount {
   name: string
   avatar?: string
   background?: string
}

const useProfile = () => {
   const authUser = useAppSelector((state) => state.auth.authUser) as AuthAccount
   const [avatar, setAvatar] = useState<string>(authUser.avatar || '')
   const [background, setBackground] = useState<string>(authUser.background || '')
   const [keyTable, setKeyTable] = useState<string>('1')

   useEffect(() => {
      setAvatar(authUser.avatar || '')
      setBackground(authUser.background || '')
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
            await changeBackground(formData)

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

   return {
      authUser,
      avatar,
      background,
      keyTable,
      setKeyTable,
      handleAvatarChange,
      handleBackgroundChange,
   }
}

export default useProfile
