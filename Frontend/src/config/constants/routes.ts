export const ROUTE_CONFIG = {
   // User routes
   USER: {
      LOGIN: '/login',
      REGISTER: '/register',
      HOME: '/',
      DASHBOARD: '/dashboard',
      PROFILE: '/profile',
      SETTINGS: '/settings',
   },

   // Admin routes
   ADMIN: {
      PREFIX: '/admin',
      LOGIN: '/admin/login',
      REGISTER: '/admin/register',
      HOME: '/admin',
      DASHBOARD: '/admin/dashboard',
      USERS: '/admin/users',
      SETTINGS: '/admin/settings',
   },

   // Public routes
   PUBLIC: {
      ABOUT: '/about',
      CONTACT: '/contact',
      TERMS: '/terms',
      PRIVACY: '/privacy',
   },

   // Error routes
   ERROR: {
      NOT_FOUND: '/404',
      FORBIDDEN: '/403',
      SERVER_ERROR: '/500',
      GENERAL_ERROR: '/error',
   },
} as const

export const PUBLIC_ROUTES = [
   ...Object.values(ROUTE_CONFIG.PUBLIC),
   ...Object.values(ROUTE_CONFIG.ERROR),
   ROUTE_CONFIG.USER.LOGIN,
   ROUTE_CONFIG.USER.REGISTER,
   ROUTE_CONFIG.ADMIN.LOGIN,
   ROUTE_CONFIG.ADMIN.REGISTER,
] as const

export const GUEST_ONLY_ROUTES = [
   ROUTE_CONFIG.USER.LOGIN,
   ROUTE_CONFIG.USER.REGISTER,
   ROUTE_CONFIG.ADMIN.LOGIN,
   ROUTE_CONFIG.ADMIN.REGISTER,
] as const
