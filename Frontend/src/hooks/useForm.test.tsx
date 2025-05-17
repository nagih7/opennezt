import { renderHook, act } from '@testing-library/react-hooks'
import useForm from './useForm'

describe('useForm hook', () => {
   // Test case for initializing the hook with initial values
   test('should initialize with initial values', () => {
      const initialValues = {
         name: 'John Doe',
         email: 'john@example.com',
      }

      const { result } = renderHook(() =>
         useForm({
            initialValues,
            onSubmit: jest.fn(),
         })
      )

      expect(result.current.values).toEqual(initialValues)
      expect(result.current.errors).toEqual({})
      expect(result.current.touched).toEqual({})
      expect(result.current.isValid).toBe(true)
      expect(result.current.isDirty).toBe(false)
   })

   // Test case for handling input changes
   test('should update values when handleChange is called', () => {
      const { result } = renderHook(() =>
         useForm({
            initialValues: {
               name: '',
               email: '',
            },
            onSubmit: jest.fn(),
         })
      )

      act(() => {
         result.current.handleChange({
            target: {
               name: 'name',
               value: 'Jane Doe',
            },
         } as React.ChangeEvent<HTMLInputElement>)
      })

      expect(result.current.values.name).toBe('Jane Doe')
      expect(result.current.isDirty).toBe(true)
   })

   // Test case for validation rules
   test('should validate fields based on validation rules', () => {
      const { result } = renderHook(() =>
         useForm({
            initialValues: {
               name: '',
               email: '',
               password: '',
            },
            validationRules: {
               name: {
                  required: true,
                  errorMessage: 'Name is required',
               },
               email: {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  errorMessage: 'Valid email is required',
               },
               password: {
                  required: true,
                  minLength: 8,
                  errorMessage: 'Password must be at least 8 characters',
               },
            },
            onSubmit: jest.fn(),
         })
      )

      // Submit form with empty values
      act(() => {
         result.current.handleSubmit()
      })

      // Check if validation errors are set correctly
      expect(result.current.errors.name).toBe('Name is required')
      expect(result.current.errors.email).toBe('Valid email is required')
      expect(result.current.errors.password).toBe('Password must be at least 8 characters')
      expect(result.current.isValid).toBe(false)

      // Update values to pass validation
      act(() => {
         result.current.setFieldValue('name', 'Jane Doe')
         result.current.setFieldValue('email', 'jane@example.com')
         result.current.setFieldValue('password', 'password123')
      })

      // Check if validation errors are cleared
      expect(result.current.errors.name).toBe('')
      expect(result.current.errors.email).toBe('')
      expect(result.current.errors.password).toBe('')
      expect(result.current.isValid).toBe(true)
   })

   // Test case for form reset
   test('should reset form state when reset is called', () => {
      const initialValues = {
         name: '',
         email: '',
      }

      const { result } = renderHook(() =>
         useForm({
            initialValues,
            onSubmit: jest.fn(),
         })
      )

      // Change form values
      act(() => {
         result.current.handleChange({
            target: {
               name: 'name',
               value: 'Jane Doe',
            },
         } as React.ChangeEvent<HTMLInputElement>)
      })

      expect(result.current.values.name).toBe('Jane Doe')
      expect(result.current.isDirty).toBe(true)

      // Reset form
      act(() => {
         result.current.reset()
      })

      // Check if form is reset to initial state
      expect(result.current.values).toEqual(initialValues)
      expect(result.current.errors).toEqual({})
      expect(result.current.touched).toEqual({})
      expect(result.current.isDirty).toBe(false)
   })

   // Test case for form submission
   test('should call onSubmit with form values when form is submitted', () => {
      const onSubmit = jest.fn()
      const initialValues = {
         name: 'John Doe',
         email: 'john@example.com',
      }

      const { result } = renderHook(() =>
         useForm({
            initialValues,
            onSubmit,
         })
      )

      act(() => {
         result.current.handleSubmit()
      })

      expect(onSubmit).toHaveBeenCalledWith(initialValues, true)
   })

   // Test case for custom validation
   test('should handle custom validation rules', () => {
      const { result } = renderHook(() =>
         useForm({
            initialValues: {
               password: '',
               confirmPassword: '',
            },
            validationRules: {
               password: {
                  required: true,
                  minLength: 8,
                  errorMessage: 'Password must be at least 8 characters',
               },
               confirmPassword: {
                  required: true,
                  custom: (value, formData) => value === formData.password,
                  errorMessage: 'Passwords must match',
               },
            },
            onSubmit: jest.fn(),
         })
      )

      // Set different passwords
      act(() => {
         result.current.setFieldValue('password', 'password123')
         result.current.setFieldValue('confirmPassword', 'differentPassword')
      })

      expect(result.current.errors.confirmPassword).toBe('Passwords must match')
      expect(result.current.isValid).toBe(false)

      // Set matching passwords
      act(() => {
         result.current.setFieldValue('confirmPassword', 'password123')
      })

      expect(result.current.errors.confirmPassword).toBe('')
      expect(result.current.isValid).toBe(true)
   })
})
