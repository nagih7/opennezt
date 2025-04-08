import React from 'react'
import MessageSidebar from './components/MessageSidebar'
import Conversation from './components/Conversation'

const Message = () => {
    return (
        <div className="w-full px-[16px] py-8 h-full">
            <div className="flex flex-row w-full h-full gap-8">
                <div className="flex flex-col w-3/12 h-full">
                    <MessageSidebar />
                </div>
                <div className="flex flex-col w-9/12">
                    <Conversation />
                </div>
            </div>
        </div>
    )
}

export default Message
