import React from 'react'
import { Checkbox, Tooltip } from 'antd'
import Logo from '../../../../assets/images/logo/opennezt_black.png'
import useLogin from './useLogin'
import LinkedIn from '~/assets/images/icon/linkedin.svg'
import Google from '~/assets/images/icon/google.svg'
import Facebook from '~/assets/images/icon/facebook.svg'
import Twitter from '~/assets/images/icon/twitter.svg'
import { Button } from '@chakra-ui/react'
import { Input } from '~/components/UI/input'

const Login: React.FC = () => {
   const {
      dataLogin,
      loadingLogin,
      errorDataLogin,
      checkRemember,
      navigate,
      onChangeLogin,
      onFocusInputLogin,
      validateBlur,
      handleConfirmLogin,
      handleKeyDown,
      handleClickCheckBox,
      loginWithLinkedIn,
      loginWithGoogle,
   } = useLogin()

   return (
      <div className="flex flex-col items-center justify-center w-full my-8">
         <div className="flex flex-col items-center w-full mb-6">
            <div className="mb-4">
               <img src={Logo} alt="logo-opennezt" className="h-16" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Sign In</h1>
         </div>
         <div className="w-full p-6 bg-white rounded-lg">
            <div className="mb-4">
               <div className="mb-1 text-sm font-medium text-gray-700">Email *</div>
               <Input
                  required
                  type={'text'}
                  placeholder={'Enter email...'}
                  onChange={(e: any) => onChangeLogin('email', e)}
                  onFocus={() => onFocusInputLogin('email')}
                  onBlur={() => validateBlur('email')}
                  value={dataLogin.email}
                  error={errorDataLogin.email}
               />
            </div>

            <div className="mb-6">
               <div className="mb-1 text-sm font-medium text-gray-700">Password *</div>
               <Input
                  type={'password'}
                  placeholder={'******'}
                  value={dataLogin.password}
                  onChange={(e: any) => onChangeLogin('password', e)}
                  onFocus={() => onFocusInputLogin('password')}
                  onBlur={() => validateBlur('password')}
                  onKeyDown={(e: any) => handleKeyDown(e)}
                  error={errorDataLogin.password}
               />
            </div>

            <div className="flex items-center justify-between mb-6">
               <div className="flex items-center">
                  <Checkbox checked={checkRemember} onClick={(e) => handleClickCheckBox(e)}>
                     <span className="text-sm text-gray-600">Remember me</span>
                  </Checkbox>
               </div>

               <div
                  onClick={() => navigate('/forgot-password')}
                  className="text-sm text-blue-600 cursor-pointer hover:text-blue-800"
               >
                  Forgot password?
               </div>
            </div>

            <div className="mb-4">
               <Button
                  className="w-full bg-main-color"
                  loading={loadingLogin}
                  onClick={() => handleConfirmLogin()}
                  style={{
                     display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center',
                  }}
               >
                  Sign In
               </Button>
            </div>

            <div className="mt-4 text-center">
               <div className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <span
                     className="text-blue-600 cursor-pointer hover:text-blue-800"
                     onClick={() => navigate('/register')}
                  >
                     Sign up now
                  </span>
               </div>
            </div>

            {/* Social */}
            <div className="flex flex-col items-center justify-center gap-4 pt-4 mt-4 border-t border-gray-200">
               <p className="font-semibold text-gray-600 text-md">Login with socials</p>

               <div className="flex items-center justify-center gap-4">
                  <Tooltip title="LinkedIn" placement="top">
                     <div className="w-10 h-10" onClick={loginWithLinkedIn}>
                        <img src={LinkedIn} alt="LinkedIn" />
                     </div>
                  </Tooltip>
                  <Tooltip title="Google" placement="top">
                     <div className="w-10 h-10" onClick={loginWithGoogle}>
                        <img src={Google} alt="Google" />
                     </div>
                  </Tooltip>
                  <Tooltip title="Coming soon" placement="top">
                     <div className="w-10 h-10">
                        <img src={Facebook} alt="Facebook" />
                     </div>
                  </Tooltip>
                  <Tooltip title="Coming soon" placement="top">
                     <div className="w-10 h-10">
                        <img src={Twitter} alt="Twitter" />
                     </div>
                  </Tooltip>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Login
