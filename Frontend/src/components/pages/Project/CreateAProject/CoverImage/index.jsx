import React from "react";
import { Link } from "react-router-dom";
import TopCreateAProject from "../components/TopCreateAProject";
import FormCoverImage from "./components/FormCoverImage";

const CoverImage = () => {
  return (
    <div className="w-full h-full">
      <div className="px-[16px] ">
        <div>
          <div className="mt-8 bg-[#ffffff] rounded-md">
            <TopCreateAProject />
          </div>
          <div className="mt-8 bg-[#ffffff] rounded-md p-8">
            <div className="flex flex-col w-full">
            <FormCoverImage/>
              <div className="flex justify-end">
                <div className="">
                  <Link to="/project/logo" className="mt-[14px]">
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
                  <Link to="/project/detail-project" className="mt-[14px] ml-[14px]">
                    <button
                      height={50}
                      className="mt-[14px] px-[28px] py-3 text-sm bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
                      borderRadius={4}
                      loadingText="Loading..."
                      spinnerPlacement="start"
                    >
                      FINISH
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

export default CoverImage;
