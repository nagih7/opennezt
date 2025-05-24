import { AuthAccount } from '~/store/modules/auth/types'
import { TokenManager } from '~/utils/tokenManager'
import { AuthCache } from '~/utils/authCache'
import { getAuthAdmin, getMe } from '~/api/auth'

export class AuthService {
   // AuthAccount authentication
   static async getUserMe(): Promise<AuthAccount> {
      // Check cache first
      const cachedUser = AuthCache.getCachedUser()
      if (cachedUser) {
         return cachedUser
      }

      const token = TokenManager.getUserToken()
      if (!token) {
         throw new Error('NO_TOKEN')
      }

      try {
         const res = await getMe()
         const user: AuthAccount = res.data

         // Cache the result
         AuthCache.setCachedUser(user)
         return user
      } catch (error) {
         if (error instanceof Error && error.message === 'UNAUTHORIZED') {
            TokenManager.removeUserToken()
            AuthCache.clearUserCache()
         }
         throw error
      }
   }

   // AuthAccount authentication
   static async getAdminMe(): Promise<AuthAccount> {
      // Check cache first
      const cachedAdmin = AuthCache.getCachedAdmin()
      if (cachedAdmin) {
         return cachedAdmin
      }

      const token = TokenManager.getAdminToken()
      if (!token) {
         throw new Error('NO_TOKEN')
      }

      try {
         const admin = await getAuthAdmin()

         // Cache the result
         AuthCache.setCachedAdmin(admin)
         return admin
      } catch (error) {
         if (error instanceof Error && error.message === 'UNAUTHORIZED') {
            TokenManager.removeAdminToken()
            AuthCache.clearAdminCache()
         }
         throw error
      }
   }

   // Utility methods
   static logout(type: 'user' | 'admin' | 'all' = 'all'): void {
      switch (type) {
         case 'user':
            TokenManager.removeUserToken()
            AuthCache.clearUserCache()
            break
         case 'admin':
            TokenManager.removeAdminToken()
            AuthCache.clearAdminCache()
            break
         case 'all':
            TokenManager.clearAllTokens()
            AuthCache.clearAllCache()
            break
      }
   }
}
