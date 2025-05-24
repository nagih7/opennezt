export interface AuthAccount {
   _id: string
   name: string
   email: string
   phone: string
   avatar: string
   city: string
   region: string
   background: string
   language: [string]
   facebook: string
   linkedin: string
   role: string
   created_at: string
   permissions: string[]
}

// Auth module state types
export interface AuthState {
   isAuthSuccess: boolean
   authorize: string
   authRegister: Record<string, any>
   authRole: string
   resetPasswordSuccess: boolean
   errorRegister: {
      name: string
      email: string
      phone: string
      address: string
      password: string
      confirmPassword: string
   }
   isLoadingGetMe: boolean
   isLoadingBtnLogin: boolean
   isLoadingGetAuthRole: boolean
   isRegisterSuccess: boolean
   isLoadingRegister: boolean
   isSuccessForgotPassword: boolean
   isLoadingResetPassword: boolean

   // User auth
   isUserAuthenticated: boolean
   authUser: AuthAccount | null
   userToken: string | null

   // Admin auth
   isAdminAuthenticated: boolean
   authAdmin: AuthAccount | null
   adminToken: string | null

   // Loading states
   isLoadingUser: boolean
   isLoadingAdmin: boolean
}

export interface RegisterPayload {
   name: string
   email: string
   password: string
   confirmPassword: string
   phone?: string
   address?: string
}

export interface PasswordResetPayload {
   token: string
   password: string
   confirmPassword: string
}

export interface LoaderArgs {
   request: Request
   params?: Record<string, string | undefined>
}

export type RouteType = 'user' | 'admin' | 'public'
