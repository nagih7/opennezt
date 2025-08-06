import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch, RootState, useAppSelector } from '~/store'
import { resetAuthRegister, resetRegister } from '~/store/modules/auth'

const useVerifyAuth = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch<AppDispatch>()

   const { authRegister } = useAppSelector((state: RootState) => state.auth)

   useEffect(() => {
      dispatch(resetRegister())
   }, [])

   useEffect(() => {
      if (!authRegister || !authRegister.email) {
         navigate('/login')
      }
   }, [authRegister, navigate])

   const handleNavigateToLogin = (): void => {
      dispatch(resetAuthRegister())
      navigate('/login')
   }

   return { authRegister, handleNavigateToLogin }
}

export default useVerifyAuth
