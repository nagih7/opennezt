import { Avatar, Button, Spinner } from '@chakra-ui/react'
import { replyFriendRequest } from 'api/talent'
import { sendFriendRequest } from 'api/user'
import {
    IconlyAddUser,
    IconlyBookmark,
    IconlyDelete,
    IconlyLocation,
    IconlyShieldDone,
    IconlyUser,
} from 'components/UI/Iconly'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    CANCEL_ACTION,
    CONFIRM_ACTION,
    CONFIRM_STATUS,
    DELETE_ACTION,
    SEND_ACTION,
    WAITING_STATUS,
} from 'utils/constants'

const ProfileOverview = ({ user, friendRequest }) => {
    const dispatch = useDispatch()

    // ========== STATE FROM REDUX ========== //
    const { authUser } = useSelector((state) => state.auth)
    const { isLoadingSendFriendRequest, isLoadingReplyFriendRequest, isLoadingGetTalentDetails } = useSelector(
        (state) => state.talent
    )

    // ========== HANDLE FUNCTION ========== //
    const handleSendFriendRequest = () => {
        dispatch(sendFriendRequest(user._id, SEND_ACTION))
    }

    const handleCancelFriendRequest = () => {
        dispatch(sendFriendRequest(user._id, CANCEL_ACTION))
    }

    // ========== HANDLE REPLY NOTIFICATION ========== //
    const handleReplyFriendRequest = async (notification_id, action) => {
        dispatch(replyFriendRequest(notification_id, action))
    }

    return (
        <div className="p-8 bg-[#ffffff] rounded-md">
            <div className="flex lg:flex-row flex-col items-center w-full">
                <div className="w-4/12"></div>
                <div className="flex flex-col items-center w-4/12">
                    <div className="relative flex flex-col items-center bg-[#ffffff] mb-10 p-1 rounded-md">
                        <div className="absolute top-[-137px]">
                            <Avatar.Root
                                shape="rounded"
                                width="150px"
                                className=" bg-[#ffffff] p-1 object-cover max-w-[150px] h-[150px] rounded-md"
                            >
                                <Avatar.Fallback name={user?.name} />
                                <Avatar.Image src={user?.avatar} />
                            </Avatar.Root>
                        </div>
                    </div>
                    <h5 className="text-[#000000] font-bold text-lg flex gap-1 items-center">
                        {user?.name}
                        <IconlyShieldDone size={24} color="#3897f0" className="text-[#3897f0] mx-[6px]" />
                    </h5>
                    <div className="flex items-center mt-[8px] gap-4">
                        {user?.region && (
                            <div className="flex items-center gap-1 text-[#6f7f92] font-medium">
                                <IconlyLocation size={15} color={'#000000'} />
                                <span className="text-sm">{user?.region}</span>
                            </div>
                        )}
                        {user?.linkedin && (
                            <div className="flex items-center gap-1 text-[#6f7f92] font-medium">
                                <IconlyBookmark size={15} color={'#000000'} />
                                <span className="text-sm">
                                    <a
                                        href={user?.linkedin}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="no-underline text-[#6f7f92]"
                                    >
                                        {user?.linkedin}
                                    </a>
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="mt-[16px]"></div>
                </div>
                <div className="w-4/12">
                    <div className="flex flex-col items-center  after:border-l-2 after:border-[#e0e6ec]">
                        {friendRequest
                            ? (() => {
                                  switch (friendRequest?.metadata?.status) {
                                      case WAITING_STATUS:
                                          switch (friendRequest?.source_id) {
                                              case authUser?._id:
                                                  return (
                                                      <div className="flex flex-row gap-3 text-sm">
                                                          <Button className="bg-[#F4F5F6] text-black rounded-[0.3rem] ml-4 border-none ">
                                                              Requested
                                                          </Button>
                                                          <Button
                                                              className="bg-[#0866FF] text-white rounded-[0.3rem] ml-4"
                                                              onClick={handleCancelFriendRequest}
                                                              loading={isLoadingSendFriendRequest}
                                                              loadingText="Canceling..."
                                                          >
                                                              Cancel request
                                                          </Button>
                                                      </div>
                                                  )
                                              default:
                                                  switch (isLoadingReplyFriendRequest) {
                                                      case true:
                                                          return <Spinner size="md" />
                                                      default:
                                                          return (
                                                              <div className="flex">
                                                                  <Button
                                                                      className="bg-[#0866FF] text-white rounded-[0.3rem]"
                                                                      onClick={() =>
                                                                          handleReplyFriendRequest(
                                                                              friendRequest?._id,
                                                                              CONFIRM_ACTION
                                                                          )
                                                                      }
                                                                      variant="solid"
                                                                  >
                                                                      <IconlyUser size={24} color={'#fff'} />
                                                                      Confirm
                                                                  </Button>
                                                                  <Button
                                                                      variant="subtle"
                                                                      className="rounded-[0.3rem] ml-4"
                                                                      onClick={() =>
                                                                          handleReplyFriendRequest(
                                                                              friendRequest?._id,
                                                                              DELETE_ACTION
                                                                          )
                                                                      }
                                                                  >
                                                                      <IconlyDelete size={24} color={'#000'} />
                                                                      Delete
                                                                  </Button>
                                                              </div>
                                                          )
                                                  }
                                          }
                                      case CONFIRM_STATUS:
                                          return (
                                              <Button className="bg-[#F4F5F6] text-black rounded-[0.3rem]">
                                                  <IconlyUser size={24} color={'#000'} />
                                                  Friends
                                              </Button>
                                          )
                                      default:
                                          return null
                                  }
                              })()
                            : user &&
                              !isLoadingGetTalentDetails && (
                                  <Button
                                      className="bg-[#0866FF] text-white rounded-[0.3rem]"
                                      onClick={handleSendFriendRequest}
                                      loading={isLoadingSendFriendRequest}
                                      loadingText="Sending..."
                                      spinnerPlacement="start"
                                      variant="solid"
                                  >
                                      <IconlyAddUser size={24} color={'#fff'} />
                                      Add friend
                                  </Button>
                              )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileOverview
