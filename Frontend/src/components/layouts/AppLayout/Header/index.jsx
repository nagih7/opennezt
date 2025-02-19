import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import "./styles.scss";
import { Popover } from "antd";
import contentInfo from "./components/PopoverProfile";
import contentNotification from "./components/PopoverNotification";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import ZoomInMapIcon from "@mui/icons-material/ZoomInMap";
import { useSelector, useDispatch } from "react-redux";
import ChatList from "./components/ChatList";
import MessageBoxList from "./components/MessageBoxList";
import { LANG } from "utils/constains";
import { setLanguage } from "states/modules/app";
import {
	IconlyChat,
	IconlyNotification,
	IconlySearch,
} from "components/UI/Iconly";
import { Avatar } from "@chakra-ui/react";
import Logo from "assets/images/logo/OpenNezt_logo_black.png";

const Header = () => {
	const dispatch = useDispatch();
	// const [isShowThemeLight, setIsShowThemeLight] = useState(true);
	const [isFullScreen, setIsFullScreen] = useState(false);
	const [isShowChatList, setIsShowChatList] = useState(false);
	const authUser = useSelector((state) => state.auth.authUser);
	const { language } = useSelector((state) => state.app);
	const chatListRef = useRef(null);

	useEffect(() => {
		const handleFullScreenChange = () => {
			setIsFullScreen(!!document.fullscreenElement);
		};
		document.addEventListener("fullscreenchange", handleFullScreenChange);
		document.addEventListener(
			"webkitfullscreenchange",
			handleFullScreenChange
		); // Safari
		document.addEventListener("mozfullscreenchange", handleFullScreenChange); // Firefox
		document.addEventListener("MSFullscreenChange", handleFullScreenChange); // IE

		// Cleanup event listener khi component unmount
		return () => {
			document.removeEventListener(
				"fullscreenchange",
				handleFullScreenChange
			);
			document.removeEventListener(
				"webkitfullscreenchange",
				handleFullScreenChange
			);
			document.removeEventListener(
				"mozfullscreenchange",
				handleFullScreenChange
			);
			document.removeEventListener(
				"MSFullscreenChange",
				handleFullScreenChange
			);
		};
	}, []);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				chatListRef.current &&
				!chatListRef.current.contains(event.target)
			) {
				setIsShowChatList(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const openFullScreen = () => {
		if (!document.fullscreenElement) {
			if (document.documentElement.requestFullscreen) {
				document.documentElement.requestFullscreen();
			} else if (document.documentElement.webkitRequestFullscreen) {
				/* Safari */
				document.documentElement.webkitRequestFullscreen();
			} else if (document.documentElement.msRequestFullscreen) {
				/* IE11 */
				document.documentElement.msRequestFullscreen();
			}
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.webkitExitFullscreen) {
				/* Safari */
				document.webkitExitFullscreen();
			} else if (document.msExitFullscreen) {
				/* IE11 */
				document.msExitFullscreen();
			}
		}
	};

	const showChatList = () => {
		setIsShowChatList(!isShowChatList);
	};

	const handleChangeLanguage = (e) => {
		dispatch(setLanguage(e.target.value));
	};

	return (
		// <header className={styles.headerWrap}>
		// 	<div className={styles.headerLeftWrap}></div>
		// 	<div className={`${styles.headerRightWrap}`}>
		// 		<Radio.Group
		// 			style={{ marginRight: "10px" }}
		// 			value={language}
		// 			onChange={handleChangeLanguage}>
		// 			{LANG.map((item, index) => (
		// 				<Radio.Button key={index} value={item.label}>
		// 					{item.label}
		// 				</Radio.Button>
		// 			))}
		// 		</Radio.Group>
		// 		<div
		// 			className={`${styles.itemHeaderRight}`}
		// 			onClick={() => openFullScreen()}>
		// 			<div className={`${styles.iconWrap}`}>
		// 				{isFullScreen ? <ZoomInMapIcon /> : <ZoomOutMapIcon />}
		// 			</div>
		// 		</div>

		// 		<Popover
		// 			className={`popover-info-wrap`}
		// 			placement="bottomRight"
		// 			content={contentNotification}
		// 			trigger="click">
		// 			<div
		// 				className={`${styles.itemHeaderRight} ${styles.notificationAnimationWrap}`}>
		// 				<div className={`${styles.iconWrap}`}>
		// 					<NotificationsIcon />
		// 				</div>
		// 			</div>
		// 		</Popover>

		// 		<div className={styles.popover} ref={chatListRef}>
		// 			<div
		// 				onClick={() => showChatList()}
		// 				className={`${styles.itemHeaderRight} ${styles.messageAnimationWrap}`}>
		// 				<div className={`${styles.iconWrap}`}>
		// 					<ChatBubbleOutlineIcon />
		// 				</div>
		// 			</div>
		// 			<div
		// 				className={`${styles.chatListWrap} ${
		// 					isShowChatList ? styles.visible : ""
		// 				}`}>
		// 				<ChatList />
		// 			</div>

		// 			<MessageBoxList />
		// 		</div>
		// 		<div
		// 			onClick={() => setIsShowChatList(false)}
		// 			className={`${styles.itemHeaderRight}`}>
		// 			<Popover
		// 				className={`popover-info-wrap`}
		// 				placement="bottomRight"
		// 				content={contentInfo}
		// 				trigger="click">
		// 				<div className={styles.infoWrap}>
		// 					<div className={styles.avatarWrap}>
		// 						<img
		// 							src={authUser.avatar || AvatarDefault}
		// 							alt={authUser.name}
		// 							onError={(e) => {
		// 								e.target.onerror = null;
		// 								e.target.src = AvatarDefault;
		// 							}}
		// 						/>
		// 					</div>
		// 				</div>
		// 			</Popover>
		// 		</div>
		// 	</div>
		// </header>
		<header className="bg-[#ffffff] w-full">
			<div className="flex items-center h-[70px] pr-4">
				<div className="h-full">
					<img
						src={Logo}
						alt="logo-opennezt"
						className="py-[18px] px-8 bg-[#ffffff]  h-full"
					/>
				</div>
				<div className="flex items-center justify-between flex-1">
					<div className="flex items-center gap-4 text-sm font-semibold text-[#6f7f92]">
						{/* <div>HOME</div>
						<div className="flex items-center text-[#2f65b9]">
							COMMUNITY
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24px"
								viewBox="0 -960 960 960"
								width="24px"
								fill="undefined">
								<path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
							</svg>
						</div>
						<div className="flex items-center">
							PAGES
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24px"
								viewBox="0 -960 960 960"
								width="24px"
								fill="undefined">
								<path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
							</svg>
						</div>
						<div className="flex items-center">
							BLOG
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24px"
								viewBox="0 -960 960 960"
								width="24px"
								fill="undefined">
								<path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
							</svg>
						</div>
						<div className="flex items-center">
							SHOP
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24px"
								viewBox="0 -960 960 960"
								width="24px"
								fill="undefined">
								<path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
							</svg>
						</div>
						<div>COUESER</div> */}
					</div>
					<div className="flex items-center gap-4">
						<form
							action=""
							className="flex items-center bg-[#f8f9fa] rounded-md w-[240px] h-[40px] border-[1px]  border-gray-200 ">
							<button className="flex items-center justify-center w-10 h-10">
								<IconlySearch
									size={16}
									color={"#6f7f92"}
									className="text-gray-400"
								/>
							</button>
							<input
								type="text"
								placeholder="Search Here"
								className="bg-[#f8f9fa] outline-none text-sm font-medium pr-4 text-[#6f7f92]"
							/>
						</form>
						<div
							className={`${styles.itemHeaderRight}`}
							onClick={() => openFullScreen()}>
							<div className={`${styles.iconWrap}`}>
								{isFullScreen ? (
									<ZoomInMapIcon color="#6f7f92" />
								) : (
									<ZoomOutMapIcon color="#6f7f92" />
								)}
							</div>
						</div>

						<Popover
							className={`popover-info-wrap`}
							placement="bottomRight"
							content={contentNotification}
							trigger="click">
							<div
								className={`${styles.itemHeaderRight} ${styles.notificationAnimationWrap}`}>
								<div className={`${styles.iconWrap}`}>
									<IconlyNotification size={24} color="#6f7f92" />
								</div>
							</div>
						</Popover>

						<div className={styles.popover} ref={chatListRef}>
							<div
								onClick={() => showChatList()}
								className={`${styles.itemHeaderRight} ${styles.messageAnimationWrap}`}>
								<div className={`${styles.iconWrap}`}>
									<IconlyChat size={24} color="#6f7f92" />
								</div>
							</div>
							<div
								className={`${styles.chatListWrap} ${
									isShowChatList ? styles.visible : ""
								}`}>
								<ChatList />
							</div>
							<MessageBoxList />
						</div>
						<Popover
							className={`popover-info-wrap`}
							placement="bottomRight"
							content={contentInfo}
							trigger="click">
							<Avatar.Root size={"md"}>
								<Avatar.Fallback name={authUser.name} />
								<Avatar.Image src={authUser.avatar} />
							</Avatar.Root>
						</Popover>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
