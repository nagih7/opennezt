import { Stack } from '@chakra-ui/react';
import React from 'react';
import MessageHeader from './components/MessageHeader';
import Conversations from './components/Conversations';
import MessageFooter from './components/MessageFooter';

const MessageSidebar = () => {
    return (
        <Stack className="flex flex-col h-full overflow-hidden">
            <MessageHeader />
            <Conversations />
            <MessageFooter />
        </Stack>
    );
};

export default MessageSidebar;
