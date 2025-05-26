export const ROUTE_CONFIG = {
   // User routes
   USER: {
      // Authentication routes
      LOGIN: '/login',
      REGISTER: '/register',
      VERIFY: '/verify',
      RESET_PASSWORD: '/reset-password',
      FORGOT_PASSWORD: '/forgot-password',
      // Application routes
      HOME: '/',
      DASHBOARD: '/dashboard',
      ME: '/me',
      SETTINGS: '/account-settings',
      // Profile routes
      PROFILE: '/profile',
      EDIT_PROFILE: '/profile/edit-profile',
      // Project routes
      MY_PROJECTS: '/projects/me',
      PROJECT: '/projects',
      CREATE_PROJECT: '/projects',
      PROJECT_DETAIL: '/projects/detail',
      // Talent routes
      RECRUIT_TALENT: '/recruit-talents',
      // Seek project routes
      SEEK_PROJECT: '/seek-projects',
      // Conversation routes
      CONVERSATION: '/conversations',
      CONVERSATION_DETAIL: '/conversations/:id',
      // Interview routes
      INTERVIEW: '/interviews',
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
