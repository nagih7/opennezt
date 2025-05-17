import { Text } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store/types'
// import { useNavigate } from 'react-router-dom'
import { NOTIFICATIONS } from 'utils/constants'

const FooterPopoverNotification: React.FC = () => {
   // const navigate = useNavigate();

   const { language } = useSelector((state: RootState) => state.app)

   const handleNavigateToNotification = (): void => {
      // navigate('/notification-management');
   }

   return (
      <Text
         className="flex justify-center items-center cursor-pointer text-center mx-[24px] mb-[5px]"
         onClick={() => handleNavigateToNotification()}
      >
         {/* <span className="p-3 text-[#2f65b9] font-bold uppercase text-xs">
                {NOTIFICATIONS.VIEW_ALL_NOTIFICATIONS[language as 'EN' | 'VI' | 'ZH']}
            </span> */}
      </Text>
   )
}

export default FooterPopoverNotification
