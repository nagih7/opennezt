import { ROUTE_CONFIG, PUBLIC_ROUTES, GUEST_ONLY_ROUTES } from '~/config/constants/routes'

export class RouteHelper {
   static isAdminRoute(pathname: string): boolean {
      return pathname.startsWith(ROUTE_CONFIG.ADMIN.PREFIX)
   }

   static isPublicRoute(pathname: string): boolean {
      return PUBLIC_ROUTES.includes(pathname as any)
   }

   static isGuestOnlyRoute(pathname: string): boolean {
      return GUEST_ONLY_ROUTES.includes(pathname as any)
   }

   static isUserRoute(pathname: string): boolean {
      return !this.isAdminRoute(pathname) && !this.isPublicRoute(pathname)
   }

   static getRouteType(pathname: string): 'admin' | 'user' | 'public' | 'guest-only' {
      if (this.isGuestOnlyRoute(pathname)) return 'guest-only'
      if (this.isAdminRoute(pathname)) return 'admin'
      if (this.isPublicRoute(pathname)) return 'public'
      return 'user'
   }

   static getRedirectUrl(routeType: 'admin' | 'user', isAuthenticated: boolean): string {
      if (!isAuthenticated) {
         return routeType === 'admin' ? ROUTE_CONFIG.ADMIN.LOGIN : ROUTE_CONFIG.USER.LOGIN
      }
      return routeType === 'admin' ? ROUTE_CONFIG.ADMIN.HOME : ROUTE_CONFIG.USER.HOME
   }
}
