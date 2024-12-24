import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import "./styles.scss";
import { Popover } from "antd";
import contentInfo from "./components/PopoverProfile";
import contentNotification from "./components/PopoverNotification";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import ZoomInMapIcon from "@mui/icons-material/ZoomInMap";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useSelector } from "react-redux";
import ChatList from "./components/ChatList";
import MessageBoxList from "./components/MessageBoxList";
import AvatarDefault from "assets/images/default/AvatarDefault.png";

const Header = () => {
	// const [isShowThemeLight, setIsShowThemeLight] = useState(true);
	const [isFullScreen, setIsFullScreen] = useState(false);
	const [isShowChatList, setIsShowChatList] = useState(false);
	const authUser = useSelector((state) => state.auth.authUser);
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

	return (
		<header className={styles.headerWrap}>
			<div className={styles.headerLeftWrap}></div>
			<div className={`${styles.headerRightWrap}`}>
				<div
					className={`${styles.itemHeaderRight}`}
					onClick={() => openFullScreen()}>
					<div className={`${styles.iconWrap}`}>
						{isFullScreen ? <ZoomInMapIcon /> : <ZoomOutMapIcon />}
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
							<NotificationsIcon />
						</div>
					</div>
				</Popover>

				<div className={styles.popover} ref={chatListRef}>
					<div
						onClick={() => showChatList()}
						className={`${styles.itemHeaderRight} ${styles.messageAnimationWrap}`}>
						<div className={`${styles.iconWrap}`}>
							<ChatBubbleOutlineIcon />
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
				<div
					onClick={() => setIsShowChatList(false)}
					className={`${styles.itemHeaderRight}`}>
					<Popover
						className={`popover-info-wrap`}
						placement="bottomRight"
						content={contentInfo}
						trigger="click">
						<div className={styles.infoWrap}>
							<div className={styles.avatarWrap}>
								<img
									src={
										authUser.avatar ? (
											authUser.avatar
										) : (
											<AvatarDefault />
										)
									}
									alt=""
								/>
							</div>
						</div>
					</Popover>
				</div>
			</div>
		</header>
	);
};

export default Header;
