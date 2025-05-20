import React, { createContext, useContext, ReactNode } from 'react'

// Types
interface CardContextType {
   variant?: 'default' | 'primary' | 'secondary'
   size?: 'sm' | 'md' | 'lg'
}

interface CardProps extends CardContextType {
   className?: string
   children: ReactNode
}

interface CardHeaderProps {
   className?: string
   children: ReactNode
}

interface CardBodyProps {
   className?: string
   children: ReactNode
}

interface CardFooterProps {
   className?: string
   children: ReactNode
}

// Context
const CardContext = createContext<CardContextType>({
   variant: 'default',
   size: 'md',
})

// Helper function to get card classes
const getCardClasses = (variant: string = 'default', size: string = 'md', className: string = '') => {
   // Base classes
   let classes = 'rounded-lg border shadow overflow-hidden '

   // Variant specific classes
   switch (variant) {
      case 'primary':
         classes += 'bg-blue-50 border-blue-100 '
         break
      case 'secondary':
         classes += 'bg-gray-50 border-gray-100 '
         break
      default:
         classes += 'bg-white border-gray-200 '
         break
   }

   // Size specific classes
   switch (size) {
      case 'sm':
         classes += 'p-2 '
         break
      case 'lg':
         classes += 'p-6 '
         break
      default:
         classes += 'p-4 '
         break
   }

   // Add custom classes
   classes += className

   return classes.trim()
}

// Components
const Card: React.FC<CardProps> & {
   Header: React.FC<CardHeaderProps>
   Body: React.FC<CardBodyProps>
   Footer: React.FC<CardFooterProps>
} = ({ variant = 'default', size = 'md', className = '', children }) => {
   return (
      <CardContext.Provider value={{ variant, size }}>
         <div className={getCardClasses(variant, size, className)}>{children}</div>
      </CardContext.Provider>
   )
}

const CardHeader: React.FC<CardHeaderProps> = ({ className = '', children }) => {
   const { variant, size } = useContext(CardContext)

   let headerClasses = 'border-b px-4 py-3 font-medium '

   // Variant specific classes for header
   switch (variant) {
      case 'primary':
         headerClasses += 'border-blue-100 '
         break
      case 'secondary':
         headerClasses += 'border-gray-100 '
         break
      default:
         headerClasses += 'border-gray-200 '
         break
   }

   // Add custom classes
   headerClasses += className

   return <div className={headerClasses.trim()}>{children}</div>
}

const CardBody: React.FC<CardBodyProps> = ({ className = '', children }) => {
   const { size } = useContext(CardContext)

   let bodyClasses = ''

   // Size specific classes for body
   switch (size) {
      case 'sm':
         bodyClasses += 'p-2 '
         break
      case 'lg':
         bodyClasses += 'p-6 '
         break
      default:
         bodyClasses += 'p-4 '
         break
   }

   // Add custom classes
   bodyClasses += className

   return <div className={bodyClasses.trim()}>{children}</div>
}

const CardFooter: React.FC<CardFooterProps> = ({ className = '', children }) => {
   const { variant } = useContext(CardContext)

   let footerClasses = 'border-t px-4 py-3 '

   // Variant specific classes for footer
   switch (variant) {
      case 'primary':
         footerClasses += 'border-blue-100 '
         break
      case 'secondary':
         footerClasses += 'border-gray-100 '
         break
      default:
         footerClasses += 'border-gray-200 '
         break
   }

   // Add custom classes
   footerClasses += className

   return <div className={footerClasses.trim()}>{children}</div>
}

// Attach components to Card
Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter

export default Card
