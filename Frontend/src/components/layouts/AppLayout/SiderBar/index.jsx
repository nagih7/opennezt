import React, { useState } from "react";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";
import NavItem from "./components/NavItem";
import manageRouteMap from "../../../../router/manageRouteMap";
import appRouteMap from "router/appRouteMap";
import { handleCheckRoute } from "../../../../utils/helper";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../../../api/auth";
import store from "states/configureStore";
import { LOGOUT } from "../../../../utils/constains";
import { CheckCircleFilled } from "@ant-design/icons";
import { FundOutlined } from "@ant-design/icons";
import { IconlyActivity } from "components/UI/Iconly";
import avt from "assets/images/background/avt.jpg";

SideBar.prototype = {
	isShowSideBar: PropTypes.bool.isRequired,
	handleToggleIsShowSideBar: PropTypes.func,
};

SideBar.defaultProps = {
	isShowSideBar: true,
};

function SideBar(props) {
	const { isShowSideBar, handleToggleIsShowSideBar } = props;
	const [indexNavItemSelect, setIndexNavItemSelect] = useState(null);
	const [menuSub, setMenuSub] = useState([]);
	const [topMenuSub, setTopMenuSub] = useState(0);
	const location = useLocation();
	const navigate = useNavigate();

	const { authorize } = useSelector((state) => state.auth);
	const { language } = useSelector((state) => state.app);

	const { authRole } = useSelector((state) => state.auth);
	  // console.log("authRole", authRole);

	const handleToggleMenu = (indexNavItem, menuNavItem) => {
		if (menuNavItem.path) {
			navigate(menuNavItem.path);
		}
		if (isShowSideBar) {
			setIndexNavItemSelect(
				indexNavItem !== indexNavItemSelect ? indexNavItem : null
			);
		}
	};

	const handleHoverMenuNavItem = (e, menuNavItem) => {
		const { top } = e.target.getBoundingClientRect();
		setTopMenuSub(top);
		if (menuNavItem.children) {
			setMenuSub(menuNavItem.children);
		} else {
			setMenuSub([]);
		}
	};

	const handleLeaveMenuNavItem = () => {
		setMenuSub([]);
	};

	const handleConfirmLogOut = async () => {
		await store.dispatch(logout());
		window.location.reload();
	};

	return (
		<div
			onMouseLeave={() => handleLeaveMenuNavItem()}
			className={`${styles.sideBarWrap} ${
				!isShowSideBar ? styles.sideBarWrapClose : ""
			} border-t-2 border-gray-100`}>
			{/* <div className={`border-bottom ${styles.logoWrap}`}>
				<img
					src={Logo}
					alt="logo-opennezt"
					className={`${styles.imgWrap}`}
				/>
			</div>
			<div className={styles.fakeLogoWrap}></div> */}

			{/* <div className={`${styles.navbarWrap}`}>
				<ul className={`${styles.menuNav}`}>
					{authRole === "Super Admin"
						? manageRouteMap.map((route, index) => {
								return (
									<li
										onMouseEnter={(e) =>
											handleHoverMenuNavItem(e, route)
										}
										onClick={() => handleToggleMenu(index, route)}
										key={route.path}
										className={`${styles.menuNavItem} ${
											handleCheckRoute(
												route.routeActive,
												location.pathname
											)
												? styles.menuNavItemActive
												: ""
										}`}>
										<NavItem
											route={route}
											isShowMenu={index === indexNavItemSelect}
										/>
									</li>
								);
						  })
						: appRouteMap.map((route, index) => {
								return (
									<li
										onMouseEnter={(e) =>
											handleHoverMenuNavItem(e, route)
										}
										onClick={() => handleToggleMenu(index, route)}
										key={route.path}
										className={`${styles.menuNavItem} ${
											handleCheckRoute(
												route.routeActive,
												location.pathname
											)
												? styles.menuNavItemActive
												: ""
										}`}>
										<NavItem
											route={route}
											isShowMenu={index === indexNavItemSelect}
										/>
									</li>
								);
						  })}
					<li
						className={`${styles.menuNavItem} ${styles.logout}`}
						onClick={() => handleConfirmLogOut()}>
						<LogoutIcon style={{ color: "#7d8da1" }} />
						{LOGOUT[language]}
					</li>
				</ul>
			</div> */}

			<div className="relative h-full">
				<div className="max-h-[610px] 2xl:max-h-full overflow-y-scroll scrollbar-hide bg-[#ffffff] p-8">
					<div className="flex items-center gap-3 pb-4 mb-6 border-b-[1px] border-gray-200">
						<img src={avt} className="w-[50px] h-[50px] rounded-full" />
						<div>
							<a
								href="#"
								className="flex items-center gap-2 text-black no-underline">
								<span className="font-semibold text-nowrap">
									Young Truong
								</span>
								<CheckCircleFilled className="text-blue-500" />
							</a>
							<span className="text-xs text-gray-500">@youngtruong</span>
						</div>
					</div>
					<div className="border-b-[1px] border-gray-200">
						<span className="text-xs font-semibold text-gray-400">
							MENU
						</span>
						<div className="flex flex-col gap-2 mt-2 mb-6 text-sm font-semibold">
							<div className="flex items-center px-3 py-[10px] rounded-md text-white bg-[#2f65b9] cursor-pointer gap-2">
								<IconlyActivity
									size={18}
									color={`#ffff`}
									className=""
								/>
								Activity
							</div>
							<div className="flex items-center px-3 py-[10px]  gap-2 text-gray-500 hover:bg-blue-50 hover:text-[#2f65b9] cursor-pointer rounded-md">
								<FundOutlined />
								Members
							</div>
							<div className="flex items-center px-3 py-[10px]  gap-2 text-gray-500 hover:bg-blue-50 hover:text-[#2f65b9] cursor-pointer rounded-md">
								<FundOutlined />
								Groups
							</div>
							<div className="flex items-center px-3 py-[10px]  gap-2 text-gray-500 hover:bg-blue-50 hover:text-[#2f65b9] cursor-pointer rounded-md">
								<FundOutlined />
								Badges
							</div>
							<div className="flex items-center px-3 py-[10px]  gap-2 text-gray-500 hover:bg-blue-50 hover:text-[#2f65b9] cursor-pointer rounded-md">
								<FundOutlined />
								Message
							</div>
							<div className="flex items-center px-3 py-[10px]  gap-2 text-gray-500 hover:bg-blue-50 hover:text-[#2f65b9] cursor-pointer rounded-md">
								<FundOutlined />
								Shop
							</div>
							<div className="flex items-center px-3 py-[10px]  gap-2 text-gray-500 hover:bg-blue-50 hover:text-[#2f65b9] cursor-pointer rounded-md">
								<FundOutlined />
								Courses
							</div>
							<div className="flex items-center px-3 py-[10px]  gap-2 text-gray-500 hover:bg-blue-50 hover:text-[#2f65b9] cursor-pointer rounded-md">
								<FundOutlined />
								Levels
							</div>
						</div>
					</div>
					<div className="border-b-[1px] border-gray-200 mt-6">
						<span className="text-xs font-semibold text-gray-400">
							FORUM
						</span>
						<div className="flex flex-col gap-2 mt-2 mb-6 text-sm font-semibold">
							<div className="flex items-center px-3 py-[10px]  gap-2 text-gray-500 hover:bg-blue-50 hover:text-[#2f65b9] cursor-pointer rounded-md">
								<FundOutlined />
								All Forums
							</div>
							<div className="flex items-center px-3 py-[10px]  gap-2 text-gray-500 hover:bg-blue-50 hover:text-[#2f65b9] cursor-pointer rounded-md">
								<FundOutlined />
								Forum Single
							</div>
							<div className="flex items-center px-3 py-[10px]  gap-2 text-gray-500 hover:bg-blue-50 hover:text-[#2f65b9] cursor-pointer rounded-md">
								<FundOutlined />
								Topic Single
							</div>
						</div>
					</div>
					<div className="mt-6">
						<span className="text-xs font-semibold text-gray-400">
							OTHERS
						</span>
						<div className="flex flex-col gap-2 mt-2 mb-6 text-sm font-semibold">
							<div className="flex items-center px-3 py-[10px] gap-2 text-gray-500 hover:bg-blue-50 hover:text-[#2f65b9] cursor-pointer rounded-md">
								<FundOutlined />
								Membership
							</div>
						</div>
					</div>
				</div>
				<div className="absolute bottom-0 left-0 w-[270px] py-4 px-3 bg-[#ffffff] text-gray-500">
					<div className="flex items-center w-[240px] p-3 bg-[#f8f9fa] ] rounded-md gap-10">
						<FundOutlined />
						<LogoutIcon />
						<LogoutIcon />
						<FundOutlined />
					</div>
				</div>
			</div>
			{/* <div
				className={`${styles.btnToggleIsShowSideBar} ${
					!isShowSideBar ? styles.btnToggleIsHideSideBar : ""
				}`}>
				<svg
					onClick={() => dispatch(handleSetIsShowSideBar(!isShowSideBar))}
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path d="M13.5.5 7.5 8l6 7.5" stroke="currentColor" />
					<path d="M8.5.5 2.5 8l6 7.5" stroke="currentColor" />
				</svg>
			</div> */}

			{!isShowSideBar && menuSub && menuSub.length > 0 ? (
				<div
					className={`${styles.boxMenuSubWrap}`}
					style={{
						top: `${topMenuSub}px`,
					}}>
					<div className={styles.listMenuSub}>
						<ul className={styles.menuSubClose}>
							{manageRouteMap.map((menuSubItem) => {
								return (
									<li
										className={styles.menuSubCloseItem}
										key={`close${menuSubItem.path}`}>
										<div
											onClick={() => navigate(menuSubItem.path)}
											className={`
                              ${styles.contentSubItemWrap} 
                              ${
											handleCheckRoute(
												menuSubItem.routeActive,
												location.pathname
											)
												? styles.menuSubItemActive
												: ""
										}
                            `}>
											<div className={styles.textWrap}>
												<span className={styles.text}>
													{menuSubItem.label}
												</span>
											</div>
										</div>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			) : (
				""
			)}
		</div>
	);
}

export default SideBar;
