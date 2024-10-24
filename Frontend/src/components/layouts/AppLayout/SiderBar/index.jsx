import React, { useState } from "react";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";
import { MenuFoldOutlined } from "@ant-design/icons";
import Logo from "assets/images/logo/OpenNezt_logo_white.png";
import IconLogo from "assets/images/logo/OpenNezt logo default.png";
import NavItem from "./components/NavItem";
import { appRouteMap } from "../../../../router/appRouteMap";
import { handleCheckRoute } from "../../../../utils/helper";
import { useLocation, useNavigate } from "react-router-dom";

import { CSidebar, CSidebarHeader, CSidebarBrand } from "@coreui/react";

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

	return (
		<CSidebar
			colorScheme="dark"
			position="fixed"
			onMouseLeave={() => handleLeaveMenuNavItem()}
			className={`border-end ${styles.sideBarWrap} ${
				!isShowSideBar ? styles.sideBarWrapClose : ""
			}`}>
			<CSidebarHeader className={`border-bottom ${styles.logoWrap}`}>
				<CSidebarBrand to="/">
					{isShowSideBar ? (
						<div className={`${styles.imgWrap}`}>
							<img src={Logo} alt="" />
						</div>
					) : (
						<div className={`${styles.imgWrap} ${styles.imgWrapDesktop}`}>
							<img src={IconLogo} alt="" />
						</div>
					)}

					<div
						className={`${styles.btnToggleSideBar} ${
							styles.btnToggleSideBarMobi
						} ${!isShowSideBar ? styles.btnToggleSideBarClose : ""}`}
						onClick={() => handleToggleIsShowSideBar()}>
						<MenuFoldOutlined />
					</div>
				</CSidebarBrand>
			</CSidebarHeader>

			<div className={`border-bottom ${styles.navbarWrap}`}>
				<ul className={`${styles.menuNav}`}>
					{appRouteMap.map((route, index) => {
						return (
							<li
								onMouseEnter={(e) => handleHoverMenuNavItem(e, route)}
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
				</ul>
			</div>

			{!isShowSideBar && menuSub && menuSub.length > 0 ? (
				<div
					className={`${styles.boxMenuSubWrap}`}
					style={{
						top: `${topMenuSub}px`,
					}}>
					<div className={styles.listMenuSub}>
						<ul className={styles.menuSubClose}>
							{menuSub.map((menuSubItem) => {
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
													{" "}
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
		</CSidebar>
	);
}

export default SideBar;
