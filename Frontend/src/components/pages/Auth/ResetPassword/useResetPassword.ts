import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { resetPassword } from '~/api/auth'
import { AppDispatch, RootState, useAppSelector } from '~/store'
import { ResetPasswordPayload } from '~/types'

const useResetPassword = () => {
   const dispatch = useDispatch<AppDispatch>()
   const navigate = useNavigate()
   const location = useLocation()

   const { isLoadingResetPassword, resetPasswordSuccess } = useAppSelector((state: RootState) => state.auth)

   useEffect(() => {
      if (resetPasswordSuccess) {
         navigate('/login')
      }
   }, [resetPasswordSuccess, navigate])

   // Define the function to handle the reset password
   const handleResetPassword = (values: ResetPasswordPayload) => {
      const queryParams = new URLSearchParams(location.search)
      const token = queryParams.get('token')

      if (token) {
         dispatch(resetPassword(token, values.password))
      }
   }

   return {
      isLoadingResetPassword,
      navigate,
      handleResetPassword,
   }
}

export default useResetPassword
