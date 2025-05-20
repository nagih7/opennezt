import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import './styles.scss'
import InputMASQ from '../../../../components/UI/Input'
import _ from 'lodash'
import ButtonMASQ from '../../../../components/UI/Button'
import { useNavigate } from 'react-router-dom'
import { isValidate } from '../../../../utils/validate'
import { handleCheckValidateConfirm } from '../../../../utils/helper'
import { useSelector, useDispatch } from 'react-redux'
import store from '~/store'
import { Checkbox } from 'antd'
import Social from './components/Social'
import { login } from '../../../../api/auth'
import Logo from '../../../../assets/images/logo/opennezt_black.png'
import { resetForgotPassword } from '../../../../store/modules/auth'
import { RootState } from '~/store'

interface LoginData {
   email: string
   password: string
}

interface ErrorData {
   email: string
   password: string
}

const Login: React.FC = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [dataLogin, setDataLogin] = useState<LoginData>({
      email: '',
      password: '',
   })
   const [errorDataLogin, setErrorDataLogin] = useState<ErrorData>({
      email: '',
      password: '',
   })
   const [checkRemember, setCheckRemember] = useState<boolean>(false)
   const isLoadingBtnLogin = useSelector((state: RootState) => state.auth.isLoadingBtnLogin)
   const { isAuthSuccess, authRole } = useSelector((state: RootState) => state.auth)

   useEffect(() => {
      dispatch(resetForgotPassword())
   }, [dispatch])

   useEffect(() => {
      handleResetError()
   }, [dataLogin])

   useEffect(() => {
      if (isAuthSuccess) {
         if (authRole === 'Super Admin') {
            navigate('/')
         } else if (authRole === 'User') {
            navigate('/')
         }
      }
   }, [isAuthSuccess, authRole, navigate])

   const handleResetError = (): void => {
      setErrorDataLogin({
         email: '',
         password: '',
      })
   }

   const handleChangeInput = (valueInput: React.ChangeEvent<HTMLInputElement>, type: keyof LoginData): void => {
      let value = valueInput.target.value
      let data = _.cloneDeep(dataLogin)
      data[type] = value
      setDataLogin(data)
   }

   const validateBlur = (type: keyof LoginData): boolean => {
      let validate = isValidate(dataLogin, type, errorDataLogin)
      setErrorDataLogin(validate.error)
      return validate.isError
   }

   const handleConfirmLogin = async (): Promise<void> => {
      let validate = handleCheckValidateConfirm(dataLogin, errorDataLogin)
      setErrorDataLogin(validate.dataError)
      if (!validate.isError) {
         await store.dispatch(login(dataLogin))
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

   return (
      <div className={styles.loginWrap}>
         <div className={styles.loginHeaderWrap}>
            <div className={styles.logo}>
               <img src={Logo} alt="logo-opennezt" />
            </div>
            <h1 className={styles.title}>Login</h1>
         </div>
         <div className={styles.loginContent}>
            <div className={styles.inputWrapper}>
               <div className={styles.label}>Email *</div>
               <InputMASQ
                  type={'text'}
                  placeholder={'Enter email...'}
                  onChange={(e) => handleChangeInput(e, 'email')}
                  onBlur={() => validateBlur('email')}
                  value={dataLogin.email}
                  error={errorDataLogin.email}
               />
            </div>

            <div className={styles.inputWrapper}>
               <div className={styles.label}>Password *</div>
               <InputMASQ
                  type={'password'}
                  placeholder={'******'}
                  value={dataLogin.password}
                  onChange={(e) => handleChangeInput(e, 'password')}
                  onBlur={() => validateBlur('password')}
                  onKeyDown={(e) => handleKeyDown(e)}
                  error={errorDataLogin.password}
               />
            </div>

            <div className={styles.btnUtilitiesWrap}>
               <div className={`${styles.remember} input-checkbox-style`}>
                  <Checkbox className={styles.checkBox} checked={checkRemember} onClick={(e) => handleClickCheckBox(e)}>
                     <span>Remember me</span>
                  </Checkbox>
               </div>

               <div onClick={() => navigate('/forgot-password')} className={styles.btnForgetPassword}>
                  Forgot password
               </div>
            </div>

            <div className={styles.btnWrap}>
               <ButtonMASQ
                  textBtn={'Login'}
                  loading={isLoadingBtnLogin}
                  onClick={() => handleConfirmLogin()}
                  disable={false}
                  style={{
                     display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center',
                  }}
               />
            </div>

            <div className={styles.btnSwitchWrap}>
               <div className={styles.btnRegister}>
                  {"Don't have an account"}?{' '}
                  <span className={styles.textRegister} onClick={() => navigate('/register')}>
                     Signup now
                  </span>
               </div>
            </div>

            <Social />
         </div>
      </div>
   )
}

export default Login
