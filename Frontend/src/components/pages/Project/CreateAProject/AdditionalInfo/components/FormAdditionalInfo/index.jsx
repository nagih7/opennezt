import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText } from "@chakra-ui/react";
import React from "react";

const FormAdditionalInfo = () => {
  return (
    <form action="">
      <div className="flex flex-col w-full">
        <div className="relative mb-8">
          <SelectRoot
            height={50}
            width={"100%"}
            className="w-full border-[1px] outline-none border-gray-200 rounded-md flex justify-center "
            multiple
            size="sm"
          >
            <SelectTrigger>
              <SelectValueText className="p-[6px]" placeholder=" " />
            </SelectTrigger>
            <SelectContent width={"100%"} className="w-full">
              <SelectItem className="p-[12px] w-full outline-none  rounded-md"></SelectItem>
            </SelectContent>
          </SelectRoot>
          <label
            htmlFor=""
            className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
          >
            Name
          </label>
        </div>
        <div className="relative mb-8">
          <textarea
            type="url"
            placeholder=" "
            className="p-[16px] w-full border-[1px] h-40 outline-none border-gray-200 rounded-md "
          />
          <label
            htmlFor=""
            className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
          >
            Description
          </label>
        </div>
        <div className="relative mb-8">
          <input
            height={50}
            type="url"
            placeholder=" "
            className="p-[16px] w-full border-[1px] outline-none border-gray-200 rounded-md "
          />
          <label
            htmlFor=""
            className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
          >
            Content
          </label>
        </div>
      </div>
    </form>
  );
};

export default FormAdditionalInfo;
