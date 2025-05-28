import { useSelector } from "react-redux"
import { RootState } from "~/store"

const useProfileCard = () => {
       // ========== STATE FROM REDUX STORE ========== //
   const { authUser } = useSelector((state: RootState) => state.auth)
    return {
        authUser
    }
}

export default useProfileCard