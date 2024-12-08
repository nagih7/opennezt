import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import SideBar from "./SiderBar";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLocation } from "../../../states/modules/app";
import LazyLoading from "components/UI/LazyLoading";
import { SocketProvider } from "components/common/SocketContext";

function AppLayout(props) {
	const { children } = props;
	const isShowSideBar = useSelector((state) => state.app.isShowSideBar);
	const isThemeLight = useSelector((state) => state.app.isThemeLight);
	const isAuthSuccess = useSelector((state) => state.auth.isAuthSuccess);

	// const titlePage = useSelector((state) => state.app.title);
	const location = useSelector((state) => state.app.location);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (!isAuthSuccess) {
			navigate("/login");
		}
	}, [isAuthSuccess, navigate]);

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
		// <SocketProvider>
		<div className={`${styles.boxMainLayout}`}>
			<div className={styles.mainLayoutWrap}>
				<SideBar
					isThemeLight={isThemeLight}
					isShowSideBar={isShowSideBar}
				/>

				<div
					className={`${styles.mainWrap} ${
						!isShowSideBar ? styles.mainWrapWithConditionSideBarClose : ""
					}`}>
					<Header />
					<main className={styles.mainContentWrap}>
						<LazyLoading>{children}</LazyLoading>
					</main>
				</div>
			</div>
		</div>
		// </SocketProvider>
	);
}

export default AppLayout;
