import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles.module.scss";
import AvatarDefault from "assets/images/default/AvatarDefault.png";
import { getChatHistory, getChatList } from "api/chat";
import NotFound from "components/UI/NotFound";
import { Avatar, Tooltip } from "antd";
import { CHATS } from "utils/constains/appConstains";

const ChatList = () => {
	const dispatch = useDispatch();
	const { chatList } = useSelector((state) => state.chat);
	const { language } = useSelector((state) => state.app);

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
				<h3>{CHATS.CHATS[language]}</h3>
				<input
					type="text"
					placeholder={CHATS.SEARCH[language]}
					className={styles.searchInput}
					value={searchQuery}
					onChange={(e) => handleSearchQuery(e.target.value)}
				/>
			</div>
			<div className={styles.chatListWrap}>
				{chatList.length > 0 ? (
					chatList.map((conversation, index) => {
						switch (conversation?.metadata?.type) {
							case "Direct":
								return (
									<div
										className={styles.chatItem}
										key={index}
										onClick={() =>
											handleGetChatHistory(conversation)
										}>
										<div className={styles.avatar}>
											<img
												src={
													conversation?.members[0]?.avatar ||
													AvatarDefault
												}
												alt={conversation?.members[0]?.name}
												onError={(e) => {
													e.target.onerror = null;
													e.target.src = AvatarDefault;
												}}
											/>
										</div>
										<div className={styles.chatContent}>
											<div className={styles.chatName}>
												{conversation?.members[0]?.name}
											</div>
										</div>
									</div>
								);
							case "Group":
								return (
									<div
										className={styles.chatItem}
										key={index}
										onClick={() =>
											handleGetChatHistory(conversation)
										}>
										<div
											className={
												conversation?.members?.length > 1
													? styles.avatarGroup
													: styles.avatar
											}>
											<Avatar.Group
												size={"medium"}
												max={{
													count: 2,
													style: {
														color: "#f56a00",
														backgroundColor: "#fde3cf",
													},
												}}>
												{conversation?.members?.map(
													(member, index) => (
														<Tooltip
															title={member.name}
															key={member._id}>
															<Avatar
																src={
																	member.avatar ||
																	AvatarDefault
																}
																alt={member.name}
															/>
														</Tooltip>
													)
												)}
											</Avatar.Group>
										</div>
										<div className={styles.chatContent}>
											<div className={styles.chatName}>
												{conversation?.metadata?.data.project.name}
											</div>
										</div>
									</div>
								);
							default:
								return null;
						}
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
