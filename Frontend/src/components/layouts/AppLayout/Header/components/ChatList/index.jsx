import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.scss";
import AvatarDefault from "assets/images/default/AvatarDefault.png";
import { getChatList } from "api/chat";
import store from "states/configureStore";

const ChatList = ({ handleSetChatBoxList, setIsShowChatList }) => {
	const { chatList } = useSelector((state) => state.chat);

	// const [minimizedChats, setMinimizedChats] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [debouncedTerm, setDebouncedTerm] = useState("");

	const openChatBox = async (user) => {
		await handleSetChatBoxList(user);
		setIsShowChatList(false);
	};

	// minimize chat box
	// const restoreMinimizedChat = (chat) => {
	// 	setMinimizedChats(
	// 		minimizedChats.filter((c) => c.username !== chat.username)
	// 	);
	// 	openChatBox(chat);
	// };

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedTerm(searchQuery);
		}, 500);

		return () => {
			clearTimeout(handler);
		};
	}, [searchQuery]);

	useEffect(() => {
		store.dispatch(getChatList(debouncedTerm));
	}, [debouncedTerm]);

	const handleSearchQuery = (value) => {
		setSearchQuery(value);
	};

	return (
		<div className={styles.chatPopoverWrap}>
			<div className={styles.headerWrap}>
				<h3>Chats</h3>
				<input
					type="text"
					placeholder="Search people"
					className={styles.searchInput}
					value={searchQuery}
					onChange={(e) => handleSearchQuery(e.target.value)}
				/>
			</div>
			<div className={styles.chatListWrap}>
				{chatList.length > 0 ? (
					chatList.map((user, index) => (
						<div
							className={styles.chatItem}
							key={index}
							onClick={() => openChatBox(user)}>
							<div className={styles.avatar}>
								<img
									src={
										user.user_avatar
											? user.user_avatar
											: AvatarDefault
									}
									alt="avatar"
								/>
							</div>
							<div className={styles.chatContent}>
								<div className={styles.chatName}>{user.user_name}</div>
							</div>
						</div>
					))
				) : (
					<div className={styles.noResult}>No chats found</div>
				)}
			</div>
			{/* <div className={styles.miniChatBoxWrap}>
				<div className={styles.minimizedChatIcons}>
					{minimizedChats.map((chat, index) => (
						<div
							key={index}
							className={styles.minimizedChatIcon}
							style={{ backgroundColor: chat.avatarColor }}
							onClick={() => restoreMinimizedChat(chat)}>
							{chat.username[0]}
						</div>
					))}
				</div>
			</div> */}
		</div>
	);
};

export default ChatList;
