import React from 'react'
import { IconlyTimeCircle, IconlyArrowRight } from 'components/UI/Iconly'
import { ArrowsAltOutlined } from '@ant-design/icons'
import default_logo from '../../../../../assets/images/logo/opennezt_full_black_old.png'
import style from '../../style.module.scss'

interface InterviewCardProps {
   title: string
   description: string
   time: string
   color: string
   projectImage?: string | null
   projectBackground?: string | null
   onClickViewProject: () => void
   onClickInterview: () => void
}

export const InterviewCard: React.FC<InterviewCardProps> = ({
   title,
   description,
   time,
   color,
   projectImage,
   projectBackground,
   onClickViewProject,
   onClickInterview,
}) => {
   const gradientClass = style[`Gradient${color.charAt(0).toUpperCase() + color.slice(1)}`]

   const isValidBackground =
      projectBackground && projectBackground !== 'null' && !projectBackground.includes('static/null')

   const backgroundStyle = isValidBackground
      ? { backgroundImage: `url(${projectBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }
      : {}

   return (
      <div className="group flex flex-col border-[2px] hover:border-[#2f65b9] h-[290px] 2xl:h-[310px] rounded-xl transition-all duration-500 ease-in-out">
         <div
            className={`relative ${
               isValidBackground ? '' : gradientClass
            } m-1 rounded-xl justify-center flex items-center`}
            style={backgroundStyle}
            onClick={onClickViewProject}
         >
            <div className="bg-[#ffffff] transition-all duration-500 ease-in-out rounded-full p-[2px] my-[30px] group-hover:my-[10px]">
               <img
                  src={projectImage || default_logo}
                  alt="logo"
                  className="2xl:w-[80px] 2xl:h-[80px] w-[70px] h-[70px] border object-cover rounded-full"
               />
            </div>
            <div className="group-hover:block transition-all duration-700 ease-in-out hidden absolute right-0 top-0 bg-[#ffffff] rounded-lg m-[10px] cursor-pointer">
               <span className="p-2">Share</span>
               <ArrowsAltOutlined className="border-l p-2" />
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
            <div
               className="group-hover:flex hidden transition-all duration-500 ease-in-out 2xl:text-base 2xl:font-bold text-sm mt-2 text-[#2f65b9] items-center font-semibold cursor-pointer"
               onClick={onClickInterview}
            >
               <span className="mb-1">Start interview</span>
               <IconlyArrowRight color={'#2f65b9'} size={25} />
            </div>
         </div>
      </div>
   )
}
