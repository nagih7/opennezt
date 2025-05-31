import { FaCheck } from 'react-icons/fa6'
import { IconlyEditSquare, IconlyStar } from '../../../UI/Iconly'
import React, { useState } from 'react'
import { IoMdArrowDropdown } from 'react-icons/io'
import { RiArrowRightSFill } from 'react-icons/ri'
import { Dialog, Portal } from '@chakra-ui/react'
import {
   EditAdditional,
   EditBackground,
   EditCertification,
   EditEducation,
   EditExpertise,
} from '~/components/pages/EditProfile/components/EditForms'
import {
   ActiveFormType,
   Certification,
   Education,
   GroupedSkills,
   Industry,
   OpenExpertiseRequest,
   Profile,
   ProfileAdditionalInfo,
   Skill,
} from '~/types'

interface ProfileDetailsProps {
   profile: Profile | null
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ profile }) => {
   const formatDate = (dateString?: string): string => {
      if (!dateString) return 'N/A'
      const date = new Date(dateString)
      return `${date.getMonth() + 1}/${date.getFullYear()}`
   }

   const groupedSkills: GroupedSkills | null =
      profile?.skills?.reduce((acc: GroupedSkills, skill: Skill) => {
         const key = skill.category.name
         if (!acc[key]) {
            acc[key] = {
               category: skill.category,
               skills: [],
            }
         }
         acc[key].skills.push(skill)
         return acc
      }, {} as GroupedSkills) || null

   const result = groupedSkills ? Object.values(groupedSkills) : []

   const [openExpertiseRequest, setOpenExpertiseRequest] = useState<OpenExpertiseRequest>({})
   const [activeForm, setActiveForm] = useState<ActiveFormType>('')

   const closeForm = (): void => {
      setActiveForm('')
   }

   return (
      <div className="w-full lg:w-10/12">
         <div className="bg-[#ffffff] rounded-md">
            <div className="flex items-center justify-between border-b-[1px] border-[#f4f5f6] p-8">
               <h5 className="mb-0">Professional Background</h5>
               <span
                  onClick={() => setActiveForm('professionalBackground')}
                  className="bg-[#4374c0] w-7 h-7 flex items-center justify-center rounded-md cursor-pointer"
               >
                  <IconlyEditSquare size={20} color={'#ffffff'} />
               </span>
            </div>
            <div className="p-8">
               <ul className="grid grid-cols-2 p-0 mb-0 mx-[-16px] text-[#6f7f92]">
                  <li className="px-[16px] mb-10">
                     <div className="mb-2 text-sm font-medium">INDUSTRY</div>
                     <div>
                        <p className="mb-2 text-base font-medium text-black line-clamp-3">
                           {profile?.industries?.map((industry: Industry) => industry.name).join(', ') || 'N/A'}
                        </p>
                     </div>
                  </li>
                  <li className="px-[16px] mb-10">
                     <div className="mb-2 text-sm font-medium">EXPERIENCE LEVEL</div>
                     <div>
                        <p className="mb-2 text-base font-medium text-black">
                           {profile?.experience_level?.name || 'N/A'}
                        </p>
                     </div>
                  </li>
               </ul>
            </div>
         </div>
         <div className="bg-[#ffffff] rounded-md mt-8">
            <div className="flex items-center justify-between border-b-[1px] border-[#f4f5f6] p-8">
               <h5 className="mb-0">Education</h5>
               <span
                  onClick={() => setActiveForm('education')}
                  className="bg-[#4374c0] w-7 h-7 flex items-center justify-center rounded-md cursor-pointer"
               >
                  <IconlyEditSquare size={20} color={'#ffffff'} />
               </span>
            </div>{' '}
            <div className="p-8">
               {profile?.educations && profile.educations.length > 0 ? (
                  profile.educations.map((education: Education, index: number) => (
                     <div
                        key={education._id || index}
                        className={`${index > 0 ? 'pt-4' : ''} ${
                           index < (profile.educations?.length || 0) - 1 ? 'border-b' : ''
                        } flex gap-3 pb-4`}
                     >
                        <img className="w-[70px] h-[70px] object-contain" src="/opennezt.png" />
                        <div className="flex flex-col gap-1 ">
                           <span className="text-base font-semibold">{education.school || 'N/A'}</span>

                           <span className="text-sm font-medium text-gray-600">
                              {education.degree || 'N/A'} - {education.field_of_study || 'N/A'}
                           </span>
                           <span className="text-sm font-medium text-gray-600">Grade: {education.grade || 'N/A'}</span>
                           <span className="text-sm font-medium text-gray-600">
                              {formatDate(education.start_date)} - {formatDate(education.end_date)}
                           </span>
                           <span className="text-sm font-medium text-gray-600">{education.activities || 'N/A'}</span>
                        </div>
                     </div>
                  ))
               ) : (
                  <p className="text-gray-500">No education information available.</p>
               )}
            </div>
         </div>
         <div className="bg-[#ffffff] rounded-md mt-8">
            <div className="flex items-center justify-between border-b-[1px] border-[#f4f5f6] p-8">
               <h5 className="mb-0">Certification</h5>
               <span
                  onClick={() => setActiveForm('certification')}
                  className="bg-[#4374c0] w-7 h-7 flex items-center justify-center rounded-md cursor-pointer"
               >
                  <IconlyEditSquare size={20} color={'#ffffff'} />
               </span>
            </div>{' '}
            <div className="p-8">
               {profile?.certifications && profile.certifications.length > 0 ? (
                  profile.certifications.map((certification: Certification, index: number) => (
                     <div
                        key={certification._id || index}
                        className={`${index > 0 ? 'pt-4' : ''} ${
                           index < (profile.certifications?.length || 0) - 1 ? 'border-b' : ''
                        } relative flex w-full justify-between items-center pb-4`}
                     >
                        <div className="flex gap-3">
                           <img className="w-[70px] h-[70px] object-contain" src="/opennezt.png" />
                           <div className="flex flex-col gap-1">
                              <span className="text-sm font-semibold">{certification.name || 'N/A'}</span>
                              <span className="text-sm font-medium text-gray-600">
                                 {certification.organization_name || 'N/A'}
                              </span>
                              <span className="text-sm font-medium text-gray-600">
                                 {formatDate(certification.issue_date)} - {formatDate(certification.expiration_date)}
                              </span>
                           </div>
                        </div>
                        <span className="mt-2 font-medium">
                           {certification.verification_url ? (
                              <a
                                 href={certification.verification_url}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="flex items-center gap-1 bg-[#4374c0] w-36 justify-center py-2 text-xs rounded-md text-[#ffffff] no-underline"
                              >
                                 <IconlyStar size={16} color={'#ffffff'} />
                                 verification
                              </a>
                           ) : (
                              'N/A'
                           )}
                        </span>
                     </div>
                  ))
               ) : (
                  <p className="text-gray-500">No certification information available.</p>
               )}
            </div>
         </div>
         <div className="bg-[#ffffff] rounded-md mt-8">
            <div className="flex items-center justify-between border-b-[1px] border-[#f4f5f6] p-8">
               <h5 className="mb-0">Expertise</h5>
               <span
                  onClick={() => setActiveForm('expertise')}
                  className="bg-[#4374c0] w-7 h-7 flex items-center justify-center rounded-md cursor-pointer"
               >
                  <IconlyEditSquare size={20} color={'#ffffff'} />
               </span>
            </div>
            <div className="p-8">
               {result?.length > 0 ? (
                  <ul className="pl-0 mb-0 space-y-4">
                     {result.map((item, index) => (
                        <li key={index} className="flex flex-col">
                           <div
                              onClick={() =>
                                 setOpenExpertiseRequest(
                                    openExpertiseRequest[item.category.name]
                                       ? { ...openExpertiseRequest, [item.category.name]: false }
                                       : { ...openExpertiseRequest, [item.category.name]: true }
                                 )
                              }
                              className="flex items-center gap-2 cursor-pointer"
                           >
                              <div
                                 className={`transition-transform duration-300 ${
                                    openExpertiseRequest[item.category.name] ? 'rotate-180' : 'rotate-0'
                                 }`}
                              >
                                 {openExpertiseRequest[item.category.name] ? (
                                    <IoMdArrowDropdown className="w-10 h-10 text-[#6f7f92]" />
                                 ) : (
                                    <RiArrowRightSFill className="w-10 h-10 text-[#6f7f92]" />
                                 )}
                              </div>
                              <span className="text-lg text-[#6f7f92] font-semibold">
                                 {item.category.name.toUpperCase()}
                              </span>
                           </div>
                           <div
                              className={`mt-3 bg-[#ffffff] p-0 m-0 overflow-y-scroll w-full overflow-hidden transition-all duration-500 ease-in-out ${
                                 openExpertiseRequest[item.category.name] ? 'max-h-[200px]' : 'max-h-0'
                              }`}
                           >
                              <div className="px-[24px]">
                                 <div className="px-[24px]">
                                    {' '}
                                    <ul className="flex flex-col items-center pl-0 mb-0 cursor-pointer">
                                       {item.skills.map((skill) => (
                                          <li
                                             key={skill._id}
                                             className="flex items-center justify-between w-full text-sm py-[21px] border-b-[1px] border-gray-200"
                                          >
                                             {skill.name}
                                             <FaCheck className="text-[#4374c0]" />
                                          </li>
                                       ))}
                                    </ul>
                                 </div>
                              </div>
                           </div>
                        </li>
                     ))}
                  </ul>
               ) : (
                  <div className="text-[#6f7f92]">No expertise added yet</div>
               )}
            </div>
         </div>
         <div className="bg-[#ffffff] rounded-md mt-8">
            <div className="flex items-center justify-between border-b-[1px] border-[#f4f5f6] p-8">
               <h5 className="mb-0">More </h5>
               <span
                  onClick={() => setActiveForm('additionalInfos')}
                  className="bg-[#4374c0] w-7 h-7 flex items-center justify-center rounded-md cursor-pointer"
               >
                  <IconlyEditSquare size={20} color={'#ffffff'} />
               </span>
            </div>{' '}
            <div className="p-8">
               {profile?.additional_infos && profile.additional_infos.length > 0 ? (
                  <ul className=" p-0 mb-0 mx-[-16px] text-[#6f7f92]">
                     {profile.additional_infos.map((info: ProfileAdditionalInfo, idx: number) => (
                        <li className="px-[16px] mb-10" key={info._id || idx}>
                           <div className="mb-2 text-sm font-medium uppercase">{info?.title}</div>
                           <div>
                              <p className="mb-2 text-base font-medium text-black line-clamp-3">{info?.description}</p>
                           </div>
                        </li>
                     ))}
                  </ul>
               ) : (
                  <div className="p-8 text-[#6f7f92]">No additional information added yet</div>
               )}
            </div>
         </div>
         <Dialog.Root
            size="lg"
            placement="center"
            open={activeForm === 'professionalBackground'}
            motionPreset="slide-in-bottom"
         >
            <Portal>
               <Dialog.Backdrop />
               <Dialog.Positioner>
                  <Dialog.Content className="w-[500px] max-w-[95vw] p-0 mx-auto shadow-2xl border border-gray-200/50 rounded-xl bg-white/95 backdrop-blur-sm">
                     <EditBackground onClose={closeForm} />
                  </Dialog.Content>
               </Dialog.Positioner>
            </Portal>
         </Dialog.Root>
         <Dialog.Root size="lg" placement="center" open={activeForm === 'education'} motionPreset="slide-in-bottom">
            <Portal>
               <Dialog.Backdrop />
               <Dialog.Positioner>
                  <Dialog.Content className="w-[500px] max-w-[95vw] p-0 mx-auto shadow-2xl border border-gray-200/50 rounded-xl bg-white/95 backdrop-blur-sm">
                     <EditEducation onClose={closeForm} />
                  </Dialog.Content>
               </Dialog.Positioner>
            </Portal>
         </Dialog.Root>
         <Dialog.Root size="lg" placement="center" open={activeForm === 'certification'} motionPreset="slide-in-bottom">
            <Portal>
               <Dialog.Backdrop />
               <Dialog.Positioner>
                  <Dialog.Content className="w-[500px] max-w-[95vw] p-0 mx-auto shadow-2xl border border-gray-200/50 rounded-xl bg-white/95 backdrop-blur-sm">
                     <EditCertification onClose={closeForm} />
                  </Dialog.Content>
               </Dialog.Positioner>
            </Portal>
         </Dialog.Root>
         <Dialog.Root size="lg" placement="center" open={activeForm === 'expertise'} motionPreset="slide-in-bottom">
            <Portal>
               <Dialog.Backdrop />
               <Dialog.Positioner>
                  <Dialog.Content className="w-[500px] max-w-[95vw] p-0 mx-auto shadow-2xl border border-gray-200/50 rounded-xl bg-white/95 backdrop-blur-sm">
                     <EditExpertise onClose={closeForm} />
                  </Dialog.Content>
               </Dialog.Positioner>
            </Portal>
         </Dialog.Root>
         <Dialog.Root
            size="lg"
            placement="center"
            open={activeForm === 'additionalInfos'}
            motionPreset="slide-in-bottom"
         >
            <Portal>
               <Dialog.Backdrop />
               <Dialog.Positioner>
                  <Dialog.Content className="w-[500px] max-w-[95vw] p-0 mx-auto shadow-2xl border border-gray-200/50 rounded-xl bg-white/95 backdrop-blur-sm">
                     <EditAdditional onClose={closeForm} />
                  </Dialog.Content>
               </Dialog.Positioner>
            </Portal>
         </Dialog.Root>
      </div>
   )
}

export default ProfileDetails
