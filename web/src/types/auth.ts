import { z } from 'zod'
import { VALIDATE_EMAIL_REGEX } from '~/utils/helper'

export const AuthRole = {
   SUPER_ADMIN: 'Super Admin',
   ADMIN: 'Admin',
   USER: 'User',
}

// Login
export const LoginSchema = z.object({
   email: z.string().trim().regex(VALIDATE_EMAIL_REGEX, 'Invalid email'),
   password: z.string().trim().min(6, 'Password is required'),
})

// Register
export const RegisterSchema = z.object({
   name: z.string().trim().min(1, 'Name is required'),
   email: z.string().trim().regex(VALIDATE_EMAIL_REGEX, 'Invalid email'),
   password: z.string().trim().min(6, 'Password is required'),
   confirmPassword: z.string().trim().min(6, 'Confirm password is required'),
})

// Forgot Password
export const ForgotPasswordSchema = z.object({
   email: z.string().trim().regex(VALIDATE_EMAIL_REGEX, 'Invalid email'),
})

// Reset Password
export const ResetPasswordSchema = z.object({
   password: z.string().trim().min(6, 'Password is required'),
   confirmPassword: z.string().trim().min(6, 'Confirm password is required'),
})

// Types
export type LoginPayload = z.infer<typeof LoginSchema>
export type RegisterPayload = z.infer<typeof RegisterSchema>
export type ForgotPasswordPayload = z.infer<typeof ForgotPasswordSchema>
export type ResetPasswordPayload = z.infer<typeof ResetPasswordSchema>
