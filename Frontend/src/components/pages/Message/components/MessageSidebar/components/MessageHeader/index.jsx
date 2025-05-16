import { IconlyEditSquare } from 'components/UI/Iconly';
import React from 'react';

const MessageHeader = () => {
    return (
        <div className="mb-[17px] py-[13px] bg-[#ffffff] rounded-md px-[17px] flex items-center">
            <div className="w-full pr-[10px]">
                <input
                    type="text"
                    placeholder="Search..."
                    className="py-[10px] w-full pl-[10px] outline-none text-[#6f7f92] h-10 pr-[25px] bg-[#f8f9fa] rounded-md border border-gray-200"
                />
            </div>
            <a
                href="#"
                className="flex items-center justify-center bg-[#eaeff8] rounded-md min-w-10 h-10"
            >
                <IconlyEditSquare size={20} color={'#6f7f92'} />
            </a>
        </div>
    );
};

export default MessageHeader;
