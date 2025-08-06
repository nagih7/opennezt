import * as React from 'react'

import { cn } from '~/lib/utils'

interface InputProps extends React.ComponentProps<'input'> {
   required?: boolean
   error?: string
   isShowError?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
   ({ className, type, error, isShowError = true, ...props }, ref) => {
      return (
         <div className="flex flex-col w-full gap-2">
            <input
               type={type}
               className={cn(
                  'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-main-color disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                  className,
                  error && isShowError && 'border-red-500',
                  !error && 'hover:border-main-color'
               )}
               ref={ref}
               {...props}
            />
            {error && isShowError && <span className="text-sm font-medium text-red-500">{error}</span>}
         </div>
      )
   }
)
Input.displayName = 'Input'

export { Input }
