import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.scss";
import AvatarDefault from "assets/images/default/AvatarDefault.png";
import { getChatList } from "api/chat";
import store from "states/configureStore";
import NotFound from "components/UI/NotFound";

const ChatList = ({ handleSetChatBoxList, setIsShowChatList }) => {
	const { chatList } = useSelector((state) => state.chat);

	// const [minimizedChats, setMinimizedChats] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [debouncedTerm, setDebouncedTerm] = useState("");

	const openChatBox = async (conversation) => {
		await handleSetChatBoxList(conversation);
		setIsShowChatList(false);
	};

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedTerm(searchQuery);
		}, 300);

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
					chatList.map((conversation, index) => {
						console.log(conversation);
						if (conversation.metadata.type === "direct")
							return (
								<div
									className={styles.chatItem}
									key={index}
									onClick={() => openChatBox(conversation)}>
									<div className={styles.avatar}>
										<img
											src={
												conversation.members.avatar
													? conversation.members.avatar
													: AvatarDefault
											}
											alt="avatar"
										/>
									</div>
									<div className={styles.chatContent}>
										<div className={styles.chatName}>
											{conversation.members.name}
										</div>
									</div>
								</div>
							);
					})
				) : (
					<div className={styles.noResult}>
						<NotFound content="Not found" size="100" />
					</div>
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
