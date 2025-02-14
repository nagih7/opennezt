import React from "react";
import { CheckCircleFilled } from "@ant-design/icons";
import { IconlyMoreCircle } from "components/UI/Iconly";
import anh_1 from "assets/images/background/cute-little-girl-with-handmaded-wings-running-outdoors-field-having-fun-copy.webp";
import anh_angry from "assets/images/icon/logo/angry.png";
import anh_like from "assets/images/icon/logo/like.png";
import anh_happy from "assets/images/icon/logo/happy.png";
import avt from "assets/images/background/avt.jpg";
import { IconlyChat } from "components/UI/Iconly";
import { IconlyHeart } from "components/UI/Iconly";
import { IconlySend } from "components/UI/Iconly";
import { IconlyEdit } from "components/UI/Iconly";

function Article() {
  return (
    <div className="bg-[#ffffff] w-[800px] max-h-full mb-8 rounded-md p-8">
      <div className="flex items-center gap-3">
        <div className="w-[65px]">
          <img src={avt} className="w-[65px]  rounded-full" />
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col gap-2 w-9/12 text-base font-medium">
            <div className="flex items-center gap-2">
              Vuong Manh Nghia
              <CheckCircleFilled className="text-[#3897f0]" />
              <span className="text-sm">posted an update in the group</span>
              <span className="text-sm">Three Amigos</span>
            </div>
            <span className="text-xs text-gray-500">5 mins ago</span>
          </div>
          <IconlyMoreCircle size={30} color={"black"} className="w-3/12" />
        </div>
      </div>
      <div className="mt-6">
        <p className="my-[6px]">icon</p>
      </div>
      <div>
        <img src={anh_1} />
      </div>
      <div className="flex items-center border-b-[1px] border-gray-200 pb-2 text-sm gap-2 mt-[18px]">
        <div className="pr-[15px]">
          <ul className="flex relative top-2 gap-2 pl-0">
            <li>
              <img src={anh_angry} className="w-6 h-6" />
            </li>
            <li>
              <img
                src={anh_happy}
                className="absolute left-[15px] top-0 w-6 h-6"
              />
            </li>
            <li>
              <img
                src={anh_like}
                className="absolute left-[30px] top-0 w-6 h-6"
              />
            </li>
          </ul>
        </div>
        <span className="text-[#6f7f92]">
          <span>Reacted by </span>
          <a
            href="#"
            className="text-black font-medium text-current no-underline"
          >
            Vuong Manh Nghia
          </a>
          <span> And</span>
          <span className="font-medium text-black"> 7 Others</span>
        </span>
        <a
          href="#"
          className="text-current no-underline text-sm font-medium text-[#517ec5]"
        >
          3 Comments
        </a>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 pt-[16px] text-[#6f7f92]">
          <div className="flex items-center gap-1">
            <IconlyHeart size={25} color={"#6f7f92"} />
            <span className="text-sm">Like</span>
          </div>
          <a
            href="#"
            className="flex items-center gap-1 text-current no-underline"
          >
            <IconlyChat size={20} color={"#6f7f92"} />
            <span className="text-sm">Comment</span>
          </a>
        </div>
        <div className="flex items-center gap-1 pt-[16px] text-[#6f7f92]">
          <IconlySend size={22} color={"#6f7f92"} />
          <span>Share</span>
        </div>
      </div>
      <div className="flex items-center w-full justify-between p-[10px] rounded-md border-[1px] border-gray-200 gap-3 mt-[20px]">
        <div className="w-8 h-8">
          <img src={avt} className="rounded-full w-8 h-8" />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <input
              type="text"
              placeholder="Write a comment..."
              className="w-[630px] h-9 bg-[#ffffff] pr-[50px] outline-none"
            />
          </div>

          <button className="w-9 h-9 bg-[#f8f9fa] rounded-md flex items-center justify-center">
            <IconlyEdit size={20} color={"#6f7f92"} />
          </button>
        </div>
      </div>
      <div className="pt-[20px]">
        <ul className="pl-0">
          <li>
            <div className="flex items-center gap-2">
              <div className="w-[40px] h-[40px]">
                <img src={avt} className="rounded-full" />
              </div>
              <div className="flex items-center">
                <a
                  href="#"
                  className="flex items-center gap-1 text-sm font-medium no-underline text-black"
                >
                  <span className="hover:text-[#3897f0]">Vuong Manh Nghia</span>
                  <CheckCircleFilled className="text-[#3897f0] w-[14px] h-[14px]" />
                </a>
                <div className="pl-3">
                  <span className="text-[#6f7f92] text-xs">replied</span>
                  <a
                    href="#"
                    className="text-[#6f7f92] text-xs no-underline hover:underline"
                  >
                    <span> 2 years ago</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center py-[12px] bg-[#f8f9fa] rounded-md px-[16px] ml-[56px] my-[5px]">
              <p className="text-sm mb-0">superb!! Great Work..</p>
            </div>
            <div className="flex items-center gap-3 py-[5px] ml-[56px]">
              <div className="flex items-center gap-1">
                <img src={anh_like} className="w-[18px] h-[18px]" />
                <span className="text-xs text-[#6f7f92]">Like</span>
              </div>
              <a
                href="#"
                className="no-underline text-[#6f7f92] text-xs font-medium"
              >
                Reply
              </a>
              <div>
                <div className="flex items-center gap-2">
                  <div>
                    <div>
                      <ul className="pl-0">
                        <li>
                          <img src={anh_angry} className="w-[18px] h-[18px]" />
                        </li>
                      </ul>
                    </div>
                  </div>
                  <span className="text-xs text-[#6f7f92]">
                    Reacted by
                    <a
                      href="#"
                      className="no-underline ml-[2px] text-black font-medium"
                    >
                      Marvin McKinney
                    </a>{" "}
                    And
                    <span className="text-black"> 1 Other</span>
                  </span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Article;
