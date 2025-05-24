import { z } from 'zod'
import { noop } from 'lodash'

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
      onSuccess: noop,
      onError: noop,
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
