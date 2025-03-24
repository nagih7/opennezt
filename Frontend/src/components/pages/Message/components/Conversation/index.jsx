import {
  IconlyArrowLeft2,
  IconlyMoreCircle,
  IconlySend,
  IconlyStar,
} from "components/UI/Iconly";

import {
  ArrowsAltOutlined,
  LinkOutlined,
  MoreOutlined,
  RollbackOutlined,
  WechatOutlined,
} from "@ant-design/icons";
import img_avt from "../../../../../assets/images/background/avt.jpg";
import React from "react";
import LeftMessage from "../LeftMessage";
import { CheckCircleFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Conversation = () => {
  return (
    <div className="w-full h-auto px-[16px] py-8">
      <div className="flex w-full gap-8">
        <div className="w-4/12">
          {/* Left Message */}
          <LeftMessage />
        </div>
        <div className="w-10/12 h-auto">
          <div className="flex justify-between p-[10px] mb-[18px] bg-[#ffffff] rounded-md">
            <div className="flex items-center">
              <Link
                to={"/messages"}
                className="flex justify-center items-center w-[50px] h-11"
              >
                <IconlyArrowLeft2 size={18} color={"#6f7f92"} />
              </Link>
              <div className="flex items-center">
                <span className="mr-[8px]">
                  <img
                    src={img_avt}
                    alt=""
                    className=" w-[35px] h-[35px] rounded-full"
                  />
                </span>
                <span className="flex items-center gap-1">
                  Vuong Manh Nghia
                  <CheckCircleFilled className="text-blue-500" />
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <span className="flex items-center justify-center text-[#6f7f92] w-[50px] h-11">
                <ArrowsAltOutlined />
              </span>
              <span className="flex items-center justify-center text-[#6f7f92] w-[50px] h-11">
                <MoreOutlined />
              </span>
            </div>
          </div>
          <div className="flex flex-col text-[#6f7f92] items-center w-full">
            <div className="flex-1 max-h-[507px] overflow-y-scroll scrollbar-hide bg-[#ffffff] w-full">
              <div className="flex justify-center pt-[15px] pb-[1px] w-full">
                <div className="px-[10px] py-[5px]">
                  <span className="text-xs">Start of conversation</span>
                </div>
              </div>
              {/* chat */}
              <div className="relative w-full flex flex-col items-center justify-center">
                <div className="after:z-20 px-[11px] after:w-full bg-[#eaeff8] after:border-b-[1px] after:border-gray-200 after:absolute after:top-[23px] after:left-0 rounded-md text-xs font-semibold text-[#2f65b9] py-[5px] my-[11px]">
                  November 28, 2024
                </div>
                {/* Left */}
                <div className="flex gap-[10px] mb-[15px] px-[15px] w-full">
                  <div className="w-[35px] h-[35px]">
                    <img
                      src={img_avt}
                      alt=""
                      className="w-[35px] h-[35px] rounded-full "
                    />
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <div className="mb-[5px]"></div>
                    <ul className="mb-0 pl-0 w-full">
                      <div className="group flex pr-[10px] mb-[10px] w-full">
                        <div className="flex items-center bg-[#f8f9fa] rounded-md w-fit px-[12px] py-[7px]">
                          <span className="text-sm font-medium">
                            <p className="mb-0">Ê, Trường?</p>
                          </span>
                          <span className="ml-[10px] text-xs font-semibold">
                            <span>11:49</span>
                          </span>
                        </div>
                        <span className="ml-[5px] hidden items-center group-hover:flex transition-opacity duration-300 ease-in-out">
                          <span className="mx-[5px] cursor-pointer">
                            <IconlyStar size={15} color={"#000000"} />
                          </span>
                          <span className="mx-[5px] cursor-pointer">
                            <RollbackOutlined className="w-[15px] h-[15px] text-black" />
                          </span>
                          <span className="mx-[5px] cursor-pointer">
                            <MoreOutlined className="w-[15px] h-[15px] text-black" />
                          </span>
                        </span>
                      </div>
                      <div className="group flex pr-[10px] mb-[10px] w-full">
                        <div className="flex items-center bg-[#f8f9fa] rounded-md w-fit px-[12px] py-[7px]">
                          <span className="text-sm font-medium">
                            <p className="mb-0">Vào OpenNezt không ?</p>
                          </span>
                          <span className="ml-[10px] text-xs font-semibold">
                            <span>11:49</span>
                          </span>
                        </div>
                        <span className="ml-[5px] hidden items-center group-hover:flex transition-opacity duration-300 ease-in-out">
                          <span className="mx-[5px] cursor-pointer">
                            <IconlyStar size={15} color={"#000000"} />
                          </span>
                          <span className="mx-[5px] cursor-pointer">
                            <RollbackOutlined className="w-[15px] h-[15px] text-black" />
                          </span>
                          <span className="mx-[5px] cursor-pointer">
                            <MoreOutlined className="w-[15px] h-[15px] text-black" />
                          </span>
                        </span>
                      </div>
                    </ul>
                  </div>
                </div>
                {/* Right*/}
                <div className="flex justify-end gap-[10px] mb-[15px] px-[15px] w-full flex-row-reverse">
                  <div className="w-[35px] h-[35px]">
                    <img
                      src={img_avt}
                      alt=""
                      className="w-[35px] h-[35px] rounded-full "
                    />
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <div className="mb-[5px]"></div>
                    <ul className="mb-0 pl-0 w-full">
                      <div className="group flex flex-row-reverse pl-[10px] mb-[10px] w-full">
                        <div className="flex items-center bg-[#f8f9fa] rounded-md w-fit px-[12px] py-[7px]">
                          <span className="text-sm font-medium">
                            <p className="mb-0">Omg bô</p>
                          </span>
                          <span className="ml-[10px] text-xs font-semibold">
                            <span>11:50</span>
                          </span>
                        </div>
                        <span className="ml-[5px] hidden items-center group-hover:flex transition-opacity duration-300 ease-in-out">
                          <span className="mx-[5px] cursor-pointer">
                            <MoreOutlined className="w-[15px] h-[15px] text-black" />
                          </span>
                          <span className="mx-[5px] cursor-pointer">
                            <IconlyStar size={15} color={"#000000"} />
                          </span>
                        </span>
                      </div>
                      <div className="group flex flex-row-reverse pl-[10px] mb-[10px] w-full">
                        <div className="flex items-center bg-[#f8f9fa] rounded-md w-fit px-[12px] py-[7px]">
                          <span className="text-sm font-medium">
                            <p className="mb-0">Ok phang đi sợ dit j</p>
                          </span>
                          <span className="ml-[10px] text-xs font-semibold">
                            <span>11:50</span>
                          </span>
                        </div>
                        <span className="ml-[5px] hidden items-center group-hover:flex transition-opacity duration-300 ease-in-out">
                          <span className="mx-[5px] cursor-pointer">
                            <MoreOutlined className="w-[15px] h-[15px] text-black" />
                          </span>
                          <span className="mx-[5px] cursor-pointer">
                            <IconlyStar size={15} color={"#000000"} />
                          </span>
                        </span>
                      </div>
                    </ul>
                  </div>
                </div>
                {/* Left */}
                <div className="flex gap-[10px] mb-[15px] px-[15px] w-full">
                  <div className="w-[35px] h-[35px]">
                    <img
                      src={img_avt}
                      alt=""
                      className="w-[35px] h-[35px] rounded-full "
                    />
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <div className="mb-[5px]"></div>
                    <ul className="mb-0 pl-0 w-full">
                      <div className="group flex pr-[10px] mb-[10px] w-full">
                        <div className="flex items-center bg-[#f8f9fa] rounded-md w-fit px-[12px] py-[7px]">
                          <span className="text-sm font-medium">
                            <p className="mb-0">Ê, Trường?</p>
                          </span>
                          <span className="ml-[10px] text-xs font-semibold">
                            <span>11:49</span>
                          </span>
                        </div>
                        <span className="ml-[5px] hidden items-center group-hover:flex transition-opacity duration-300 ease-in-out">
                          <span className="mx-[5px] cursor-pointer">
                            <IconlyStar size={15} color={"#000000"} />
                          </span>
                          <span className="mx-[5px] cursor-pointer">
                            <RollbackOutlined className="w-[15px] h-[15px] text-black" />
                          </span>
                          <span className="mx-[5px] cursor-pointer">
                            <MoreOutlined className="w-[15px] h-[15px] text-black" />
                          </span>
                        </span>
                      </div>
                      <div className="group flex pr-[10px] mb-[10px] w-full">
                        <div className="flex items-center bg-[#f8f9fa] rounded-md w-fit px-[12px] py-[7px]">
                          <span className="text-sm font-medium">
                            <p className="mb-0">Vào OpenNezt không ?</p>
                          </span>
                          <span className="ml-[10px] text-xs font-semibold">
                            <span>11:49</span>
                          </span>
                        </div>
                        <span className="ml-[5px] hidden items-center group-hover:flex transition-opacity duration-300 ease-in-out">
                          <span className="mx-[5px] cursor-pointer">
                            <IconlyStar size={15} color={"#000000"} />
                          </span>
                          <span className="mx-[5px] cursor-pointer">
                            <RollbackOutlined className="w-[15px] h-[15px] text-black" />
                          </span>
                          <span className="mx-[5px] cursor-pointer">
                            <MoreOutlined className="w-[15px] h-[15px] text-black" />
                          </span>
                        </span>
                      </div>
                    </ul>
                  </div>
                </div>
                {/* Right*/}
                <div className="flex justify-end gap-[10px] mb-[15px] px-[15px] w-full flex-row-reverse">
                  <div className="w-[35px] h-[35px]">
                    <img
                      src={img_avt}
                      alt=""
                      className="w-[35px] h-[35px] rounded-full "
                    />
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <div className="mb-[5px]"></div>
                    <ul className="mb-0 pl-0 w-full">
                      <div className="group flex flex-row-reverse pl-[10px] mb-[10px] w-full">
                        <div className="flex items-center bg-[#f8f9fa] rounded-md w-fit px-[12px] py-[7px]">
                          <span className="text-sm font-medium">
                            <p className="mb-0">Omg bô</p>
                          </span>
                          <span className="ml-[10px] text-xs font-semibold">
                            <span>11:50</span>
                          </span>
                        </div>
                        <span className="ml-[5px] hidden items-center group-hover:flex transition-opacity duration-300 ease-in-out">
                          <span className="mx-[5px] cursor-pointer">
                            <MoreOutlined className="w-[15px] h-[15px] text-black" />
                          </span>
                          <span className="mx-[5px] cursor-pointer">
                            <IconlyStar size={15} color={"#000000"} />
                          </span>
                        </span>
                      </div>
                      <div className="group flex flex-row-reverse pl-[10px] mb-[10px] w-full">
                        <div className="flex items-center bg-[#f8f9fa] rounded-md w-fit px-[12px] py-[7px]">
                          <span className="text-sm font-medium">
                            <p className="mb-0">Ok phang đi sợ dit j</p>
                          </span>
                          <span className="ml-[10px] text-xs font-semibold">
                            <span>11:50</span>
                          </span>
                        </div>
                        <span className="ml-[5px] hidden items-center group-hover:flex transition-opacity duration-300 ease-in-out">
                          <span className="mx-[5px] cursor-pointer">
                            <MoreOutlined className="w-[15px] h-[15px] text-black" />
                          </span>
                          <span className="mx-[5px] cursor-pointer">
                            <IconlyStar size={15} color={"#000000"} />
                          </span>
                        </span>
                      </div>
                    </ul>
                  </div>
                </div>
                {/* Left */}
                <div className="flex gap-[10px] mb-[15px] px-[15px] w-full">
                  <div className="w-[35px] h-[35px]">
                    <img
                      src={img_avt}
                      alt=""
                      className="w-[35px] h-[35px] rounded-full "
                    />
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <div className="mb-[5px]"></div>
                    <ul className="mb-0 pl-0 w-full">
                      <div className="group flex pr-[10px] mb-[10px] w-full">
                        <div className="flex items-center bg-[#f8f9fa] rounded-md w-fit px-[12px] py-[7px]">
                          <span className="text-sm font-medium">
                            <p className="mb-0">Ê, Trường?</p>
                          </span>
                          <span className="ml-[10px] text-xs font-semibold">
                            <span>11:49</span>
                          </span>
                        </div>
                        <span className="ml-[5px] hidden items-center group-hover:flex transition-opacity duration-300 ease-in-out">
                          <span className="mx-[5px] cursor-pointer">
                            <IconlyStar size={15} color={"#000000"} />
                          </span>
                          <span className="mx-[5px] cursor-pointer">
                            <RollbackOutlined className="w-[15px] h-[15px] text-black" />
                          </span>
                          <span className="mx-[5px] cursor-pointer">
                            <MoreOutlined className="w-[15px] h-[15px] text-black" />
                          </span>
                        </span>
                      </div>
                      <div className="group flex pr-[10px] mb-[10px] w-full">
                        <div className="flex items-center bg-[#f8f9fa] rounded-md w-fit px-[12px] py-[7px]">
                          <span className="text-sm font-medium">
                            <p className="mb-0">Vào OpenNezt không ?</p>
                          </span>
                          <span className="ml-[10px] text-xs font-semibold">
                            <span>11:49</span>
                          </span>
                        </div>
                        <span className="ml-[5px] hidden items-center group-hover:flex transition-opacity duration-300 ease-in-out">
                          <span className="mx-[5px] cursor-pointer">
                            <IconlyStar size={15} color={"#000000"} />
                          </span>
                          <span className="mx-[5px] cursor-pointer">
                            <RollbackOutlined className="w-[15px] h-[15px] text-black" />
                          </span>
                          <span className="mx-[5px] cursor-pointer">
                            <MoreOutlined className="w-[15px] h-[15px] text-black" />
                          </span>
                        </span>
                      </div>
                    </ul>
                  </div>
                </div>
                {/* Right*/}
                <div className="flex justify-end gap-[10px] mb-[15px] px-[15px] w-full flex-row-reverse">
                  <div className="w-[35px] h-[35px]">
                    <img
                      src={img_avt}
                      alt=""
                      className="w-[35px] h-[35px] rounded-full "
                    />
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <div className="mb-[5px]"></div>
                    <ul className="mb-0 pl-0 w-full">
                      <div className="group flex flex-row-reverse pl-[10px] mb-[10px] w-full">
                        <div className="flex items-center bg-[#f8f9fa] rounded-md w-fit px-[12px] py-[7px]">
                          <span className="text-sm font-medium">
                            <p className="mb-0">Omg bô</p>
                          </span>
                          <span className="ml-[10px] text-xs font-semibold">
                            <span>11:50</span>
                          </span>
                        </div>
                        <span className="ml-[5px] hidden items-center group-hover:flex transition-opacity duration-300 ease-in-out">
                          <span className="mx-[5px] cursor-pointer">
                            <MoreOutlined className="w-[15px] h-[15px] text-black" />
                          </span>
                          <span className="mx-[5px] cursor-pointer">
                            <IconlyStar size={15} color={"#000000"} />
                          </span>
                        </span>
                      </div>
                      <div className="group flex flex-row-reverse pl-[10px] mb-[10px] w-full">
                        <div className="flex items-center bg-[#f8f9fa] rounded-md w-fit px-[12px] py-[7px]">
                          <span className="text-sm font-medium">
                            <p className="mb-0">Ok phang đi sợ dit j</p>
                          </span>
                          <span className="ml-[10px] text-xs font-semibold">
                            <span>11:50</span>
                          </span>
                        </div>
                        <span className="ml-[5px] hidden items-center group-hover:flex transition-opacity duration-300 ease-in-out">
                          <span className="mx-[5px] cursor-pointer">
                            <MoreOutlined className="w-[15px] h-[15px] text-black" />
                          </span>
                          <span className="mx-[5px] cursor-pointer">
                            <IconlyStar size={15} color={"#000000"} />
                          </span>
                        </span>
                      </div>
                    </ul>
                  </div>
                </div>
                {/* Left */}
                <div className="flex gap-[10px] mb-[15px] px-[15px] w-full">
                  <div className="w-[35px] h-[35px]">
                    <img
                      src={img_avt}
                      alt=""
                      className="w-[35px] h-[35px] rounded-full "
                    />
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <div className="mb-[5px]"></div>
                    <ul className="mb-0 pl-0 w-full">
                      <div className="group flex pr-[10px] mb-[10px] w-full">
                        <div className="flex items-center bg-[#f8f9fa] rounded-md w-fit px-[12px] py-[7px]">
                          <span className="text-sm font-medium">
                            <p className="mb-0">Ê, Trường?</p>
                          </span>
                          <span className="ml-[10px] text-xs font-semibold">
                            <span>11:49</span>
                          </span>
                        </div>
                        <span className="ml-[5px] hidden items-center group-hover:flex transition-opacity duration-300 ease-in-out">
                          <span className="mx-[5px] cursor-pointer">
                            <IconlyStar size={15} color={"#000000"} />
                          </span>
                          <span className="mx-[5px] cursor-pointer">
                            <RollbackOutlined className="w-[15px] h-[15px] text-black" />
                          </span>
                          <span className="mx-[5px] cursor-pointer">
                            <MoreOutlined className="w-[15px] h-[15px] text-black" />
                          </span>
                        </span>
                      </div>
                      <div className="group flex pr-[10px] mb-[10px] w-full">
                        <div className="flex items-center bg-[#f8f9fa] rounded-md w-fit px-[12px] py-[7px]">
                          <span className="text-sm font-medium">
                            <p className="mb-0">Vào OpenNezt không ?</p>
                          </span>
                          <span className="ml-[10px] text-xs font-semibold">
                            <span>11:49</span>
                          </span>
                        </div>
                        <span className="ml-[5px] hidden items-center group-hover:flex transition-opacity duration-300 ease-in-out">
                          <span className="mx-[5px] cursor-pointer">
                            <IconlyStar size={15} color={"#000000"} />
                          </span>
                          <span className="mx-[5px] cursor-pointer">
                            <RollbackOutlined className="w-[15px] h-[15px] text-black" />
                          </span>
                          <span className="mx-[5px] cursor-pointer">
                            <MoreOutlined className="w-[15px] h-[15px] text-black" />
                          </span>
                        </span>
                      </div>
                    </ul>
                  </div>
                </div>
                {/* Right*/}
                <div className="flex justify-end gap-[10px] mb-[15px] px-[15px] w-full flex-row-reverse">
                  <div className="w-[35px] h-[35px]">
                    <img
                      src={img_avt}
                      alt=""
                      className="w-[35px] h-[35px] rounded-full "
                    />
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <div className="mb-[5px]"></div>
                    <ul className="mb-0 pl-0 w-full">
                      <div className="group flex flex-row-reverse pl-[10px] mb-[10px] w-full">
                        <div className="flex items-center bg-[#f8f9fa] rounded-md w-fit px-[12px] py-[7px]">
                          <span className="text-sm font-medium">
                            <p className="mb-0">Omg bô</p>
                          </span>
                          <span className="ml-[10px] text-xs font-semibold">
                            <span>11:50</span>
                          </span>
                        </div>
                        <span className="ml-[5px] hidden items-center group-hover:flex transition-opacity duration-300 ease-in-out">
                          <span className="mx-[5px] cursor-pointer">
                            <MoreOutlined className="w-[15px] h-[15px] text-black" />
                          </span>
                          <span className="mx-[5px] cursor-pointer">
                            <IconlyStar size={15} color={"#000000"} />
                          </span>
                        </span>
                      </div>
                      <div className="group flex flex-row-reverse pl-[10px] mb-[10px] w-full">
                        <div className="flex items-center bg-[#f8f9fa] rounded-md w-fit px-[12px] py-[7px]">
                          <span className="text-sm font-medium">
                            <p className="mb-0">Ok phang đi sợ dit j</p>
                          </span>
                          <span className="ml-[10px] text-xs font-semibold">
                            <span>11:50</span>
                          </span>
                        </div>
                        <span className="ml-[5px] hidden items-center group-hover:flex transition-opacity duration-300 ease-in-out">
                          <span className="mx-[5px] cursor-pointer">
                            <MoreOutlined className="w-[15px] h-[15px] text-black" />
                          </span>
                          <span className="mx-[5px] cursor-pointer">
                            <IconlyStar size={15} color={"#000000"} />
                          </span>
                        </span>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* inbox */}
            <div className="flex items-center border-t border-gray-200 w-full bg-[#ffffff]">
              <div className="flex justify-center items-center w-[50px] h-[40px] my-1">
                <LinkOutlined className="text-xl w-[30px] h-[30px]" />
              </div>
              <div className="py-[12px] w-full">
                <input
                  type="text"
                  placeholder="Write your message"
                  className="outline-none w-full"
                />
              </div>
              <div className="min-w-[40px] mx-[10px] my-1 h-[40px] flex justify-center rounded-md bg-[#2f65b9] items-center ">
                <IconlySend size={24} color={"#ffffff"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
