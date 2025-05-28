import { useEffect, useRef, useState } from 'react'

type DeviceType = 'audio-output' | 'audio-input' | 'video'
type Position = 'top' | 'bottom'

interface UseDeviceSelectorProps {
   deviceType?: DeviceType
}

interface UseDeviceSelectorReturn {
   isOpen: boolean
   setIsOpen: (isOpen: boolean) => void
   dropdownRef: React.RefObject<HTMLDivElement | null>
   position: Position
   getDropdownWidth: () => string
   handleKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void
}

export const useDeviceSelector = ({ deviceType = 'video' }: UseDeviceSelectorProps = {}): UseDeviceSelectorReturn => {
   const [isOpen, setIsOpen] = useState<boolean>(false)
   const dropdownRef = useRef<HTMLDivElement>(null)
   const [position, setPosition] = useState<Position>('bottom') // Default position

   // Determine dropdown width based on device type
   const getDropdownWidth = (): string => {
      switch (deviceType) {
         case 'audio-output':
            return 'w-[500px]'
         case 'audio-input':
         case 'video':
         default:
            return 'w-[300px]'
      }
   }

   // Calculate dropdown position
   useEffect(() => {
      if (isOpen && dropdownRef.current) {
         const rect = dropdownRef.current.getBoundingClientRect()
         const spaceBelow = window.innerHeight - rect.bottom
         const dropdownHeight = 150 // Approximate height of dropdown

         // If there's not enough space below, show the dropdown above
         if (spaceBelow < dropdownHeight) {
            setPosition('top')
         } else {
            setPosition('bottom')
         }
      }
   }, [isOpen])

   // Close dropdown when clicking outside
   useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false)
         }
      }

      document.addEventListener('mousedown', handleOutsideClick)
      return () => document.removeEventListener('mousedown', handleOutsideClick)
   }, [])

   // Handle keyboard navigation and accessibility
   const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key === 'Escape') {
         setIsOpen(false)
      } else if (e.key === 'Enter' || e.key === ' ') {
         setIsOpen(!isOpen)
         e.preventDefault()
      }
   }

   return {
      isOpen,
      setIsOpen,
      dropdownRef,
      position,
      getDropdownWidth,
      handleKeyDown,
   }
}
