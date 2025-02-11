import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import SideBar from "./SiderBar";
import Header from "./Header";
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
              }`}
            >
              <Header />
              <div className="flex w-full h-full max-h-full overflow-y-scroll scrollbar-hide">
                <main
                  className={`$styles.mainContentWrap, w-full pl-4 pt-[16px] `}
                >
                  <LazyLoading>{children}</LazyLoading>
                </main>
                <div className="w-4/12 mr-5 ">
                  <div className="bg-[#ffffff] p-8 rounded-md mt-3 mb-4 ml-8">
                    <div className="flex flex-col">
                      <span className="text-xl font-semibold border-b-[1px] border-gray-200 pb-3">
                        Active Users
                      </span>
                      <span className="pt-4 font-light text-gray-500">
                        There are no recently active members
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col bg-[#ffffff] p-8 rounded-md mt-3 mb-4 ml-8">
                    <span className="text-xl font-semibold mb-3">
                      Latest Activities
                    </span>
                    <div className="border-gray-200 pt-3 text-nowrap border-t-[1px]">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="p-[10px] rounded-full bg-[#3897f0]">
                          avt
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1 text-sm font-medium">
                            Vuong Manh Nghia
                            <CheckCircleFilled className="text-[#3897f0]" />
                            <span className="font-light text-gray-500">
                              joined the group
                            </span>
                            <img
                              src={group_1}
                              alt="logo-group_1"
                              className="w-4 h-5 object-cover"
                            />
                          </div>
                          <div className="flex flex-col text-sm font-medium gap-[2px]">
                            Ultimate Nerds
                            <span className="text-xs text-gray-400">
                              7 months ago
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 border-gray-200 py-3 border-t-[1px]">
                        <div className="p-[10px] rounded-full bg-[#3897f0]">
                          avt
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1 text-sm font-medium">
                            Vuong Manh Nghia
                            <CheckCircleFilled className="text-[#3897f0]" />
                            <span className="font-light text-gray-500">
                              joined the group
                            </span>
                            <img
                              src={group_1}
                              alt="logo-group_1"
                              className="w-4 h-5 object-cover"
                            />
                          </div>
                          <div className="flex flex-col text-sm font-medium gap-[2px]">
                            Ultimate Nerds
                            <span className="text-xs text-gray-400">
                              7 months ago
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 border-gray-200 py-3 border-t-[1px]">
                        <div className="p-[10px] rounded-full bg-[#3897f0]">
                          avt
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1 text-sm font-medium">
                            Vuong Manh Nghia
                            <CheckCircleFilled className="text-[#3897f0]" />
                            <span className="font-light text-gray-500">
                              joined the group
                            </span>
                            <img
                              src={group_1}
                              alt="logo-group_1"
                              className="w-4 h-5 object-cover"
                            />
                          </div>
                          <div className="flex flex-col text-sm font-medium gap-[2px]">
                            Ultimate Nerds
                            <span className="text-xs text-gray-400">
                              7 months ago
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 border-gray-200 py-3 border-t-[1px]">
                        <div className="p-[10px] rounded-full bg-[#3897f0]">
                          avt
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1 text-sm font-medium">
                            Vuong Manh Nghia
                            <CheckCircleFilled className="text-[#3897f0]" />
                            <span className="font-light text-gray-500">
                              joined the group
                            </span>
                            <img
                              src={group_1}
                              alt="logo-group_1"
                              className="w-4 h-5 object-cover"
                            />
                          </div>
                          <div className="flex flex-col text-sm font-medium gap-[2px]">
                            Ultimate Nerds
                            <span className="text-xs text-gray-400">
                              7 months ago
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 border-gray-200 py-3 border-t-[1px]">
                        <div className="p-[10px] rounded-full bg-[#3897f0]">
                          avt
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1 text-sm font-medium">
                            Vuong Manh Nghia
                            <CheckCircleFilled className="text-[#3897f0]" />
                            <span className="font-light text-gray-500">
                              joined the group
                            </span>
                            <img
                              src={group_1}
                              alt="logo-group_1"
                              className="w-4 h-5 object-cover"
                            />
                          </div>
                          <div className="flex flex-col text-sm font-medium gap-[2px]">
                            Ultimate Nerds
                            <span className="text-xs text-gray-400">
                              7 months ago
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 border-gray-200 py-3 border-t-[1px]">
                        <div className="p-[10px] rounded-full bg-[#3897f0]">
                          avt
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1 text-sm font-medium">
                            Vuong Manh Nghia
                            <CheckCircleFilled className="text-[#3897f0]" />
                            <span className="font-light text-gray-500">
                              joined the group
                            </span>
                            <img
                              src={group_1}
                              alt="logo-group_1"
                              className="w-4 h-5 object-cover"
                            />
                          </div>
                          <div className="flex flex-col text-sm font-medium gap-[2px]">
                            Ultimate Nerds
                            <span className="text-xs text-gray-400">
                              7 months ago
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative ml-8">
                    <img
                      src={fb_img}
                      alt="logo-fb_img"
                      className="w-[403px] h-[450px] rounded-md mt-4"
                    />
                    <img
                      src={Logo}
                      alt="logo-opennezt"
                      className={`$styles.logo, absolute top-0 pt-16 px-20 left-2`}
                    />
                    <div className="absolute top-14 flex flex-col text-white items-center pt-20 px-5 gap-3 left-6">
                      Feel free to reach us anytime. we are avaliable 24 hours
                      <button className="bg-[#ffffff] px-4 py-3 text-black font-medium rounded-md">
                        CONTACT US
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RealtimeProvider>
    </ModalProvider>
  );
}

export default AppLayout;
