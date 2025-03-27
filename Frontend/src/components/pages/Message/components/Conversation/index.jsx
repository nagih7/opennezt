import { IconlyArrowLeft2, IconlySend, IconlyStar } from 'components/UI/Iconly';

import {
    ArrowsAltOutlined,
    LinkOutlined,
    MoreOutlined,
    RollbackOutlined,
    WechatOutlined,
} from '@ant-design/icons';
import img_avt from '../../../../../assets/images/background/avt.jpg';
import React, { useEffect } from 'react';
import { CheckCircleFilled } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getConversation } from 'api/chat';
import { DIRECT_CONVERSATION, GROUP_CONVERSATION } from 'utils/constants/typeConstants';
import { Avatar } from '@chakra-ui/react';

const Conversation = () => {
    const dispatch = useDispatch();
    const params = useParams();

    const { id } = params;

    // ========== STATE FROM REDUX ========== //
    const { conversation } = useSelector((state) => state.chat);

    useEffect(() => {
        if (id) {
            dispatch(getConversation(id));
        }
    }, [dispatch, id]);

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
                                                Vuong Manh Nghia
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
                                                Vuong Manh Nghia
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
                    <div className="flex-1 overflow-y-scroll scrollbar-hide bg-[#ffffff] w-full">
                        <div className="flex justify-center pt-[15px] pb-[1px] w-full">
                            <div className="px-[10px] py-[5px]">
                                <span className="text-xs">Start of conversation</span>
                            </div>
                        </div>
                        <div className="relative flex flex-col items-center justify-center w-full">
                            <div className="after:z-20 px-[11px] rounded-md text-xs font-semibold text-[#2f65b9] py-[5px] my-[11px]">
                                November 28, 2024
                            </div>
                            <div className="flex gap-[10px] mb-[15px] px-[15px] w-full">
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
                                        <div className="group flex pr-[10px] mb-[10px] w-full">
                                            <div className="flex items-center bg-[#f8f9fa] rounded-md w-fit px-[12px] py-[7px]">
                                                <span className="text-sm font-medium">
                                                    <p className="mb-0">Ê, Trường?</p>
                                                </span>
                                                <span className="ml-[10px] text-xs font-semibold">
                                                    <span>11:49</span>
                                                </span>
                                            </div>
                                            <span className="ml-[5px] hidden items-center group-hover:flex transition-opacity duration-300 ease-in-out">
                                                <span className="mx-[5px] cursor-pointer">
                                                    <IconlyStar size={15} color={'#000000'} />
                                                </span>
                                                <span className="mx-[5px] cursor-pointer">
                                                    <RollbackOutlined className="w-[15px] h-[15px] text-black" />
                                                </span>
                                                <span className="mx-[5px] cursor-pointer">
                                                    <MoreOutlined className="w-[15px] h-[15px] text-black" />
                                                </span>
                                            </span>
                                        </div>
                                        <div className="group flex pr-[10px] mb-[10px] w-full">
                                            <div className="flex items-center bg-[#f8f9fa] rounded-md w-fit px-[12px] py-[7px]">
                                                <span className="text-sm font-medium">
                                                    <p className="mb-0">Vào OpenNezt không ?</p>
                                                </span>
                                                <span className="ml-[10px] text-xs font-semibold">
                                                    <span>11:49</span>
                                                </span>
                                            </div>
                                            <span className="ml-[5px] hidden items-center group-hover:flex transition-opacity duration-300 ease-in-out">
                                                <span className="mx-[5px] cursor-pointer">
                                                    <IconlyStar size={15} color={'#000000'} />
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
                            </div>
                            {/* Right*/}
                            <div className="flex justify-end gap-[10px] mb-[15px] px-[15px] w-full flex-row-reverse">
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
                                        <div className="group flex flex-row-reverse pl-[10px] mb-[10px] w-full">
                                            <div className="flex items-center bg-[#f8f9fa] rounded-md w-fit px-[12px] py-[7px]">
                                                <span className="text-sm font-medium">
                                                    <p className="mb-0">Omg bô</p>
                                                </span>
                                                <span className="ml-[10px] text-xs font-semibold">
                                                    <span>11:50</span>
                                                </span>
                                            </div>
                                            <span className="ml-[5px] hidden items-center group-hover:flex transition-opacity duration-300 ease-in-out">
                                                <span className="mx-[5px] cursor-pointer">
                                                    <MoreOutlined className="w-[15px] h-[15px] text-black" />
                                                </span>
                                                <span className="mx-[5px] cursor-pointer">
                                                    <IconlyStar size={15} color={'#000000'} />
                                                </span>
                                            </span>
                                        </div>
                                        <div className="group flex flex-row-reverse pl-[10px] mb-[10px] w-full">
                                            <div className="flex items-center bg-[#f8f9fa] rounded-md w-fit px-[12px] py-[7px]">
                                                <span className="text-sm font-medium">
                                                    <p className="mb-0">Ok phang đi sợ dit j</p>
                                                </span>
                                                <span className="ml-[10px] text-xs font-semibold">
                                                    <span>11:50</span>
                                                </span>
                                            </div>
                                            <span className="ml-[5px] hidden items-center group-hover:flex transition-opacity duration-300 ease-in-out">
                                                <span className="mx-[5px] cursor-pointer">
                                                    <MoreOutlined className="w-[15px] h-[15px] text-black" />
                                                </span>
                                                <span className="mx-[5px] cursor-pointer">
                                                    <IconlyStar size={15} color={'#000000'} />
                                                </span>
                                            </span>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                            {/* Left */}
                            <div className="flex gap-[10px] mb-[15px] px-[15px] w-full">
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
                                        <div className="group flex pr-[10px] mb-[10px] w-full">
                                            <div className="flex items-center bg-[#f8f9fa] rounded-md w-fit px-[12px] py-[7px]">
                                                <span className="text-sm font-medium">
                                                    <p className="mb-0">Ê, Trường?</p>
                                                </span>
                                                <span className="ml-[10px] text-xs font-semibold">
                                                    <span>11:49</span>
                                                </span>
                                            </div>
                                            <span className="ml-[5px] hidden items-center group-hover:flex transition-opacity duration-300 ease-in-out">
                                                <span className="mx-[5px] cursor-pointer">
                                                    <IconlyStar size={15} color={'#000000'} />
                                                </span>
                                                <span className="mx-[5px] cursor-pointer">
                                                    <RollbackOutlined className="w-[15px] h-[15px] text-black" />
                                                </span>
                                                <span className="mx-[5px] cursor-pointer">
                                                    <MoreOutlined className="w-[15px] h-[15px] text-black" />
                                                </span>
                                            </span>
                                        </div>
                                        <div className="group flex pr-[10px] mb-[10px] w-full">
                                            <div className="flex items-center bg-[#f8f9fa] rounded-md w-fit px-[12px] py-[7px]">
                                                <span className="text-sm font-medium">
                                                    <p className="mb-0">Vào OpenNezt không ?</p>
                                                </span>
                                                <span className="ml-[10px] text-xs font-semibold">
                                                    <span>11:49</span>
                                                </span>
                                            </div>
                                            <span className="ml-[5px] hidden items-center group-hover:flex transition-opacity duration-300 ease-in-out">
                                                <span className="mx-[5px] cursor-pointer">
                                                    <IconlyStar size={15} color={'#000000'} />
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
                            </div>
                            {/* Right*/}
                            <div className="flex justify-end gap-[10px] mb-[15px] px-[15px] w-full flex-row-reverse">
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
                                        <div className="group flex flex-row-reverse pl-[10px] mb-[10px] w-full">
                                            <div className="flex items-center bg-[#f8f9fa] rounded-md w-fit px-[12px] py-[7px]">
                                                <span className="text-sm font-medium">
                                                    <p className="mb-0">Omg bô</p>
                                                </span>
                                                <span className="ml-[10px] text-xs font-semibold">
                                                    <span>11:50</span>
                                                </span>
                                            </div>
                                            <span className="ml-[5px] hidden items-center group-hover:flex transition-opacity duration-300 ease-in-out">
                                                <span className="mx-[5px] cursor-pointer">
                                                    <MoreOutlined className="w-[15px] h-[15px] text-black" />
                                                </span>
                                                <span className="mx-[5px] cursor-pointer">
                                                    <IconlyStar size={15} color={'#000000'} />
                                                </span>
                                            </span>
                                        </div>
                                        <div className="group flex flex-row-reverse pl-[10px] mb-[10px] w-full">
                                            <div className="flex items-center bg-[#f8f9fa] rounded-md w-fit px-[12px] py-[7px]">
                                                <span className="text-sm font-medium">
                                                    <p className="mb-0">Ok phang đi sợ dit j</p>
                                                </span>
                                                <span className="ml-[10px] text-xs font-semibold">
                                                    <span>11:50</span>
                                                </span>
                                            </div>
                                            <span className="ml-[5px] hidden items-center group-hover:flex transition-opacity duration-300 ease-in-out">
                                                <span className="mx-[5px] cursor-pointer">
                                                    <MoreOutlined className="w-[15px] h-[15px] text-black" />
                                                </span>
                                                <span className="mx-[5px] cursor-pointer">
                                                    <IconlyStar size={15} color={'#000000'} />
                                                </span>
                                            </span>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                            {/* Left */}
                            <div className="flex gap-[10px] mb-[15px] px-[15px] w-full">
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
                                        <div className="group flex pr-[10px] mb-[10px] w-full">
                                            <div className="flex items-center bg-[#f8f9fa] rounded-md w-fit px-[12px] py-[7px]">
                                                <span className="text-sm font-medium">
                                                    <p className="mb-0">Ê, Trường?</p>
                                                </span>
                                                <span className="ml-[10px] text-xs font-semibold">
                                                    <span>11:49</span>
                                                </span>
                                            </div>
                                            <span className="ml-[5px] hidden items-center group-hover:flex transition-opacity duration-300 ease-in-out">
                                                <span className="mx-[5px] cursor-pointer">
                                                    <IconlyStar size={15} color={'#000000'} />
                                                </span>
                                                <span className="mx-[5px] cursor-pointer">
                                                    <RollbackOutlined className="w-[15px] h-[15px] text-black" />
                                                </span>
                                                <span className="mx-[5px] cursor-pointer">
                                                    <MoreOutlined className="w-[15px] h-[15px] text-black" />
                                                </span>
                                            </span>
                                        </div>
                                        <div className="group flex pr-[10px] mb-[10px] w-full">
                                            <div className="flex items-center bg-[#f8f9fa] rounded-md w-fit px-[12px] py-[7px]">
                                                <span className="text-sm font-medium">
                                                    <p className="mb-0">Vào OpenNezt không ?</p>
                                                </span>
                                                <span className="ml-[10px] text-xs font-semibold">
                                                    <span>11:49</span>
                                                </span>
                                            </div>
                                            <span className="ml-[5px] hidden items-center group-hover:flex transition-opacity duration-300 ease-in-out">
                                                <span className="mx-[5px] cursor-pointer">
                                                    <IconlyStar size={15} color={'#000000'} />
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
                            </div>
                            {/* Right*/}
                            <div className="flex justify-end gap-[10px] mb-[15px] px-[15px] w-full flex-row-reverse">
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
                                        <div className="group flex flex-row-reverse pl-[10px] mb-[10px] w-full">
                                            <div className="flex items-center bg-[#f8f9fa] rounded-md w-fit px-[12px] py-[7px]">
                                                <span className="text-sm font-medium">
                                                    <p className="mb-0">Omg bô</p>
                                                </span>
                                                <span className="ml-[10px] text-xs font-semibold">
                                                    <span>11:50</span>
                                                </span>
                                            </div>
                                            <span className="ml-[5px] hidden items-center group-hover:flex transition-opacity duration-300 ease-in-out">
                                                <span className="mx-[5px] cursor-pointer">
                                                    <MoreOutlined className="w-[15px] h-[15px] text-black" />
                                                </span>
                                                <span className="mx-[5px] cursor-pointer">
                                                    <IconlyStar size={15} color={'#000000'} />
                                                </span>
                                            </span>
                                        </div>
                                        <div className="group flex flex-row-reverse pl-[10px] mb-[10px] w-full">
                                            <div className="flex items-center bg-[#f8f9fa] rounded-md w-fit px-[12px] py-[7px]">
                                                <span className="text-sm font-medium">
                                                    <p className="mb-0">Ok phang đi sợ dit j</p>
                                                </span>
                                                <span className="ml-[10px] text-xs font-semibold">
                                                    <span>11:50</span>
                                                </span>
                                            </div>
                                            <span className="ml-[5px] hidden items-center group-hover:flex transition-opacity duration-300 ease-in-out">
                                                <span className="mx-[5px] cursor-pointer">
                                                    <MoreOutlined className="w-[15px] h-[15px] text-black" />
                                                </span>
                                                <span className="mx-[5px] cursor-pointer">
                                                    <IconlyStar size={15} color={'#000000'} />
                                                </span>
                                            </span>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                            {/* Left */}
                            <div className="flex gap-[10px] mb-[15px] px-[15px] w-full">
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
                                        <div className="group flex pr-[10px] mb-[10px] w-full">
                                            <div className="flex items-center bg-[#f8f9fa] rounded-md w-fit px-[12px] py-[7px]">
                                                <span className="text-sm font-medium">
                                                    <p className="mb-0">Ê, Trường?</p>
                                                </span>
                                                <span className="ml-[10px] text-xs font-semibold">
                                                    <span>11:49</span>
                                                </span>
                                            </div>
                                            <span className="ml-[5px] hidden items-center group-hover:flex transition-opacity duration-300 ease-in-out">
                                                <span className="mx-[5px] cursor-pointer">
                                                    <IconlyStar size={15} color={'#000000'} />
                                                </span>
                                                <span className="mx-[5px] cursor-pointer">
                                                    <RollbackOutlined className="w-[15px] h-[15px] text-black" />
                                                </span>
                                                <span className="mx-[5px] cursor-pointer">
                                                    <MoreOutlined className="w-[15px] h-[15px] text-black" />
                                                </span>
                                            </span>
                                        </div>
                                        <div className="group flex pr-[10px] mb-[10px] w-full">
                                            <div className="flex items-center bg-[#f8f9fa] rounded-md w-fit px-[12px] py-[7px]">
                                                <span className="text-sm font-medium">
                                                    <p className="mb-0">Vào OpenNezt không ?</p>
                                                </span>
                                                <span className="ml-[10px] text-xs font-semibold">
                                                    <span>11:49</span>
                                                </span>
                                            </div>
                                            <span className="ml-[5px] hidden items-center group-hover:flex transition-opacity duration-300 ease-in-out">
                                                <span className="mx-[5px] cursor-pointer">
                                                    <IconlyStar size={15} color={'#000000'} />
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
                            </div>
                            {/* Right*/}
                            <div className="flex justify-end gap-[10px] mb-[15px] px-[15px] w-full flex-row-reverse">
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
                                        <div className="group flex flex-row-reverse pl-[10px] mb-[10px] w-full">
                                            <div className="flex items-center bg-[#f8f9fa] rounded-md w-fit px-[12px] py-[7px]">
                                                <span className="text-sm font-medium">
                                                    <p className="mb-0">Omg bô</p>
                                                </span>
                                                <span className="ml-[10px] text-xs font-semibold">
                                                    <span>11:50</span>
                                                </span>
                                            </div>
                                            <span className="ml-[5px] hidden items-center group-hover:flex transition-opacity duration-300 ease-in-out">
                                                <span className="mx-[5px] cursor-pointer">
                                                    <MoreOutlined className="w-[15px] h-[15px] text-black" />
                                                </span>
                                                <span className="mx-[5px] cursor-pointer">
                                                    <IconlyStar size={15} color={'#000000'} />
                                                </span>
                                            </span>
                                        </div>
                                        <div className="group flex flex-row-reverse pl-[10px] mb-[10px] w-full">
                                            <div className="flex items-center bg-[#f8f9fa] rounded-md w-fit px-[12px] py-[7px]">
                                                <span className="text-sm font-medium">
                                                    <p className="mb-0">Ok phang đi sợ dit j</p>
                                                </span>
                                                <span className="ml-[10px] text-xs font-semibold">
                                                    <span>11:50</span>
                                                </span>
                                            </div>
                                            <span className="ml-[5px] hidden items-center group-hover:flex transition-opacity duration-300 ease-in-out">
                                                <span className="mx-[5px] cursor-pointer">
                                                    <MoreOutlined className="w-[15px] h-[15px] text-black" />
                                                </span>
                                                <span className="mx-[5px] cursor-pointer">
                                                    <IconlyStar size={15} color={'#000000'} />
                                                </span>
                                            </span>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* inbox */}
                    <div className="flex items-center border-t border-gray-200 w-full bg-[#ffffff]">
                        <div className="flex justify-center items-center w-[50px] h-[40px] my-1">
                            <LinkOutlined className="text-xl w-[30px] h-[30px]" />
                        </div>
                        <div className="py-[12px] w-full">
                            <input
                                type="text"
                                placeholder="Write your message"
                                className="w-full outline-none"
                            />
                        </div>
                        <div className="min-w-[40px] mx-[10px] my-1 h-[40px] flex justify-center rounded-md bg-[#2f65b9] items-center ">
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
