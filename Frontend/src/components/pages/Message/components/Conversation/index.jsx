import { IconlyArrowLeft2, IconlySend, IconlyStar } from 'components/UI/Iconly';

import {
    ArrowsAltOutlined,
    LinkOutlined,
    MoreOutlined,
    RollbackOutlined,
    WechatOutlined,
} from '@ant-design/icons';
import img_avt from '../../../../../assets/images/background/avt.jpg';
import React, { useEffect, useRef, useState } from 'react';
import { CheckCircleFilled } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getConversation, getMessages, sendMessage } from 'api/chat';
import { DIRECT_CONVERSATION, GROUP_CONVERSATION } from 'utils/constants/typeConstants';
import { Avatar } from '@chakra-ui/react';
import moment from 'moment';

const Conversation = () => {
    const dispatch = useDispatch();
    const params = useParams();

    const { id } = params;

    // ========== STATE FROM REDUX ========== //
    const { authUser } = useSelector((state) => state.auth);
    const { conversation } = useSelector((state) => state.chat);

    // ========== STATE ========== //
    const [message, setMessage] = useState('');

    // ========== USE EFFECT ========== //
    useEffect(() => {
        if (id) {
            dispatch(getConversation(id));
        }
    }, [dispatch, id]);
    useEffect(() => {
        if (id && conversation._id) {
            dispatch(getMessages(conversation._id));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, conversation._id]);

    // Add ref for auto-scrolling
    const messagesContainerRef = useRef(null);

    // Auto scroll to bottom when messages change
    useEffect(() => {
        if (messagesContainerRef.current && conversation?.messages?.length) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [conversation?.messages]);

    // ========== HANDLE FUNCTION ========== //
    const handleChangeMessage = (e) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = () => {
        dispatch(sendMessage(conversation._id, message));
        setMessage('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    if (id) {
        return (
            <>
                <div className="flex justify-between p-[10px] mb-[18px] bg-[#ffffff] rounded-md">
                    <div className="flex items-center">
                        <Link
                            to={'/conversation'}
                            className="flex justify-center items-center w-[50px] h-11"
                        >
                            <IconlyArrowLeft2 size={18} color={'#6f7f92'} />
                        </Link>
                        {(() => {
                            switch (conversation?.type?.name) {
                                case DIRECT_CONVERSATION:
                                    return (
                                        <div className="flex items-center">
                                            <span className="mr-[8px]">
                                                <Avatar.Root size={'md'}>
                                                    <Avatar.Fallback
                                                        name={conversation?.members[0]?.name}
                                                    />
                                                    <Avatar.Image
                                                        src={conversation?.members[0]?.avatar}
                                                    />
                                                </Avatar.Root>
                                            </span>
                                            <span className="flex items-center gap-1">
                                                {conversation?.members[0]?.name}
                                                <CheckCircleFilled className="text-blue-500" />
                                            </span>
                                        </div>
                                    );
                                case GROUP_CONVERSATION:
                                    return (
                                        <div className="flex items-center">
                                            <span className="mr-[8px]">
                                                <img
                                                    src={img_avt}
                                                    alt=""
                                                    className=" w-[35px] h-[35px] rounded-full"
                                                />
                                            </span>
                                            <span className="flex items-center gap-1">
                                                {conversation?.members[0]?.name}
                                                <CheckCircleFilled className="text-blue-500" />
                                            </span>
                                        </div>
                                    );
                                default:
                                    return null;
                            }
                        })()}
                    </div>
                    <div className="flex items-center">
                        <span className="flex items-center justify-center text-[#6f7f92] w-[50px] h-11">
                            <ArrowsAltOutlined />
                        </span>
                        <span className="flex items-center justify-center text-[#6f7f92] w-[50px] h-11">
                            <MoreOutlined />
                        </span>
                    </div>
                </div>
                <div className="flex flex-1 flex-col text-[#6f7f92] items-center w-full overflow-hidden">
                    <div
                        className="flex-1 overflow-y-scroll scrollbar-hide bg-[#ffffff] w-full"
                        ref={messagesContainerRef}
                    >
                        <div className="flex justify-center pt-[15px] pb-[1px] w-full">
                            <div className="px-[10px] py-[5px]">
                                <span className="text-xs">Start of conversation</span>
                            </div>
                        </div>
                        <div className="relative flex flex-col items-center justify-center w-full">
                            <div className="after:z-20 px-[11px] rounded-md text-xs font-semibold text-[#2f65b9] py-[5px] my-[11px]">
                                November 28, 2024
                            </div>
                            {conversation?.messages?.map((message, idx) => {
                                switch (message?.user?._id) {
                                    case authUser?._id:
                                        return (
                                            <div
                                                className="flex justify-end gap-[10px] px-[15px] w-full flex-row-reverse"
                                                key={idx}
                                            >
                                                {(() => {
                                                    switch (
                                                        conversation?.messages[idx - 1]?.user._id
                                                    ) {
                                                        case message?.user?._id:
                                                            return (
                                                                <>
                                                                    <div className="w-[35px] h-[35px]" />
                                                                    <div className="flex flex-col items-start w-full">
                                                                        <div className=" group flex flex-row-reverse pl-[10px] mb-[5px] w-full">
                                                                            <div className="flex items-center bg-[#f8f9fa] rounded-md w-fit px-[12px] py-[7px]">
                                                                                <span className="text-sm font-medium">
                                                                                    <p className="mb-0">
                                                                                        {
                                                                                            message?.content
                                                                                        }
                                                                                    </p>
                                                                                </span>
                                                                                <span className="ml-[10px] text-xs font-semibold">
                                                                                    <span>
                                                                                        {moment(
                                                                                            message?.timestamp
                                                                                        ).format(
                                                                                            'HH:mm'
                                                                                        )}
                                                                                    </span>
                                                                                </span>
                                                                            </div>
                                                                            <span className="ml-[5px] hidden items-center group-hover:flex transition-opacity duration-300 ease-in-out">
                                                                                <span className="mx-[5px] cursor-pointer">
                                                                                    <MoreOutlined className="w-[15px] h-[15px] text-black" />
                                                                                </span>
                                                                                <span className="mx-[5px] cursor-pointer">
                                                                                    <IconlyStar
                                                                                        size={15}
                                                                                        color={
                                                                                            '#000000'
                                                                                        }
                                                                                    />
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            );
                                                        default:
                                                            return (
                                                                <>
                                                                    <div className="w-[35px] h-[35px]">
                                                                        <img
                                                                            src={img_avt}
                                                                            alt=""
                                                                            className="w-[35px] h-[35px] rounded-full "
                                                                        />
                                                                    </div>
                                                                    <div className="flex flex-col items-start w-full">
                                                                        <div className="group mb-[5px] flex flex-row-reverse pl-[10px] w-full">
                                                                            <div className="flex items-center bg-[#f8f9fa] rounded-md w-fit px-[12px] py-[7px]">
                                                                                <span className="text-sm font-medium">
                                                                                    <p className="mb-0">
                                                                                        {
                                                                                            message?.content
                                                                                        }
                                                                                    </p>
                                                                                </span>
                                                                                <span className="ml-[10px] text-xs font-semibold">
                                                                                    <span>
                                                                                        {moment(
                                                                                            message?.timestamp
                                                                                        ).format(
                                                                                            'HH:mm'
                                                                                        )}
                                                                                    </span>
                                                                                </span>
                                                                            </div>
                                                                            <span className="ml-[5px] hidden items-center group-hover:flex transition-opacity duration-300 ease-in-out">
                                                                                <span className="mx-[5px] cursor-pointer">
                                                                                    <MoreOutlined className="w-[15px] h-[15px] text-black" />
                                                                                </span>
                                                                                <span className="mx-[5px] cursor-pointer">
                                                                                    <IconlyStar
                                                                                        size={15}
                                                                                        color={
                                                                                            '#000000'
                                                                                        }
                                                                                    />
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            );
                                                    }
                                                })()}
                                            </div>
                                        );
                                    default:
                                        return (
                                            <div className="flex gap-[10px] mb-[5px] px-[15px] w-full">
                                                {(() => {
                                                    switch (
                                                        conversation?.messages[idx - 1]?.user._id
                                                    ) {
                                                        case message?.user?._id:
                                                            return (
                                                                <>
                                                                    <div className="w-[35px] h-[35px]" />
                                                                    <div className="flex flex-col items-start w-full">
                                                                        <div className="w-full pl-0 mb-0">
                                                                            <div className="group flex pr-[10px] mb-[5px] w-full">
                                                                                <div className="flex items-center bg-[#f8f9fa] rounded-md w-fit px-[12px] py-[7px]">
                                                                                    <span className="text-sm font-medium">
                                                                                        <p className="mb-0">
                                                                                            {
                                                                                                message?.content
                                                                                            }
                                                                                        </p>
                                                                                    </span>
                                                                                    <span className="ml-[10px] text-xs font-semibold">
                                                                                        <span>
                                                                                            {moment(
                                                                                                message?.timestamp
                                                                                            ).format(
                                                                                                'HH:mm'
                                                                                            )}
                                                                                        </span>
                                                                                    </span>
                                                                                </div>
                                                                                <span className="ml-[5px] hidden items-center group-hover:flex transition-opacity duration-300 ease-in-out">
                                                                                    <span className="mx-[5px] cursor-pointer">
                                                                                        <IconlyStar
                                                                                            size={
                                                                                                15
                                                                                            }
                                                                                            color={
                                                                                                '#000000'
                                                                                            }
                                                                                        />
                                                                                    </span>
                                                                                    <span className="mx-[5px] cursor-pointer">
                                                                                        <RollbackOutlined className="w-[15px] h-[15px] text-black" />
                                                                                    </span>
                                                                                    <span className="mx-[5px] cursor-pointer">
                                                                                        <MoreOutlined className="w-[15px] h-[15px] text-black" />
                                                                                    </span>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            );
                                                        default:
                                                            return (
                                                                <>
                                                                    <div className="w-[35px] h-[35px]">
                                                                        <img
                                                                            src={img_avt}
                                                                            alt=""
                                                                            className="w-[35px] h-[35px] rounded-full "
                                                                        />
                                                                    </div>
                                                                    <div className="flex flex-col items-start w-full">
                                                                        <div className="mb-[5px]"></div>
                                                                        <ul className="w-full pl-0 mb-0">
                                                                            <div className="group flex pr-[10px] mb-[5px] w-full">
                                                                                <div className="flex items-center bg-[#f8f9fa] rounded-md w-fit px-[12px] py-[7px]">
                                                                                    <span className="text-sm font-medium">
                                                                                        <p className="mb-0">
                                                                                            {
                                                                                                message?.content
                                                                                            }
                                                                                        </p>
                                                                                    </span>
                                                                                    <span className="ml-[10px] text-xs font-semibold">
                                                                                        <span>
                                                                                            {moment(
                                                                                                message?.timestamp
                                                                                            ).format(
                                                                                                'HH:mm'
                                                                                            )}
                                                                                        </span>
                                                                                    </span>
                                                                                </div>
                                                                                <span className="ml-[   5px] hidden items-center group-hover:flex transition-opacity duration-300 ease-in-out">
                                                                                    <span className="mx-[5px] cursor-pointer">
                                                                                        <IconlyStar
                                                                                            size={
                                                                                                15
                                                                                            }
                                                                                            color={
                                                                                                '#000000'
                                                                                            }
                                                                                        />
                                                                                    </span>
                                                                                    <span className="mx-[5px] cursor-pointer">
                                                                                        <RollbackOutlined className="w-[15px] h-[15px] text-black" />
                                                                                    </span>
                                                                                    <span className="mx-[5px] cursor-pointer">
                                                                                        <MoreOutlined className="w-[15px] h-[15px] text-black" />
                                                                                    </span>
                                                                                </span>
                                                                            </div>
                                                                        </ul>
                                                                    </div>
                                                                </>
                                                            );
                                                    }
                                                })()}
                                            </div>
                                        );
                                }
                            })}
                        </div>
                    </div>
                    <div className="flex items-center border-t border-gray-200 w-full bg-[#ffffff]">
                        <div className="flex justify-center items-center w-[50px] h-[40px] my-1">
                            <LinkOutlined className="text-xl w-[30px] h-[30px]" />
                        </div>
                        <div className="py-[12px] w-full">
                            <input
                                onKeyDown={handleKeyDown}
                                value={message}
                                onChange={handleChangeMessage}
                                type="text"
                                placeholder="Write your message"
                                className="w-full outline-none"
                            />
                        </div>
                        <div
                            className="min-w-[40px] mx-[10px] my-1 h-[40px] flex justify-center rounded-md bg-[#2f65b9] items-center cursor-pointer"
                            onClick={handleSendMessage}
                        >
                            <IconlySend size={24} color={'#ffffff'} />
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="flex justify-end p-[10px] mb-[18px] bg-[#ffffff] rounded-md">
                    <a href="#" className="flex justify-center items-center w-[50px] h-11">
                        <IconlyStar size={18} color={'#6f7f92'} />
                    </a>
                    <span className="flex items-center justify-center text-[#6f7f92] w-[50px] h-11">
                        <ArrowsAltOutlined />
                    </span>
                </div>
                <div className="py-[16px] flex-1">
                    <div className="flex flex-col items-center justify-center h-full gap-3 py-16">
                        <p className="mb-0 w-14 h-14">
                            <WechatOutlined className="text-8xl w-14 h-14 " />
                        </p>
                        <p className="mb-0 text-[#6f7f92]">
                            Select a conversation to display messages
                        </p>
                        <p className="mb-0 text-[#6f7f92]">or</p>
                        <p className="mb-0">
                            <Link
                                // to={'/messages/new-conversation'}
                                className="px-[28px] text-sm font-semibold py-[11px] bg-[#2f65b9] rounded-md no-underline text-[#ffffff]"
                            >
                                START A NEW CONVERSATION
                            </Link>
                        </p>
                    </div>
                </div>
            </>
        );
    }
};

export default Conversation;
