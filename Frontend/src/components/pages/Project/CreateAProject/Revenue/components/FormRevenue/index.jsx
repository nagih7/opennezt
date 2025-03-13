import { Input } from "@chakra-ui/react";
import React from "react";

const FormRevenue = () => {
  return (
    <div>
      <div className="relative mb-8 ">
        <Input
          height={50}
          type="month"
          placeholder=" "
          className="p-[16px] w-full border-[1px] outline-none border-gray-200 rounded-md "
        />
        <label
          htmlFor=""
          className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
        >
          Month / Year
        </label>
      </div>
      <div className="flex w-full gap-8">
        <div className="relative mb-8 w-6/12">
          <Input
            height={50}
            type="url"
            placeholder=" "
            className="p-[16px] w-full border-[1px] outline-none border-gray-200 rounded-md "
          />
          <label
            htmlFor=""
            className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
          >
            Amount
          </label>
        </div>
        <div className="relative mb-8 w-6/12">
          <Input
            height={50}
            type="url"
            placeholder=" "
            className="p-[16px] w-full border-[1px] outline-none border-gray-200 rounded-md "
          />
          <label
            htmlFor=""
            className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
          >
            Currency
          </label>
        </div>
      </div>
    </div>
  );
};

export default FormRevenue;
