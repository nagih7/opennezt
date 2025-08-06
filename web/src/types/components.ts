import { ReactNode, CSSProperties, FormEvent, SyntheticEvent, MouseEvent, ChangeEvent } from 'react'
import { Params } from 'react-router-dom'

// Basic component props
export interface BaseComponentProps {
   className?: string
   style?: CSSProperties
   children?: ReactNode
   id?: string
}

// AuthLayout props
export interface AuthLayoutProps extends BaseComponentProps {
   title?: string
   path?: string
}

// Common event handlers
export interface EventHandlers {
   onClick?: (event: MouseEvent<HTMLElement>) => void
   onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
   onSubmit?: (event: FormEvent<HTMLFormElement>) => void
   onFocus?: (event: SyntheticEvent) => void
   onBlur?: (event: SyntheticEvent) => void
}

// Form related types
export interface FormField {
   name: string
   value: string | number | boolean | null
   error?: string
   touched?: boolean
   required?: boolean
}

export interface FormState {
   fields: Record<string, FormField>
   isValid?: boolean
   isSubmitting?: boolean
   submitError?: string | null
}

// Common UI component types
export interface ButtonProps extends BaseComponentProps, EventHandlers {
   type?: 'button' | 'submit' | 'reset'
   disabled?: boolean
   variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'danger'
   size?: 'small' | 'medium' | 'large'
   isLoading?: boolean
   icon?: ReactNode
}

export interface InputProps extends BaseComponentProps, EventHandlers {
   type?: string
   name: string
   value?: string | number
   placeholder?: string
   disabled?: boolean
   required?: boolean
   error?: string
   label?: string
   autoFocus?: boolean
}

export interface ApiResponse<T = any> {
   status: number
   data: T
   message?: string
   errors?: Record<string, string[]>
}

export interface ApiError {
   status: number
   message: string
   errors?: Record<string, string[]>
}

export interface PaginatedResponse<T> {
   data: T[]
   total: number
   page: number
   limit: number
   totalPages: number
}

// Route props with params
export interface RouteParams {
   [key: string]: string
}

// For React Router v6
export interface RouteProps {
   params?: Params
   location?: {
      pathname: string
      search: string
      hash: string
      state: any
   }
   navigate?: (to: string, options?: { replace?: boolean; state?: any }) => void
}

// Redux related types
export interface ReduxAction<T = any> {
   type: string
   payload?: T
   meta?: any
   error?: boolean
}

export interface ReduxState {
   [key: string]: any
}

export interface CustomCheckboxProps extends BaseComponentProps {
   checked?: boolean
   onChange?: (e: React.FormEvent<HTMLLabelElement>) => void
   children?: React.ReactNode
   icon?: React.ReactNode
   inputProps?: React.InputHTMLAttributes<HTMLInputElement>
   rootRef?: React.RefObject<HTMLLabelElement>
}

export interface TooltipProps extends BaseComponentProps {
   content: string
   placement?: 'top' | 'bottom' | 'left' | 'right'
   showArrow?: boolean
   children: React.ReactNode
}
