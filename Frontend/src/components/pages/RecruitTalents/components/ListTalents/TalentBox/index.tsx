import React from 'react'
import { IconlyBookmark, IconlyHeart, IconlyShow } from 'components/UI/Iconly'
import { Avatar, Button } from '@chakra-ui/react'
import { TalentBoxProps } from '../../../types'

const TalentBox: React.FC<TalentBoxProps> = ({ talent, handleViewTalentDetails }) => {
    return (
        <>
            <div className="relative">
                <div className="relative group">
                    <Avatar.Root
                        onClick={() => handleViewTalentDetails(talent.user)}
                        className="w-[280px] h-[280px] rounded-md"
                        shape="square"
                    >
                        <Avatar.Fallback name={talent.user.name} />
                        <Avatar.Image src={talent.user.avatar} />
                    </Avatar.Root>
                    <div
                        className="absolute top-[15px] right-[15px] fade-element"
                        style={{
                            opacity: 0,
                            transition: 'opacity 0.7s ease-in-out',
                        }}
                    >
                        <ul className="flex flex-col gap-2 pl-0 m-0">
                            <li className="h-10 w-10 bg-[#ffffff] rounded-md flex justify-center items-center">
                                <IconlyShow size={20} color={'#2f65b9'}/>
                            </li>
                            <li className="h-10 w-10 bg-[#ffffff] rounded-md flex justify-center items-center">
                                <IconlyHeart size={20} color={'#2f65b9'} backgroundColor={'transparent'} />
                            </li>
                            <li className="h-10 w-10 bg-[#ffffff] rounded-md flex justify-center items-center">
                                <IconlyBookmark size={20} color={'#2f65b9'} backgroundColor={'transparent'} />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="absolute bottom-[-130px] group-hover:bottom-[-90px]  translate-x-full transition-all duration-700 ease-in-out left-[-280px] w-[280px] p-[16px] bg-[#f6f4f4] flex flex-col justify-center items-center gap-2">
                    <div className="font-semibold text-black no-underline">{talent.user.name}</div>

                    <div
                        className="mt-[16px] fade-element"
                        style={{
                            opacity: 0,
                            transition: 'opacity 0.3s ease-in-out',
                        }}
                    >
                        <Button
                            onClick={() => handleViewTalentDetails(talent.user)}
                            className="no-underline text-white font-semibold text-xs bg-[#2f65b9] px-[24px] py-[12px] rounded-md"
                        >
                            VIEW DETAILS
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TalentBox 