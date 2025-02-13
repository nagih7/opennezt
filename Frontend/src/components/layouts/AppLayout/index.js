import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import SideBar from "./SiderBar";
import Header from "./Header";
import Footer from "../AppLayout/Footer/components/index";
import { useSelector, useDispatch } from "react-redux";
import LazyLoading from "components/UI/LazyLoading";
import { ModalProvider } from "context/ModalContext";
import { RealtimeProvider } from "context/RealtimeContext";
import { useNavigate } from "react-router-dom";
import { setLocation } from "states/modules/app";
import { Flex } from "antd";
// import { SkeletonTheme } from "react-loading-skeleton";
import { CheckCircleFilled } from "@ant-design/icons";
import group_1 from "assets/images/background/1656677876-bpthumb.jpg";
import fb_img from "assets/images/background/left-banner.webp";
import Logo from "assets/images/logo/OpenNezt_logo_black.png";
import anh_avt from "assets/images/background/avt.jpg";

function AppLayout(props) {
  const { children } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isShowSideBar = useSelector((state) => state.app.isShowSideBar);
  const isThemeLight = useSelector((state) => state.app.isThemeLight);
  const location = useSelector((state) => state.app.location);

  useEffect(() => {
    if (location.pathName !== location.prevPathName) {
      dispatch(
        setLocation({
          pathName: location.pathName,
          payload: location.payload,
          prevPathName: location.pathName,
        })
      );
      navigate(location.pathName);
    }
  }, [location, navigate, dispatch]);

  return (
    <ModalProvider>
      <RealtimeProvider>
        <div className={`${styles.boxMainLayout}`}>
          <div className={styles.mainLayoutWrap}>
            <SideBar
            // isThemeLight={isThemeLight}
            // isShowSideBar={isShowSideBar}
            />

            <div
              className={`${styles.mainWrap} ${
                !isShowSideBar ? styles.mainWrapWithConditionSideBarClose : ""
              }, h-full`}
            >
              <Header />
              <div className="flex w-full h-full max-h-full overflow-y-scroll ">
                <main
                  className={`$styles.mainContentWrap,w-full pl-4 pr-8 pt-[16px] `}
                >
                  <LazyLoading>{children}</LazyLoading>
                </main>
                <div className=" mr-5 ">
                  <div className="bg-[#ffffff] p-8 rounded-md mt-3 mb-4">
                    <div className="flex flex-col">
                      <span className="text-xl font-semibold border-b-[1px] border-gray-200 pb-3">
                        Active Users
                      </span>
                      <span className="pt-4 font-light text-gray-500">
                        There are no recently active members
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col bg-[#ffffff] p-8 rounded-md mt-3 mb-4">
                    <span className="text-xl font-semibold mb-3">
                      Latest Activities
                    </span>
                    <div className="border-gray-200 border-t-[1px]">
                      <div className="flex items-center gap-3 my-3">
                        <img
                          src={anh_avt}
                          className="w-[50px] h-[50px] rounded-full"
                        />
                        <p className="text-[#6f7f92] text-sm mb-0">
                          <a href="#" className="no-underline text-black">
                            Vuong Manh Nghia
                          </a>
                          <CheckCircleFilled className="text-[#3897f0] mx-1" />
                          changed their profile picture
                          <br />
                          <a href="#" className="no-underline text-[#6f7f92]">
                            <span className="text-xs">7 hours ago</span>
                          </a>
                        </p>
                      </div>
                      <div className="flex items-center gap-3 border-gray-200 border-t-[1px]">
                        <div className="flex items-center gap-3 my-3">
                          <img
                            src={anh_avt}
                            className="w-[50px] h-[50px] rounded-full"
                          />
                          <p className="text-[#6f7f92] text-sm mb-0">
                            <a href="#" className="no-underline text-black">
                              Vuong Manh Nghia
                            </a>
                            <CheckCircleFilled className="text-[#3897f0] mx-1" />
                            changed their profile picture
                            <br />
                            <a href="#" className="no-underline text-[#6f7f92]">
                              <span className="text-xs">7 hours ago</span>
                            </a>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 border-gray-200 border-t-[1px]">
                        <div className="flex items-center gap-3 my-3">
                          <img
                            src={anh_avt}
                            className="w-[50px] h-[50px] rounded-full"
                          />
                          <p className="text-[#6f7f92] text-sm mb-0">
                            <a href="#" className="no-underline text-black">
                              Vuong Manh Nghia
                            </a>
                            <CheckCircleFilled className="text-[#3897f0] mx-1" />
                            changed their profile picture
                            <br />
                            <a href="#" className="no-underline text-[#6f7f92]">
                              <span className="text-xs">7 hours ago</span>
                            </a>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 border-gray-200 border-t-[1px]">
                        <div className="flex items-center gap-3 my-3">
                          <img
                            src={anh_avt}
                            className="w-[50px] h-[50px] rounded-full"
                          />
                          <p className="text-[#6f7f92] text-sm mb-0">
                            <a href="#" className="no-underline text-black">
                              Vuong Manh Nghia
                            </a>
                            <CheckCircleFilled className="text-[#3897f0] mx-1" />
                            changed their profile picture
                            <br />
                            <a href="#" className="no-underline text-[#6f7f92]">
                              <span className="text-xs">7 hours ago</span>
                            </a>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 border-gray-200 border-t-[1px]">
                        <div className="flex items-center gap-3 my-3">
                          <img
                            src={anh_avt}
                            className="w-[50px] h-[50px] rounded-full"
                          />
                          <p className="text-[#6f7f92] text-sm mb-0">
                            <a href="#" className="no-underline text-black">
                              Vuong Manh Nghia
                            </a>
                            <CheckCircleFilled className="text-[#3897f0] mx-1" />
                            changed their profile picture
                            <br />
                            <a href="#" className="no-underline text-[#6f7f92]">
                              <span className="text-xs">7 hours ago</span>
                            </a>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 border-gray-200 border-t-[1px]">
                        <div className="flex items-center gap-3 mt-3">
                          <img
                            src={anh_avt}
                            className="w-[50px] h-[50px] rounded-full"
                          />
                          <p className="text-[#6f7f92] text-sm mb-0">
                            <a href="#" className="no-underline text-black">
                              Vuong Manh Nghia
                            </a>
                            <CheckCircleFilled className="text-[#3897f0] mx-1" />
                            changed their profile picture
                            <br />
                            <a href="#" className="no-underline text-[#6f7f92]">
                              <span className="text-xs">7 hours ago</span>
                            </a>
                          </p>
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
              <Footer />
            </div>
          </div>
        </div>
      </RealtimeProvider>
    </ModalProvider>
  );
}

export default AppLayout;
