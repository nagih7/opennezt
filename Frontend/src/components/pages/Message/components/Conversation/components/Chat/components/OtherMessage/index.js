import { Avatar } from '@chakra-ui/react'
import { RollbackOutlined, MoreOutlined } from '@ant-design/icons'
import { IconlyStar } from 'components/UI/Iconly'
import moment from 'moment'
import React from 'react'
import formatMessage from 'utils/formatMessage'

const OtherMessage = ({ message, newUser }) => {
    return (
        <div className="flex flex-row-reverse w-full">
            <div className="flex flex-col items-start w-[30%]" />
            <div className="flex flex-row items-center w-[70%] ">
                {(() => {
                    switch (newUser) {
                        case true:
                            return (
                                <div className="flex flex-col items-start w-full mt-4">
                                    <div className="flex items-center w-full gap-2 mb-1">
                                        <div className="w-[35px]" />
                                        <span className="flex text-[12px] font-md ml-2">{message.user?.name}</span>
                                    </div>
                                    <div className="flex items-center w-full gap-2">
                                        <div className="w-[35px] h-[35px]">
                                            <Avatar.Root size={'md'} className="w-[35px] h-[35px] rounded-full">
                                                <Avatar.Fallback name={message.user?.name} />
                                                <Avatar.Image src={message.user?.avatar} />
                                            </Avatar.Root>
                                        </div>
                                        <div className="flex flex-col items-start flex-1 w-full">
                                            <div className="w-full pl-0 mb-0">
                                                <div className="group flex pr-[10px] w-full">
                                                    <div className="flex items-center bg-[#f8f9fa] rounded-md w-fit px-[12px] py-[7px] gap-4">
                                                        <span className="text-sm font-medium">
                                                            <p className="mb-0">{formatMessage(message?.content)}</p>
                                                        </span>
                                                        <span className="ml-[10px] text-[10px] font-semibold">
                                                            <span>{moment(message?.timestamp).format('HH:mm')}</span>
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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        default:
                            return (
                                <div className="flex items-center w-full gap-2">
                                    <div className="w-[35px] h-[35px]"></div>
                                    <div className="flex flex-col items-start flex-1 w-full">
                                        <div className="w-full pl-0 mb-0">
                                            <div className="group flex pr-[10px] w-full">
                                                <div className="flex items-center bg-[#f8f9fa] rounded-md w-fit px-[12px] py-[7px] gap-4">
                                                    <span className="text-sm font-medium">
                                                        <p className="mb-0">{message?.content}</p>
                                                    </span>
                                                    <span className="ml-[10px] text-[10px] font-semibold">
                                                        <span>{moment(message?.timestamp).format('HH:mm')}</span>
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
                                        </div>
                                    </div>
                                </div>
                            )
                    }
                })()}
            </div>
        </div>
    )
}

export default OtherMessage
