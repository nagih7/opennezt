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
                  className={`$styles.mainContentWrap,w-full`}
                >
                  <LazyLoading>{children}</LazyLoading>
                </main>
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
