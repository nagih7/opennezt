import React from 'react'
import _ from 'lodash'
import InputMASQ from '../../../../components/UI/Input'
import ButtonMASQ from '../../../../components/UI/Button'
import Logo from '../../../../assets/images/logo/opennezt_black.png'
import useRegister from './useRegister'

const Register: React.FC = () => {
   const {
      dataRegister,
      errorDataRegister,
      isLoadingRegister,
      handleChangeInput,
      validateBlur,
      navigate,
      handleConfirmRegister,
   } = useRegister()

   return (
      <div className="flex flex-col items-center justify-center w-full my-8">
         <div className="flex flex-col items-center w-full mb-6">
            <div className="mb-4">
               <img src={Logo} alt="logo-opennezt" className="h-16" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
         </div>
         <div className="w-full p-6 bg-white rounded-lg">
            <div className="mb-4">
               <div className="mb-1 text-sm font-medium text-gray-700">Full name *</div>
               <InputMASQ
                  type={'text'}
                  placeholder={'Enter name...'}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeInput(e, 'name')}
                  onBlur={() => validateBlur('name')}
                  value={dataRegister.name}
                  error={errorDataRegister.name}
               />
            </div>

            <div className="mb-4">
               <div className="mb-1 text-sm font-medium text-gray-700">Email *</div>
               <InputMASQ
                  type={'text'}
                  placeholder={'Enter email...'}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeInput(e, 'email')}
                  onBlur={() => validateBlur('email')}
                  value={dataRegister.email}
                  error={errorDataRegister.email}
               />
            </div>

            <div className="mb-4">
               <div className="mb-1 text-sm font-medium text-gray-700">Password *</div>
               <InputMASQ
                  type={'password'}
                  placeholder={'******'}
                  value={dataRegister.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeInput(e, 'password')}
                  onBlur={() => validateBlur('password')}
                  error={errorDataRegister.password}
               />
            </div>

            <div className="mb-6">
               <div className="mb-1 text-sm font-medium text-gray-700">Confirm password *</div>
               <InputMASQ
                  type={'password'}
                  placeholder={'******'}
                  value={dataRegister.confirmPassword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeInput(e, 'confirmPassword')}
                  onBlur={() => validateBlur('confirmPassword')}
                  error={errorDataRegister.confirmPassword}
               />
            </div>

            <div className="mb-4">
               <ButtonMASQ
                  textBtn={'Sign Up'}
                  loading={isLoadingRegister}
                  onClick={handleConfirmRegister}
                  disable={false}
                  style={{
                     display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center',
                  }}
               />
            </div>

            <div className="mt-4 text-center">
               <div className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <span className="text-blue-600 cursor-pointer hover:text-blue-800" onClick={() => navigate('/login')}>
                     Sign in
                  </span>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Register
