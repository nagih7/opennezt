import { useState } from 'react'
import { useAppSelector } from '~/store'
import { changeAvatar } from '~/api/profile'
import resizeLogo from '~/utils/files/resizeLogo'

export const useProfileAvatar = () => {
   // ========== STATE FROM REDUX STORE ========== //
   const { authUser } = useAppSelector((state) => state.auth)
   const { profile } = useAppSelector((state) => state.profile)
   // ========== STATE ========== //
   const [loading, setLoading] = useState<boolean>(false)
   const [avatarFile, setAvatarFile] = useState<File | null>(null)
   const [avatarFileSrc, setAvatarFileSrc] = useState<string | null>(null)
   const [isOpenAvatarPreview, setIsOpenAvatarPreview] = useState<boolean>(false)

   // ========== LOGIC ========== //
   const handleUploadAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files
      if (files && files[0]) {
         const file = files[0] // Lấy file đầu tiên từ input
         setAvatarFile(file)
         setAvatarFileSrc(URL.createObjectURL(file))
         setIsOpenAvatarPreview(true)
      }
   }

   const handleCloseAvatarPreview = () => {
      setIsOpenAvatarPreview(false)
      const fileInput = document.getElementById('file-upload') as HTMLInputElement | null
      if (fileInput) {
         fileInput.value = ''
      }
   }

   const handleSaveAvatar = async (avatarFile: File) => {
      if (!avatarFile) {
         console.error('No avatar file selected')
         return
      }
      setLoading(true)

      try {
         const resizedAvatarFile = await resizeLogo(avatarFile) // Assuming resizeLogo is defined elsewhere
         const formData = new FormData()
         formData.append('avatar', resizedAvatarFile, avatarFile.name) // Add filename as third parameter

         // Verify FormData content
         for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value)
         }

         await changeAvatar(formData)
      } catch (error) {
         console.error('Error uploading avatar:', error)
      } finally {
         // Reset avatar file and source after saving
         setAvatarFile(null)
         setAvatarFileSrc(null)
         setIsOpenAvatarPreview(false)
         setLoading(false)
      }
   }

   return {
      // ========== STATE FROM REDUX STORE ========== //
      authUser,
      loading,
      isOpenAvatarPreview,
      profile,
      // ========== STATE ========== //
      avatarFile,
      avatarFileSrc,
      // ========== LOGIC ========== //
      handleUploadAvatar,
      handleCloseAvatarPreview,
      handleSaveAvatar,
      setAvatarFile,
      setAvatarFileSrc,
      setIsOpenAvatarPreview,
   }
}
