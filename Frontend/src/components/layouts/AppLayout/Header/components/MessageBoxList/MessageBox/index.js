import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import LazyLoadingMedium from "components/UI/LazyLoadingMedium";
import CloseIcon from "@mui/icons-material/Close";
import AvatarDefault from "assets/images/default/AvatarDefault.png";
import { getChatHistory } from "api/chat";
import { useSocket } from "context/SocketContext";
import { useSelector } from "react-redux";
import store from "states/configureStore";

const MessageBoxContent = React.lazy(() => import("./MessageBoxContent"));

const MessageBox = ({ chatBox, closeChatBox, sendMessage }) => {
	const socket = useSocket();

	const { loadingGetChatHistory } = useSelector((state) => state.chat);

	const [content, setContent] = useState("");
	const [newMessage, setNewMessage] = useState([]);

	useEffect(() => {
		store.dispatch(getChatHistory(chatBox.user_id));
	}, [chatBox.user_id]);

	useEffect(() => {
		setNewMessage(chatBox.messages);
	}, [chatBox.messages]);

	useEffect(() => {
		socket.on("message", (message) => {
			store.dispatch(getChatHistory(message.sender_id));
		});

		return () => {
			socket.off("message");
		};
	}, [socket]);

	const handleEnterKey = (event, receiver_id) => {
		if (event.key === "Enter") {
			handleSendMessage(receiver_id);
		}
	};

	const handleSendMessage = (receiver_id) => {
		if (!content) return;
		const date = new Date().toISOString();
		const message = {
			receiver_id: receiver_id,
			content: content,
			timestamp: date,
		};
		sendMessage(message);
		store.dispatch(getChatHistory(receiver_id));

		setContent("");
	};

	return (
		<div className={styles.messageBoxWrap}>
			<div className={styles.miniChatHeader}>
				<div className={styles.miniChatHeaderContent}>
					<div className={styles.avatar}>
						<img
							src={
								chatBox.user_avatar
									? chatBox.user_avatar
									: AvatarDefault
							}
							alt="avatar"
						/>
					</div>
					<span>{chatBox.user_name}</span>
				</div>
				<button
					onClick={() => closeChatBox(chatBox.user_id)}
					className={styles.closeButton}>
					<CloseIcon />
				</button>
			</div>
			<div className={styles.miniChatContent}>
				<LazyLoadingMedium>
					<MessageBoxContent
						messages={newMessage}
						receiver_id={chatBox.user_id}
					/>
				</LazyLoadingMedium>
			</div>
			<div className={styles.miniChatFooter}>
				<input
					onKeyDown={(e) => handleEnterKey(e, chatBox.user_id)}
					type="text"
					placeholder="Type a message..."
					className={styles.miniChatInput}
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
				<button
					onClick={() => handleSendMessage(chatBox.user_id)}
					className={styles.sendButton}>
					Send
				</button>
			</div>
		</div>
	);
};

export default React.memo(MessageBox);
