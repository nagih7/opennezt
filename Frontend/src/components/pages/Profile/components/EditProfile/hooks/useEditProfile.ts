import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { updateUser } from "~/api/profile"

interface DataInfoUser {
   name: string
   email: string
   phone: string
   language: string
   region: string
   city: string
   facebook: string
   linkedin: string
}

const useEditProfile = () => {
   const [dataInfoUser, setDataInfoUser] = useState<DataInfoUser>({
      name: '',
      email: '',
      phone: '',
      language: '',
      region: '',
      city: '',
      facebook: '',
      linkedin: '',
   })
   const loadingBtnUpdateInfoUser = useSelector((state: any) => state.profile.loadingBtnUpdateInfoUser)
   const authUser = useSelector((state: any) => state.auth.authUser)
   const dispatch = useDispatch()

   useEffect(() => {
      if (authUser) {
         setDataInfoUser({
            name: authUser.name,
            email: authUser.email,
            phone: authUser.phone,
            language: authUser.language,
            region: authUser.region,
            city: authUser.city,
            facebook: authUser.facebook,
            linkedin: authUser.linkedin,
         })
      }
   }, [authUser])

   const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>, type: keyof DataInfoUser) => {
      setDataInfoUser((prev) => ({
         ...prev,
         [type]: e.target.value,
      }))
   }

   const handleConfirmSaveInfoUser = async () => {
      dispatch(updateUser(dataInfoUser) as any)
   }
   return {
        dataInfoUser,
        setDataInfoUser,
        loadingBtnUpdateInfoUser,
        handleChangeInput,
        handleConfirmSaveInfoUser,
   }
}

export default useEditProfile