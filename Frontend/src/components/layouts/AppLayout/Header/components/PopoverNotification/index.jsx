import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Tag } from "antd";
import { CheckOutlined, CloseOutlined } from "@mui/icons-material";
import store from "states/configureStore";
import { replyNotification, getNotifications } from "api/notification";
import { useNavigate } from "react-router-dom";
import { getChatList } from "api/chat";
import { NOTIFICATIONS, ACTIONS, STATUS } from "utils/constants/appConstants";
import { Avatar, Button, Stack, Text } from "@chakra-ui/react";

function PopoverNotification() {
  const { notifications, loadingReplyNotification } = useSelector(
    (state) => state.notification
  );
  const { language } = useSelector((state) => state.app);
  const navigate = useNavigate();

  const handleReplyNotification = async (notification_id, type_id, status) => {
    await store.dispatch(
      replyNotification({ notification_id, type_id, status })
    );
    if (!loadingReplyNotification) {
      await store.dispatch(getNotifications());

      // DISPATCH ACTIONS BASED ON NOTIFICATION TYPE
      switch (type_name) {
        case "Project Invitation":
          store.dispatch(getChatList());
          break;
        case "Friend Request":
          store.dispatch(getChatList());
          break;
        default:
          break;
      }
    }
  };
  const handleNavigateToNotification = () => {
    navigate("/notification-management");
  };

  return (
    <Stack spacing={4}>
      <div className="mx-8 py-[16px] border-b border-gray-200 text-lg font-medium ">
        {NOTIFICATIONS.NOTIFICATIONS[language]}
      </div>
      <div
        className={`${
          notifications && notifications.length >= 3
            ? "flex flex-col items-center max-h-[410px] p-0 m-0 overflow-y-scroll scrollbar-hide"
            : ""
        }`}
      >
        <Stack spacing={4}>
          <Stack spacing={2}>
            {notifications &&
              notifications.length > 0 &&
              notifications.map((notification, index) => (
                <div className="px-8 py-[16px]" key={index}>
                  <Stack>
                    <Stack direction="row" spacing={4}>
                      <Avatar.Root size={"sm"}>
                        <Avatar.Fallback name={notification.user?.name} />
                        <Avatar.Image src={notification.user.avatar} />
                      </Avatar.Root>
                      <Stack spacing={2}>
                        {(() => {
                          switch (notification.type?.name) {
                            case "project_invitation":
                              return (
                                <div className="text-[#6f7f92] text-sm font-medium">
                                  <b>{notification.user?.name}</b>{" "}
                                  {
                                    NOTIFICATIONS.INVITED_YOU_TO_JOIN_THE[
                                      language
                                    ]
                                  }{" "}
                                  <b>{notification.metadata.project_name}</b>{" "}
                                  {NOTIFICATIONS.PROJECT[language]}
                                </div>
                              );
                            case "friend_request":
                              return (
                                <div className="text-[#6f7f92] text-sm font-medium">
                                  <b>{notification.user?.name}</b>{" "}
                                  {
                                    NOTIFICATIONS.SENT_YOU_A_FRIEND_REQUEST[
                                      language
                                    ]
                                  }
                                </div>
                              );
                            default:
                              return (
                                <div className="text-[#6f7f92] text-sm font-medium">
                                  {notification.message || "New notification"}
                                </div>
                              );
                          }
                        })()}
                        <span className="text-[#6f7f92] text-xs">
                          {moment(notification.timestamp).fromNow()}
                        </span>
                      </Stack>
                    </Stack>
                    <div className="flex justify-end items-center">
                      {notification.metadata.status === "waiting" && (
                        <Stack direction="row" spacing={4}>
                          <button
                            className="px-[12px] py-[8px] text-xs font-medium bg-[#2f65b9] text-white rounded-md"
                            icon={<CheckOutlined />}
                            onClick={() =>
                              handleReplyNotification(
                                notification._id,
                                notification.type_id,
                                "accepted"
                              )
                            }
                          >
                            {ACTIONS.ACCEPT[language]}
                          </button>
                          <button
                            className="px-[12px] py-[8px] text-xs font-medium bg-[#f8f9fa] text-[#6f7f92] rounded-md"
                            danger
                            icon={<CloseOutlined />}
                            onClick={() =>
                              handleReplyNotification(
                                notification._id,
                                notification.type_id,
                                "rejected"
                              )
                            }
                          >
                            {ACTIONS.REJECT[language]}
                          </button>
                        </Stack>
                      )}
                    </div>
                  </Stack>
                </div>
              ))}
          </Stack>
        </Stack>
      </div>
      <Text
        className="flex justify-center items-center cursor-pointer text-center mx-[24px] mb-[24px]"
        onClick={() => handleNavigateToNotification()}
      >
        <span className="p-3 text-[#2f65b9] font-bold uppercase text-xs">
          {NOTIFICATIONS.VIEW_ALL_NOTIFICATIONS[language]}
        </span>
      </Text>
    </Stack>
  );
}

export default PopoverNotification;
