import { Input } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
import TopCreateAProject from "../components/TopCreateAProject";
import DetailsBotton from "./components/DetailsBotton";

const Details = () => {
  return (
    <div className="w-full h-full">
      <div className="px-[16px] ">
        <div>
          <div className="mt-8 bg-[#ffffff] rounded-md">
          <TopCreateAProject/>
          </div>
          <div className="mt-8 bg-[#ffffff] rounded-md p-8">
            <div className="flex flex-col w-full">
              <DetailsBotton/>
              <div className="flex justify-end">
                <div className="">
                  <Link to="/project/stage">
                    <button
                      height={50}
                      className="mt-[14px] px-[28px] py-3 text-sm bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
                      borderRadius={4}
                      loadingText="Loading..."
                      spinnerPlacement="start"
                    >
                      CREATE PROJECT AND CONTINUE
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

export default Details;
