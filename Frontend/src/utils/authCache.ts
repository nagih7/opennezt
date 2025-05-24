import { AuthAccount } from '~/store/modules/auth/types'

interface CacheEntry<T> {
   data: T
   timestamp: number
   expiresAt: number
}

export class AuthCache {
   private static readonly CACHE_DURATION = 5 * 60 * 1000 // 5 minutes
   private static userCache: CacheEntry<AuthAccount> | null = null
   private static adminCache: CacheEntry<AuthAccount> | null = null

   private static isExpired(entry: CacheEntry<any>): boolean {
      return Date.now() > entry.expiresAt
   }

   private static createCacheEntry<T>(data: T): CacheEntry<T> {
      const now = Date.now()
      return {
         data,
         timestamp: now,
         expiresAt: now + this.CACHE_DURATION,
      }
   }

   // User cache methods
   static getCachedUser(): AuthAccount | null {
      if (!this.userCache || this.isExpired(this.userCache)) {
         return null
      }
      return this.userCache.data
   }

   static setCachedUser(user: AuthAccount): void {
      this.userCache = this.createCacheEntry(user)
   }

   static clearUserCache(): void {
      this.userCache = null
   }

   // Admin cache methods
   static getCachedAdmin(): AuthAccount | null {
      if (!this.adminCache || this.isExpired(this.adminCache)) {
         return null
      }
      return this.adminCache.data
   }

   static setCachedAdmin(admin: AuthAccount): void {
      this.adminCache = this.createCacheEntry(admin)
   }

   static clearAdminCache(): void {
      this.adminCache = null
   }

   // Utility methods
   static clearAllCache(): void {
      this.clearUserCache()
      this.clearAdminCache()
   }

   static getCacheStats() {
      return {
         userCache: this.userCache
            ? {
                 hasData: true,
                 isExpired: this.isExpired(this.userCache),
                 age: Date.now() - this.userCache.timestamp,
              }
            : { hasData: false },
         adminCache: this.adminCache
            ? {
                 hasData: true,
                 isExpired: this.isExpired(this.adminCache),
                 age: Date.now() - this.adminCache.timestamp,
              }
            : { hasData: false },
      }
   }
}
