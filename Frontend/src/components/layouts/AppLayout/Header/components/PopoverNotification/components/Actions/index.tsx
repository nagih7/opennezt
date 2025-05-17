import { Stack } from '@chakra-ui/react'
import { CheckOutlined, CloseOutlined } from '@mui/icons-material'
import React from 'react'
import { useSelector } from 'react-redux'
import { ACTIONS } from 'utils/constants'
import { CONFIRM_ACTION, DELETE_ACTION } from 'utils/constants'
import { Notification, RootState } from 'types'

interface ActionsProps {
   notification: Notification
   handleReplyNotification: (notification_id: string, action: string, index?: number) => void
   index: number
}

const Actions: React.FC<ActionsProps> = ({ notification, handleReplyNotification, index }) => {
   const { language } = useSelector((state: RootState) => state.app)
   return (
      <div className="flex flex-row gap-4">
         <button
            className="px-[12px] py-[8px] text-xs font-medium bg-[#2f65b9] text-white rounded-md flex items-center gap-1"
            onClick={() => handleReplyNotification(notification._id, CONFIRM_ACTION, index)}
         >
            <CheckOutlined fontSize="small" />
            {ACTIONS.CONFIRM[language as keyof typeof ACTIONS.CONFIRM]}
         </button>
         <button
            className="px-[12px] py-[8px] text-xs font-medium bg-[gray] text-[white] rounded-md flex items-center gap-1"
            onClick={() => handleReplyNotification(notification._id, DELETE_ACTION)}
         >
            <CloseOutlined fontSize="small" />
            {ACTIONS.DELETE[language as keyof typeof ACTIONS.DELETE]}
         </button>
      </div>
   )
}

export default Actions
