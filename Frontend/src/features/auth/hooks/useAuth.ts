import { useSelector, useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { RootState } from '../../../store/types'
import { User } from '../types'
import { useMutateData } from '../../../hooks/useQuery'

export const useAuth = () => {
   const dispatch = useDispatch()
   const { authUser, isAuthenticated, loading, error } = useSelector((state: RootState) => state.auth)

   /**
    * Log in user with email and password
    */
   const login = useCallback(
      (email: string, password: string) => {
         dispatch({ type: 'auth/LOGIN_REQUEST', payload: { email, password } })
      },
      [dispatch]
   )

   /**
    * Register new user
    */
   const register = useCallback(
      (userData: { firstName: string; lastName: string; email: string; password: string; confirmPassword: string }) => {
         dispatch({ type: 'auth/REGISTER_REQUEST', payload: userData })
      },
      [dispatch]
   )

   /**
    * Log out the current user
    */
   const logout = useCallback(() => {
      dispatch({ type: 'auth/LOGOUT_REQUEST' })
   }, [dispatch])

   /**
    * Check if user has a specific role
    * @param role Role to check
    * @returns boolean indicating if user has role
    */
   const hasRole = useCallback(
      (role: string): boolean => {
         return authUser?.role === role
      },
      [authUser]
   )

   /**
    * Check if user is authenticated
    * @returns boolean indicating authentication status
    */
   const isUserAuthenticated = useCallback((): boolean => {
      return isAuthenticated
   }, [isAuthenticated])

   /**
    * Get user profile information
    * @returns User object or null
    */
   const getUserProfile = useCallback((): User | null => {
      return authUser
   }, [authUser])

   /**
    * Request password reset
    */
   const forgotPassword = useMutateData({
      url: '/api/auth/forgot-password',
      method: 'POST',
   })

   /**
    * Reset password with token
    */
   const resetPassword = useMutateData({
      url: '/api/auth/reset-password',
      method: 'POST',
   })

   /**
    * Update user profile
    */
   const updateProfile = useMutateData({
      url: '/api/auth/update-profile',
      method: 'PUT',
   })

   return {
      user: authUser,
      isAuthenticated,
      loading,
      error,
      login,
      register,
      logout,
      hasRole,
      getUserProfile,
      isUserAuthenticated,
      forgotPassword,
      resetPassword,
      updateProfile,
   }
}

export default useAuth
