import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register } from '~/api/auth'
import { AppDispatch, RootState, useAppSelector } from '~/store'
import { RegisterPayload } from '~/types'
import { handleCheckValidateConfirm } from '~/utils/helper'

const useRegister = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch<AppDispatch>()

   // Store
   const { isLoadingRegister, authRegister } = useAppSelector((state: RootState) => state.auth)

   // State
   const [isRegisterSuccess, setIsRegisterSuccess] = useState<boolean>(false)
   const [dataRegister, setDataRegister] = useState<RegisterPayload>({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
   })
   const [errorDataRegister, setErrorDataRegister] = useState<RegisterPayload>({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
   })

   // Effect
   useEffect(() => {
      if (authRegister && authRegister.email) {
         setIsRegisterSuccess(true)
      }
   }, [authRegister])

   useEffect(() => {
      if (isRegisterSuccess === true) {
         navigate('/verify-authentication')
      }
   }, [isRegisterSuccess, navigate])

   useEffect(() => {
      handleResetError()
   }, [dataRegister])

   // Function
   const handleChangeInput = (valueInput: React.ChangeEvent<HTMLInputElement>, type: keyof RegisterPayload): void => {
      const value = valueInput.target.value
      const data = _.cloneDeep(dataRegister)
      data[type] = value
      setDataRegister(data)
   }

   const handleResetError = (): void => {
      setErrorDataRegister({
         name: '',
         email: '',
         password: '',
         confirmPassword: '',
      })
   }

   const validateBlur = (type: keyof RegisterPayload): boolean => {
      // const validate = isValidate(dataRegister, type, errorDataRegister)
      setErrorDataRegister(validate.error)
      return validate.isError
   }

   const handleConfirmRegister = async (): Promise<void> => {
      const validate = handleCheckValidateConfirm(dataRegister, errorDataRegister)
      setErrorDataRegister(validate.dataError)

      if (!validate.isError) {
         dispatch(register(dataRegister))
      }
   }

   return {
      dataRegister,
      errorDataRegister,
      isRegisterSuccess,
      isLoadingRegister,
      navigate,
      handleChangeInput,
      handleResetError,
      validateBlur,
      handleConfirmRegister,
   }
}

export default useRegister
