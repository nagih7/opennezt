import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@chakra-ui/react";
import React from "react";

const StageBotton = () => {
  return (
    <div>
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
            <SelectItem className="p-[12px] w-full outline-none  rounded-md"></SelectItem>
          </SelectContent>
        </SelectRoot>
        <label
          htmlFor=""
          className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
        >
          Stage
        </label>
      </div>
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
            <SelectItem className="p-[12px] w-full outline-none  rounded-md"></SelectItem>
          </SelectContent>
        </SelectRoot>
        <label
          htmlFor=""
          className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
        >
          Industries
        </label>
      </div>
    </div>
  );
};

export default StageBotton;
