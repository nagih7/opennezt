import React, { useState, useEffect, useMemo } from 'react'
import { Dialog, Stack, Text, Button, CloseButton, Alert } from '@chakra-ui/react'
import { IconlyMessage, IconlySearch } from 'components/UI/Iconly'
import ProjectActivity from '../ProjectActivity'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { getListFriendInvite, inviteMember, cancelInvitation } from 'api/project'
import { getProjectRoleFramework } from 'api/user'
import SelectCustom from 'components/UI/SelectCustom'
import { format } from 'date-fns'
import { RootState } from 'store/types'
import { ROUTE_CONFIG } from '~/config/constants'

interface Friend {
   id?: string
   friend_id?: string
   name: string
   avatar?: string
}

interface InvitedUser extends Friend {
   teamRole?: string
   role?: string
}

interface SelectEvent {
   value: string[]
}

interface FormRequest {
   teamRole: string
   role: string
}

interface ListFriendsInviteResponse {
   data?: {
      data?: {
         userInviteList: Friend[]
         invitedList: InvitedUser[]
      }
   }
}

const Sendinvite: React.FC = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { id } = useParams<{ id: string }>()
   const { projectRoleFramework, projectTeamRoleFramework } = useSelector((state: RootState) => state.user)
   const [listFriendsInvite, setListFriendsInvite] = useState<ListFriendsInviteResponse | null>(null)

   // Sửa lại useMemo để truy cập đúng cấu trúc dữ liệu
   const friendsData = useMemo(() => {
      // Thử tất cả các đường dẫn có thể để đảm bảo lấy được dữ liệu
      if (listFriendsInvite?.data?.data?.userInviteList) {
         return listFriendsInvite.data.data.userInviteList
      }

      // Trả về mảng rỗng nếu không tìm thấy dữ liệu
      return [] as Friend[]
   }, [listFriendsInvite])

   const invitedData = useMemo(() => {
      // Thử tất cả các đường dẫn có thể để đảm bảo lấy được dữ liệu
      if (listFriendsInvite?.data?.data?.invitedList) {
         return listFriendsInvite.data.data.invitedList
      }

      // Trả về mảng rỗng nếu không tìm thấy dữ liệu
      return [] as InvitedUser[]
   }, [listFriendsInvite])

   const [searchQuery, setSearchQuery] = useState<string>('')
   const [filteredFriends, setFilteredFriends] = useState<Friend[]>([])
   const [filteredInvited, setFilteredInvited] = useState<InvitedUser[]>([])
   const [activeTab, setActiveTab] = useState<'all-friends' | 'invited'>('all-friends')

   // State cho modal mời và hủy mời
   const [isInviteModalOpen, setInviteModalOpen] = useState<boolean>(false)
   const [isCancelModalOpen, setCancelModalOpen] = useState<boolean>(false)
   const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null)
   const [formRequest, setFormRequest] = useState<FormRequest>({
      teamRole: '',
      role: '',
   })

   // Lấy dữ liệu từ API
   useEffect(() => {
      // Thay đổi từ dispatch sang gọi API trực tiếp và set state
      const fetchFriendInvites = async () => {
         try {
            if (!id) return

            const response = await getListFriendInvite(id)

            // Xử lý cấu trúc response lồng nhau
            setListFriendsInvite(response)

            // Truy cập response.data.data cho đúng cấu trúc
            const userList = response?.data?.data?.userInviteList || []
            const invitedList = response?.data?.data?.invitedList || []

            setFilteredFriends(userList)
            setFilteredInvited(invitedList)
         } catch (error) {
            console.error('Failed to fetch friend invites:', error)
         }
      }

      fetchFriendInvites()

      // Lấy thông tin khung vai trò dự án
      if (!projectRoleFramework?.items?.length || !projectTeamRoleFramework?.items?.length) {
         dispatch(getProjectRoleFramework() as any)
      }
   }, [id, projectRoleFramework, projectTeamRoleFramework, dispatch])

   // Lọc danh sách bạn bè dựa trên search query
   useEffect(() => {
      if (searchQuery.trim() === '') {
         setFilteredFriends(friendsData)
      } else {
         const filtered = friendsData.filter((friend) => friend.name.toLowerCase().includes(searchQuery.toLowerCase()))
         setFilteredFriends(filtered)
      }
   }, [friendsData, searchQuery])

   // Lọc danh sách người đã được mời dựa trên search query
   useEffect(() => {
      if (searchQuery.trim() === '') {
         setFilteredInvited(invitedData)
      } else {
         const filtered = invitedData.filter((friend) => friend.name.toLowerCase().includes(searchQuery.toLowerCase()))
         setFilteredInvited(filtered)
      }
   }, [invitedData, searchQuery])

   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value)
   }

   const handleTabChange = (tab: 'all-friends' | 'invited') => {
      setActiveTab(tab)
      setSearchQuery('')
   }

   // Xử lý mở modal mời với bạn bè được chọn
   const handleOpenInviteModal = (friend: Friend) => {
      setSelectedFriend(friend)
      setInviteModalOpen(true)
   }

   // Xử lý mở modal hủy lời mời
   const handleOpenCancelModal = (friend: Friend) => {
      setSelectedFriend(friend)
      setCancelModalOpen(true)
   }

   // Xử lý đóng modal và reset form
   const handleCloseInviteModal = () => {
      setInviteModalOpen(false)
      setFormRequest({
         teamRole: '',
         role: '',
      })
   }

   // Xử lý đóng modal hủy lời mời
   const handleCloseCancelModal = () => {
      setCancelModalOpen(false)
   }

   // Cập nhật form khi thay đổi role
   const handleChangeFormRequest = (e: SelectEvent, field: keyof FormRequest) => {
      setFormRequest((prev) => ({
         ...prev,
         [field]: e.value[0],
      }))
   }

   // Xử lý gửi lời mời
   const handleConfirmInvite = async () => {
      if (!formRequest.teamRole || !formRequest.role) {
         console.error('Team Role and Role are required')
         return
      }

      // Kiểm tra id người dùng có tồn tại không
      if (!selectedFriend || (!selectedFriend.id && !selectedFriend.friend_id)) {
         console.error('Không tìm thấy thông tin người dùng')
         return
      }

      if (!id) return

      // Lấy ID từ đúng trường, ưu tiên id, nếu không có thì dùng friend_id
      const userId = selectedFriend.id || selectedFriend.friend_id

      if (!userId) {
         console.error('Không tìm thấy ID người dùng')
         return
      }

      // Gửi request với đúng ID
      try {
         ;(await inviteMember(id, {
            ...formRequest,
            userId,
         })) as any

         // Gọi lại hàm fetchFriendInvites để cập nhật state
         const fetchFriendInvites = async () => {
            try {
               const response = await getListFriendInvite(id)
               setListFriendsInvite(response)
               // Sửa đường dẫn để truy cập đúng cấu trúc dữ liệu
               setFilteredFriends(response?.data?.data?.userInviteList || [])
               setFilteredInvited(response?.data?.data?.invitedList || [])
            } catch (error) {
               console.error('Failed to fetch friend invites:', error)
            }
         }
         await fetchFriendInvites()

         handleCloseInviteModal()
      } catch (error) {
         console.error('Có lỗi xảy ra khi gửi lời mời:', error)
      }
   }

   // Xử lý hủy lời mời
   const handleCancelInvite = async () => {
      // Kiểm tra id người dùng có tồn tại không
      if (!selectedFriend || (!selectedFriend.id && !selectedFriend.friend_id)) {
         console.error('Không tìm thấy thông tin người dùng')
         return
      }

      if (!id) return

      const userId = selectedFriend.id || selectedFriend.friend_id

      if (!userId) {
         console.error('Không tìm thấy ID người dùng')
         return
      }

      try {
         // Gọi API hủy lời mời
         await cancelInvitation(id, userId)

         // Gọi lại hàm fetchFriendInvites để cập nhật state
         const fetchFriendInvites = async () => {
            try {
               const response = await getListFriendInvite(id)
               setListFriendsInvite(response)
               // Cập nhật đúng đường dẫn truy cập dữ liệu
               setFilteredFriends(response?.data?.data?.userInviteList || [])
               setFilteredInvited(response?.data?.data?.invitedList || [])
            } catch (error) {
               console.error('Failed to fetch friend invites:', error)
            }
         }
         await fetchFriendInvites()

         handleCloseCancelModal()
      } catch (error) {
         console.error('Có lỗi xảy ra khi hủy lời mời')
      }
   }

   // Format date để hiển thị
   const formatDate = (dateString: string) => {
      try {
         return format(new Date(dateString), 'dd/MM/yyyy HH:mm')
      } catch (error) {
         return dateString
      }
   }

   const handleNavigateToMessage = (userId?: string) => {
      if (!userId) return
      navigate(ROUTE_CONFIG.USER.CONVERSATION.PREFIX + userId) // Điều hướng đến trang tin nhắn với người dùng
   }

   return (
      <>
         <div className="w-full h-full">
            <div className="px-[16px]">
               <div className="flex w-full gap-8">
                  <div className="w-full lg:w-10/12">
                     <div className="p-8 bg-[#ffffff] rounded-md">
                        <div className="flex justify-between items-center border-[1px] rounded-md caret-[#2f65b9] bg-[#f8f9fa] pl-[15px]">
                           <input
                              type="text"
                              placeholder={
                                 activeTab === 'all-friends' ? 'Search Friends...' : 'Search Invited People...'
                              }
                              className="bg-[#f8f9fa] outline-none h-8 w-full rounded-md text-xs font-medium text-black"
                              value={searchQuery}
                              onChange={handleSearchChange}
                           />
                           <button className="flex items-center justify-center bg-[#2f65b9] rounded-md w-11 h-10">
                              <IconlySearch size={14} color={'#ffffff'} />
                           </button>
                        </div>
                     </div>
                     <div className="mt-8">
                        <div className="flex px-4 pt-4 text-sm font-bold bg-white border-b border-gray-200">
                           <button
                              onClick={() => handleTabChange('all-friends')}
                              className={`mr-6 pb-2 ${
                                 activeTab === 'all-friends'
                                    ? 'border-b-2 border-blue-600 text-blue-600'
                                    : 'text-gray-600'
                              }`}
                           >
                              All Friends
                           </button>
                           <button
                              onClick={() => handleTabChange('invited')}
                              className={`flex items-center pb-2 ${
                                 activeTab === 'invited' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'
                              }`}
                           >
                              Invited
                              <span className="px-2 ml-1 text-xs text-gray-700 bg-gray-100 rounded-full">
                                 {invitedData.length}
                              </span>
                           </button>
                        </div>

                        <div className="bg-white">
                           <div className="flex items-center justify-between w-full p-4 bg-white border-b border-gray-200">
                              <div>
                                 <h3 className="text-sm font-medium text-gray-700">
                                    {activeTab === 'all-friends'
                                       ? `All Friends (${filteredFriends.length})`
                                       : `Invited People (${filteredInvited.length})`}
                                 </h3>
                              </div>

                              <div className="flex items-center space-x-2">
                                 <span className="text-sm">Show By:</span>
                                 <select className="text-sm font-medium text-gray-600 bg-transparent outline-none border border-[#F3F3F3] w-[10rem] h-[2rem] rounded-sm">
                                    <option value="Last Active">Last Active</option>
                                    <option value="Newest Registered">Newest Registered</option>
                                    <option value="Alphabetical">Alphabetical</option>
                                 </select>
                              </div>
                           </div>

                           {/* Content area */}
                           <div className="p-4 mx-auto">
                              {activeTab === 'all-friends' ? (
                                 // Friends Tab Content
                                 filteredFriends.length > 0 ? (
                                    filteredFriends.map((friend) => {
                                       const friendId = friend.id || friend.friend_id
                                       const isAlreadyInvited = invitedData.some(
                                          (invited) =>
                                             invited.id && friendId && invited.id.toString() === friendId.toString()
                                       )

                                       return (
                                          <div
                                             key={friendId}
                                             className="flex items-center justify-between bg-[#F8F9FA] p-4 mb-2 rounded-lg"
                                          >
                                             <div className="flex items-center gap-4">
                                                <img
                                                   src={friend.avatar || 'https://via.placeholder.com/80'}
                                                   alt={friend.name}
                                                   className="object-cover w-16 h-16 rounded-full"
                                                />
                                                <div>
                                                   <h3 className="font-semibold">{friend.name}</h3>
                                                </div>
                                             </div>
                                             <div className="flex">
                                                {isAlreadyInvited ? (
                                                   <button
                                                      onClick={() => {
                                                         const invitedFriend = friendId
                                                            ? invitedData.find(
                                                                 (inv) =>
                                                                    inv.id && inv.id.toString() === friendId.toString()
                                                              )
                                                            : undefined
                                                         handleOpenCancelModal(invitedFriend || friend)
                                                      }}
                                                      className="flex items-center px-3 py-1 mr-4 font-bold text-white transition-colors bg-gray-400 rounded hover:bg-gray-500"
                                                   >
                                                      <svg
                                                         xmlns="http://www.w3.org/2000/svg"
                                                         className="w-4 h-4 mr-1"
                                                         fill="none"
                                                         viewBox="0 0 24 24"
                                                         stroke="currentColor"
                                                      >
                                                         <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M5 13l4 4L19 7"
                                                         />
                                                      </svg>
                                                      Invited
                                                   </button>
                                                ) : (
                                                   <button
                                                      onClick={() => handleOpenInviteModal(friend)}
                                                      className="px-2 py-1 mr-4 font-bold text-white transition-colors bg-blue-600 rounded hover:bg-blue-700"
                                                   >
                                                      Invite to project
                                                   </button>
                                                )}
                                                <button
                                                   onClick={() => handleNavigateToMessage(friendId)}
                                                   className="p-2 transition-colors rounded-full hover:bg-gray-100"
                                                >
                                                   <IconlyMessage size={20} color={'#9BA8B1'} />
                                                </button>
                                             </div>
                                          </div>
                                       )
                                    })
                                 ) : (
                                    <div className="p-4 text-center text-gray-500">
                                       {searchQuery ? 'Can not find suitable friends' : 'No friends yet'}
                                    </div>
                                 )
                              ) : // Invited Tab Content
                              filteredInvited.length > 0 ? (
                                 filteredInvited.map((invited) => {
                                    return (
                                       <div
                                          key={invited.id}
                                          className="flex items-center justify-between bg-[#F8F9FA] p-4 mb-2 rounded-lg"
                                       >
                                          <div className="flex items-center gap-4">
                                             <img
                                                src={invited.avatar || 'https://via.placeholder.com/80'}
                                                alt={invited.name}
                                                className="object-cover w-16 h-16 rounded-full"
                                             />
                                             <div>
                                                <h3 className="font-semibold">{invited.name}</h3>
                                                <div className="mt-1 text-sm text-gray-600">
                                                   <div className="grid grid-cols-2 gap-x-4">
                                                      <span>
                                                         <strong>Team Role:</strong> {invited.teamRole || 'N/A'}
                                                      </span>
                                                      <span>
                                                         <strong>Role:</strong> {invited.role || 'N/A'}
                                                      </span>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                          <div className="flex">
                                             <button
                                                onClick={() => handleOpenCancelModal(invited)}
                                                className="flex items-center px-3 py-1 mr-4 font-bold text-white transition-colors bg-red-500 rounded hover:bg-red-600"
                                             >
                                                Cancel Invitation
                                             </button>
                                             <button
                                                onClick={() => handleNavigateToMessage(invited.id)}
                                                className="p-2 transition-colors rounded-full hover:bg-gray-100"
                                             >
                                                <IconlyMessage size={20} color={'#9BA8B1'} />
                                             </button>
                                          </div>
                                       </div>
                                    )
                                 })
                              ) : (
                                 <div className="p-4 text-center text-gray-500">
                                    {searchQuery ? 'No matching invitee found' : 'No invitations have been sent yet.'}
                                 </div>
                              )}
                           </div>
                        </div>
                     </div>
                  </div>
                  <ProjectActivity />
               </div>
            </div>
         </div>

         {/* Modal mời tham gia dự án */}
         <Dialog.Root size={'lg'} open={isInviteModalOpen} placement={'center'} motionPreset="slide-in-bottom">
            <Dialog.Backdrop style={{ opacity: 0 }} />
            <Dialog.Positioner style={{ zIndex: 1001 }}>
               <Dialog.Content>
                  <Dialog.Header className="p-4">
                     <Text className="mb-0 text-xl font-medium">Invite to project</Text>
                  </Dialog.Header>
                  <Dialog.Body>
                     <Stack>
                        <Alert.Root status="info">
                           <Alert.Indicator />
                           <Alert.Title>Do you want to invite {selectedFriend?.name} to join this project?</Alert.Title>
                        </Alert.Root>
                        <Stack className="flex flex-col gap-2 my-4">
                           <SelectCustom
                              height="40px"
                              label="Team Role"
                              required
                              collection={projectTeamRoleFramework}
                              onChange={(e: SelectEvent) => handleChangeFormRequest(e, 'teamRole')}
                              value={[formRequest.teamRole]}
                           />
                           <SelectCustom
                              height="40px"
                              label="Role"
                              required
                              collection={projectRoleFramework}
                              onChange={(e: SelectEvent) => handleChangeFormRequest(e, 'role')}
                              value={[formRequest.role]}
                           />
                        </Stack>
                     </Stack>
                  </Dialog.Body>
                  <Dialog.Footer>
                     <Dialog.ActionTrigger asChild>
                        <Button variant="outline" className="bg-[#f6f5f5] rounded-md" onClick={handleCloseInviteModal}>
                           Cancel
                        </Button>
                     </Dialog.ActionTrigger>
                     <Button
                        onClick={handleConfirmInvite}
                        borderRadius={4}
                        className="bg-[#2f65b9] text-white text-sm rounded-md font-medium"
                        loadingText="Inviting..."
                        spinnerPlacement="start"
                     >
                        INVITE
                     </Button>
                  </Dialog.Footer>
                  <Dialog.CloseTrigger asChild>
                     <CloseButton onClick={handleCloseInviteModal} size="sm" />
                  </Dialog.CloseTrigger>
               </Dialog.Content>
            </Dialog.Positioner>
         </Dialog.Root>

         {/* Modal hủy lời mời */}
         <Dialog.Root size={'lg'} open={isCancelModalOpen} placement={'center'} motionPreset="slide-in-bottom">
            <Dialog.Backdrop style={{ opacity: 0 }} />
            <Dialog.Positioner style={{ zIndex: 1001 }}>
               <Dialog.Content>
                  <Dialog.Header className="p-4">
                     <Text className="mb-0 text-xl font-medium">Cancel invitation</Text>
                  </Dialog.Header>
                  <Dialog.Body>
                     <Stack>
                        <Alert.Root status="warning">
                           <Alert.Indicator />
                           <Alert.Title>
                              Are you sure you want to cancel the invitation for {selectedFriend?.name}?
                           </Alert.Title>
                        </Alert.Root>
                     </Stack>
                  </Dialog.Body>
                  <Dialog.Footer>
                     <Dialog.ActionTrigger asChild>
                        <Button variant="outline" className="bg-[#f6f5f5] rounded-md" onClick={handleCloseCancelModal}>
                           Go back
                        </Button>
                     </Dialog.ActionTrigger>
                     <Button
                        onClick={handleCancelInvite}
                        borderRadius={4}
                        loadingText="Canceling..."
                        spinnerPlacement="start"
                        className="text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                     >
                        CANCEL INVITATION
                     </Button>
                  </Dialog.Footer>
                  <Dialog.CloseTrigger asChild>
                     <CloseButton onClick={handleCloseCancelModal} size="sm" />
                  </Dialog.CloseTrigger>
               </Dialog.Content>
            </Dialog.Positioner>
         </Dialog.Root>
      </>
   )
}

export default Sendinvite
