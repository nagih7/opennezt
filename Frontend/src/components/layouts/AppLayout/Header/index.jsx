import React, { useEffect, useRef, useState } from "react";
import PopoverProfile from "./components/PopoverProfile";
import PopoverNotification from "./components/PopoverNotification";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import ZoomInMapIcon from "@mui/icons-material/ZoomInMap";
import { useSelector, useDispatch } from "react-redux";
import ChatList from "./components/ChatList";
import MessageBoxList from "./components/MessageBoxList";
import { LANG } from "utils/constants";
import { setLanguage } from "states/modules/app";
import {
	IconlyChat,
	IconlyNotification,
	IconlySearch,
} from "components/UI/Iconly";
import { Avatar, Popover, Portal, Stack } from "@chakra-ui/react";
import Logo from "assets/images/logo/OpenNezt_logo_black.png";

const Header = () => {
	const dispatch = useDispatch();
	// const [isShowThemeLight, setIsShowThemeLight] = useState(true);
	const [isFullScreen, setIsFullScreen] = useState(false);
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

	const handleChangeLanguage = (e) => {
		dispatch(setLanguage(e.target.value));
	};

	return (
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
					<div className="flex items-center gap-4 text-sm font-semibold text-[#6f7f92]" />
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
						<div onClick={() => openFullScreen()}>
							<div className="cursor-pointer">
								{isFullScreen ? (
									<ZoomInMapIcon className="text-[#6f7f92]" />
								) : (
									<ZoomOutMapIcon className="text-[#6f7f92]" />
								)}
							</div>
						</div>
						<Popover.Root
							positioning={{ placement: "bottom-end" }}
							size={"lg"}>
							<Popover.Trigger asChild>
								<span>
									<IconlyNotification size={24} color="#6f7f92" />
								</span>
							</Popover.Trigger>
							<Portal>
								<Popover.Positioner>
									<Popover.Content>
										<Popover.Arrow />
										<Popover.Body>
											<Stack spacing={4}>
												<PopoverNotification />
											</Stack>
										</Popover.Body>
									</Popover.Content>
								</Popover.Positioner>
							</Portal>
							<MessageBoxList />
						</Popover.Root>

						<Popover.Root positioning={{ placement: "bottom-end" }}>
							<Popover.Trigger asChild>
								<span>
									<IconlyChat size={24} color="#6f7f92" />
								</span>
							</Popover.Trigger>
							<Portal>
								<Popover.Positioner>
									<Popover.Content>
										<Popover.Arrow />
										<Popover.Body>
											<Stack spacing={4}>
												<ChatList />
												{/* <MessageBoxList /> */}
											</Stack>
										</Popover.Body>
									</Popover.Content>
								</Popover.Positioner>
							</Portal>
							<MessageBoxList />
						</Popover.Root>

						<Popover.Root positioning={{ placement: "bottom-end" }}>
							<Popover.Trigger asChild>
								<span>
									<Avatar.Root size={"md"}>
										<Avatar.Fallback name={authUser.name} />
										<Avatar.Image src={authUser.avatar} />
									</Avatar.Root>
								</span>
							</Popover.Trigger>
							<Portal>
								<Popover.Positioner>
									<Popover.Content>
										<Popover.Arrow />
										<Popover.Body>
											<Stack spacing={4}>
												<PopoverProfile />
											</Stack>
										</Popover.Body>
									</Popover.Content>
								</Popover.Positioner>
							</Portal>
							<MessageBoxList />
						</Popover.Root>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
