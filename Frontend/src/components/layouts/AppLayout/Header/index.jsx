import React, { useCallback, useEffect, useRef, useState } from "react";
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
import LazyLoadingMedium from "components/UI/LazyLoadingMedium";
import store from "states/configureStore";
import { getChatList } from "api/chat";

const ChatList = React.lazy(() => import("./components/ChatList"));
const MessageBoxList = React.lazy(() => import("./components/MessageBoxList"));

const Header = () => {
	// const [isShowThemeLight, setIsShowThemeLight] = useState(true);
	const [isFullScreen, setIsFullScreen] = useState(false);
	const [isShowChatList, setIsShowChatList] = useState(false);
	const [chatBoxList, setChatBoxList] = useState([]);
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

	const handleSetChatBoxList = useCallback((conversation) => {
		setChatBoxList((prev) => {
			const index = prev.findIndex((chat) => chat._id === conversation._id);
			if (index !== -1) {
				return prev;
			}
			return [...prev, { ...conversation, messages: [] }];
		});
	}, []);

	const showChatList = () => {
		if (!isShowChatList) {
			store.dispatch(getChatList());
		}
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
						<LazyLoadingMedium>
							<ChatList
								handleSetChatBoxList={handleSetChatBoxList}
								setIsShowChatList={setIsShowChatList}
							/>
						</LazyLoadingMedium>
					</div>
					<LazyLoadingMedium>
						<MessageBoxList
							chatBoxList={chatBoxList}
							setChatBoxList={setChatBoxList}
						/>
					</LazyLoadingMedium>
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
								{authUser.avatar ? (
									<img src={authUser.avatar} alt="" />
								) : (
									<img src="https://scontent.fhan5-2.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s200x200&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_eui2=AeFwjzt3TLwRlu7A9A-KfDx0Wt9TLzuBU1Ba31MvO4FTUJ3aTrvrVcopb2NyVQPTTf6BthcdOye-NFjZTDew3OW4&_nc_ohc=DXnAdsnLWisQ7kNvgEJlRtG&_nc_zt=24&_nc_ht=scontent.fhan5-2.fna&_nc_gid=AbNmUcQBb3oSbY8ZuoFoTMp&oh=00_AYD0S418FAm6QCijZBx8fRizD-ohHGG1nhDVdX1fNCUjlw&oe=676EA37A" />
								)}
							</div>
						</div>
					</Popover>
				</div>
			</div>
		</header>
	);
};

export default Header;
