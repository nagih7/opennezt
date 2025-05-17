import { useState, useEffect, ChangeEvent } from 'react'

type ValidationRule<T> = {
   required?: boolean
   pattern?: RegExp
   minLength?: number
   maxLength?: number
   custom?: (value: any, formData: T) => boolean | string
   errorMessage?: string
}

type ValidationRules<T> = {
   [K in keyof T]?: ValidationRule<T>
}

interface UseFormProps<T> {
   initialValues: T
   validationRules?: ValidationRules<T>
   onSubmit: (values: T, isValid: boolean) => void
}

interface UseFormReturn<T> {
   values: T
   errors: Partial<Record<keyof T, string>>
   touched: Partial<Record<keyof T, boolean>>
   isValid: boolean
   isDirty: boolean
   handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
   handleBlur: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
   handleSubmit: (e?: React.FormEvent) => void
   setFieldValue: (name: keyof T, value: any) => void
   setFieldTouched: (name: keyof T, isTouched?: boolean) => void
   reset: () => void
}

function useForm<T extends Record<string, any>>({
   initialValues,
   validationRules = {} as ValidationRules<T>,
   onSubmit,
}: UseFormProps<T>): UseFormReturn<T> {
   const [values, setValues] = useState<T>(initialValues)
   const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
   const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({})
   const [isDirty, setIsDirty] = useState(false)
   const [isValid, setIsValid] = useState(false)

   // Validate a single field
   const validateField = (name: keyof T, value: any): string => {
      const fieldRules = validationRules[name]
      if (!fieldRules) return ''

      if (fieldRules.required && (value === undefined || value === null || value === '')) {
         return fieldRules.errorMessage || 'This field is required'
      }

      if (fieldRules.pattern && !fieldRules.pattern.test(value)) {
         return fieldRules.errorMessage || 'Invalid format'
      }

      if (fieldRules.minLength && typeof value === 'string' && value.length < fieldRules.minLength) {
         return fieldRules.errorMessage || `Minimum length is ${fieldRules.minLength}`
      }

      if (fieldRules.maxLength && typeof value === 'string' && value.length > fieldRules.maxLength) {
         return fieldRules.errorMessage || `Maximum length is ${fieldRules.maxLength}`
      }

      if (fieldRules.custom) {
         const customResult = fieldRules.custom(value, values)
         if (typeof customResult === 'string') return customResult
         if (customResult === false) return fieldRules.errorMessage || 'Invalid value'
      }

      return ''
   }

   // Validate all fields
   const validateForm = (): Partial<Record<keyof T, string>> => {
      const newErrors: Partial<Record<keyof T, string>> = {}

      Object.keys(validationRules).forEach((key) => {
         const fieldName = key as keyof T
         const errorMessage = validateField(fieldName, values[fieldName])
         if (errorMessage) {
            newErrors[fieldName] = errorMessage
         }
      })

      return newErrors
   }

   // Check form validity whenever values or errors change
   useEffect(() => {
      const newErrors = validateForm()
      const isFormValid = Object.keys(newErrors).length === 0
      setIsValid(isFormValid)
   }, [values])

   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target
      const fieldName = name as keyof T

      // Handle different input types
      const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value

      setValues((prev) => ({ ...prev, [fieldName]: fieldValue }))
      setIsDirty(true)

      // Validate field on change
      const errorMessage = validateField(fieldName, fieldValue)
      setErrors((prev) => ({ ...prev, [fieldName]: errorMessage }))
   }

   const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name } = e.target
      const fieldName = name as keyof T

      setTouched((prev) => ({ ...prev, [fieldName]: true }))

      // Validate field on blur
      const errorMessage = validateField(fieldName, values[fieldName])
      setErrors((prev) => ({ ...prev, [fieldName]: errorMessage }))
   }

   const handleSubmit = (e?: React.FormEvent) => {
      if (e) {
         e.preventDefault()
      }

      // Mark all fields as touched
      const allTouched = Object.keys(validationRules).reduce(
         (acc, key) => {
            acc[key as keyof T] = true
            return acc
         },
         {} as Partial<Record<keyof T, boolean>>
      )

      setTouched(allTouched)

      const newErrors = validateForm()
      setErrors(newErrors)

      const isFormValid = Object.keys(newErrors).length === 0
      setIsValid(isFormValid)

      onSubmit(values, isFormValid)
   }

   const setFieldValue = (name: keyof T, value: any) => {
      setValues((prev) => ({ ...prev, [name]: value }))
      setIsDirty(true)

      // Validate field when value is set programmatically
      const errorMessage = validateField(name, value)
      setErrors((prev) => ({ ...prev, [name]: errorMessage }))
   }

   const setFieldTouched = (name: keyof T, isTouched = true) => {
      setTouched((prev) => ({ ...prev, [name]: isTouched }))
   }

   const reset = () => {
      setValues(initialValues)
      setErrors({})
      setTouched({})
      setIsDirty(false)
   }

   return {
      values,
      errors,
      touched,
      isValid,
      isDirty,
      handleChange,
      handleBlur,
      handleSubmit,
      setFieldValue,
      setFieldTouched,
      reset,
   }
}

export default useForm
