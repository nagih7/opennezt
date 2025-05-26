export const ROUTE_CONFIG = {
   // User routes
   USER: {
      // AUTHENTICATION
      LOGIN: '/login',
      REGISTER: '/register',
      VERIFY: '/verify',
      RESET_PASSWORD: '/reset-password',
      FORGOT_PASSWORD: '/forgot-password',
      // APPLICATION
      HOME: '/',
      DASHBOARD: '/dashboard',
      ME: '/me',
      SETTING: {
         PREFIX: '/settings',
         PROFILE: '/settings/profile',
         PRIVACY_POLICY: '/settings/privacy-policy',
         SHOP: '/settings/shop',
         BLOCKLIST: '/settings/blocklist',
         EXPORT: '/settings/export',
         ACCOUNT: '/settings/account',
         NOTIFICATIONS: '/settings/notifications',
         SECURITY: '/settings/security',
         BILLING: '/settings/billing',
      },
      // PROFILE
      PROFILE: {
         PREFIX: '/profile',
         DETAIL: '/profile/:id',
         EDIT: {
            PREFIX: '/profile/edit',
            PROFESSIONAL_BACKGROUND: '/profile/edit/professional-background',
            EDUCATION: '/profile/edit/education',
            CERTIFICATION: '/profile/edit/certification',
            SKILL: '/profile/edit/skill',
            DESCRIPTION: '/profile/edit/description',
            MEDIA: '/profile/edit/media',
         },
      },
      // PROJECT
      PROJECT: {
         PREFIX: '/projects/',
         DETAIL: {
            PREFIX: '/projects/:id',
            MEMBER: '/projects/detail/members',
            SETTING: '/projects/detail/setting',
         },
         CREATE: {
            PREFIX: '/projects/create/',
            BASIC: '/projects/create/basic',
            STAGE: '/projects/create/stage',
            REVENUE: '/projects/create/revenue',
            FUNDING: '/projects/create/funding',
            DESCRIPTION: '/projects/create/description',
            LOGO: '/projects/create/logo',
            BACKGROUND: '/projects/create/background',
            INVITE: '/projects/create/invite',
            MEDIA: '/projects/create/media',
         },
         ME: {
            PREFIX: '/projects/me/',
            DETAIL: '/projects/me/:id',
            EDIT: {
               PREFIX: '/projects/me/:id/edit/',
               BASIC: '/projects/me/:id/edit/basic',
               STAGE: '/projects/me/:id/edit/stage',
               REVENUE: '/projects/me/:id/edit/revenue',
               FUNDING: '/projects/me/:id/edit/funding',
               DESCRIPTION: '/projects/me/:id/edit/description',
               LOGO: '/projects/me/:id/edit/logo',
               BACKGROUND: '/projects/me/:id/edit/background',
               MEMBER: '/projects/me/:id/edit/members',
               MEDIA: '/projects/me/:id/edit/media',
               SETTING: '/projects/me/:id/edit/setting',
            },
         },
      },
      // RECRUIT TALENT
      RECRUIT_TALENT: {
         PREFIX: '/recruit-talent/',
         DETAIL: '/recruit-talent/:id',
      },
      // SEEK PROJECT
      SEEK_PROJECT: {
         PREFIX: '/seek-project',
         DETAIL: '/seek-project/:id',
      },
      // CONVERSATION
      CONVERSATION: {
         PREFIX: '/conversations/',
         DETAIL: '/conversations/:id',
         NEW: '/conversations/new',
         MESSAGES: '/conversations/:id/messages',
         CREATE: '/conversations/create',
      },
      // INTERVIEW
      INTERVIEW: {
         PREFIX: '/interviews/',
         DETAIL: '/interviews/:id',
         CREATE: '/interviews/create',
         SCHEDULE: '/interviews/schedule',
         QUESTIONS: '/interviews/questions',
      },
   },

   // Admin routes
   ADMIN: {
      PREFIX: '/admin/',
      MANAGE: {
         PREFIX: '/admin/manage',
         USERS: '/admin/manage/users',
         PROJECTS: '/admin/manage/projects',
         RECRUIT_TALENTS: '/admin/manage/recruit-talents',
         SEEK_PROJECTS: '/admin/manage/seek-projects',
         CONVERSATIONS: '/admin/manage/conversations',
         INTERVIEWS: '/admin/manage/interviews',
      },
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
