import { useState } from 'react'

export interface UseSearchProjectHeaderProps {
   onSearch: (term: string) => void
}

export const useSearchProjectHeader = ({ onSearch }: UseSearchProjectHeaderProps) => {
   const [searchTerm, setSearchTerm] = useState<string>('')

   const handleSearch = () => {
      onSearch(searchTerm)
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
      handleKeyPress,
   }
}
