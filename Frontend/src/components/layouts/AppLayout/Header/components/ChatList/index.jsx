import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles.module.scss";
import AvatarDefault from "assets/images/default/AvatarDefault.png";
import { getChatHistory, getChatList } from "api/chat";
import NotFound from "components/UI/NotFound";

const ChatList = () => {
	const dispatch = useDispatch();
	const { chatList } = useSelector((state) => state.chat);

	const [searchQuery, setSearchQuery] = useState("");
	const [debouncedTerm, setDebouncedTerm] = useState("");

	// NEW
	const handleGetChatHistory = (conversation) => {
		dispatch(getChatHistory(conversation._id));
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
		dispatch(getChatList(debouncedTerm));
	}, [debouncedTerm, dispatch]);

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
						if (conversation.metadata.type === "direct")
							return (
								<div
									className={styles.chatItem}
									key={index}
									onClick={() => handleGetChatHistory(conversation)}>
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
		</div>
	);
};

export default ChatList;
