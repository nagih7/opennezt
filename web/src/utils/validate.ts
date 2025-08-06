import { z } from 'zod'

export const ZOD_DEFAULT_ERROR_MAP: z.ZodErrorMap = (issue, ctx) => {
   let message: string

   switch (issue.code) {
      // boolean, string, number, array, object
      case z.ZodIssueCode.invalid_type:
         if (issue.received === 'undefined' || issue.received === 'null') {
            message = `${issue.path.join('.')} cannot be empty.`
         } else {
            message = `${issue.path.join('.')} has invalid format.`
         }
         break

      // string, array, number specific
      case z.ZodIssueCode.too_small:
         if (issue.type === 'string') {
            message = `${issue.path.join('.')} cannot be less than ${issue.minimum} characters.`
         } else if (issue.type === 'array') {
            message = `${issue.path.join('.')} cannot have fewer than ${issue.minimum} items.`
         } else if (issue.type === 'number') {
            message = `${issue.path.join('.')} cannot be less than ${issue.minimum}.`
         } else {
            message = `${issue.path.join('.')} is too small.`
         }
         break

      case z.ZodIssueCode.too_big:
         if (issue.type === 'string') {
            message = `${issue.path.join('.')} cannot exceed ${issue.maximum} characters.`
         } else if (issue.type === 'array') {
            message = `${issue.path.join('.')} cannot have more than ${issue.maximum} items.`
         } else if (issue.type === 'number') {
            message = `${issue.path.join('.')} cannot be greater than ${issue.maximum}.`
         } else {
            message = `${issue.path.join('.')} is too large.`
         }
         break

      case z.ZodIssueCode.invalid_string:
         if (issue.validation === 'email') {
            message = `${issue.path.join('.')} has invalid email format.`
         } else if (issue.validation === 'regex') {
            message = `${issue.path.join('.')} has invalid format.`
         } else {
            message = `${issue.path.join('.')} has invalid format.`
         }
         break

      // all
      case z.ZodIssueCode.custom:
         message = issue.message || `${issue.path.join('.')} is invalid.`
         break

      case z.ZodIssueCode.invalid_union:
         message = `${issue.path.join('.')} is invalid.`
         break

      case z.ZodIssueCode.invalid_enum_value:
         message = `${issue.path.join('.')} must be one of ${issue.options.join(', ')}.`
         break

      case z.ZodIssueCode.invalid_arguments:
         message = `${issue.path.join('.')} has invalid arguments.`
         break

      case z.ZodIssueCode.unrecognized_keys:
         message = `Field ${issue.keys.join(', ')} is not defined.`
         break

      default:
         message = ctx.defaultError
         break
   }

   return { message }
}

export const ZOD_DEFAULT_OPTIONS = {
   errorMap: ZOD_DEFAULT_ERROR_MAP,
   coerce: true,
}

export function validate<T>(
   schema: z.ZodType<T>,
   data: unknown,
   event: { onSuccess: (value: T) => void; onError: (errors: Record<string, string>) => void } = {
      onSuccess: () => {},
      onError: () => {},
   }
): void {
   const result = schema.safeParse(data)

   if (!result.success) {
      const details = result.error.errors.reduce<Record<string, string>>((pre, curr) => {
         const path = curr.path.join('.') || 'root'
         if (!(path in pre)) {
            pre[path] = curr.message
         }
         return pre
      }, {})

      event.onError(details)
   } else {
      event.onSuccess(result.data)
   }
}

export function isValidate<T>(
   data: T,
   type: 'register' | 'login' | 'forgotPassword' | 'resetPassword',
   errorState: T
): { error: T; isError: boolean } {
   const errors = { ...errorState }
   let hasError = false

   // Get all fields from data object
   const fields = Object.keys(data as any)

   for (const field of fields) {
      const value = (data as any)[field]

      // Check if field is empty
      if (!value || value.trim() === '') {
         ;(errors as any)[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
         hasError = true
         continue
      }

      // Email validation
      if (field === 'email') {
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
         if (!emailRegex.test(value)) {
            ;(errors as any)[field] = 'Please enter a valid email address'
            hasError = true
         }
      }

      // Password validation
      if (field === 'password') {
         if (value.length < 6) {
            ;(errors as any)[field] = 'Password must be at least 6 characters long'
            hasError = true
         }
      }

      // Password confirmation validation
      if (field === 'confirmPassword' && type === 'register') {
         if (value !== (data as any).password) {
            ;(errors as any)[field] = 'Passwords do not match'
            hasError = true
         }
      }

      // Phone validation (if present)
      if (field === 'phone' || field === 'phoneNumber') {
         const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
         if (!phoneRegex.test(value.replace(/\s/g, ''))) {
            ;(errors as any)[field] = 'Please enter a valid phone number'
            hasError = true
         }
      }

      // Name validation (if present)
      if ((field === 'firstName' || field === 'lastName' || field === 'name') && value.length < 2) {
         ;(errors as any)[field] =
            `${field.charAt(0).toUpperCase() + field.slice(1)} must be at least 2 characters long`
         hasError = true
      }
   }

   return { error: errors, isError: hasError }
}
