import * as React from 'react'
import { cn } from '../../lib/utils'

const Popover = React.forwardRef<
   HTMLDivElement,
   React.HTMLAttributes<HTMLDivElement> & {
      open?: boolean
      onOpenChange?: (open: boolean) => void
   }
>(({ className, open, onOpenChange, children, ...props }, ref) => {
   const [isOpen, setIsOpen] = React.useState(open)

   React.useEffect(() => {
      setIsOpen(open)
   }, [open])

   const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && onOpenChange) {
         const target = event.target as HTMLElement
         if (!target.closest('[data-popover]')) {
            onOpenChange(false)
         }
      }
   }

   React.useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
         document.removeEventListener('mousedown', handleClickOutside)
      }
   }, [isOpen, onOpenChange])

   return (
      <div ref={ref} data-popover className={cn('relative', className)} {...props}>
         {children}
      </div>
   )
})
Popover.displayName = 'Popover'

const PopoverTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
   ({ className, ...props }, ref) => <button ref={ref} className={cn('', className)} {...props} />
)
PopoverTrigger.displayName = 'PopoverTrigger'

const PopoverContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
   ({ className, ...props }, ref) => (
      <div
         ref={ref}
         className={cn(
            'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            className
         )}
         {...props}
      />
   )
)
PopoverContent.displayName = 'PopoverContent'

export { Popover, PopoverTrigger, PopoverContent }
