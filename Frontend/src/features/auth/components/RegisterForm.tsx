import React from 'react'
import { useForm } from '../../../hooks'
import { useAuth } from '../hooks/useAuth'
import { RegisterData } from '../types'

interface RegisterFormProps {
   onSuccess?: () => void
   onError?: (error: any) => void
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, onError }) => {
   const { register } = useAuth()

   const initialValues: RegisterData = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
   }

   const validationRules = {
      firstName: {
         required: true,
         errorMessage: 'Vui lòng nhập tên.',
      },
      lastName: {
         required: true,
         errorMessage: 'Vui lòng nhập họ.',
      },
      email: {
         required: true,
         pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
         errorMessage: 'Vui lòng nhập địa chỉ email hợp lệ.',
      },
      password: {
         required: true,
         minLength: 8,
         errorMessage: 'Mật khẩu cần có ít nhất 8 ký tự.',
      },
      confirmPassword: {
         required: true,
         custom: (value: string, formData: RegisterData) => value === formData.password,
         errorMessage: 'Mật khẩu xác nhận không khớp.',
      },
      agreeToTerms: {
         custom: (value: boolean) => value === true,
         errorMessage: 'Bạn cần đồng ý với điều khoản dịch vụ.',
      },
   }

   const { values, errors, touched, handleChange, handleBlur, handleSubmit, isValid } = useForm({
      initialValues,
      validationRules,
      onSubmit: (values, isValid) => {
         if (isValid) {
            register(values)
            if (onSuccess) onSuccess()
         }
      },
   })

   return (
      <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
         <h2 className="text-2xl font-bold mb-6 text-center">Đăng ký</h2>

         <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
               <div>
                  <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">
                     Tên
                  </label>
                  <input
                     type="text"
                     id="firstName"
                     name="firstName"
                     value={values.firstName}
                     onChange={handleChange}
                     onBlur={handleBlur}
                     className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        touched.firstName && errors.firstName ? 'border-red-500' : 'border-gray-300'
                     }`}
                     placeholder="Tên"
                  />
                  {touched.firstName && errors.firstName && (
                     <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                  )}
               </div>

               <div>
                  <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">
                     Họ
                  </label>
                  <input
                     type="text"
                     id="lastName"
                     name="lastName"
                     value={values.lastName}
                     onChange={handleChange}
                     onBlur={handleBlur}
                     className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        touched.lastName && errors.lastName ? 'border-red-500' : 'border-gray-300'
                     }`}
                     placeholder="Họ"
                  />
                  {touched.lastName && errors.lastName && (
                     <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                  )}
               </div>
            </div>

            <div className="mb-4">
               <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email
               </label>
               <input
                  type="email"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                     touched.email && errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Nhập email của bạn"
               />
               {touched.email && errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="mb-4">
               <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                  Mật khẩu
               </label>
               <input
                  type="password"
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                     touched.password && errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Nhập mật khẩu của bạn"
               />
               {touched.password && errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            </div>

            <div className="mb-4">
               <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                  Xác nhận mật khẩu
               </label>
               <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                     touched.confirmPassword && errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Xác nhận mật khẩu"
               />
               {touched.confirmPassword && errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
               )}
            </div>

            <div className="mb-6">
               <div className="flex items-center">
                  <input
                     type="checkbox"
                     id="agreeToTerms"
                     name="agreeToTerms"
                     checked={values.agreeToTerms}
                     onChange={handleChange}
                     className={`h-4 w-4 focus:ring-blue-500 border-gray-300 rounded ${
                        touched.agreeToTerms && errors.agreeToTerms ? 'border-red-500' : ''
                     }`}
                  />
                  <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-700">
                     Tôi đồng ý với{' '}
                     <a href="/terms" className="text-blue-600 hover:underline">
                        Điều khoản dịch vụ
                     </a>{' '}
                     và{' '}
                     <a href="/privacy" className="text-blue-600 hover:underline">
                        Chính sách bảo mật
                     </a>
                  </label>
               </div>
               {touched.agreeToTerms && errors.agreeToTerms && (
                  <p className="mt-1 text-sm text-red-500">{errors.agreeToTerms}</p>
               )}
            </div>

            <button
               type="submit"
               className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                  isValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-400 cursor-not-allowed'
               }`}
            >
               Đăng ký
            </button>
         </form>

         <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
               Đã có tài khoản?{' '}
               <a href="/login" className="text-blue-600 hover:underline font-medium">
                  Đăng nhập
               </a>
            </p>
         </div>
      </div>
   )
}

export default RegisterForm
