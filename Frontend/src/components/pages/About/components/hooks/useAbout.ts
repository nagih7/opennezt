import { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "~/store"
import { TabType } from "../types"


const useAbout = () => {
   // ========== STATE FROM REDUX STORE ========== //
   const { authUser } = useSelector((state: RootState) => state.auth)

   // ========== STATE ========== //
   const [changeTab, setChangeTab] = useState<TabType>('About')
   const [imageError, setImageError] = useState<boolean>(false)

   // ========== RENDER ========== //
    return {
        authUser,
        changeTab,
        setChangeTab,
        imageError,
        setImageError
    }
}   

export default useAbout