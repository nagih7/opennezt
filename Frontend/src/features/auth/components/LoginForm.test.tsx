import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LoginForm } from './index'
import * as hooks from '../hooks/useAuth'

// Mock useAuth hook
jest.mock('../hooks/useAuth', () => ({
   __esModule: true,
   default: jest.fn(),
   useAuth: jest.fn(),
}))

describe('LoginForm Component', () => {
   // Mock implementation for useAuth
   const mockLogin = jest.fn()

   beforeEach(() => {
      jest.clearAllMocks()
      // Set up the useAuth mock
      ;(hooks.useAuth as jest.Mock).mockReturnValue({
         login: mockLogin,
         loading: false,
         error: null,
      })
   })

   test('renders login form correctly', () => {
      render(<LoginForm />)

      // Check if form elements are rendered
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/mật khẩu/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /đăng nhập/i })).toBeInTheDocument()
      expect(screen.getByText(/quên mật khẩu/i)).toBeInTheDocument()
      expect(screen.getByText(/chưa có tài khoản/i)).toBeInTheDocument()
   })

   test('displays validation errors for empty fields', async () => {
      render(<LoginForm />)

      // Submit the form without filling in any fields
      fireEvent.click(screen.getByRole('button', { name: /đăng nhập/i }))

      // Wait for validation errors to appear
      await waitFor(() => {
         expect(screen.getByText(/vui lòng nhập địa chỉ email hợp lệ/i)).toBeInTheDocument()
         expect(screen.getByText(/mật khẩu cần có ít nhất 6 ký tự/i)).toBeInTheDocument()
      })

      // Make sure login was not called
      expect(mockLogin).not.toHaveBeenCalled()
   })

   test('displays validation error for invalid email format', async () => {
      render(<LoginForm />)

      // Enter invalid email and valid password
      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid-email' } })
      fireEvent.change(screen.getByLabelText(/mật khẩu/i), { target: { value: 'password123' } })

      // Submit the form
      fireEvent.click(screen.getByRole('button', { name: /đăng nhập/i }))

      // Wait for validation error to appear
      await waitFor(() => {
         expect(screen.getByText(/vui lòng nhập địa chỉ email hợp lệ/i)).toBeInTheDocument()
      })

      // Make sure login was not called
      expect(mockLogin).not.toHaveBeenCalled()
   })

   test('calls login function with correct values on valid submission', async () => {
      const onSuccessMock = jest.fn()
      render(<LoginForm onSuccess={onSuccessMock} />)

      // Enter valid credentials
      const email = 'test@example.com'
      const password = 'password123'

      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: email } })
      fireEvent.change(screen.getByLabelText(/mật khẩu/i), { target: { value: password } })

      // Submit the form
      fireEvent.click(screen.getByRole('button', { name: /đăng nhập/i }))

      // Check if login was called with correct values
      await waitFor(() => {
         expect(mockLogin).toHaveBeenCalledWith(email, password)
         expect(onSuccessMock).toHaveBeenCalled()
      })
   })

   test('enables remember me checkbox', () => {
      render(<LoginForm />)

      const rememberMeCheckbox = screen.getByLabelText(/ghi nhớ đăng nhập/i)
      expect(rememberMeCheckbox).not.toBeChecked()

      // Click the checkbox
      fireEvent.click(rememberMeCheckbox)

      // Check if checkbox is checked
      expect(rememberMeCheckbox).toBeChecked()
   })

   test('navigates to forgot password page', () => {
      render(<LoginForm />)

      const forgotPasswordLink = screen.getByText(/quên mật khẩu/i)
      expect(forgotPasswordLink.getAttribute('href')).toBe('/forgot-password')
   })

   test('navigates to register page', () => {
      render(<LoginForm />)

      const registerLink = screen.getByText(/đăng ký ngay/i)
      expect(registerLink.getAttribute('href')).toBe('/register')
   })
})
