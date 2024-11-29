import React, { useEffect, Suspense } from "react";
import styles from "./styles.module.scss";
import SideBar from "./SiderBar";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLocation } from "../../../states/modules/app";

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
						<Suspense
							fallback={
								<div
									style={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										height: "100vh",
										backgroundColor: "#f6f6f9",
									}}>
									<img
										src="https://i.pinimg.com/originals/71/3a/32/713a3272124cc57ba9e9fb7f59e9ab3b.gif"
										alt="Loading..."
										style={{ width: "150px", height: "150px" }}
									/>
								</div>
							}>
							{/* <div className={styles.headerMainWrap}>
								<div className={styles.titleWrap}>{titlePage}</div>
								<div className={styles.breadcrumbWrap}>
									<span className={`${styles.text}`}>Home</span>{" "}
									<span className={styles.slash}>/</span>
									<span
										className={`${styles.text} ${styles.breadcrumbActive}`}>
										Dashboard
									</span>
								</div>
							</div> */}
							{children}
						</Suspense>
					</main>
				</div>
			</div>
		</div>
	);
}

export default AppLayout;
