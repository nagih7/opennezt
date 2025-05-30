import { Avatar } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IoMdArrowDropdown } from 'react-icons/io'
import { RiArrowRightSFill } from 'react-icons/ri'
import { FaCheck } from 'react-icons/fa6'

const ProjectOverview: React.FC = () => {
   const additionalInfos = [
      {
         name: 'problem statement',
         content:
            'EcoTech Innovations aims to tackle the inefficiency in energy consumption and the high carbon footprint of small to medium-sized enterprises (SMEs). Many businesses lack the tools and knowledge to monitor and reduce their environmental impact effectively.',
      },
      {
         name: 'solution',
         content:
            'We are developing an advanced energy management platform that leverages IoT and AI to provide real-time insights and recommendations for optimizing energy use. This includes automated energy auditing, predictive maintenance for equipment, and personalized sustainability strategies.',
      },
      {
         name: 'product/service description',
         content:
            'Our platform features real-time energy consumption monitoring, predictive maintenance alerts, automated sustainability reports, and actionable recommendations to reduce carbon footprint and energy costs. By integrating IoT sensors with AI analytics, we empower businesses to make data-driven decisions for a greener future.',
      },
      { name: 'incorporation status', content: 'Incorporated' },
   ]

   const mockRequirements = ['technical_skills', 'business_expertise', 'marketing_knowledge'] as const

   const requirementItems: Record<string, string[]> = {
      technical_skills: ['React/Next.js development', 'AI integration experience', 'IoT system architecture'],
      business_expertise: ['Startup scaling experience', 'Financial modeling', 'Investment pitch preparation'],
      marketing_knowledge: ['B2B SaaS marketing', 'Content strategy', 'Analytics and user tracking'],
   }

   const teamMembers = [
      { name: 'Giang Nguyen', role: 'CEO', team_role: 'Product', avatar: 'https://i.pravatar.cc/300?img=1' },
      { name: 'Daniel Smith', role: 'CTO', team_role: 'Tech', avatar: 'https://i.pravatar.cc/300?img=2' },
      { name: 'Tam Le', role: 'CMO', team_role: 'Marketing', avatar: 'https://i.pravatar.cc/300?img=3' },
   ]

   const [openExpertiseRequest, setOpenExpertiseRequest] = useState<Record<string, boolean>>({})

   const toUpper = (text: string | undefined) => text?.toUpperCase()

   const checkedItems = { basic: true }

   return (
      <div className="pt-8">
         <div>
            <div className="bg-[#ffffff] rounded-md">
               <div className="p-4 2xl:p-6 border-b">
                  <span className="text-lg 2xl:text-xl font-semibold">Startup Overview</span>
               </div>
               <div className="p-4 2xl:p-6">
                  <ul className="pl-0 mb-0">
                     {additionalInfos.map((item, index) => (
                        <li key={index} className="mb-3 2xl:mb-4">
                           <span className="text-sm 2xl:text-base text-[#6f7f92] font-semibold">
                              {toUpper(item.name)}
                           </span>
                           <p className="text-xs 2xl:text-sm">{item.content}</p>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         </div>
         {/* Expertise Request section */}{' '}
         <div className="mt-6 2xl:mt-8">
            <div className="bg-[#ffffff] rounded-md">
               <div className="p-4 2xl:p-6 border-b">
                  <span className="text-lg 2xl:text-xl font-semibold">Expertise Request</span>
               </div>
               <div className="p-4 2xl:p-6">
                  <ul className="pl-0 mb-0 space-y-3 2xl:space-y-4">
                     {mockRequirements.map((item, index) => (
                        <li key={index} className="flex flex-col">
                           <div
                              onClick={() =>
                                 setOpenExpertiseRequest(
                                    openExpertiseRequest[item]
                                       ? { ...openExpertiseRequest, [item]: false }
                                       : { ...openExpertiseRequest, [item]: true }
                                 )
                              }
                              className="flex items-center gap-2 cursor-pointer"
                           >
                              <div
                                 className={`transition-transform duration-300 ${openExpertiseRequest[item] ? 'rotate-180' : 'rotate-0'
                                    }`}
                              >
                                 {openExpertiseRequest[item] ? (
                                    <IoMdArrowDropdown className="w-6 h-6 2xl:w-8 2xl:h-8 text-[#6f7f92]" />
                                 ) : (
                                    <RiArrowRightSFill className="w-6 h-6 2xl:w-8 2xl:h-8 text-[#6f7f92]" />
                                 )}
                              </div>
                              <span className="text-sm 2xl:text-base text-[#6f7f92] font-semibold">
                                 {toUpper(item)?.replace(/_/g, ' ')}
                              </span>
                           </div>{' '}
                           <div
                              className={`mt-3 bg-[#ffffff] p-0 m-0 overflow-y-scroll w-full overflow-hidden transition-all duration-500 ease-in-out ${openExpertiseRequest[item] ? 'max-h-[200px]' : 'max-h-0'
                                 }`}
                           >
                              <div className="px-[12px] 2xl:px-[16px]">
                                 <div className="px-[12px] 2xl:px-[16px]">
                                    <ul className="flex flex-col items-center pl-0 mb-0 cursor-pointer">
                                       {requirementItems[item]?.map((subItem: string, subIndex: number) => (
                                          <li
                                             key={subIndex}
                                             className="flex items-center justify-between w-full text-xs 2xl:text-sm py-[12px] 2xl:py-[16px] border-b-[1px] border-gray-200"
                                          >
                                             {subItem}
                                             {checkedItems['basic'] && (
                                                <FaCheck className="text-[#4374c0]" />
                                             )}
                                          </li>
                                       ))}
                                    </ul>
                                 </div>
                              </div>
                           </div>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         </div>
         {/* Media section */}{' '}
         <div className="mt-6 2xl:mt-8">
            <div className="bg-[#ffffff] rounded-md">
               <div className="p-4 2xl:p-6 border-b">
                  <span className="text-lg 2xl:text-xl font-semibold">Media</span>
               </div>
               <div className="p-4 2xl:p-6">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 pl-0 mb-0 gap-3 2xl:gap-4">
                     <li className="flex flex-col gap-2">
                        <span className="text-sm 2xl:text-base text-[#6f7f92] font-semibold">
                           PRODUCT DEMO VIDEO
                        </span>
                        <a
                           href="#"
                           className="no-underline text-blue-600 hover:underline text-xs 2xl:text-sm"
                        >
                           Watch Demo
                        </a>
                     </li>
                     <li className="flex flex-col gap-2">
                        <span className="text-sm 2xl:text-base text-[#6f7f92] font-semibold">
                           TEAM INTRODUCTION VIDEO
                        </span>
                        <a
                           href="#"
                           className="no-underline text-blue-600 hover:underline text-xs 2xl:text-sm"
                        >
                           Meet the Team
                        </a>
                     </li>
                     <li className="flex flex-col gap-2">
                        <span className="text-sm 2xl:text-base text-[#6f7f92] font-semibold">
                           PITCH DECK
                        </span>
                        <a
                           href="#"
                           className="no-underline text-blue-600 hover:underline text-xs 2xl:text-sm"
                        >
                           Pitch Deck
                        </a>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
         {/* Team Information section */}{' '}
         <div className="mt-6 2xl:mt-8">
            <div className="bg-[#ffffff] rounded-md">
               <div className="p-4 2xl:p-6 border-b">
                  <span className="text-lg 2xl:text-xl font-semibold">Team Information</span>
               </div>
               <div className="p-4 2xl:p-6">
                  <div>
                     <span className="text-sm 2xl:text-base font-semibold">Founding Team</span>
                     <div className="flex justify-center mt-4 2xl:mt-6">
                        <div className="flex flex-wrap items-center justify-center gap-6 2xl:gap-8">
                           {teamMembers.map((member, index) => (
                              <div key={index} className="relative flex flex-col items-center">
                                 <Avatar.Root className="w-[80px] h-[80px] 2xl:w-[100px] 2xl:h-[100px] bg-center object-cover">
                                    <Avatar.Fallback name={member.name} />
                                    <Avatar.Image src={member.avatar} />
                                 </Avatar.Root>
                                 <span className="absolute bottom-[15px] 2xl:bottom-[20px] text-xs font-semibold py-1 px-2 bg-[#ffffff] rounded-full text-center border">
                                    {member.role}/{member.team_role}
                                 </span>
                                 <span className="mt-3 text-xs 2xl:text-sm">{member.name}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ProjectOverview
