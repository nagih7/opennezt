import * as React from 'react'
import { cn } from '../../lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(({ className, ...props }, ref) => (
   <div
      ref={ref}
      className={cn('inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold', className)}
      {...props}
   />
))

Badge.displayName = 'Badge'

export { Badge }
