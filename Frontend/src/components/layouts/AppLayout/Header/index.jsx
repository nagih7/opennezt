import React from "react";
import styles from "./styles.module.scss";
import "./styles.scss";
import { Popover } from "antd";
import contentInfo from "./components/PopoverProfile";
import contentNotification from "./components/PopoverNotification";
import contentMessage from "./components/PopoverMessage";
import ImageUser from "../../../../../src/assets/images/user/6.jpg";
const Header = () => {
	// const [isShowThemeLight, setIsShowThemeLight] = useState(true);

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

	return (
		<header className={styles.headerWrap}>
			<div className={styles.headerLeftWrap}></div>
			<div className={`${styles.headerRightWrap}`}>
				<div className={`${styles.itemHeaderRight}`}>
					<div
						onClick={() => openFullScreen()}
						className={`${styles.iconWrap}`}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 18 20.571"
							width="18"
							height="20.571">
							<path
								fill="currentColor"
								d="M5.464 12.857h-4.5a.963.963 0 1 0 0 1.928H4.5v3.536c0 .534.43.964.964.964s.964-.43.964-.964v-4.5a.962.962 0 0 0-.964-.964zm7.071-5.143h4.5a.964.964 0 1 0 0-1.928h-3.536V2.25a.963.963 0 1 0-1.928 0v4.5c0 .534.43.964.964.964zM5.464 1.286a.963.963 0 0 0-.964.964v3.536H.964a.963.963 0 1 0 0 1.928h4.5c.534 0 .964-.43.964-.964v-4.5a.963.963 0 0 0-.964-.964zm11.571 11.571h-4.499a.962.962 0 0 0-.964.964v4.5a.965.965 0 0 0 1.928 0v-3.536h3.536a.965.965 0 0 0 0-1.928z"
							/>
						</svg>
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
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 18 20.571"
								width="18"
								height="20.571">
								<path
									fill="currentColor"
									d="M10.286 1.286v.718a6.11 6.11 0 0 1 5.143 6.032v1.342c0 1.824.623 3.596 1.76 5.022l.599.747a.964.964 0 0 1-.751 1.567H.964a.965.965 0 0 1-.869-.546.965.965 0 0 1 .116-1.021L.81 14.4a8.045 8.045 0 0 0 1.761-5.022V8.036a6.11 6.11 0 0 1 5.143-6.032v-.718a1.286 1.286 0 1 1 2.572 0zM8.679 3.857A4.18 4.18 0 0 0 4.5 8.036v1.342a9.974 9.974 0 0 1-1.595 5.408h12.19A9.974 9.974 0 0 1 13.5 9.378V8.036a4.18 4.18 0 0 0-4.179-4.179h-.643zM11.572 18c0 .647-.269 1.338-.751 1.82s-1.174.751-1.821.751c-.683 0-1.338-.269-1.82-.751s-.751-1.173-.751-1.82h5.143z"
								/>
							</svg>
						</div>
					</div>
				</Popover>

				<Popover
					className={`popover-info-wrap`}
					placement="bottomRight"
					content={contentMessage}
					trigger="click">
					<div
						className={`${styles.itemHeaderRight} ${styles.messageAnimationWrap}`}>
						<div className={`${styles.iconWrap}`}>
							<svg
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 18 18"
								width="18"
								height="18">
								<path
									fill="currentColor"
									d="M15.718 0h-13.5C.979 0-.032 1.011-.032 2.218v10.093c0 1.239 1.011 2.218 2.25 2.218h3.375v2.952c0 .346.387.547.672.341l4.391-3.293h5.063c1.239 0 2.25-1.011 2.25-2.218V2.218A2.23 2.23 0 0 0 15.718 0zm.595 12.375a.567.567 0 0 1-.563.563h-5.625l-2.813 2.109v-2.109H2.25a.567.567 0 0 1-.563-.563V2.25c0-.308.255-.563.563-.563h13.5c.308 0 .563.255.563.563v10.125z"
								/>
							</svg>
						</div>
					</div>
				</Popover>

				<div className={`${styles.itemHeaderRight}`}>
					<Popover
						className={`popover-info-wrap`}
						placement="bottomRight"
						content={contentInfo}
						trigger="click">
						<div className={styles.infoWrap}>
							<div className={styles.avatarWrap}>
								<img src={ImageUser} alt="" />
							</div>
						</div>
					</Popover>
				</div>
			</div>
		</header>
	);
};

export default Header;
