import { useState } from 'react'
import { useOptimizedDebounce } from '~/hooks/useOptimizedPerformance'

export interface UseSearchProjectHeaderProps {
   onSearch: (term: string) => void
}

export const useSearchProjectHeader = ({ onSearch }: UseSearchProjectHeaderProps) => {
   const [searchTerm, setSearchTerm] = useState<string>('')

   // Optimized debounced search
   const debouncedSearch = useOptimizedDebounce((term: string) => {
      onSearch(term)
   }, 300)

   const handleSearch = () => {
      onSearch(searchTerm)
   }

   const handleSearchChange = (value: string) => {
      setSearchTerm(value)
      // Automatically trigger debounced search on input change
      debouncedSearch(value)
   }

   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         handleSearch()
      }
   }

   return {
      searchTerm,
      setSearchTerm,
      handleSearch,
      handleSearchChange,
      handleKeyPress,
   }
}
