import React, { useState } from "react";
import img_avatar from "assets/images/background/avt.jpg";
import { CheckCircleFilled } from "@ant-design/icons";
import {
  IconlyHome,
  IconlyLogout,
  IconlyMessage,
  IconlyProfile,
  IconlyArrowDown2,
  IconlyArrowUp2,
} from "components/UI/Iconly";

const EditProfile = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex gap-8 w-full py-8 px-[16px]">
      <div className="w-4/12">
        <div className=" ">
          <h6>
            <div
              className="flex items-center justify-between text-[#ffffff] bg-[#2f65b9] py-[16px] px-[20px] rounded-md cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="flex items-center gap-2">
                <IconlyProfile size={18} color={"#ffffff"} />
                Profile Settings
              </div>
              <div
                className={`transition-transform duration-300 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              >
                {isOpen ? (
                  <IconlyArrowUp2 size={18} color={"#ffffff"} />
                ) : (
                  <IconlyArrowDown2 size={18} color={"#ffffff"} />
                )}
              </div>
            </div>
          </h6>
          <div
            className={`mt-3 bg-[#ffffff] overflow-hidden transition-all duration-500 ease-in-out ${
              isOpen ? "max-h-screen" : "max-h-0"
            }`}
          >
            <div className="px-[24px]">
              <div className="px-[24px]">
                <ul className="flex flex-col items-center  mb-0 pl-0">
                  <li className=" w-full text-sm py-[21px] border-b-[1px]  border-gray-200 ">
                    <a href="#" className="text-[#6f7f92]  no-underline ">
                      Professional Background
                    </a>
                  </li>
                  <li className=" w-full text-sm py-[21px] border-b-[1px]  border-gray-200 ">
                    <a href="#" className="text-[#6f7f92]  no-underline ">
                      Expertise
                    </a>
                  </li>
                  <li className=" w-full text-sm py-[21px] ">
                    <a href="#" className="text-[#6f7f92]  no-underline ">
                      Work with me
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-8/12">
        <div className="bg-[#ffffff] p-8 rounded-md">
          <div className="flex items-center gap-3 pb-8 border-b-[1px] border-gray-200 mb-8">
            <div>
              <img
                src={img_avatar}
                alt="avatar"
                className="w-20 h-20 rounded-md"
              />
            </div>
            <div>
              <h4 className="flex items-center">
                Vuong Manh Nghia
                <CheckCircleFilled className="text-[#3897f0] ml-2" />
              </h4>
              <span className="text-[#6f7f92]">Member since 2021</span>
            </div>
          </div>
          <div>
            <ul className="mb-0 pl-0 flex gap-3">
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center bg-[#f8f9fa] h-[60px] w-[60px] rounded-md"
                >
                  <IconlyHome size={25} color={"#6f7f92"} />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center bg-[#f8f9fa] h-[60px] w-[60px] rounded-md"
                >
                  <IconlyProfile size={25} color={"#6f7f92"} />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center bg-[#f8f9fa] h-[60px] w-[60px] rounded-md"
                >
                  <IconlyMessage size={25} color={"#6f7f92"} />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center bg-[#f8f9fa] h-[60px] w-[60px] rounded-md"
                >
                  <IconlyLogout size={25} color={"#6f7f92"} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="bg-[#ffffff] p-8 rounded-md mt-8">
          <div>
            <div className="pb-[20px] mb-8 border-b-[1px] border-gray-200">
              <div>
                <h4 className="">Professional Background</h4>
              </div>
            </div>
            <div>
              <div className="px-[16px]">
                <div className="mb-8 relative">
                  {/* <input type="url" placeholder="heloo" className="p-[16px] border-[1px] border-gray-200 rounded-md " /> */}
                  <textarea
                    name=""
                    id=""
                    className=" w-full outline-none h-60 px-[11px] py-3 border-[1px] border-gray-200"
                  >
                    A highly skilled and results-driven professional with over 8
                    years of experience in data analysis, financial modeling,
                    and market research. Expertise in utilizing advanced data
                    analytics tools such as Python, R, SQL, and Excel to derive
                    actionable insights and improve decision-making processes.
                    Proven track record in delivering high-impact reports and
                    dashboards for executive teams, driving business growth, and
                    optimizing operational efficiency. Adept at transforming
                    complex data into clear and
                  </textarea>
                  <label
                    htmlFor=""
                    className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
                  >
                    Professional Summary
                  </label>
                </div>
              </div>
              <div className="px-[16px]">
                <div className="mb-8 relative">
                  <input type="url" placeholder="Junior" className="p-[16px] w-full border-[1px] outline-none border-gray-200 rounded-md " />
                  {/* <textarea
                    name=""
                    id=""
                    className=" w-full outline-none h-60 px-[11px] py-3 border-[1px] border-gray-200"
                  >
                    A highly skilled and results-driven professional with over 8
                    years of experience in data analysis, financial modeling,
                    and market research. Expertise in utilizing advanced data
                    analytics tools such as Python, R, SQL, and Excel to derive
                    actionable insights and improve decision-making processes.
                    Proven track record in delivering high-impact reports and
                    dashboards for executive teams, driving business growth, and
                    optimizing operational efficiency. Adept at transforming
                    complex data into clear and
                  </textarea> */}
                  <label
                    htmlFor=""
                    className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
                  >
                    Experience Level
                  </label>
                  <p className="mt-[11px] mb-0 flex justify-end">
                    <button className="bg-[#f07a3a] text-xs font-medium py-1 px-[6px] text-[#ffffff] rounded-sm">
                      CHANGE
                    </button>
                  </p>
                </div>
              </div>
              <div className="px-[16px]">
                <div className="mb-8 relative">
                  <input type="url" placeholder="Bachelors" className="p-[16px] w-full border-[1px] outline-none border-gray-200 rounded-md " />
                  {/* <textarea
                    name=""
                    id=""
                    className=" w-full outline-none h-60 px-[11px] py-3 border-[1px] border-gray-200"
                  >
                    A highly skilled and results-driven professional with over 8
                    years of experience in data analysis, financial modeling,
                    and market research. Expertise in utilizing advanced data
                    analytics tools such as Python, R, SQL, and Excel to derive
                    actionable insights and improve decision-making processes.
                    Proven track record in delivering high-impact reports and
                    dashboards for executive teams, driving business growth, and
                    optimizing operational efficiency. Adept at transforming
                    complex data into clear and
                  </textarea> */}
                  <label
                    htmlFor=""
                    className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
                  >
                    Education Level
                  </label>
                  <p className="mt-[11px] mb-0 flex justify-end">
                    <button className="bg-[#f07a3a] text-xs font-medium py-1 px-[6px] text-[#ffffff] rounded-sm">
                      CHANGE
                    </button>
                  </p>
                </div>
              </div>
              <div className="px-[16px]">
                <div className="mb-8 relative">
                  <input type="url" placeholder="Professional Certifications, Bootcamps" className="p-[16px] border-[1px] w-full outline-none border-gray-200 rounded-md " />
                  <label
                    htmlFor=""
                    className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
                  >
                    Certifications
                  </label>
                  <p className="mt-[11px] mb-0 flex justify-end">
                    <button className="bg-[#f07a3a] text-xs font-medium py-1 px-[6px] text-[#ffffff] rounded-sm">
                      CHANGE
                    </button>
                  </p>
                </div>
              </div>
              <div className="px-[16px] flex justify-end">
                <div className="">
										<input type="submit" name="profile-group-edit-submit" id="" className="mt-[14px] px-[28px] py-3 bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"  value="SAVE CHANGES"/>
								</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
