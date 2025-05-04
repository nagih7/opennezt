import React from 'react'
import { IconlyTimeCircle, IconlyArrowRight } from 'components/UI/Iconly'
import { ArrowsAltOutlined } from '@ant-design/icons'
import logo_img from '../../../../../assets/images/logo/opennezt_full_black_old.png'
import style from '../../style.module.scss'

export const InterviewCard = ({ title, description, time, color }) => {
    const gradientClass = style[`Gradient${color.charAt(0).toUpperCase() + color.slice(1)}`] // Dynamically choose the color gradient

    return (
        <div className="group flex flex-col border-[2px] hover:border-[#2f65b9] h-[290px] 2xl:h-[310px] rounded-xl transition-all duration-500 ease-in-out">
            <div className={`relative ${gradientClass} m-1 rounded-xl justify-center flex items-center`}>
                <div className="bg-[#ffffff] transition-all duration-500 ease-in-out rounded-full p-[2px] my-[30px] group-hover:my-[10px]">
                    <img
                        src={logo_img}
                        alt="logo"
                        className="2xl:w-[80px] 2xl:h-[80px] w-[70px] h-[70px] border object-cover rounded-full"
                    />
                </div>
                <div className="group-hover:block transition-all duration-700 ease-in-out hidden absolute right-0 top-0 bg-[#ffffff] rounded-lg m-[10px] cursor-pointer">
                    <span className='p-2'>Share</span>
                    <ArrowsAltOutlined className='border-l p-2'/>
                </div>
            </div>
            <div className="p-[10px] bg-[#ffffff] rounded-xl">
                <div className="flex flex-col justify-start">
                    <span className="text-lg font-bold">{title}</span>
                    <p className="text-sm text-[#6f7f92]">{description}</p>
                    <div className="flex items-center w-fit gap-1 border rounded-lg p-[5px]">
                        <IconlyTimeCircle color={'#6f7f92'} size={20} />
                        <span className="text-sm">{time}</span>
                    </div>
                </div>
                <div className="group-hover:flex hidden transition-all duration-500 ease-in-out 2xl:text-base 2xl:font-bold text-sm mt-2 text-[#2f65b9] items-center font-semibold cursor-pointer">
                    <span className='mb-1'>Start interview</span>
                    <IconlyArrowRight color={'#2f65b9'} size={25}/>
                </div>
            </div>
        </div>
    )
}
