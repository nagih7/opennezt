import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, loginWithSocial } from '~/api/auth'
import { AppDispatch, RootState, useAppSelector } from '~/store'
import { resetForgotPassword } from '~/store/modules/auth'
import { AuthRole, LoginError, LoginPayload } from '~/types'
import { handleCheckValidateConfirm } from '~/utils/helper'
import { isValidate } from '~/utils/validate'

const useLogin = () => {
   const dispatch = useDispatch<AppDispatch>()
   const navigate = useNavigate()

   // Store
   const isLoadingBtnLogin = useAppSelector((state: RootState) => state.auth.isLoadingBtnLogin)
   const { isAuthSuccess, authRole } = useAppSelector((state: RootState) => state.auth)

   // State
   const [checkRemember, setCheckRemember] = useState<boolean>(false)
   const [dataLogin, setDataLogin] = useState<LoginPayload>({
      email: '',
      password: '',
   })
   const [errorDataLogin, setErrorDataLogin] = useState<LoginError>({
      email: '',
      password: '',
   })

   // Effect
   useEffect(() => {
      dispatch(resetForgotPassword())
   }, [dispatch])

   useEffect(() => {
      handleResetError()
   }, [dataLogin])

   useEffect(() => {
      const params = new URLSearchParams(window.location.search)
      const token = params.get('access_token')

      if (token) {
         localStorage.setItem('token', token)
      }
      navigate('/login')
   }, [navigate])

   useEffect(() => {
      if (isAuthSuccess) {
         if (authRole === AuthRole.SUPER_ADMIN) {
            navigate('/')
         } else if (authRole === AuthRole.USER) {
            navigate('/')
         }
      }
   }, [isAuthSuccess, authRole, navigate])

   // Function
   const handleResetError = (): void => {
      setErrorDataLogin({
         email: '',
         password: '',
      })
   }

   const handleChangeInput = (valueInput: React.ChangeEvent<HTMLInputElement>, type: keyof LoginPayload): void => {
      let value = valueInput.target.value
      let data = _.cloneDeep(dataLogin)
      data[type] = value
      setDataLogin(data)
   }

   const validateBlur = (type: keyof LoginPayload): boolean => {
      let validate = isValidate(dataLogin, type, errorDataLogin)
      setErrorDataLogin(validate.error)
      return validate.isError
   }

   const handleConfirmLogin = () => {
      let validate = handleCheckValidateConfirm(dataLogin, errorDataLogin)
      setErrorDataLogin(validate.dataError)
      if (!validate.isError) {
         dispatch(login(dataLogin))
      }
   }

   const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
      if (event.key === 'Enter') {
         handleConfirmLogin()
      }
   }

   const handleClickCheckBox = (e: any): void => {
      setCheckRemember(e.target.checked)
   }

   // Social
   const loginWithLinkedIn = (): void => {
      loginWithSocial('linkedin')
   }
   const loginWithGoogle = (): void => {
      loginWithSocial('google')
   }

   return {
      dataLogin,
      errorDataLogin,
      checkRemember,
      isLoadingBtnLogin,
      navigate,
      handleChangeInput,
      validateBlur,
      handleConfirmLogin,
      handleKeyDown,
      handleClickCheckBox,
      loginWithLinkedIn,
      loginWithGoogle,
   }
}

export default useLogin
