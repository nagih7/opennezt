import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { IconlyEditSquare } from 'components/UI/Iconly'
import { HStack, Tag } from '@chakra-ui/react'
import ProjectActivity from '../ProjectActivity'

interface Industry {
   id: string
   name: string
}

interface Revenue {
   date: string
   amount: string
   currency: string
}

interface FundingSource {
   name: string
   amount: string
   currency: string
}

interface AdditionalInfo {
   name: string
   content: string
}

interface ProjectProps {
   project: {
      industries?: Industry[]
      stage?: {
         name: string
      }
      revenues?: Revenue[]
      funding_sources?: FundingSource[]
      additional_infos?: AdditionalInfo[]
   }
}

const ProjectOverview: React.FC<ProjectProps> = ({ project }) => {
   const params = useParams<{ id: string }>()
   const { id } = params

   return (
      <div className="px-[16px]">
         <div className="flex w-full gap-8">
            <div className="lg:w-10/12 w-full">
               <div className="bg-[#ffffff] rounded-md">
                  <div className="flex items-center justify-between border-b-[1px] border-[#f4f5f6] p-8">
                     <h5 className="mb-0">Secter</h5>
                     <Link
                        to={`/projects/me/${id}/edit/stage`}
                        className="bg-[#4374c0] w-7 h-7 flex items-center justify-center rounded-md cursor-pointer"
                     >
                        <IconlyEditSquare size={20} color={'#ffffff'} />
                     </Link>
                  </div>
                  <div className="p-8">
                     <ul className="grid grid-cols-2 p-0 mb-0 mx-[-16px] text-[#6f7f92]">
                        <li className="px-[16px] mb-10">
                           <div className="mb-2 text-sm font-medium uppercase">INDUSYTIES</div>
                           <div>
                              <p className="mb-2 text-base font-medium text-black">
                                 {project?.industries && project.industries.length > 0
                                    ? project.industries.map((industry) => (
                                         <HStack key={industry.id} gap={2} mt={2}>
                                            <Tag.Root size={'lg'}>
                                               <Tag.Label>{industry.name}</Tag.Label>
                                            </Tag.Root>
                                         </HStack>
                                      ))
                                    : 'N/A'}
                              </p>
                           </div>
                        </li>
                        <li className="px-[16px] mb-10">
                           <div className="mb-2 text-sm font-medium uppercase">STAGE</div>
                           <div>
                              <p className="mb-2 text-base font-medium text-black">{project?.stage?.name || 'N/A'}</p>
                           </div>
                        </li>
                     </ul>
                  </div>
               </div>
               <div className="bg-[#ffffff] rounded-md mt-8">
                  <div className="flex items-center justify-between border-b-[1px] border-[#f4f5f6] p-8">
                     <h5 className="mb-0">Revenue</h5>
                     <Link
                        to={`/projects/me/${id}/edit/revenue`}
                        className="bg-[#4374c0] w-7 h-7 flex items-center justify-center rounded-md cursor-pointer"
                     >
                        <IconlyEditSquare size={20} color={'#ffffff'} />
                     </Link>
                  </div>
                  <div className="p-8">
                     <ul className="grid grid-cols-2 p-0 mb-0 mx-[-16px] text-[#6f7f92]">
                        <li className="px-[16px] mb-10">
                           <div className="mb-2 text-sm font-medium uppercase">MONTH / YEAR</div>
                           <div>
                              {project?.revenues && project.revenues.length > 0 ? (
                                 project.revenues.map((revenue, index) => {
                                    const isLastItem = index === (project.revenues?.length ?? 0) - 1
                                    const dateObj = new Date(revenue.date)
                                    let year = dateObj.getFullYear()
                                    let month = dateObj.getMonth()

                                    if (month === 0) {
                                       month = 12
                                       year -= 1
                                    } else {
                                       month = Number(String(month).padStart(2, '0'))
                                    }

                                    const date = `${month}/${year}`

                                    return (
                                       <p
                                          key={index}
                                          className={`mb-2 text-base font-medium text-black ${
                                             !isLastItem ? 'border-b-[1px] border-[#f4f5f6] pb-2' : ''
                                          }`}
                                       >
                                          {date}
                                       </p>
                                    )
                                 })
                              ) : (
                                 <p className="mb-2 text-base font-medium text-black">N/A</p>
                              )}
                           </div>
                        </li>
                        <li className="px-[16px] mb-10">
                           <div className="mb-2 text-sm font-medium uppercase">AMOUNT</div>
                           <div>
                              {project?.revenues && project.revenues.length > 0 ? (
                                 project.revenues.map((revenue, id) => {
                                    const isLastItem = id === (project.revenues?.length ?? 0) - 1

                                    return (
                                       <p
                                          key={id}
                                          className={`mb-2 text-base font-medium text-black ${
                                             !isLastItem ? 'border-b-[1px] border-[#f4f5f6] pb-2' : ''
                                          }`}
                                       >
                                          {revenue.amount} ({revenue.currency})
                                       </p>
                                    )
                                 })
                              ) : (
                                 <p className="mb-2 text-base font-medium text-black">N/A</p>
                              )}
                           </div>
                        </li>
                     </ul>
                  </div>
               </div>
               <div className="bg-[#ffffff] rounded-md mt-8">
                  <div className="flex items-center justify-between border-b-[1px] border-[#f4f5f6] p-8">
                     <h5 className="mb-0">Funding Sources</h5>
                     <Link
                        to={`/projects/me/${id}/edit/funding-sources`}
                        className="bg-[#4374c0] w-7 h-7 flex items-center justify-center rounded-md cursor-pointer"
                     >
                        <IconlyEditSquare size={20} color={'#ffffff'} />
                     </Link>
                  </div>
                  <div className="p-8">
                     <ul className="grid grid-cols-2 p-0 mb-0 mx-[-16px] text-[#6f7f92]">
                        <li className="px-[16px] mb-10">
                           <div className="mb-2 text-sm font-medium uppercase">NAME</div>
                           <div>
                              {project?.funding_sources && project.funding_sources.length > 0 ? (
                                 project.funding_sources.map((funding_source, index) => {
                                    const isLastItem = index === (project.funding_sources?.length ?? 0) - 1
                                    return (
                                       <p
                                          key={index}
                                          className={`mb-2 text-base font-medium text-black ${
                                             !isLastItem ? 'border-b-[1px] border-[#f4f5f6] pb-2' : ''
                                          }`}
                                       >
                                          {funding_source.name}
                                       </p>
                                    )
                                 })
                              ) : (
                                 <p className="mb-2 text-base font-medium text-black">N/A</p>
                              )}
                           </div>
                        </li>
                        <li className="px-[16px] mb-10">
                           <div className="mb-2 text-sm font-medium uppercase">AMOUNT</div>
                           <div>
                              {project?.funding_sources && project.funding_sources.length > 0 ? (
                                 project.funding_sources.map((funding_source, index) => {
                                    const isLastItem = index === (project.funding_sources?.length ?? 0) - 1
                                    return (
                                       <p
                                          key={index}
                                          className={`mb-2 text-base font-medium text-black ${
                                             !isLastItem ? 'border-b-[1px] border-[#f4f5f6] pb-2' : ''
                                          }`}
                                       >
                                          {funding_source.amount} ({funding_source.currency})
                                       </p>
                                    )
                                 })
                              ) : (
                                 <p className="mb-2 text-base font-medium text-black">N/A</p>
                              )}
                           </div>
                        </li>
                     </ul>
                  </div>
               </div>
               <div className="bg-[#ffffff] rounded-md mt-8">
                  <div className="flex items-center justify-between border-b-[1px] border-[#f4f5f6] p-8">
                     <h5 className="mb-0">More</h5>
                     <Link
                        to={`/projects/me/${id}/edit/additional-info`}
                        className="bg-[#4374c0] w-7 h-7 flex items-center justify-center rounded-md cursor-pointer"
                     >
                        <IconlyEditSquare size={20} color={'#ffffff'} />
                     </Link>
                  </div>
                  <div className="p-8">
                     <ul className="grid grid-cols-1 p-0 mb-0 mx-[-16px] text-[#6f7f92]">
                        {project?.additional_infos && project.additional_infos.length > 0 ? (
                           project.additional_infos.map((additional_info, index) => (
                              <li key={index} className="px-[16px] mb-6">
                                 <div className="mb-2 text-sm font-medium uppercase">
                                    {additional_info.name || 'N/A'}
                                 </div>
                                 <div>
                                    <p className="mb-2 text-base font-medium text-black">
                                       {additional_info.content || 'N/A'}
                                    </p>
                                 </div>
                                 {index < (project.additional_infos?.length ?? 0) - 1 && (
                                    <hr className="my-4 border-[#f4f5f6]" />
                                 )}
                              </li>
                           ))
                        ) : (
                           <li className="px-[16px] mb-10">
                              <div className="mb-2 text-sm font-medium uppercase">Additional Information</div>
                              <div>
                                 <p className="mb-2 text-base font-medium text-black">N/A</p>
                              </div>
                           </li>
                        )}
                     </ul>
                  </div>
               </div>
            </div>
            <ProjectActivity />
         </div>
      </div>
   )
}

export default ProjectOverview
