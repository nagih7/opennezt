import React from 'react'
import { useSelector } from 'react-redux'
import { NOTIFICATIONS } from 'utils/constants'
import { RootState } from 'store/types'
import { NotificationProps } from '../../types'

const ConfirmFriendRequestNotification: React.FC<NotificationProps> = ({ notification }) => {
   const { language } = useSelector((state: RootState) => state.app)

   return (
      <div className={` ${notification.metadata?.read === true ? 'text-[#6f7f92]' : 'text-black'} text-sm font-medium`}>
         <b>{notification.user?.name}</b> {NOTIFICATIONS.CONFIRMED_FRIEND_REQUEST[language as 'EN' | 'VI' | 'ZH']}
      </div>
   )
}

export default ConfirmFriendRequestNotification
