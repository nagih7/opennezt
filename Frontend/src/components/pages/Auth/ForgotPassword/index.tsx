import React from 'react'
import _ from 'lodash'
import { Input } from '~/components/UI/input'
import ButtonMASQ from '../../../../components/UI/Button'
import Logo from '../../../../assets/images/logo/opennezt_black.png'
import useForgotPassword from './useForgotPassword'

const ForgotPassword: React.FC = () => {
   const {
      isLoading,
      dataForgotPassword,
      errorDataForgotPassword,
      navigate,
      handleChangeInput,
      validateBlur,
      handleForgotPassword,
   } = useForgotPassword()

   return (
      <div className="flex flex-col items-center justify-center w-full my-8">
         <div className="flex flex-col items-center w-full mb-6">
            <div className="mb-4">
               <img src={Logo} alt="logo-opennezt" className="h-16" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Forgot Password</h1>
            <p className="mt-1 text-sm text-gray-600">Enter your email to reset your password</p>
         </div>

         <div className="w-full p-6 bg-white rounded-lg">
            <div className="mb-6">
               <div className="mb-1 text-sm font-medium text-gray-700">Email *</div>
               <Input
                  type={'text'}
                  placeholder={'Enter email...'}
                  onChange={(e: any) => handleChangeInput(e, 'email')}
                  onBlur={() => validateBlur('email')}
                  value={dataForgotPassword.email}
                  error={errorDataForgotPassword.email}
               />
            </div>

            <div className="mb-4">
               <ButtonMASQ
                  textBtn={'Send Reset Link'}
                  isLoading={isLoading}
                  onClick={() => handleForgotPassword()}
                  disable={isLoading}
                  style={{
                     display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center',
                  }}
               />
            </div>

            <div className="mt-4 text-center">
               <div className="text-sm text-gray-600">
                  Remember your password?{' '}
                  <span className="text-blue-600 cursor-pointer hover:text-blue-800" onClick={() => navigate('/login')}>
                     Sign in
                  </span>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ForgotPassword
