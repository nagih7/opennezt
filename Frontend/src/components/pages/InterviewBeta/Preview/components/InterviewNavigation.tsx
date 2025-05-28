import { IconlyUpload } from 'components/UI/Iconly'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo_opennezt_img from 'assets/images/logo/opennezt_full_black_old.png'

const InterviewNavigation: React.FC = () => {
   const navigate = useNavigate()

   return (
      <div className="flex items-center justify-between ">
         <img
            src={logo_opennezt_img}
            className="2xl:w-[300px] w-[220px] h-full cursor-pointer"
            onClick={() => navigate('/')}
         />
         <div className="flex items-center gap-2">
            <div className="flex items-center font-semibold gap-1 border bg-[#ffffff] rounded-full cursor-pointer py-[5px] px-3">
               <IconlyUpload size={18} color={'#000000'} />
               Share
            </div>
            <div
               className=" font-semibold border bg-[#ffffff] rounded-full cursor-pointer py-[5px] px-3"
               onClick={() => navigate('/')}
            >
               Go to dashboard
            </div>
            \\
         </div>
      </div>
   )
}

export default InterviewNavigation
