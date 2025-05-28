import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { changeAvatar, changeBackground } from "~/api/profile"
import store from "~/store"
import resizeBackground from "~/utils/files/resizeBackground"
import resizeLogo from "~/utils/files/resizeLogo"
import { OPENNEZT_LOGO_GRADIENT } from "~/utils/constants/asset"

interface AuthAccount {
   name: string
   avatar?: string
   background?: string
}

const useProfile = () => {
    const authUser = useSelector((state: any) => state.auth.authUser) as AuthAccount
    const [avatar, setAvatar] = useState<string>('')
    const [background, setBackground] = useState<string>(OPENNEZT_LOGO_GRADIENT)
    const [keyTable, setKeyTable] = useState<string>('1')

   useEffect(() => {
      if (authUser.avatar) {
         setAvatar(authUser.avatar)
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
         const avatar = await resizeLogo(file)
         const formData = new FormData()
         formData.append('avatar', avatar)
         await store.dispatch(changeAvatar(formData))
         setAvatar(URL.createObjectURL(avatar))
         // Hiển thị thông báo thành công nếu cần
      }
   }

   const handleBackgroundChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
         const background = await resizeBackground(file)
         const formData = new FormData()
         formData.append('background', background)
         await store.dispatch(changeBackground(formData))
         setBackground(URL.createObjectURL(background))
         // Hiển thị thông báo thành công nếu cần
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
   