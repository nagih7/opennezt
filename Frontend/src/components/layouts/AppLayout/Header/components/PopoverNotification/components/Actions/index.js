import { Stack } from '@chakra-ui/react';
import { CheckOutlined, CloseOutlined } from '@mui/icons-material';
import React from 'react';
import { useSelector } from 'react-redux';
import { ACTIONS } from 'utils/constants';
import { CONFIRM_ACTION, DELETE_ACTION } from 'utils/constants/typeConstants';

const Actions = ({ notification, handleReplyNotification, index }) => {
    const { language } = useSelector((state) => state.app);
    return (
        <Stack direction="row" spacing={4}>
            <button
                className="px-[12px] py-[8px] text-xs font-medium bg-[#2f65b9] text-white rounded-md"
                icon={<CheckOutlined />}
                onClick={() => handleReplyNotification(notification._id, CONFIRM_ACTION, index)}
            >
                {ACTIONS.CONFIRM[language]}
            </button>
            <button
                className="px-[12px] py-[8px] text-xs font-medium bg-[#f8f9fa] text-[#6f7f92] rounded-md"
                danger
                icon={<CloseOutlined />}
                onClick={() => handleReplyNotification(notification._id, DELETE_ACTION)}
            >
                {ACTIONS.DELETE[language]}
            </button>
        </Stack>
    );
};

export default Actions;
