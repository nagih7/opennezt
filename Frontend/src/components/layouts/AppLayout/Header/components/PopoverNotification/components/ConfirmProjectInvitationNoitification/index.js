import React from 'react'
import { useSelector } from 'react-redux'
import { NOTIFICATIONS } from 'utils/constants'

const ConfirmProjectInvitationNoitification = ({ notification }) => {
    const { language } = useSelector((state) => state.app)

    return (
        <div className={` ${notification.metadata?.read === true ? ("text-[#6f7f92]") : ("text-black")} text-sm font-medium`}
        >
            <b>{notification.user?.name}</b> {NOTIFICATIONS.CONFIRMED_PROJECT_INVITATION[language]}

        </div>
    )
}

export default ConfirmProjectInvitationNoitification
