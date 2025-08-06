import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '~/api/auth'
import { AppDispatch, RootState, useAppSelector } from '~/store'

const usePersionalInfo = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch<AppDispatch>()
   const { authUser } = useAppSelector((state: RootState) => state.auth)

   const handleConfirmLogOut = async (): Promise<void> => {
      dispatch(logout())
      window.location.reload()
   }

   return {
      authUser,
      navigate,
      handleConfirmLogOut,
   }
}

export default usePersionalInfo
