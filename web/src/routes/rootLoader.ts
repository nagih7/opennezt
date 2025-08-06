import { redirect } from 'react-router-dom'
import { LoaderArgs } from '~/types'
import { AuthService } from '../services/authService'
import { RouteHelper } from '~/utils/routeHelpers'
import { TokenManager } from '~/utils/tokenManager'
import { ROUTE_CONFIG } from '~/config/constants/routes'
import store from '~/store'
import { setAuthState } from '~/store/modules/auth'

interface RootLoaderOptions {
   requireAuth?: boolean
   permissions?: string[]
   saga?: string | null
}

export const rootLoader = async (loaderArgs: LoaderArgs, options: RootLoaderOptions = {}): Promise<Response | null> => {
   const { requireAuth = false, permissions = [], saga = null } = options

   try {
      const { request } = loaderArgs
      const url = new URL(request.url)
      const pathname = url.pathname

      // Determine route type
      const routeType = RouteHelper.getRouteType(pathname)

      // Handle different route types
      switch (routeType) {
         case 'public':
            return await handlePublicRoute(saga)
         case 'guest-only':
            return await handleGuestOnlyRoute(pathname)
         case 'admin':
            return await handleAdminRoute(pathname, requireAuth, permissions, saga)
         case 'user':
            return await handleUserRoute(pathname, requireAuth, permissions, saga)
         default:
            console.warn(`Unknown route type for: ${pathname}`)
            return redirect(ROUTE_CONFIG.ERROR.NOT_FOUND)
      }
   } catch (error) {
      console.error('🚨 Root loader error:', error)
      return redirect(ROUTE_CONFIG.ERROR.GENERAL_ERROR)
   }
}

// Handle public routes (no auth required)
const handlePublicRoute = async (saga: string | null): Promise<null> => {
   if (saga) {
      // init saga
   }

   return null
}

// Handle guest-only routes (login, register)
const handleGuestOnlyRoute = async (pathname: string): Promise<Response | null> => {
   const isAdminPath = RouteHelper.isAdminRoute(pathname)

   if (isAdminPath) {
      // Check admin authentication
      if (TokenManager.hasValidAdminToken()) {
         try {
            const admin = await AuthService.getAdminMe()

            // Update store
            store.dispatch(
               setAuthState({
                  isAdminAuthenticated: true,
                  authAdmin: admin,
                  adminToken: TokenManager.getAdminToken(),
               })
            )

            console.log('✅ Admin already authenticated - redirecting to admin home')
            return redirect(ROUTE_CONFIG.ADMIN.HOME)
         } catch (error) {
            console.log('❌ Invalid admin token - allowing access to guest route')
            // Token invalid, allow access to login/register
         }
      }
   } else {
      // Check user authentication
      if (TokenManager.hasValidUserToken()) {
         try {
            const user = await AuthService.getUserMe()

            // Update store
            store.dispatch(
               setAuthState({
                  isUserAuthenticated: true,
                  authUser: user,
                  userToken: TokenManager.getUserToken(),
               })
            )

            return redirect(ROUTE_CONFIG.USER.HOME)
         } catch (error) {
            // Token invalid, allow access to login/register
         }
      }
   }

   return null
}

// Handle admin routes
const handleAdminRoute = async (
   pathname: string,
   requireAuth: boolean,
   permissions: string[],
   saga: string | null
): Promise<Response | null> => {
   console.log('👑 Admin route - checking admin auth')

   let isAuthenticated = false
   let admin = null

   // Check token and authenticate
   if (TokenManager.hasValidAdminToken()) {
      try {
         admin = await AuthService.getAdminMe()
         isAuthenticated = true

         // Update store
         store.dispatch(
            setAuthState({
               isAdminAuthenticated: true,
               authAdmin: admin,
               adminToken: TokenManager.getAdminToken(),
               isLoadingAdmin: false,
            })
         )

         console.log('✅ Admin authenticated successfully')
      } catch (error) {
         console.log('❌ Admin authentication failed:', error)
         isAuthenticated = false
      }
   }

   // Check if auth is required
   if (requireAuth && !isAuthenticated) {
      console.log('🔒 Admin auth required - redirecting to login')
      return redirect(ROUTE_CONFIG.ADMIN.LOGIN)
   }

   // Check permissions
   if (isAuthenticated && permissions.length > 0) {
      const hasPermission = permissions.every((permission) => admin?.permissions?.includes(permission))

      if (!hasPermission) {
         console.log('🚫 Admin insufficient permissions')
         return redirect(ROUTE_CONFIG.ERROR.FORBIDDEN)
      }
   }

   // Initialize saga
   if (saga) {
      // init saga
   }

   return null
}

// Handle user routes
const handleUserRoute = async (
   pathname: string,
   requireAuth: boolean,
   permissions: string[],
   saga: string | null
): Promise<Response | null> => {
   let isAuthenticated = false
   let user = null

   // Check token and authenticate
   if (TokenManager.hasValidUserToken()) {
      try {
         user = await AuthService.getUserMe()
         isAuthenticated = true

         // Update store
         store.dispatch(
            setAuthState({
               isUserAuthenticated: true,
               authUser: user,
               userToken: TokenManager.getUserToken(),
               isLoadingUser: false,
            })
         )
      } catch (error) {
         isAuthenticated = false
      }
   }

   // Check if auth is required
   if (requireAuth && !isAuthenticated) {
      return redirect(ROUTE_CONFIG.USER.LOGIN)
   }

   // Check permissions
   if (isAuthenticated && permissions.length > 0) {
      const hasPermission = permissions.every((permission) => user?.permissions?.includes(permission))

      if (!hasPermission) {
         return redirect(ROUTE_CONFIG.ERROR.FORBIDDEN)
      }
   }

   if (saga) {
      // init saga
   }
   return null
}
