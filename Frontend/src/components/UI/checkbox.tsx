import { Checkbox as ChakraCheckbox } from '@chakra-ui/react'
import * as React from 'react'
import { CustomCheckboxProps } from '~/types/components'

const CheckboxComponent = React.forwardRef<HTMLLabelElement, CustomCheckboxProps>((props, ref) => {
   const { icon, children, inputProps, rootRef, checked, onChange, ...rest } = props
   return (
      <ChakraCheckbox.Root ref={rootRef || ref} checked={checked} onChange={onChange} {...rest}>
         <ChakraCheckbox.HiddenInput {...inputProps} />
         <ChakraCheckbox.Control>{icon || <ChakraCheckbox.Indicator />}</ChakraCheckbox.Control>
         {children != null && <ChakraCheckbox.Label>{children}</ChakraCheckbox.Label>}
      </ChakraCheckbox.Root>
   )
})

CheckboxComponent.displayName = 'Checkbox'

export const Checkbox: React.FC<CustomCheckboxProps> = CheckboxComponent
