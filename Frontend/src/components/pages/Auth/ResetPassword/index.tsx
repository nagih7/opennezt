import React from 'react'
import { Button, Form, Input } from 'antd'
import LockResetIcon from '@mui/icons-material/LockReset'
import useResetPassword from './useResetPassword'

const ResetPassword: React.FC = () => {
   const { isLoadingResetPassword, navigate, handleResetPassword } = useResetPassword()

   return (
      <div className="flex flex-col items-center justify-center w-full my-8">
         <div className="w-full p-6 bg-white rounded-lg ">
            <div className="flex flex-col items-center mb-6">
               <div className="p-3 mb-4 bg-blue-100 rounded-full">
                  <LockResetIcon className="text-3xl text-blue-600" />
               </div>
               <h2 className="mb-4 text-2xl font-bold text-gray-800">Reset Password</h2>

               <Form
                  className="w-full"
                  name="basic"
                  layout="vertical"
                  initialValues={{ remember: true }}
                  onFinish={handleResetPassword}
                  autoComplete="off"
               >
                  <Form.Item
                     className="w-full"
                     label={<span className="text-sm font-medium text-gray-700">New Password</span>}
                     name="password"
                     rules={[
                        { required: true, message: 'Please input your password!' },
                        {
                           validator: async (_, value) => {
                              const passwordRegex =
                                 /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{6,}$/
                              if (!passwordRegex.test(value) && value) {
                                 return Promise.reject(
                                    new Error(
                                       'Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
                                    )
                                 )
                              }
                              return Promise.resolve()
                           },
                        },
                     ]}
                  >
                     <Input.Password className="rounded-md" />
                  </Form.Item>

                  <Form.Item
                     className="w-full"
                     label={<span className="text-sm font-medium text-gray-700">Confirm Password</span>}
                     name="confirmPassword"
                     dependencies={['password']}
                     rules={[
                        {
                           required: true,
                           message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                           validator(_, value) {
                              if (!value || getFieldValue('password') === value) {
                                 return Promise.resolve()
                              }
                              return Promise.reject(new Error('The two passwords do not match!'))
                           },
                        }),
                     ]}
                  >
                     <Input.Password className="rounded-md" />
                  </Form.Item>

                  <div className="flex justify-center mt-6">
                     <Button
                        type="primary"
                        htmlType="submit"
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
               </Form>
            </div>
         </div>
      </div>
   )
}

export default ResetPassword
