import { Tabs } from "@chakra-ui/react";
import {
  IconlyChat,
  IconlyEdit,
  IconlyEditSquare,
  IconlyHome,
  IconlyProfile,
  IconlySetting,
  IconlyStar,
  Iconlyuser,
  IconlyUser,
} from "components/UI/Iconly";
import img_avt from "../../../assets/images/background/avt.jpg";
import img_project from "../../../assets/images/logo/OpenNezt_icon_black.png";
import { ArrowsAltOutlined, CheckCircleFilled, WechatOutlined } from "@ant-design/icons";
import React from "react";

const Message = () => {
  return (
    <div className="w-full px-[16px] py-8">
      <div className="flex w-full gap-8">
        <div className="w-4/12">
          <div className="mb-[17px] py-[13px] bg-[#ffffff] rounded-md px-[17px] flex items-center">
            <div className="w-full pr-[10px]">
              <input
                type="text"
                placeholder="Search..."
                className="py-[10px] w-full pl-[10px] outline-none text-[#6f7f92] h-10 pr-[25px] bg-[#f8f9fa] rounded-md border border-gray-200"
              />
            </div>
            <a
              href="#"
              className="flex items-center justify-center bg-[#eaeff8] rounded-md min-w-10 h-10"
            >
              <IconlyEditSquare size={20} color={"#6f7f92"} />
            </a>
          </div>
          <div>
            <Tabs.Root defaultValue="message" variant="plain">
              <div className="bg-[#ffffff] rounded-md p-[13px]">
                <Tabs.List bg="bg.muted" rounded="l3" p="1">
                  <Tabs.Trigger value="message" textStyle="xs">
                    <IconlyChat size={16} color={"#000000"} />
                    Message
                  </Tabs.Trigger>
                  <Tabs.Trigger value="friend" textStyle="xs">
                    <IconlyUser size={16} color={"#000000"} />
                    Friends
                  </Tabs.Trigger>
                  <Tabs.Trigger value="projects" textStyle="xs">
                    <Iconlyuser size={16} color={"#000000"} />
                    Projects
                  </Tabs.Trigger>
                  <Tabs.Indicator rounded="l2" />
                </Tabs.List>
              </div>
              <Tabs.Content value="message">
                <div className="flex-1 max-h-[400px] overflow-y-scroll scrollbar-hide">
                  <div className="p-[15px] bg-[#ffffff]">
                    <div className="flex">
                      <div className="flex items-center gap-3">
                        <img
                          src={img_avt}
                          alt=""
                          className=" w-[50px] h-[50px] rounded-full"
                        />
                        <div>
                          <span className="flex items-center gap-1 text-sm font-medium">
                            Vuong Manh Nghia
                            <CheckCircleFilled className="text-blue-500" />
                          </span>
                          <p className="text-xs mb-0 text-[#6f7f92] font-medium">
                            tin nhắn mới nhất
                          </p>
                        </div>
                      </div>
                      <div className="text-xs text-[#6f7f92] ml-auto font-bold">
                        <span>1 hr. ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-[15px] mt-[15px] bg-[#ffffff]">
                    <div className="flex">
                      <div className="flex items-center gap-3">
                        <img
                          src={img_avt}
                          alt=""
                          className=" w-[50px] h-[50px] rounded-full"
                        />
                        <div>
                          <span className="flex items-center gap-1 text-sm font-medium">
                            Vuong Manh Nghia
                            <CheckCircleFilled className="text-blue-500" />
                          </span>
                          <p className="text-xs mb-0 text-[#6f7f92] font-medium">
                            tin nhắn mới nhất
                          </p>
                        </div>
                      </div>
                      <div className="text-xs text-[#6f7f92] ml-auto font-bold">
                        <span>1 hr. ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-[15px] mt-[15px] bg-[#ffffff]">
                    <div className="flex">
                      <div className="flex items-center gap-3">
                        <img
                          src={img_avt}
                          alt=""
                          className=" w-[50px] h-[50px] rounded-full"
                        />
                        <div>
                          <span className="flex items-center gap-1 text-sm font-medium">
                            Vuong Manh Nghia
                            <CheckCircleFilled className="text-blue-500" />
                          </span>
                          <p className="text-xs mb-0 text-[#6f7f92] font-medium">
                            tin nhắn mới nhất
                          </p>
                        </div>
                      </div>
                      <div className="text-xs text-[#6f7f92] ml-auto font-bold">
                        <span>1 hr. ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-[15px] mt-[15px] bg-[#ffffff]">
                    <div className="flex">
                      <div className="flex items-center gap-3">
                        <img
                          src={img_avt}
                          alt=""
                          className=" w-[50px] h-[50px] rounded-full"
                        />
                        <div>
                          <span className="flex items-center gap-1 text-sm font-medium">
                            Vuong Manh Nghia
                            <CheckCircleFilled className="text-blue-500" />
                          </span>
                          <p className="text-xs mb-0 text-[#6f7f92] font-medium">
                            tin nhắn mới nhất
                          </p>
                        </div>
                      </div>
                      <div className="text-xs text-[#6f7f92] ml-auto font-bold">
                        <span>1 hr. ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-[15px] mt-[15px] bg-[#ffffff]">
                    <div className="flex">
                      <div className="flex items-center gap-3">
                        <img
                          src={img_avt}
                          alt=""
                          className=" w-[50px] h-[50px] rounded-full"
                        />
                        <div>
                          <span className="flex items-center gap-1 text-sm font-medium">
                            Vuong Manh Nghia
                            <CheckCircleFilled className="text-blue-500" />
                          </span>
                          <p className="text-xs mb-0 text-[#6f7f92] font-medium">
                            tin nhắn mới nhất
                          </p>
                        </div>
                      </div>
                      <div className="text-xs text-[#6f7f92] ml-auto font-bold">
                        <span>1 hr. ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-[15px] mt-[15px] bg-[#ffffff]">
                    <div className="flex">
                      <div className="flex items-center gap-3">
                        <img
                          src={img_avt}
                          alt=""
                          className=" w-[50px] h-[50px] rounded-full"
                        />
                        <div>
                          <span className="flex items-center gap-1 text-sm font-medium">
                            Bui Hoang Duy
                            <CheckCircleFilled className="text-blue-500" />
                          </span>
                          <p className="text-xs mb-0 text-[#6f7f92] font-medium">
                            tin nhắn mới nhất
                          </p>
                        </div>
                      </div>
                      <div className="text-xs text-[#6f7f92] ml-auto font-bold">
                        <span>1 hr. ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Tabs.Content>
              <Tabs.Content value="friend">
                <div className="flex-1 max-h-[400px] overflow-y-scroll scrollbar-hide">
                  <div className="bg-[#ffffff]">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="text-sm w-full outline-none px-[10px] h-[45px] py-[5px]"
                    />
                  </div>
                  <div className="p-[14px] mt-[15px] rounded-md bg-[#ffffff]">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <img
                          src={img_avt}
                          alt=""
                          className="w-[35px] h-[35px] rounded-full"
                        />
                        <span className="flex items-center gap-2 text-sm font-medium">
                          Bui Hoang Duy
                          <CheckCircleFilled className="text-blue-500" />
                        </span>
                      </div>
                      <a href="#" className="px-[15px]">
                        <IconlyProfile size={18} color={"#6f7f92"} />
                      </a>
                    </div>
                  </div>
                  <div className="p-[14px] mt-[15px] rounded-md bg-[#ffffff]">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <img
                          src={img_avt}
                          alt=""
                          className="w-[35px] h-[35px] rounded-full"
                        />
                        <span className="flex items-center gap-2 text-sm font-medium">
                          Bui Hoang Duy
                          <CheckCircleFilled className="text-blue-500" />
                        </span>
                      </div>
                      <a href="#" className="px-[15px]">
                        <IconlyProfile size={18} color={"#6f7f92"} />
                      </a>
                    </div>
                  </div>
                  <div className="p-[14px] mt-[15px] rounded-md bg-[#ffffff]">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <img
                          src={img_avt}
                          alt=""
                          className="w-[35px] h-[35px] rounded-full"
                        />
                        <span className="flex items-center gap-2 text-sm font-medium">
                          Bui Hoang Duy
                          <CheckCircleFilled className="text-blue-500" />
                        </span>
                      </div>
                      <a href="#" className="px-[15px]">
                        <IconlyProfile size={18} color={"#6f7f92"} />
                      </a>
                    </div>
                  </div>
                  <div className="p-[14px] mt-[15px] rounded-md bg-[#ffffff]">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <img
                          src={img_avt}
                          alt=""
                          className="w-[35px] h-[35px] rounded-full"
                        />
                        <span className="flex items-center gap-2 text-sm font-medium">
                          Nguyen Huy Tan
                          {/* <CheckCircleFilled className="text-blue-500" /> */}
                        </span>
                      </div>
                      <a href="#" className="px-[15px]">
                        <IconlyProfile size={18} color={"#6f7f92"} />
                      </a>
                    </div>
                  </div>
                  <div className="p-[14px] mt-[15px] rounded-md bg-[#ffffff]">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <img
                          src={img_avt}
                          alt=""
                          className="w-[35px] h-[35px] rounded-full"
                        />
                        <span className="flex items-center gap-2 text-sm font-medium">
                          Bui Hoang Duy
                          <CheckCircleFilled className="text-blue-500" />
                        </span>
                      </div>
                      <a href="#" className="px-[15px]">
                        <IconlyProfile size={18} color={"#6f7f92"} />
                      </a>
                    </div>
                  </div>
                </div>
              </Tabs.Content>
              <Tabs.Content value="projects">
                <div className="flex-1 max-h-[400px] overflow-y-scroll scrollbar-hide">
                  <div className="bg-[#ffffff]">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="text-sm w-full outline-none px-[10px] h-[45px] py-[5px]"
                    />
                  </div>
                  <div className="p-[14px] mt-[15px] rounded-md bg-[#ffffff]">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <img
                          src={img_project}
                          alt=""
                          className="w-[35px] h-[35px] rounded-full"
                        />
                        <span className="text-sm font-medium">OpenNezt</span>
                      </div>
                      <a href="#" className="px-[15px]">
                        <IconlyHome size={15} color={"#6f7f92"} />
                      </a>
                    </div>
                  </div>
                  <div className="p-[14px] mt-[15px] rounded-md bg-[#ffffff]">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <img
                          src={img_project}
                          alt=""
                          className="w-[35px] h-[35px] rounded-full"
                        />
                        <span className="text-sm font-medium">OpenNezt</span>
                      </div>
                      <a href="#" className="px-[15px]">
                        <IconlyHome size={15} color={"#6f7f92"} />
                      </a>
                    </div>
                  </div>
                  <div className="p-[14px] mt-[15px] rounded-md bg-[#ffffff]">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <img
                          src={img_project}
                          alt=""
                          className="w-[35px] h-[35px] rounded-full"
                        />
                        <span className="text-sm font-medium">OpenNezt</span>
                      </div>
                      <a href="#" className="px-[15px]">
                        <IconlyHome size={15} color={"#6f7f92"} />
                      </a>
                    </div>
                  </div>
                  <div className="p-[14px] mt-[15px] rounded-md bg-[#ffffff]">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <img
                          src={img_project}
                          alt=""
                          className="w-[35px] h-[35px] rounded-full"
                        />
                        <span className="text-sm font-medium">OpenNezt</span>
                      </div>
                      <a href="#" className="px-[15px]">
                        <IconlyHome size={15} color={"#6f7f92"} />
                      </a>
                    </div>
                  </div>
                  <div className="p-[14px] mt-[15px] rounded-md bg-[#ffffff]">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <img
                          src={img_project}
                          alt=""
                          className="w-[35px] h-[35px] rounded-full"
                        />
                        <span className="text-sm font-medium">OpenNezt</span>
                      </div>
                      <a href="#" className="px-[15px]">
                        <IconlyHome size={15} color={"#6f7f92"} />
                      </a>
                    </div>
                  </div>
                </div>
              </Tabs.Content>
            </Tabs.Root>
          </div>
          <div className="bg-[#ffffff] flex justify-between mt-[15px] rounded-md">
            <span className="flex items-center pl-[16px] py-[6px] pr-[8px]">
              <span className="mr-[10px]">
                <img
                  src={img_avt}
                  alt=""
                  className="w-[30px] h-[30px] rounded-full"
                />
              </span>
              <span className="flex items-center text-[#6f7f92] gap-1 text-sm font-medium">
                Nguyen Trong Truong
                <CheckCircleFilled className="text-blue-500" />
              </span>
            </span>
            <a
              href="#"
              className="w-[50px] h-[50px] flex items-center justify-center"
            >
              <IconlySetting size={18} color={"#2f65b9"} />
            </a>
          </div>
        </div>
        <div className="w-10/12">
          <div className="flex justify-end p-[10px] mb-[18px] bg-[#ffffff] rounded-md">
            <a
              href="#"
              className="flex justify-center items-center w-[50px] h-11"
            >
              <IconlyStar size={18} color={"#6f7f92"} />
            </a>
            <span className="flex items-center justify-center text-[#6f7f92] w-[50px] h-11">
              <ArrowsAltOutlined />
            </span>
          </div>
          <div className="py-[16px]">
            <div className="flex flex-col items-center gap-3 justify-center py-16">
              <p className="w-14 h-14  mb-0">
                <WechatOutlined className="text-8xl w-14 h-14 " />
              </p>
              <p className="mb-0 text-[#6f7f92]">Select a conversation to display messages</p>
              <p className="mb-0 text-[#6f7f92]">or</p>
              <p className="mb-0">
                <a href="#" className="px-[28px] text-sm font-semibold py-[11px] bg-[#2f65b9] rounded-md no-underline text-[#ffffff]">
                  START A NEW CONVERSATION
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
