import { Text } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import { NOTIFICATIONS } from 'utils/constants'

const FooterPopoverNotification = () => {
    // const navigate = useNavigate();

    const { language } = useSelector((state) => state.app)

    const handleNavigateToNotification = () => {
        // navigate('/notification-management');
    }

    return (
        <Text
            className="flex justify-center items-center cursor-pointer text-center mx-[24px] mb-[24px]"
            onClick={() => handleNavigateToNotification()}
        >
            <span className="p-3 text-[#2f65b9] font-bold uppercase text-xs">
                {NOTIFICATIONS.VIEW_ALL_NOTIFICATIONS[language]}
            </span>
        </Text>
    )
}

export default FooterPopoverNotification
