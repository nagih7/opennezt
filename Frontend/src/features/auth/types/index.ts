export interface UserCredentials {
   email: string
   password: string
}

export interface RegisterData extends UserCredentials {
   firstName: string
   lastName: string
   confirmPassword: string
   agreeToTerms: boolean
}

export interface AuthState {
   authUser: User | null
   isAuthenticated: boolean
   loading: boolean
   error: string | null
   token: string | null
}

export interface User {
   id: string
   email: string
   firstName: string
   lastName: string
   role: string
   avatar?: string
   createdAt: string
   updatedAt: string
   [key: string]: any
}

export interface LoginResponse {
   user: User
   token: string
}

export interface ResetPasswordData {
   token: string
   password: string
   confirmPassword: string
}

export interface ForgotPasswordData {
   email: string
}

export interface AuthApiResponse {
   success: boolean
   message: string
   data?: any
   error?: string
}
