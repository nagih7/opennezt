import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.scss";
import { getChatHistory } from "api/chat";
import store from "states/configureStore";
import AvatarDefault from "assets/images/default/AvatarDefault.png";

const ChatList = ({ handleSetChatBoxList }) => {
	const { chatList } = useSelector((state) => state.chat);

	const [searchQuery, setSearchQuery] = useState("");
	const [minimizedChats, setMinimizedChats] = useState([]);

	const openChatBox = async (user) => {
		await store.dispatch(getChatHistory(user.receiver_id));
		await handleSetChatBoxList(user);
	};

	const restoreMinimizedChat = (chat) => {
		setMinimizedChats(
			minimizedChats.filter((c) => c.username !== chat.username)
		);
		openChatBox(chat);
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
					onChange={(e) => setSearchQuery(e.target.value)}
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
									src={user.avatar ? user.avatar : AvatarDefault}
									alt="avatar"
								/>
							</div>
							<div className={styles.chatContent}>
								<div className={styles.chatName}>{user.username}</div>
							</div>
						</div>
					))
				) : (
					<div className={styles.noResult}>No chats found</div>
				)}
			</div>
			<div className={styles.miniChatBoxWrap}>
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
			</div>
		</div>
	);
};

export default ChatList;
