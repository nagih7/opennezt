import { useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import type { AppDispatch, RootState } from "~/store"
import { matchingProjects } from "~/api/artificialIntelligence"
import { changeAvatar } from "~/api/profile"
import { getHideLinkedinNotification } from "~/utils/localStorage"

const useProfileOverview = () => {
   const dispatch = useDispatch<AppDispatch>()
   // ========== STATE FROM REDUX STORE ========== //
   const { authUser } = useSelector((state: RootState) => state.auth)
   const { isLoadingBtnChangeAvatar } = useSelector((state: RootState) => state.profile)
   const { profile } = useSelector((state: RootState) => state.profile)
   const { projects, isLoadingMatchingProjects } = useSelector((state: RootState) => state.artificialIntelligence)
   // ========== STATE ========== //
   const [avatarFile, setAvatarFile] = useState<File | null>(null)
   const [avatarFileSrc, setAvatarFileSrc] = useState<string | null>(null)
   const [isOpenModalConfirmMatchingProjects, setIsOpenModalConfirmMatchingProjects] = useState(false)
   const [isOpenModalCrawlLinkedin, setIsOpenModalCrawlLinkedin] = useState(false)
   const [isOpenAvatarPreview, setIsOpenAvatarPreview] = useState<Boolean>(false)

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
      try {
         if (!avatarFile) {
            console.error('No avatar file selected');
            return;
         }

         const formData = new FormData();
         formData.append('avatar', avatarFile, avatarFile.name); // Add filename as third parameter
         
         // Debug logs
         console.log('Avatar file details:', {
            name: avatarFile.name,
            type: avatarFile.type,
            size: avatarFile.size
         });
         
         // Verify FormData content
         for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
         }

         const response = await changeAvatar(formData);
         
         if (response) {
            // Reset states after successful upload
            setAvatarFile(null);
            setAvatarFileSrc(null);
            setIsOpenAvatarPreview(false);
         }
      } catch (error) {
         console.error('Error uploading avatar:', error);
      }
   }

   const handleMatchingProjects = () => {
      // Check if user has opted to hide the notification
      const hideNotification = getHideLinkedinNotification()
      if (hideNotification) {
         // If user chose to hide, just call the matching projects directly
         dispatch(matchingProjects())
      } else {
         // Otherwise show the LinkedIn crawl modal
         setIsOpenModalCrawlLinkedin(true)
      }
      setIsOpenModalConfirmMatchingProjects(false)
   }

   return {
        // ========== DISPATCH ========== //
        dispatch,
        // ========== STATE FROM REDUX STORE ========== //
        authUser,
        isLoadingBtnChangeAvatar,
        isOpenAvatarPreview,
        profile,
        projects,
        isLoadingMatchingProjects,
        // ========== STATE ========== //
        avatarFile,
        avatarFileSrc,
        isOpenModalConfirmMatchingProjects,
        isOpenModalCrawlLinkedin,
        // ========== LOGIC ========== //
        handleUploadAvatar,
        handleCloseAvatarPreview,
        handleSaveAvatar,
        handleMatchingProjects,
        setIsOpenModalConfirmMatchingProjects,
        setIsOpenModalCrawlLinkedin,
        setAvatarFile,
        setAvatarFileSrc,
        setIsOpenAvatarPreview,
   }
}

export default useProfileOverview