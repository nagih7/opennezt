import React from "react";
import styles from "./styles.module.scss";
import SideBar from "./SiderBar";
import Header from "./Header";
import { useSelector } from "react-redux";
import LazyLoading from "components/UI/LazyLoading";
import { AppProvider } from "context/AppContext";

function AppLayout(props) {
	const { children } = props;
	const isShowSideBar = useSelector((state) => state.app.isShowSideBar);
	const isThemeLight = useSelector((state) => state.app.isThemeLight);

	// const titlePage = useSelector((state) => state.app.title);

	return (
		<AppProvider>
			<div className={`${styles.boxMainLayout}`}>
				<div className={styles.mainLayoutWrap}>
					<SideBar
						isThemeLight={isThemeLight}
						isShowSideBar={isShowSideBar}
					/>

					<div
						className={`${styles.mainWrap} ${
							!isShowSideBar
								? styles.mainWrapWithConditionSideBarClose
								: ""
						}`}>
						<Header />
						<main className={styles.mainContentWrap}>
							<LazyLoading>{children}</LazyLoading>
						</main>
					</div>
				</div>
			</div>
		</AppProvider>
	);
}

export default AppLayout;
