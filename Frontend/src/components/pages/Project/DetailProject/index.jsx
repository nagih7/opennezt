import React from "react";
import { Link } from "react-router-dom";
import img_logo_project from "../../../../assets/images/background/1656677703-bpfull.jpg";
import img_avt from "../../../../assets/images/background/avt.jpg";
import fb_img from "../../../../assets/images/background/left-banner.webp";
import Logo from "../../../../assets/images/logo/OpenNezt_logo_black.png";
import TopCreateAProject from "../CreateAProject/components/TopCreateAProject";
import {
  CheckCircleFilled,
  CloseOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Tabs } from "@chakra-ui/react";
import { LuFolder, LuSquareCheck, LuUser } from "react-icons/lu";
import StageBotton from "../CreateAProject/Stage/components/StageBotton";
import DetailsBotton from "../CreateAProject/Details/components/DetailsBotton";
import FormFundingScources from "../CreateAProject/FundingSources/components/FormFundingScources";
import FormAdditionalInfo from "../CreateAProject/AdditionalInfo/components/FormAdditionalInfo";
import ContainerLogo from "../CreateAProject/Logo/components/ContainerLogo";
import FormCoverImage from "../CreateAProject/CoverImage/components/FormCoverImage";
import FormRevenue from "../CreateAProject/Revenue/components/FormRevenue";

const DetailProject = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full">
        <img
          src="https://wordpress.iqonic.design/product/wp/socialv/wp-content/themes/socialv-themes/assets/images/redux/default-cover.jpg"
          alt=""
          className="h-[400px]"
        />
      </div>

      <div>
        <div className="bg-[#ffffff]">
          <div className="p-8">
            <div className="px-[16px]">
              <div>
                <div className="flex justify-between w-full">
                  <div className="item-left">
                    <div className="flex justify-between gap-3">
                      <div className="p-[4px] mt-[-60px] rounded-md bg-[#ffffff]">
                        <a href="#">
                          <img
                            src={img_logo_project}
                            alt=""
                            className="w-[150px] h-[150px] rounded-md"
                          />
                        </a>
                      </div>
                      <div>
                        <h5>Project Name</h5>
                        <div>
                          <p>Project Description</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item-right">
                    <ul className="flex flex-wrap items-center justify-center gap-5 p-0 m-0">
                      <li className="flex flex-col items-center">
                        <h5>0</h5>
                        Public
                      </li>
                      <li className="flex flex-col items-center">
                        <h5>0</h5>
                        Posts
                      </li>
                      <li className="flex flex-col items-center">
                        <h5>1</h5>
                        Member
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-[16px]">
        <div className="flex w-full gap-8">
          <div className="w-8/12 mt-8">
            <Tabs.Root defaultValue="members">
              <div className="px-2 py-8 bg-[#ffffff] rounded-md overflow-x-scroll scrollbar-hide">
                <Tabs.List>
                  <Tabs.Trigger value="detail">
                    <div className="mr-[40px] mb-3">Detail</div>
                  </Tabs.Trigger>
                  <Tabs.Trigger value="stage">
                    <div className="mr-[40px] mb-3">Stage</div>
                  </Tabs.Trigger>
                  <Tabs.Trigger value="revenue">
                    <div className="mr-[40px] mb-3">Revenue</div>
                  </Tabs.Trigger>
                  <Tabs.Trigger value="funding-sources">
                    <div className="mr-[40px] mb-3">Funding Sources</div>
                  </Tabs.Trigger>
                  <Tabs.Trigger value="additional-info">
                    <div className="mr-[40px] mb-3"> Additional Info</div>
                  </Tabs.Trigger>
                  <Tabs.Trigger value="logo">
                    <div className="mr-[40px] mb-3">Logo</div>
                  </Tabs.Trigger>
                  <Tabs.Trigger value="cover-image">
                    <div className="mr-[40px] mb-3">Cover Image</div>
                  </Tabs.Trigger>
                </Tabs.List>
              </div>
              <div className="mt-8 bg-[#ffffff] rounded-md p-8">
                <Tabs.Content value="detail">
                  <DetailsBotton />
                </Tabs.Content>
                <Tabs.Content value="stage">
                  <StageBotton />
                </Tabs.Content>
                <Tabs.Content value="revenue">
                  <FormRevenue />
                </Tabs.Content>
                <Tabs.Content value="funding-sources">
                  <FormFundingScources />
                </Tabs.Content>
                <Tabs.Content value="additional-info">
                  <FormAdditionalInfo />
                </Tabs.Content>
                <Tabs.Content value="logo">
                  <div className="text-[#6f7f92]">
                    <p className="mb-[16px]">
                      Upload an image to use as a profile logo for this project.
                      The image will be shown on the main group page, and in
                      search results.
                    </p>
                  </div>
                  <ContainerLogo />
                </Tabs.Content>
                <Tabs.Content value="cover-image">
                  <h2>Cover Image</h2>
                  <FormCoverImage />
                </Tabs.Content>
              </div>
            </Tabs.Root>
          </div>
          <div className="w-4/12 mt-8">
            <div className="p-8 mb-8 bg-[#ffffff] rounded-md">
              <h5 className="pb-[20px] border-b border-gray-200 mb-[20px] ">
                <span>Project Administrators</span>
              </h5>
              <div>
                <ul className="mb-0 pl-0 flex flex-col">
                  <li className="flex items-center gap-3">
                    <div>
                      <a href="#">
                        <img
                          src={img_logo_project}
                          alt=""
                          className="w-[60px] h-[60px] rounded-full"
                        />
                      </a>
                    </div>
                    <div>
                      <div
                        href="#"
                        className="flex items-center gap-2 text-black no-underline text-nowrap"
                      >
                        <span className="font-semibold">Vuong Manh Nghia</span>
                        <CheckCircleFilled className="text-blue-500" />
                      </div>
                      <div className="text-xs text-gray-500">
                        vuongmanhnghia@gmail.com
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="p-8 mb-8 bg-[#ffffff] rounded-md">
              <h5 className="pb-[20px] border-b border-gray-200 mb-[20px] ">
                <span>Project Administrators</span>
              </h5>
              <div>
                <div className="flex items-center w-full gap-3">
                  <div className="w-3/12">
                    <div>
                      <a href="#">
                        <img
                          src={img_logo_project}
                          alt=""
                          className="w-[60px] h-[60px] rounded-full"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <div>
                      <h6>
                        <a href="#" className="no-underline text-black">
                          Game Of Phones
                        </a>
                      </h6>
                      <p className="text-xs mb-0">Public</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center rounded-md w-7 h-7 ml-[6px] bg-[#eaeff8]">
                        <a href="#">
                          <PlusOutlined className="text-[#2f65b9] w-4 h-4" />
                        </a>
                      </div>
                      <div className="ml-[6px] flex items-center justify-center rounded-md w-7 h-7 bg-[#f8eaea]">
                        <a href="#">
                          <CloseOutlined className="text-[#f14646] h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center w-full gap-3 mt-[16px]">
                  <div className="w-3/12">
                    <div>
                      <a href="#">
                        <img
                          src={img_logo_project}
                          alt=""
                          className="w-[60px] h-[60px] rounded-full"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <div>
                      <h6>
                        <a href="#" className="no-underline text-black">
                          Game Of Phones
                        </a>
                      </h6>
                      <p className="text-xs mb-0">Public</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center rounded-md w-7 h-7 ml-[6px] bg-[#eaeff8]">
                        <a href="#">
                          <PlusOutlined className="text-[#2f65b9] w-4 h-4" />
                        </a>
                      </div>
                      <div className="ml-[6px] flex items-center justify-center rounded-md w-7 h-7 bg-[#f8eaea]">
                        <a href="#">
                          <CloseOutlined className="text-[#f14646] h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center w-full gap-3 mt-[16px]">
                  <div className="w-3/12">
                    <div>
                      <a href="#">
                        <img
                          src={img_logo_project}
                          alt=""
                          className="w-[60px] h-[60px] rounded-full"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <div>
                      <h6>
                        <a href="#" className="no-underline text-black">
                          Game Of Phones
                        </a>
                      </h6>
                      <p className="text-xs mb-0">Public</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center rounded-md w-7 h-7 ml-[6px] bg-[#eaeff8]">
                        <a href="#">
                          <PlusOutlined className="text-[#2f65b9] w-4 h-4" />
                        </a>
                      </div>
                      <div className="ml-[6px] flex items-center justify-center rounded-md w-7 h-7 bg-[#f8eaea]">
                        <a href="#">
                          <CloseOutlined className="text-[#f14646] h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative w-full">
              <img
                src={fb_img}
                alt="logo-fb_img"
                className="w-[375px] h-[450px] rounded-md mt-4"
              />
              <img
                src={Logo}
                alt="logo-opennezt"
                className={`$styles.logo, absolute top-0 py-14 px-12 left-0`}
              />
              <div className="absolute top-32 flex flex-col text-white items-center px-12 gap-3 left-0">
                Feel free to reach us anytime. we are avaliable 24 hours
                <button className="bg-[#ffffff] px-3 py-3 text-black font-medium rounded-md">
                  CONTACT US
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProject;
