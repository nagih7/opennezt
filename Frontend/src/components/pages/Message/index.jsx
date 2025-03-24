import { IconlyStar } from "components/UI/Iconly";

import { ArrowsAltOutlined, WechatOutlined } from "@ant-design/icons";
import React from "react";
import LeftMessage from "./components/LeftMessage";
import { Link } from "react-router-dom";

const Message = () => {
  return (
    <div className="w-full px-[16px] py-8">
      <div className="flex w-full gap-8">
        <div className="w-4/12">
          {/* Left Message */}
          <LeftMessage />
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
              <p className="mb-0 text-[#6f7f92]">
                Select a conversation to display messages
              </p>
              <p className="mb-0 text-[#6f7f92]">or</p>
              <p className="mb-0">
                <Link
                  to={"/messages/new-conversation"}
                  className="px-[28px] text-sm font-semibold py-[11px] bg-[#2f65b9] rounded-md no-underline text-[#ffffff]"
                >
                  START A NEW CONVERSATION
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
