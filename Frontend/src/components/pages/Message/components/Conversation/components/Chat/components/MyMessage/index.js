import { Avatar } from '@chakra-ui/react'
import { MoreOutlined } from '@ant-design/icons'
import { IconlyStar } from 'components/UI/Iconly'
import moment from 'moment'
import React from 'react'
import formatMessage from 'utils/formatMessage'

const MyMessage = ({ message, haveAvatar }) => {
    return (
        <div className="flex w-full">
            <div className="flex flex-col items-start w-[30%] mb-[5px]" />
            <div className="flex w-[70%] mb-[5px] flex-row-reverse gap-2">
                <div className="w-[35px] h-[35px]">
                    {haveAvatar && (
                        <Avatar.Root size={'md'} className="w-[35px] h-[35px] rounded-full">
                            <Avatar.Fallback name={message.user?.name} />
                            <Avatar.Image src={message.user?.avatar} />
                        </Avatar.Root>
                    )}
                </div>
                <div className="flex flex-col items-start flex-1 w-full">
                    <div className="group flex flex-row-reverse pl-[10px] w-full">
                        <div className="flex items-center bg-[#2f65b9] rounded-md w-fit px-[12px] py-[7px] text-[#ffffff]">
                            <span className="text-sm font-medium ">
                                <p className="mb-0">{formatMessage(message?.content)}</p>
                            </span>
                            <span className="ml-[10px] text-[10px] font-semibold">
                                <span>{moment(message?.timestamp).format('HH:mm')}</span>
                            </span>
                        </div>
                        {/* <span className="ml-[5px] hidden items-center group-hover:flex transition-opacity duration-300 ease-in-out">
                            <span className="mx-[5px] cursor-pointer">
                                <MoreOutlined className="w-[15px] h-[15px] text-black" />
                            </span>
                            <span className="mx-[5px] cursor-pointer">
                                <IconlyStar size={15} color={'#000000'} />
                            </span>
                        </span> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyMessage
