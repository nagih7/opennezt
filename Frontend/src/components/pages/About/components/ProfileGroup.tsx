import React, { useEffect } from 'react'
import { Avatar, Tabs } from '@chakra-ui/react'
import RightSidebar from 'components/common/RightSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { PROJECT_INVITATION_NOTIFICATION, WAITING_STATUS } from 'utils/constants'
import { AppDispatch } from '~/store'
import { RootState } from '~/store'
import { Button } from '~/components/UI/button'

const Groups: React.FC = () => {
   const dispatch = useDispatch<AppDispatch>()
   // ========== STATE FROM REDUX ========== //
   const { projectsParticipated } = useSelector((state: RootState) => state.project)
   const { notifications } = useSelector((state: RootState) => state.notification)

   const projects = projectsParticipated || []
   const invitations = notifications.filter(
      (notification) =>
         notification.type?.name === PROJECT_INVITATION_NOTIFICATION && notification.metadata?.status === WAITING_STATUS
   )

   // ========== USE EFFECT ========== //
   useEffect(() => {
      if (!projectsParticipated || projectsParticipated.length === 0) {
         // dispatch(getListProjectsParticipated(paginationProjectsParticipated))
      }
      // eslint-disable-next-line
   }, [dispatch])

   return (
      <div className="flex gap-3">
         <div className="w-full lg:w-10/12">
            <Tabs.Root className="h-4" defaultValue="Memberships">
               <div className="w-full 2xl:w-full">
                  <Tabs.List>
                     <div className="flex justify-between w-full p-4 font-bold bg-white">
                        <div className="flex">
                           <Tabs.Trigger className="text-black" value="Memberships">
                              Memberships
                           </Tabs.Trigger>
                           <Tabs.Trigger className="text-black" value="Invitations">
                              Invitations
                           </Tabs.Trigger>
                        </div>

                        <div className="flex items-center space-x-2 2xl:ml-[31.5rem] ">
                           <span className="text-black ">Order By:</span>
                           <select className="text-sm font-medium text-gray-600 bg-transparent outline-none border border-[#F3F3F3] w-[10rem] h-[2rem] rounded-sm">
                              <option value="Last Active">Last Active</option>
                              <option value="Most Members">Most Members</option>
                              <option value="Newly Created">Newly Created</option>
                           </select>
                        </div>
                     </div>
                  </Tabs.List>
                  <div className="mt-5 bg-white ">
                     <Tabs.Content value="Memberships">
                        <div className="p-6 bg-white rounded-lg">
                           <h4 className="mb-4 text-lg font-semibold">Groups({projects?.length})</h4>
                           <hr className="mb-4" />
                           <div className="grid grid-cols-3 gap-8"></div>
                        </div>
                     </Tabs.Content>
                     <Tabs.Content value="Invitations">
                        <div className="p-4">
                           {!invitations.length ? (
                              <div className="bg-[#E3F1F6] p-3 border-l-2 border-[#0098CB] text-[#1599CC]">
                                 You have no outstanding group invites.
                              </div>
                           ) : (
                              <div className="bg-white rounded-lg ">
                                 <h4 className="mb-4 text-lg font-semibold">Invitations({invitations?.length})</h4>
                                 <hr className="mb-4" />
                                 {invitations.map((invite) => (
                                    <div className="flex items-center justify-between p-4 mb-3 bg-white border rounded-lg">
                                       <div className="flex items-center space-x-4">
                                          <Avatar.Root className="w-[4.5rem] h-[4.5rem] rounded-full">
                                             <Avatar.Image src={invite.user?.avatar} />
                                             <Avatar.Fallback>{invite.user?.name}</Avatar.Fallback>
                                          </Avatar.Root>

                                          <div className="flex items-center space-x-1">
                                             <p className="font-medium">
                                                <strong>{invite.user?.name}</strong> invite you to group{' '}
                                                <strong>{invite.data?.project?.name}</strong>
                                             </p>
                                          </div>
                                       </div>
                                       <div className="flex space-x-4">
                                          <Button className="bg-blue-500 text-white hover:!bg-blue-400 hover:!text-white font-bold">
                                             Accept
                                          </Button>
                                          <Button className="bg-[#F4F5F6] font-bold">Delete</Button>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           )}
                        </div>
                     </Tabs.Content>
                  </div>
               </div>
            </Tabs.Root>
         </div>
         <RightSidebar activities={[]} action={() => ''} />
      </div>
   )
}
export default Groups
