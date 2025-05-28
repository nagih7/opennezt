import { cloneDeep } from 'lodash'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, loginWithSocial } from '~/api/auth'
import { AppDispatch, RootState, useAppSelector } from '~/store'
import { setAuthState } from '~/store/modules/auth'
import { AuthState } from '~/store/modules/auth/types'
import { LoginPayload, LoginSchema } from '~/types'
import { validate } from '~/utils'
import { TokenManager } from '~/utils/tokenManager'

// Create a simple validate function if isValidate isn't available
const validateField = (data: any, fieldName: string, errorState: any) => {
   const errors = { ...errorState }
   let hasError = false

   if (!data[fieldName]) {
      errors[fieldName] = `${fieldName} is required`
      hasError = true
   } else if (fieldName === 'email' && !/\S+@\S+\.\S+/.test(data[fieldName])) {
      errors[fieldName] = 'Email is invalid'
      hasError = true
   } else if (fieldName === 'password' && data[fieldName].length < 6) {
      errors[fieldName] = 'Password must be at least 6 characters'
      hasError = true
   }

   return { error: errors, isError: hasError }
}

const useLogin = () => {
   const dispatch = useDispatch<AppDispatch>()
   const navigate = useNavigate()

   // State
   const [checkRemember, setCheckRemember] = useState<boolean>(false)
   const [loadingLogin, setLoadingLogin] = useState<boolean>(false)
   const [messageError, setMessageError] = useState<string>('')
   const [dataLogin, setDataLogin] = useState<LoginPayload>({ email: '', password: '' })
   const [errorDataLogin, setErrorDataLogin] = useState<LoginPayload>({ email: '', password: '' })

   useEffect(() => {
      handleResetError()
   }, [dataLogin])

   // Function
   const handleResetError = (): void => {
      setErrorDataLogin({
         email: '',
         password: '',
      })
   }

   const onChangeLogin = (type: keyof LoginPayload, valueInput: React.ChangeEvent<HTMLInputElement>): void => {
      let value = valueInput.target.value
      let data = cloneDeep(dataLogin) // Tạo 1 bản sao hoàn toàn mới của dataLogin
      data[type] = value
      setDataLogin(data)
   }

   const onFocusInputLogin = (type: keyof LoginPayload): void => {
      setMessageError('')
      let errorData = cloneDeep(errorDataLogin)
      errorData[type] = ''
      setErrorDataLogin(errorData)
   }

   const validateBlur = (type: keyof LoginPayload): boolean => {
      let validateResult = validateField(dataLogin, type, errorDataLogin)
      setErrorDataLogin(validateResult.error)
      return validateResult.isError
   }

   const handleConfirmLogin = () => {
      validate(LoginSchema, dataLogin, {
         onSuccess: (payload: LoginPayload) => {
            setLoadingLogin(true)
            // Call API login
            login(payload)
               .then((res) => {
                  if (res.data?.access_token) {
                     TokenManager.setUserToken(res.data.access_token)
                     dispatch(
                        setAuthState({
                           isAuthSuccess: true,
                        } as AuthState)
                     )
                     navigate('/')
                  }
               })
               .catch((err) => {
                  setLoadingLogin(false)
                  if (err.response?.data?.message) {
                     setMessageError(err.response.data.message)
                  } else {
                     setMessageError('Login failed. Please try again.')
                  }
               })
         },
         onError: (errors) => {
            setErrorDataLogin(errors as LoginPayload)
         },
      })
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
      loadingLogin,
      errorDataLogin,
      checkRemember,
      messageError,
      navigate,
      onChangeLogin,
      onFocusInputLogin,
      validateBlur,
      handleConfirmLogin,
      handleKeyDown,
      handleClickCheckBox,
      loginWithLinkedIn,
      loginWithGoogle,
   }
}

export default useLogin
