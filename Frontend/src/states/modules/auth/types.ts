// Auth module state types
export interface AuthState {
   isAuthSuccess: boolean
   authorize: string
   authRegister: Record<string, any>
   authUser: Record<string, any> | null
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
}

// Example action payload types
export interface LoginPayload {
   email: string
   password: string
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
