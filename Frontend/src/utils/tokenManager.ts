export class TokenManager {
   private static readonly STORAGE_KEYS = {
      USER_TOKEN: 'user_token',
      ADMIN_TOKEN: 'admin_token',
   } as const

   // User token methods
   static getUserToken(): string | null {
      try {
         return localStorage.getItem(this.STORAGE_KEYS.USER_TOKEN)
      } catch {
         return null
      }
   }

   static setUserToken(token: string): void {
      try {
         localStorage.setItem(this.STORAGE_KEYS.USER_TOKEN, token)
      } catch (error) {
         console.warn('Failed to save user token:', error)
      }
   }

   static removeUserToken(): void {
      try {
         localStorage.removeItem(this.STORAGE_KEYS.USER_TOKEN)
      } catch (error) {
         console.warn('Failed to remove user token:', error)
      }
   }

   // Admin token methods
   static getAdminToken(): string | null {
      try {
         return localStorage.getItem(this.STORAGE_KEYS.ADMIN_TOKEN)
      } catch {
         return null
      }
   }

   static setAdminToken(token: string): void {
      try {
         localStorage.setItem(this.STORAGE_KEYS.ADMIN_TOKEN, token)
      } catch (error) {
         console.warn('Failed to save admin token:', error)
      }
   }

   static removeAdminToken(): void {
      try {
         localStorage.removeItem(this.STORAGE_KEYS.ADMIN_TOKEN)
      } catch (error) {
         console.warn('Failed to remove admin token:', error)
      }
   }

   // Utility methods
   static hasValidUserToken(): boolean {
      const token = this.getUserToken()
      return token !== null && token.trim().length > 0
   }

   static hasValidAdminToken(): boolean {
      const token = this.getAdminToken()
      return token !== null && token.trim().length > 0
   }

   static clearAllTokens(): void {
      this.removeUserToken()
      this.removeAdminToken()
   }
}
