import { IconlyStar } from 'components/UI/Iconly';
import React from 'react';
import MessageSidebar from './components/MessageSidebar';
import Conversation from './components/Conversation';
import { Link } from 'react-router-dom';

const Message = () => {
    return (
        <div className="w-full px-[16px] py-8 h-full">
            <div className="flex w-full h-full gap-8">
                <div className="flex flex-col w-4/12 h-full">
                    <MessageSidebar />
                </div>
                <div className="flex flex-col w-10/12">
                    <Conversation />
                </div>
            </div>
        </div>
    );
};

export default Message;
