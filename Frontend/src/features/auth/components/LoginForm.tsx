import React from 'react'
import { useForm } from '../../../hooks'
import { useAuth } from '../hooks/useAuth'
import { UserCredentials } from '../types'

interface LoginFormProps {
   onSuccess?: () => void
   onError?: (error: any) => void
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onError }) => {
   const { login } = useAuth()

   const initialValues: UserCredentials = {
      email: '',
      password: '',
   }

   const validationRules = {
      email: {
         required: true,
         pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
         errorMessage: 'Vui lòng nhập địa chỉ email hợp lệ.',
      },
      password: {
         required: true,
         minLength: 6,
         errorMessage: 'Mật khẩu cần có ít nhất 6 ký tự.',
      },
   }

   const { values, errors, touched, handleChange, handleBlur, handleSubmit, isValid } = useForm({
      initialValues,
      validationRules,
      onSubmit: (values, isValid) => {
         if (isValid) {
            login(values.email, values.password)
            if (onSuccess) onSuccess()
         }
      },
   })

   return (
      <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
         <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>

         <form onSubmit={handleSubmit}>
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

            <div className="mb-6">
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

            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center">
                  <input
                     type="checkbox"
                     id="remember"
                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                     Ghi nhớ đăng nhập
                  </label>
               </div>
               <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Quên mật khẩu?
               </a>
            </div>

            <button
               type="submit"
               className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                  isValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-400 cursor-not-allowed'
               }`}
            >
               Đăng nhập
            </button>
         </form>

         <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
               Chưa có tài khoản?{' '}
               <a href="/register" className="text-blue-600 hover:underline font-medium">
                  Đăng ký ngay
               </a>
            </p>
         </div>
      </div>
   )
}

export default LoginForm
