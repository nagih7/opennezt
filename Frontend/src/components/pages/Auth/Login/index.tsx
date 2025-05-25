import React from 'react'
import { Button } from '@chakra-ui/react'
import { Checkbox } from '~/components/UI/checkbox'
import { Input } from '~/components/UI/input'
import { Tooltip } from '~/components/UI/tooltip'
import Logo from '~/assets/images/logo/opennezt_black.png'
import linkedinIcon from '~/assets/images/icon/linkedin.svg'
import googleIcon from '~/assets/images/icon/google.svg'
import facebookIcon from '~/assets/images/icon/facebook.svg'
import twitterIcon from '~/assets/images/icon/twitter.svg'
import useLogin from './useLogin'

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
                  type="text"
                  placeholder="Enter email..."
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeLogin('email', e)}
                  onFocus={() => onFocusInputLogin('email')}
                  onBlur={() => validateBlur('email')}
                  value={dataLogin.email}
                  error={errorDataLogin.email}
               />
            </div>

            <div className="mb-6">
               <div className="mb-1 text-sm font-medium text-gray-700">Password *</div>
               <Input
                  type="password"
                  placeholder="******"
                  value={dataLogin.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeLogin('password', e)}
                  onFocus={() => onFocusInputLogin('password')}
                  onBlur={() => validateBlur('password')}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e)}
                  error={errorDataLogin.password}
               />
            </div>

            <div className="flex items-center justify-between mb-6">
               <div className="flex items-center">
                  <Checkbox
                     checked={checkRemember}
                     onChange={(e: React.FormEvent<HTMLLabelElement>) => handleClickCheckBox(e)}
                  >
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
                  onClick={handleConfirmLogin}
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
                  <Tooltip content="LinkedIn" placement="top" showArrow>
                     <div className="w-10 h-10" onClick={loginWithLinkedIn}>
                        <img src={linkedinIcon} alt="LinkedIn" className="w-full h-full" />
                     </div>
                  </Tooltip>
                  <Tooltip content="Google" placement="top" showArrow>
                     <div className="w-10 h-10" onClick={loginWithGoogle}>
                        <img src={googleIcon} alt="Google" className="w-full h-full" />
                     </div>
                  </Tooltip>
                  <Tooltip content="Coming soon" placement="top" showArrow>
                     <div className="w-10 h-10">
                        <img src={facebookIcon} alt="Facebook" className="w-full h-full" />
                     </div>
                  </Tooltip>
                  <Tooltip content="Coming soon" placement="top" showArrow>
                     <div className="w-10 h-10">
                        <img src={twitterIcon} alt="Twitter" className="w-full h-full" />
                     </div>
                  </Tooltip>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Login
