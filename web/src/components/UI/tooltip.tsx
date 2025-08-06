import { Tooltip as ChakraTooltip, Portal } from '@chakra-ui/react'
import * as React from 'react'
import { TooltipProps } from '~/types/components'

const TooltipComponent = React.forwardRef<HTMLDivElement, TooltipProps>((props, ref) => {
   const { showArrow, children, content, ...rest } = props

   return (
      <ChakraTooltip.Root {...rest}>
         <ChakraTooltip.Trigger asChild>{children}</ChakraTooltip.Trigger>
         <Portal>
            <ChakraTooltip.Positioner>
               <ChakraTooltip.Content ref={ref}>
                  {showArrow && (
                     <ChakraTooltip.Arrow>
                        <ChakraTooltip.ArrowTip />
                     </ChakraTooltip.Arrow>
                  )}
                  {content}
               </ChakraTooltip.Content>
            </ChakraTooltip.Positioner>
         </Portal>
      </ChakraTooltip.Root>
   )
})

TooltipComponent.displayName = 'Tooltip'

export const Tooltip: React.FC<TooltipProps> = TooltipComponent
