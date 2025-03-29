import { Avatar } from '@chakra-ui/react';
import React from 'react';
import { CheckCircleFilled } from '@ant-design/icons';

const ConversationHeader = ({ name, logo }) => {
    return (
        <div className="flex items-center">
            <span className="mr-[8px]">
                <Avatar.Root size={'md'}>
                    <Avatar.Fallback name={name} />
                    <Avatar.Image src={logo} />
                </Avatar.Root>
            </span>
            <span className="flex items-center gap-1">
                {name}
                <CheckCircleFilled className="text-blue-500" />
            </span>
        </div>
    );
};

export default ConversationHeader;
