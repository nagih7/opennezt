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

function ForgotPassword() {
   const dispatch = useDispatch()
   const [dataForgotPassword, setDataForgotPassword] = useState({ email: '' })
   const [errorDataForgotPassword, setErrorDataForgotPassword] = useState({
      email: '',
   })
   const [loading, setLoading] = useState(false)

   const navigate = useNavigate()

   const { isSuccessForgotPassword } = useSelector((state) => state.auth)

   useEffect(() => {
      if (isSuccessForgotPassword) {
         navigate('/login')
      }
   }, [isSuccessForgotPassword, navigate, dispatch])

   useEffect(() => {
      handleResetError()
   }, [dataForgotPassword])

   const handleResetError = () => {
      setErrorDataForgotPassword({ email: '' })
   }

   const handleChangeInput = (valueInput, type) => {
      let value = valueInput.target.value
      let data = _.cloneDeep(dataForgotPassword)
      data[type] = value
      setDataForgotPassword(data)
   }

   const validateBlur = (type) => {
      let validate = isValidate(dataForgotPassword, type, errorDataForgotPassword)
      setErrorDataForgotPassword(validate.error)
      return validate.isError
   }

   const handleForgotPassword = async () => {
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
               onChange={(e) => handleChangeInput(e, 'email')}
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
