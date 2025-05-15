// Common types for React components
import { ReactNode } from 'react'

export interface BaseProps {
    className?: string
    style?: React.CSSProperties
    children?: ReactNode
}

// Add other common types here as needed
