import { useSelector, useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { RootState, User } from 'types'

/**
 * Custom hook for authentication related functionality
 * @returns Authentication state and functions
 */
export const useAuth = () => {
   const dispatch = useDispatch()
   const { authUser, isAuthenticated, loading, error } = useSelector((state: RootState) => state.auth)

   /**
    * Log out the current user
    */
   const logout = useCallback(() => {
      // Implementation will depend on your auth actions
      // dispatch(logoutUser());
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
    * Get user profile information
    * @returns User object or null
    */
   const getUserProfile = useCallback((): User | null => {
      return authUser
   }, [authUser])

   /**
    * Check if user is authenticated
    * @returns boolean indicating authentication status
    */
   const isUserAuthenticated = useCallback((): boolean => {
      return isAuthenticated
   }, [isAuthenticated])

   return {
      user: authUser,
      isAuthenticated,
      loading,
      error,
      logout,
      hasRole,
      getUserProfile,
      isUserAuthenticated,
   }
}

export default useAuth
