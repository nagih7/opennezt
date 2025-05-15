import { IconlySearch } from 'components/UI/Iconly'
import React, { useState } from 'react'

interface SearchProjectHeaderProps {
   onSearch: (term: string) => void
}

const SearchProjectHeader: React.FC<SearchProjectHeaderProps> = ({ onSearch }) => {
   const [searchTerm, setSearchTerm] = useState<string>('')

   const handleSearch = () => {
      onSearch(searchTerm)
   }

   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         handleSearch()
      }
   }

   return (
      <div className="p-8 bg-[#ffffff] rounded-md">
         <div className="flex justify-between items-center border-[1px] rounded-md caret-[#2f65b9] bg-[#f8f9fa] pl-[15px]">
            <input
               type="text"
               placeholder="Search Projects..."
               className="bg-[#f8f9fa] outline-none h-8 w-full rounded-md text-xs font-medium text-black"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               onKeyPress={handleKeyPress}
            />
            <button
               className="flex items-center justify-center bg-[#2f65b9] rounded-md w-11 h-10"
               onClick={handleSearch}
            >
               <IconlySearch size={14} color={'#ffffff'} />
            </button>
         </div>
      </div>
   )
}

export default SearchProjectHeader
