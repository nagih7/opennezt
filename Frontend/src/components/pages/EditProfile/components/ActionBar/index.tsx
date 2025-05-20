import React from 'react'
import { IconlyHome, IconlyLogout, IconlyMessage, IconlyProfile } from 'components/UI/Iconly'

const ActionBar: React.FC = () => {
   return (
      <ul className="flex gap-3 pl-0 mb-0">
         <li>
            <a href="#" className="flex items-center justify-center bg-[#f8f9fa] h-[60px] w-[60px] rounded-md">
               <IconlyHome size={25} color={'#6f7f92'} />
            </a>
         </li>
         <li>
            <a href="#" className="flex items-center justify-center bg-[#f8f9fa] h-[60px] w-[60px] rounded-md">
               <IconlyProfile size={25} color={'#6f7f92'} />
            </a>
         </li>
         <li>
            <a href="#" className="flex items-center justify-center bg-[#f8f9fa] h-[60px] w-[60px] rounded-md">
               <IconlyMessage size={25} color={'#6f7f92'} />
            </a>
         </li>
         <li>
            <a href="#" className="flex items-center justify-center bg-[#f8f9fa] h-[60px] w-[60px] rounded-md">
               <IconlyLogout size={25} color={'#6f7f92'} />
            </a>
         </li>
      </ul>
   )
}

export default ActionBar
