import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import TopCreateAProject from "../components/TopCreateAProject";
const Industry = () => {
  return (
    <div className="w-full h-full">
      <div className="px-[16px] ">
        <div>
          <div className="mt-8 bg-[#ffffff] rounded-md">
          <TopCreateAProject/>
          </div>
          <div className="mt-8 bg-[#ffffff] rounded-md p-8">
            <div className="flex flex-col w-full">
              {/* <div className="mb-[24px]">
                <label
                  htmlFor=""
                  className=" bg-[#ffffff] px-1  border-gray-200 "
                >
                  <input type="checkbox" className="mr-[10px] w-4 h-4"/>
                  Enable Project
                </label>
              </div>
              <fieldset>
                <legend className="mb-[24px] font-medium">Privacy Options</legend>
                <div>
                    <div className="p-[16px] flex flex-col gap-1 mb-8 bg-[#f8f9fa] rounded-md">
                        <label htmlFor="">
                            <input type="radio" className="w-4 h-4 mr-[5px]"/>
                            <font> This is a public project</font>
                        </label>
                        <ul className="pl-10 ml-0 mb-0 text-sm flex flex-col gap-1 text-[#6f7f92]">
                            <li>Any site member can join this project.</li>
                            <li>This project will be listed in the projects directory and in search results.</li>
                            <li>Project content and activity will be visible to any site member.</li>
                        </ul>
                    </div>
                    <div className="p-[16px] flex flex-col gap-1 mb-8 bg-[#f8f9fa] rounded-md">
                        <label htmlFor="">
                            <input type="radio" className="w-4 h-4 mr-[5px]"/>
                            <font> This is a private project</font>
                        </label>
                        <ul className="pl-10 ml-0 mb-0 text-sm flex flex-col gap-1 text-[#6f7f92]">
                            <li>Only users who request membership and are accepted can join the project.</li>
                            <li>This project will be listed in the projects directory and in search results.</li>
                            <li>Project content and activity will only be visible to members of the project.</li>
                        </ul>
                    </div>
                    <div className="p-[16px] flex flex-col gap-1 mb-8 bg-[#f8f9fa] rounded-md">
                        <label htmlFor="">
                            <input type="radio" className="w-4 h-4 mr-[5px]"/>
                            <font> This is a hidden project</font>
                        </label>
                        <ul className="pl-10 ml-0 mb-0 text-sm flex flex-col gap-1 text-[#6f7f92]">
                            <li>Only users who are invited can join the project.</li>
                            <li>This project will be listed in the projects directory and in search results.</li>
                            <li>Project content and activity will only be visible to members of the project.</li>
                        </ul>
                    </div>
                </div>
              </fieldset>
              <fieldset className="mt-8">
                <legend className="mb-[24px] font-medium">Project Invitations</legend>
                <p className="my-[16px] text-[#6f7f92]">Which members of this project are allowed to invite others?</p>
                <div>
                    <div className="p-[16px] text-[#6f7f92] mb-8 bg-[#f8f9fa] rounded-md">
                        <input type="radio" name="" id="" className="w-4 h-4 mr-[5px]" />
                        <font> All project members</font>
                    </div>
                    <div className="p-[16px] text-[#6f7f92] mb-8 bg-[#f8f9fa] rounded-md">
                        <input type="radio" name="" id="" className="w-4 h-4 mr-[5px]" />
                        <font> Project admins and mods only</font>
                    </div>
                    <div className="p-[16px] text-[#6f7f92] mb-8 bg-[#f8f9fa] rounded-md">
                        <input type="radio" name="" id="" className="w-4 h-4 mr-[5px]" />
                        <font> Project admins only</font>
                    </div>
                </div>
              </fieldset>
              <div>
                <fieldset>
                    <legend className="font-medium">Project Messages</legend>
                    <p className="text-[#6f7f92] my-[16px]">Enable Project Messages feature for this project</p>
                    <p className="text-[#6f7f92] my-[16px]">All members of the project will be automatically joined to the conversation of this project</p>
                    <label htmlFor="" className="mr-[10px]">
                        <input type="radio" className="mr-[10px] w-4 h-4"/>
                        Enabled
                    </label>
                    <label htmlFor="">
                        <input type="radio" className="mr-[10px] w-4 h-4"/>
                        Disabled
                    </label>
                </fieldset>
              </div> */}
              <div className="relative mb-8">
                <SelectRoot
                  height={50}
                  width={"100%"}
                  className="w-full border-[1px] outline-none border-gray-200 rounded-md flex justify-center "
                  multiple
                  size="sm"
                >
                  <SelectTrigger>
                    <SelectValueText className="p-[6px]" placeholder="Movie" />
                  </SelectTrigger>
                  <SelectContent width={"100%"} className="w-full">
                      <SelectItem
                        className="p-[12px] w-full outline-none  rounded-md"
                      >
                      </SelectItem>
                  </SelectContent>
                </SelectRoot>
                <label
                  htmlFor=""
                  className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
                >
                  Industries
                </label>
              </div>
              <div className="flex justify-end">
                <div className="">
                  <Link to="/project/details" className="mt-[14px]">
                    <button
                      height={50}
                      className="mt-[14px] px-[28px] py-3 text-sm bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
                    >
                      BACK TO PREVIOUS STEP
                    </button>
                  </Link>
                  <Link to="/project/stage" className="mt-[14px] ml-[14px]">
                    <button
                      height={50}
                      className="mt-[14px] px-[28px] py-3 text-sm bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
                    >
                      NEXT STEP
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Industry;
