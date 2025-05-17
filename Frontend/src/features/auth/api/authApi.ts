import { callApiSimple } from '../../../api/callApi'
import { LoginResponse, UserCredentials, RegisterData, ResetPasswordData, ForgotPasswordData } from '../types'

/**
 * Authentication API services
 */
export const authApi = {
   /**
    * Login with email and password
    * @param credentials User credentials
    * @returns Promise with user data and token
    */
   login: async (credentials: UserCredentials): Promise<LoginResponse> => {
      const response = await callApiSimple({
         apiPath: '/api/auth/login',
         method: 'post',
         variables: credentials,
      })
      return response.data
   },

   /**
    * Register new user
    * @param userData User registration data
    * @returns Promise with user data
    */
   register: async (userData: RegisterData): Promise<any> => {
      const response = await callApiSimple({
         apiPath: '/api/auth/register',
         method: 'post',
         variables: userData,
      })
      return response.data
   },

   /**
    * Log out current user
    * @returns Promise with logout confirmation
    */
   logout: async (): Promise<any> => {
      const response = await callApiSimple({
         apiPath: '/api/auth/logout',
         method: 'post',
      })
      return response.data
   },

   /**
    * Fetch current user profile
    * @returns Promise with user data
    */
   getProfile: async (): Promise<any> => {
      const response = await callApiSimple({
         apiPath: '/api/auth/profile',
         method: 'get',
      })
      return response.data
   },

   /**
    * Update user profile
    * @param profileData Updated profile data
    * @returns Promise with updated user data
    */
   updateProfile: async (profileData: any): Promise<any> => {
      const response = await callApiSimple({
         apiPath: '/api/auth/profile',
         method: 'put',
         variables: profileData,
      })
      return response.data
   },

   /**
    * Request password reset
    * @param data Email for password reset
    * @returns Promise with reset confirmation
    */
   forgotPassword: async (data: ForgotPasswordData): Promise<any> => {
      const response = await callApiSimple({
         apiPath: '/api/auth/forgot-password',
         method: 'post',
         variables: data,
      })
      return response.data
   },

   /**
    * Reset password with token
    * @param data Reset password data with token
    * @returns Promise with reset confirmation
    */
   resetPassword: async (data: ResetPasswordData): Promise<any> => {
      const response = await callApiSimple({
         apiPath: '/api/auth/reset-password',
         method: 'post',
         variables: data,
      })
      return response.data
   },

   /**
    * Verify email with token
    * @param token Verification token
    * @returns Promise with verification confirmation
    */
   verifyEmail: async (token: string): Promise<any> => {
      const response = await callApiSimple({
         apiPath: `/api/auth/verify-email/${token}`,
         method: 'get',
      })
      return response.data
   },
}

export default authApi
