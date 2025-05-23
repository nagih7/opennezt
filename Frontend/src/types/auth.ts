export const AuthRole = {
   SUPER_ADMIN: 'Super Admin',
   ADMIN: 'Admin',
   USER: 'User',
}

// Login
export interface LoginPayload {
   email: string
   password: string
}

export interface LoginError {
   email: string
   password: string
}

// Register
export interface RegisterPayload {
   name: string
   email: string
   password: string
   confirmPassword: string
}

export interface RegisterError {
   name: string
   email: string
   password: string
   confirmPassword: string
}

// Forgot Password
export interface ForgotPasswordPayload {
   email: string
}

export interface ForgotPasswordError {
   email: string
}

// Reset Password
export interface ResetPasswordPayload {
   password: string
   confirmPassword: string
}
