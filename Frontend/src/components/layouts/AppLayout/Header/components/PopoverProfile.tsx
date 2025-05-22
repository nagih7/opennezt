import React from 'react'
import { IconlyLogout, IconlySetting, IconlyUser } from 'components/UI/Iconly'
import { usePersionalInfo } from '~/hooks'

const PopoverProfile: React.FC = () => {
   const { authUser, navigate, handleConfirmLogOut } = usePersionalInfo()

   return (
      <div className="flex flex-col">
         <p className="p-[16px] border-b border-gray-200 text-md font-semibold">{authUser?.name}</p>
         <div className="flex flex-col gap-2 p-2">
            <div
               className="flex items-center gap-2 p-[15px] hover:bg-[#f6f5f5] cursor-pointer rounded-md"
               onClick={() => navigate('/profile')}
            >
               <IconlyUser color={'#374151'} size={12} />
               Profile
            </div>

            <div
               className="flex items-center gap-2 p-[15px] hover:bg-[#f6f5f5] cursor-pointer rounded-md"
               onClick={() => navigate('/account-settings')}
            >
               <IconlySetting color={'#374151'} size={12} />
               <span>Account Settings</span>
            </div>
            <div
               className="flex items-center gap-2 p-[15px] hover:bg-[#f6f5f5] cursor-pointer rounded-md"
               onClick={() => handleConfirmLogOut()}
            >
               <IconlyLogout color={'#374151'} size={12} />
               <span>Log out</span>
            </div>
         </div>
      </div>
   )
}

export default PopoverProfile
