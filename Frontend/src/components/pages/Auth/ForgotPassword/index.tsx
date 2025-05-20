import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import InputMASQ from '../../../../components/UI/Input'
import _ from 'lodash'
import ButtonMASQ from '../../../../components/UI/Button'
import { isValidate } from '../../../../utils/validate'
import { forgotPassword } from '../../../../api/auth'
import store from 'store/configureStore'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

interface ForgotPasswordData {
   email: string
}

interface ErrorData {
   email: string
}

interface RootState {
   auth: {
      isSuccessForgotPassword: boolean
   }
}

const ForgotPassword: React.FC = () => {
   const dispatch = useDispatch()
   const [dataForgotPassword, setDataForgotPassword] = useState<ForgotPasswordData>({ email: '' })
   const [errorDataForgotPassword, setErrorDataForgotPassword] = useState<ErrorData>({
      email: '',
   })
   const [loading, setLoading] = useState<boolean>(false)

   const navigate = useNavigate()

   const { isSuccessForgotPassword } = useSelector((state: RootState) => state.auth)

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
      type: keyof ForgotPasswordData
   ): void => {
      let value = valueInput.target.value
      let data = _.cloneDeep(dataForgotPassword)
      data[type] = value
      setDataForgotPassword(data)
   }

   const validateBlur = (type: keyof ForgotPasswordData): boolean => {
      let validate = isValidate(dataForgotPassword, type, errorDataForgotPassword)
      setErrorDataForgotPassword(validate.error)
      return validate.isError
   }

   const handleForgotPassword = async (): Promise<void> => {
      const { email } = dataForgotPassword
      await store.dispatch(forgotPassword(email))
   }

   return (
      <div className={styles.forgotPasswordWrap}>
         <div className={styles.inputWrapper}>
            <div className={styles.label}>Email *</div>
            <InputMASQ
               type={'text'}
               placeholder={'Enter email...'}
               onChange={(e: any) => handleChangeInput(e, 'email')}
               onBlur={() => validateBlur('email')}
               value={dataForgotPassword.email}
               error={errorDataForgotPassword.email}
            />
         </div>

         <div className={styles.btnWrap}>
            <ButtonMASQ
               textBtn={'Send email'}
               loading={loading}
               onClick={() => handleForgotPassword()}
               disable={loading}
               style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
               }}
            />
         </div>
         <div className={styles.btnSwitchWrap}>
            <div onClick={() => navigate('/login')} className={styles.btnRegister}>
               Already have an account, <span className={styles.text}>login</span>
            </div>
         </div>
      </div>
   )
}

export default ForgotPassword
