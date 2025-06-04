import React from 'react'
import { Button } from '@chakra-ui/react'
import { Notification, UserDetailsProps } from 'types'
import { sendFriendRequest } from '~/api/user'
import { replyFriendRequest } from '~/api/talent'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { IconlyAddUser, IconlyBookmark, IconlyLocation, IconlyShieldDone, IconlyUser } from '~/components/UI/Iconly'
import { Avatar, AvatarImage } from '~/components/UI/avatar'
import { AVATAR_DEFAULT } from '~/utils/constants'

interface ProfileOverviewProps {
   user?: UserDetailsProps
   friendRequest?: Notification
}

const SEND_ACTION = 'send'
const CANCEL_ACTION = 'cancel'
const WAITING_STATUS = 'waiting'
const CONFIRM_STATUS = 'confirm'
const ACCEPT_ACTION = 'accept'
const REJECT_ACTION = 'reject'

const ProfileOverview: React.FC<ProfileOverviewProps> = ({ user, friendRequest }) => {
   const dispatch = useAppDispatch()

   // ========== STATE FROM REDUX ========== //
   const { authUser } = useAppSelector((state) => state.auth)
   const { isLoadingSendFriendRequest, isLoadingReplyFriendRequest, isLoadingGetTalentDetails } = useAppSelector(
      (state) => state.talent
   )

   // ========== HANDLE FUNCTION ========== //
   const handleSendFriendRequest = () => {
      if (user?._id) {
         dispatch(sendFriendRequest(user._id, SEND_ACTION))
      }
   }

   const handleCancelFriendRequest = () => {
      if (user?._id) {
         dispatch(sendFriendRequest(user._id, CANCEL_ACTION))
      }
   }

   // ========== HANDLE REPLY NOTIFICATION ========== //
   const handleReplyFriendRequest = async (notification_id: string, action: string) => {
      dispatch(replyFriendRequest(notification_id, action))
   }

   return (
      <div className="p-8 bg-[#ffffff] rounded-md">
         <div className="flex flex-col items-center w-full lg:flex-row">
            <div className="w-4/12"></div>
            <div className="flex flex-col items-center w-4/12">
               <div className="relative flex flex-col items-center bg-[#ffffff] mb-10 p-1 rounded-md">
                  <Avatar className="w-[150px] h-[150px] rounded-md overflow-hidden absolute top-[-137px] aspect-square">
                     <AvatarImage src={user?.avatar} />
                     <AvatarImage src={AVATAR_DEFAULT} />
                  </Avatar>
               </div>
               <h5 className="text-[#000000] font-bold text-lg flex gap-1 items-center">
                  {user?.name}
                  <IconlyShieldDone size={24} color="#3897f0" />
               </h5>
               <div className="flex items-center mt-[8px] gap-4">
                  {user?.region && (
                     <div className="flex items-center gap-1 text-[#6f7f92] font-medium">
                        <IconlyLocation size={15} color="#000000" />
                        <span className="text-sm">{user.region}</span>
                     </div>
                  )}
                  {user?.linkedin && (
                     <div className="flex items-center gap-1 text-[#6f7f92] font-medium">
                        <IconlyBookmark size={15} color="#000000" backgroundColor="transparent" />
                        <span className="text-sm">
                           <a
                              href={user.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              className="no-underline text-[#6f7f92]"
                           >
                              {user.linkedin}
                           </a>
                        </span>
                     </div>
                  )}
               </div>
               <div className="mt-[16px]"></div>
            </div>
            <div className="w-4/12">
               <div className="flex flex-col items-center after:border-l-2 after:border-[#e0e6ec]">
                  {friendRequest
                     ? (() => {
                          switch (friendRequest?.metadata?.status) {
                             case WAITING_STATUS:
                                switch (friendRequest?.source_id) {
                                   case authUser?._id:
                                      return (
                                         <div className="flex flex-row gap-3 text-sm">
                                            <Button className="bg-[#F4F5F6] text-black rounded-[0.3rem] ml-4 border-none">
                                               Requested
                                            </Button>
                                            <Button
                                               className="bg-[#0866FF] text-white rounded-[0.3rem] ml-4"
                                               onClick={handleCancelFriendRequest}
                                               loading={isLoadingSendFriendRequest}
                                            >
                                               Cancel request
                                            </Button>
                                         </div>
                                      )
                                   default:
                                      switch (isLoadingReplyFriendRequest) {
                                         case true:
                                            return (
                                               <div className="flex flex-row gap-3 text-sm">
                                                  <Button
                                                     className="bg-[#0866FF] text-white rounded-[0.3rem] ml-4"
                                                     loading={true}
                                                  >
                                                     Accept
                                                  </Button>
                                                  <Button
                                                     className="bg-[#F4F5F6] text-black rounded-[0.3rem] ml-4"
                                                     loading={true}
                                                  >
                                                     Reject
                                                  </Button>
                                               </div>
                                            )
                                         default:
                                            return (
                                               <div className="flex flex-row gap-3 text-sm">
                                                  <Button
                                                     className="bg-[#0866FF] text-white rounded-[0.3rem] ml-4"
                                                     onClick={() =>
                                                        handleReplyFriendRequest(friendRequest._id, ACCEPT_ACTION)
                                                     }
                                                  >
                                                     Accept
                                                  </Button>
                                                  <Button
                                                     className="bg-[#F4F5F6] text-black rounded-[0.3rem] ml-4"
                                                     onClick={() =>
                                                        handleReplyFriendRequest(friendRequest._id, REJECT_ACTION)
                                                     }
                                                  >
                                                     Reject
                                                  </Button>
                                               </div>
                                            )
                                      }
                                }
                             case CONFIRM_STATUS:
                                return (
                                   <div className="bg-[#F4F5F6] text-black rounded-[0.3rem] ml-4 flex items-center gap-2 p-2">
                                      <IconlyUser size={24} color="#000" />
                                      <span>Friends</span>
                                   </div>
                                )
                             default:
                                return null
                          }
                       })()
                     : user &&
                       !isLoadingGetTalentDetails && (
                          <div className="bg-[#0866FF] text-white rounded-[0.3rem] flex items-center gap-2 p-2">
                             <IconlyAddUser size={24} color="#fff" />
                             <Button
                                className="text-white bg-transparent border-none"
                                onClick={handleSendFriendRequest}
                                loading={isLoadingSendFriendRequest}
                             >
                                Add friend
                             </Button>
                          </div>
                       )}
               </div>
            </div>
         </div>
      </div>
   )
}

export default ProfileOverview
