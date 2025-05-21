import React, { useEffect, useState } from 'react'
import ProjectActivity from '../ProjectActivity'
import { IconlyCalendar, IconlyLocation, IconlyMessage, IconlySearch } from 'components/UI/Iconly'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getMyProjectDetails } from 'api/project'
import { Avatar, Tabs } from '@chakra-ui/react'
import { RootState } from 'store/types'
import { AppDispatch } from '~/store'

interface Member {
   user: {
      name: string
      avatar: string
   }
   team_role: string
   role: string
   friend?: boolean
}

const Members: React.FC = () => {
   const { id } = useParams<{ id: string }>()
   const dispatch = useDispatch<AppDispatch>()
   // ========== STATE FROM REDUX ========== //
   const { myProjectDetails } = useSelector((state: RootState) => state.project)
   const members = myProjectDetails?.members || []

   useEffect(() => {
      window.scrollTo(0, 0)
   }, [])

   useEffect(() => {
      if (id) {
         dispatch(getMyProjectDetails(id))
      }
   }, [id, dispatch])

   return (
      <div className="w-full h-full">
         <div className="px-[16px]">
            <div className="flex w-full gap-8">
               <div className="lg:w-10/12 w-full">
                  <div className="p-8 bg-[#ffffff] rounded-md">
                     <div className="flex justify-between items-center border-[1px] rounded-md caret-[#2f65b9] bg-[#f8f9fa] pl-[15px]">
                        <input
                           type="text"
                           placeholder="Search Members..."
                           className="bg-[#f8f9fa] outline-none h-8 w-full rounded-md text-xs font-medium text-black"
                        />
                        <button className="flex items-center justify-center bg-[#2f65b9] rounded-md w-11 h-10">
                           <IconlySearch size={14} color={'#ffffff'} />
                        </button>
                     </div>
                  </div>
                  <div className="mt-8">
                     <Tabs.Root className="h-4" defaultValue="All Members">
                        <div className="w-full 2xl:w-full">
                           <Tabs.List>
                              <div className="flex justify-between w-full p-4 font-bold bg-white">
                                 <div className="flex">
                                    <Tabs.Trigger className="text-black" value="All Members">
                                       All Members
                                    </Tabs.Trigger>
                                    <Tabs.Trigger className="text-black" value="My Friends">
                                       My Friends
                                    </Tabs.Trigger>
                                 </div>

                                 <div className="flex items-center space-x-2 2xl:ml-[31.5rem] ">
                                    <span className="text-black ">Show By:</span>
                                    <select className="text-sm font-medium text-gray-600 bg-transparent outline-none border border-[#F3F3F3] w-[10rem] h-[2rem] rounded-sm">
                                       <option value="Last Active">Last Active</option>
                                       <option value="Newest Registered">Newest Registered</option>
                                       <option value="Alphabetical">Alphabetical</option>
                                    </select>
                                 </div>
                              </div>
                           </Tabs.List>
                           <div className="bg-white ">
                              <Tabs.Content value="All Members">
                                 <div className="p-4 mx-auto ">
                                    {members.map((member: Member, index: number) => (
                                       <div
                                          key={index}
                                          className="flex items-center justify-between bg-[#F8F9FA] p-4 mb-2 rounded-lg "
                                       >
                                          <div className="flex items-center gap-4">
                                             <Avatar.Root size={'2xl'}>
                                                <Avatar.Fallback name={member.user.name} />
                                                <Avatar.Image src={member.user.avatar} />
                                             </Avatar.Root>
                                             <div className="flex flex-col justify-center">
                                                <h4 className="font-semibold">{member.user.name}</h4>
                                                <div className="flex">
                                                   <p className="flex mb-0 text-sm text-gray-500">
                                                      <IconlyLocation size={20} color={'#9BA8B1'} />
                                                      {member.team_role}
                                                   </p>
                                                   <p className="flex mb-0 ml-4 text-sm text-gray-500">
                                                      <IconlyCalendar size={20} color={'#9BA8B1'} /> {member.role}
                                                   </p>
                                                </div>
                                             </div>
                                          </div>
                                          {/* {friend.status === 'settings' && (
                                                            <div className="flex">
                                                                <button className="px-2 py-1 mr-4 font-bold text-white bg-blue-500 rounded">
                                                                    Profile Settings
                                                                </button>
                                                                <button>
                                                                    <IconlyMessage size={20} color={'#9BA8B1'} />
                                                                </button>
                                                            </div>
                                                        )}
                                                        {friend.status === 'pending' && (
                                                            <div className="flex">
                                                                <button
                                                                    className="px-2 py-1 mr-4 font-bold text-white bg-red-500 rounded"
                                                                    onClick={() => handleAction(friend.id, 'cancelled')}
                                                                >
                                                                    Cancel Request
                                                                </button>
                                                                <button>
                                                                    <IconlyMessage size={20} color={'#9BA8B1'} />
                                                                </button>
                                                            </div>
                                                        )}
                                                        {friend.status === 'friend' && (
                                                            <div className="flex">
                                                                <button
                                                                    className="px-2 py-1 mr-4 font-bold text-white bg-orange-500 rounded"
                                                                    onClick={() =>
                                                                        handleAction(friend.id, 'unfriended')
                                                                    }
                                                                >
                                                                    Unfriend
                                                                </button>
                                                                <button>
                                                                    <IconlyMessage size={20} color={'#9BA8B1'} />
                                                                </button>
                                                            </div>
                                                        )}
                                                        {friend.status === 'not_friend' && (
                                                            <div className="flex">
                                                                <button
                                                                    className="px-2 py-1 mr-4 font-bold text-white bg-green-500 rounded"
                                                                    onClick={() => handleAction(friend.id, 'pending')}
                                                                >
                                                                    Add Friend
                                                                </button>
                                                                <button>
                                                                    <IconlyMessage size={20} color={'#9BA8B1'} />
                                                                </button>
                                                            </div>
                                                        )} */}
                                       </div>
                                    ))}
                                 </div>
                              </Tabs.Content>

                              <Tabs.Content value="My Friends">
                                 <>
                                    <div className="p-4 mx-auto">
                                       {members
                                          .filter((member: Member) => member.friend === true)
                                          .map((member: Member, index: number) => (
                                             <div
                                                key={index}
                                                className="flex items-center justify-between bg-[#F8F9FA] p-4 mb-2 rounded-lg"
                                             >
                                                <div className="flex items-center gap-4">
                                                   <Avatar.Root size={'2xl'}>
                                                      <Avatar.Fallback name={member.user.name} />
                                                      <Avatar.Image src={member.user.avatar} />
                                                   </Avatar.Root>
                                                   <div className="flex flex-col justify-center">
                                                      <h4 className="font-semibold">{member.user.name}</h4>
                                                      <div className="flex">
                                                         <p className="flex mb-0 text-sm text-gray-500">
                                                            <IconlyLocation size={20} color={'#9BA8B1'} />
                                                            {member.team_role}
                                                         </p>
                                                         <p className="flex mb-0 ml-4 text-sm text-gray-500">
                                                            <IconlyCalendar size={20} color={'#9BA8B1'} /> {member.role}
                                                         </p>
                                                      </div>
                                                   </div>
                                                </div>
                                                {/* <div className="flex">
                                                                    <button
                                                                        className="px-2 py-1 mr-4 font-bold text-white bg-orange-500 rounded"
                                                                        onClick={() =>
                                                                            handleAction(friend.id, 'unfriended')
                                                                        }
                                                                    >
                                                                        Unfriend
                                                                    </button>
                                                                    <button>
                                                                        <IconlyMessage size={20} color={'#9BA8B1'} />
                                                                    </button>
                                                                </div> */}
                                             </div>
                                          ))}
                                    </div>
                                 </>
                              </Tabs.Content>
                           </div>
                        </div>
                     </Tabs.Root>
                  </div>
               </div>
               <ProjectActivity />
            </div>
         </div>
      </div>
   )
}

export default Members
