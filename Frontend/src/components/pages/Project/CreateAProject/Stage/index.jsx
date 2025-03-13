import React from "react";
import TopCreateAProject from "../components/TopCreateAProject";
import StageBotton from "./components/StageBotton";
import { Link } from "react-router-dom";

const Stage = () => {
  return (
    <div className="w-full h-full">
      <div className="px-[16px] ">
        <div>
          <div className="mt-8 bg-[#ffffff] rounded-md">
            <TopCreateAProject />
          </div>
          <div className="mt-8 bg-[#ffffff] rounded-md p-8">
            <div className="flex flex-col w-full">
              <StageBotton />
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
                  <Link to="/project/revenue" className="mt-[14px] ml-[14px]">
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

export default Stage;
