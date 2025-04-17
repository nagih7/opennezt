import React from 'react'
import { IconlyBookmark, IconlyHeart, IconlyShow } from 'components/UI/Iconly'
import { Avatar, Button } from '@chakra-ui/react'

const TalentBox = ({ talent }) => {
    // ========== RENDER COMPONENT ========== //
    return (
        <>
            <div className="relative">
                <div className="relative group">
                    <Avatar.Root className="xl:w-[280px] xl:h-[280px] lg:w-[220px] lg:h-[220px] h-[250px] w-[250px] rounded-md" shape="square">
                        <Avatar.Fallback name={talent.user.name} />
                        <Avatar.Image src={talent.user.avatar} />
                    </Avatar.Root>
                    <div
                        className="absolute top-[15px] right-[15px] fade-element"
                        style={{
                            opacity: 0, // Mặc định opacity là 0
                            transition: 'opacity 0.7s ease-in-out',
                        }}
                    >
                        <ul className="flex flex-col gap-2 pl-0 m-0">
                            <li className="h-10 w-10 bg-[#ffffff] rounded-md flex justify-center items-center">
                                <IconlyShow size={20} color={'#2f65b9'} />
                            </li>
                            <li className="h-10 w-10 bg-[#ffffff] rounded-md flex justify-center items-center">
                                <IconlyHeart size={20} color={'#2f65b9'} />
                            </li>
                            <li className="h-10 w-10 bg-[#ffffff] rounded-md flex justify-center items-center">
                                <IconlyBookmark size={20} color={'#2f65b9'} />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="md:absolute bottom-[-40px] group-hover:bottom-[-21px] group-hover:translate-x-0 translate-x-full transition-all duration-700 ease-in-out left-0 xl:w-[280px] lg:w-[220px] w-[250px]  p-[16px] bg-[#f6f4f4] flex flex-col justify-center items-center gap-2">
                <div className="font-semibold text-black no-underline">{talent.user.name}</div>
                {/* <div className="text-[#6f7f92] text-sm font-medium">
                                    <span>$18.00 </span>-<span> $45.00</span>
                                </div> */}
                <div
                    className="mt-[16px] fade-element"
                    style={{
                        opacity: 0, // Mặc định opacity là 0
                        transition: 'opacity 0.3s ease-in-out',
                    }}
                >
                    <Button className="no-underline text-white font-semibold text-xs bg-[#2f65b9] px-[24px] py-[12px] rounded-md">
                        VIEW DETAILS
                    </Button>
                </div>
            </div>
        </>
    )
}

export default TalentBox
