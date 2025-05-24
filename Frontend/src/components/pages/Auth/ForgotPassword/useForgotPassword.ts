import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { forgotPassword } from '~/api/auth'
import { AppDispatch, RootState, useAppSelector } from '~/store'
import { ForgotPasswordPayload } from '~/types'
import { isValidate } from '~/utils/validate'

const useForgotPassword = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch<AppDispatch>()

   // Store
   const { isSuccessForgotPassword } = useAppSelector((state: RootState) => state.auth)

   // State
   const [isLoading, setIsLoading] = useState<boolean>(false)
   const [dataForgotPassword, setDataForgotPassword] = useState<ForgotPasswordPayload>({ email: '' })
   const [errorDataForgotPassword, setErrorDataForgotPassword] = useState<ForgotPasswordPayload>({
      email: '',
   })

   useEffect(() => {
      if (isSuccessForgotPassword) {
         navigate('/login')
      }
   }, [isSuccessForgotPassword, navigate, dispatch])

   useEffect(() => {
      handleResetError()
   }, [dataForgotPassword])

   const handleResetError = (): void => {
      setErrorDataForgotPassword({ email: '' })
   }

   const handleChangeInput = (
      valueInput: React.ChangeEvent<HTMLInputElement>,
      type: keyof ForgotPasswordPayload
   ): void => {
      let value = valueInput.target.value
      let data = _.cloneDeep(dataForgotPassword)
      data[type] = value
      setDataForgotPassword(data)
   }

   const validateBlur = (type: keyof ForgotPasswordPayload): boolean => {
      let validate = isValidate(dataForgotPassword, type, errorDataForgotPassword)
      setErrorDataForgotPassword(validate.error)
      return validate.isError
   }

   const handleForgotPassword = () => {
      setIsLoading(true)
      const { email } = dataForgotPassword
      dispatch(forgotPassword(email))
      setIsLoading(false)
   }

   return {
      isLoading,
      dataForgotPassword,
      errorDataForgotPassword,
      navigate,
      handleChangeInput,
      validateBlur,
      handleForgotPassword,
   }
}

export default useForgotPassword
