import React from "react";
import { Link } from "react-router-dom";
import img_logo_project from "../../../../../assets/images/background/1656677703-bpfull.jpg"; 
import TopCreateAProject from "../components/TopCreateAProject";
import ContainerLogo from "./components/ContainerLogo";

const Logo = () => {
  return (
    <div className="w-full h-full">
      <div className="px-[16px] ">
        <div>
          <div className="mt-8 bg-[#ffffff] rounded-md">
            <TopCreateAProject />
          </div>
          <div className="mt-8 bg-[#ffffff] rounded-md p-8">
            <div className="flex flex-col w-full">
              <div className="flex gap-3">
                <div>
                  <img
                    src={img_logo_project}
                    alt=""
                    className="w-[150px] h-[150px] rounded-md"
                  />
                </div>
                <div className="text-[#6f7f92]">
                  <p className="my-[16px]">
                    Upload an image to use as a profile logo for this project.
                    The image will be shown on the main group page, and in
                    search results.
                  </p>
                  <p>
                    To skip the group profile logo upload process, hit the Next
                    Step button.
                  </p>
                </div>
              </div>
              <ContainerLogo />
              <div className="flex justify-end">
                <div className="">
                  <Link to="/project/additional-info" className="mt-[14px]">
                    <button
                      height={50}
                      className="mt-[14px] px-[28px] py-3 text-sm bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
                    >
                      BACK TO PREVIOUS STEP
                    </button>
                  </Link>
                  <Link
                    to="/project/cover-image"
                    className="mt-[14px] ml-[14px]"
                  >
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

export default Logo;
