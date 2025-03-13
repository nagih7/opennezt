import {
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import TopCreateAProject from "../components/TopCreateAProject";
import { IconlyDelete } from "components/UI/Iconly";
import { PlusOutlined } from "@ant-design/icons";
import FormFundingScources from "./components/FormFundingScources";

const FunfingSources = () => {
  const [forms, setForms] = useState([]);

  const handleAddRevenueClick = () => {
    // Thêm một form mới vào mảng forms mỗi lần click
    setForms((prevForms) => [...prevForms, {}]);
  };

  const handleRemoveForm = (index) => {
    // Xóa form tại index đã cho
    setForms((prevForms) => prevForms.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full h-full">
      <div className="px-[16px] ">
        <div>
          <div className="mt-8 bg-[#ffffff] rounded-md">
            <TopCreateAProject />
          </div>
          <div className="mt-8 bg-[#ffffff] rounded-md p-8">
            <div className="flex flex-col w-full">
              <div className="flex justify-end">
                <div
                  className="flex items-center gap-1 cursor-pointer bg-[#2f65b9] rounded-md text-[#ffffff] px-[20px] py-2 mb-[14px]"
                  onClick={handleAddRevenueClick}
                >
                  <PlusOutlined className="text-[#ffffff]" />
                  <button
                    height={50}
                    className="text-xs bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
                    borderRadius={4}
                    loadingText="Loading..."
                    spinnerPlacement="start"
                  >
                    ADD REVENUE
                  </button>
                </div>
              </div>
              <FormFundingScources/>
              {forms.map((_, index) => (
                <form key={index} action="">
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
                  {/* Add a Remove button */}
                  <div className="flex justify-end">
                    <div className="flex items-center gap-1 px-[20px] py-2 mb-[14px] bg-[#f8eaea] cursor-pointer text-[#f14646] rounded-md">
                      <IconlyDelete size={18} color={"#f14646"} />
                      <button
                        type="button"
                        onClick={() => handleRemoveForm(index)}
                        className="text-xs font-semibold"
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                </form>
              ))}
              <div className="flex justify-end">
                <div className="">
                  <Link to="/project/revenue" className="mt-[14px]">
                    <button
                      height={50}
                      className="mt-[14px] px-[28px] py-3 text-sm bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
                      borderRadius={4}
                      loadingText="Loading..."
                      spinnerPlacement="start"
                    >
                      BACK TO PREVIOUS STEP
                    </button>
                  </Link>
                  <Link
                    to="/project/additional-info"
                    className="mt-[14px] ml-[14px]"
                  >
                    <button
                      height={50}
                      className="mt-[14px] px-[28px] py-3 text-sm bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
                      borderRadius={4}
                      loadingText="Loading..."
                      spinnerPlacement="start"
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

export default FunfingSources;
