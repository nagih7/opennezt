import React from 'react'
import { useSelector } from 'react-redux'
import { NOTIFICATIONS } from 'utils/constants'

const ProjectInvitationNotification = ({ notification }) => {
    const { language } = useSelector((state) => state.app)

    return (
        <div className={` ${notification.metadata?.read === true ? ("text-[#6f7f92]") : ("text-black")} text-sm font-medium`}
        >
            <b>{notification?.user?.name}</b> {NOTIFICATIONS.INVITED_YOU_TO_JOIN_THE[language]}{' '}
            <b>{notification?.data?.project?.name}</b> {NOTIFICATIONS.PROJECT[language]}
            {notification.metadata?.read === false ? (
                <span className="inline-block w-3 h-3 rounded-full bg-blue-400 ml-2"></span>
            ) : (
                <></>
            )}
        </div>
    )
}

export default ProjectInvitationNotification
