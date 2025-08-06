import React from 'react'
import { Link } from 'react-router-dom'
import StepHeader from '../StepHeader'

const Invites: React.FC = () => {
   return (
      <div className="w-full h-full">
         <div className="px-[16px] ">
            <div>
               <div className="mt-8 bg-[#ffffff] rounded-md">
                  <StepHeader />
               </div>
               <div className="mt-8 bg-[#ffffff] rounded-md p-8">
                  <div className="flex flex-col w-full">
                     <div className="flex w-full">
                        <div className="w-3/12 pr-[16px]">
                           <div className="p-[20px] mb-[10px] bg-[#f8f9fa] rounded-md">
                              <ul className="mb-0 pl-0 flex text-[#6f7f92] flex-col items-center w-full max-h-[300px] overflow-y-scroll scrollbar-hide">
                                 {Array.from({ length: 15 }).map((_, idx) => (
                                    <li className="mb-[16px]" key={idx}>
                                       <label className="flex items-center">
                                          <input type="checkbox" className="w-5 h-5 mr-[10px]" />
                                          Vuong Manh Nghia
                                       </label>
                                    </li>
                                 ))}
                              </ul>
                           </div>
                        </div>
                        <div className="w-9/12 pl-[16px]">
                           <div>
                              <p className="border-l-2 border-[#0099cc] font-medium text-sm text-[#0099cc] rounded-r-md bg-[#e3f1f6] p-[15px]">
                                 Select people to invite from your friends list.
                              </p>
                           </div>
                        </div>
                     </div>
                     <div className="flex justify-end">
                        <div className="">
                           <Link to="/project/cover-image" className="mt-[14px]">
                              <button
                                 height={50}
                                 className="mt-[14px] px-[28px] py-3 text-sm bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
                              >
                                 BACK TO PREVIOUS STEP
                              </button>
                           </Link>
                           <Link to="" className="mt-[14px] ml-[14px]">
                              <button
                                 height={50}
                                 className="mt-[14px] px-[28px] py-3 text-sm bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
                              >
                                 FINISH
                              </button>
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Invites
