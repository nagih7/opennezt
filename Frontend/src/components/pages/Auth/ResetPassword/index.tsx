import React from 'react'
import { Button } from '@chakra-ui/react'
import { Input } from '~/components/UI/input'
// import LockResetIcon from '@mui/icons-material/LockReset'
import useResetPassword from './useResetPassword'

const ResetPassword: React.FC = () => {
   const { isLoadingResetPassword, navigate, handleResetPassword } = useResetPassword()
   const [formData, setFormData] = React.useState({
      password: '',
      confirmPassword: '',
   })
   const [errors, setErrors] = React.useState({
      password: '',
      confirmPassword: '',
   })

   const validatePassword = (password: string) => {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{6,}$/
      if (!password) return 'Please input your password!'
      if (!passwordRegex.test(password)) {
         return 'Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
      }
      return ''
   }

   const validateConfirmPassword = (confirmPassword: string) => {
      if (!confirmPassword) return 'Please confirm your password!'
      if (confirmPassword !== formData.password) {
         return 'The two passwords do not match!'
      }
      return ''
   }

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      const passwordError = validatePassword(formData.password)
      const confirmPasswordError = validateConfirmPassword(formData.confirmPassword)

      setErrors({
         password: passwordError,
         confirmPassword: confirmPasswordError,
      })

      if (!passwordError && !confirmPasswordError) {
         handleResetPassword(formData)
      }
   }

   const handleChange = (field: string, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
      if (field === 'password') {
         setErrors((prev) => ({ ...prev, password: validatePassword(value) }))
      } else if (field === 'confirmPassword') {
         setErrors((prev) => ({ ...prev, confirmPassword: validateConfirmPassword(value) }))
      }
   }

   return (
      <div className="flex flex-col items-center justify-center w-full my-8">
         <div className="w-full p-6 bg-white rounded-lg">
            <div className="flex flex-col items-center mb-6">
               <div className="p-3 mb-4 bg-blue-100 rounded-full">
                  {/* <LockResetIcon className="text-3xl text-blue-600" /> */}
               </div>
               <h2 className="mb-4 text-2xl font-bold text-gray-800">Reset Password</h2>

               <form className="w-full" onSubmit={handleSubmit}>
                  <div className="mb-4">
                     <label className="block mb-1 text-sm font-medium text-gray-700">New Password</label>
                     <Input
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleChange('password', e.target.value)}
                        error={errors.password}
                        className="rounded-md"
                     />
                  </div>

                  <div className="mb-6">
                     <label className="block mb-1 text-sm font-medium text-gray-700">Confirm Password</label>
                     <Input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleChange('confirmPassword', e.target.value)}
                        error={errors.confirmPassword}
                        className="rounded-md"
                     />
                  </div>

                  <div className="flex justify-center mt-6">
                     <Button
                        type="submit"
                        loading={isLoadingResetPassword}
                        className="h-10 px-6 bg-blue-600 border-none rounded-md hover:bg-blue-700"
                     >
                        Reset Password
                     </Button>
                  </div>

                  <div className="mt-4 text-center">
                     <span
                        className="text-sm text-blue-600 cursor-pointer hover:text-blue-800"
                        onClick={() => navigate('/login')}
                     >
                        Back to sign in
                     </span>
                  </div>
               </form>
            </div>
         </div>
      </div>
   )
}

export default ResetPassword
