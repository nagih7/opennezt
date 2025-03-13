import React from "react";

const DetailsBotton = () => {
  return (
    <div>
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
          Project Name (required)
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
          Project Description
        </label>
      </div>
    </div>
  );
};

export default DetailsBotton;
