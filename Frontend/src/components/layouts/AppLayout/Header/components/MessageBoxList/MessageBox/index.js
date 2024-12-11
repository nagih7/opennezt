import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import LazyLoadingMedium from "components/UI/LazyLoadingMedium";
import CloseIcon from "@mui/icons-material/Close";
import AvatarDefault from "assets/images/default/AvatarDefault.png";

const MessageBoxContent = React.lazy(() => import("./MessageBoxContent"));

const MessageBox = ({
	chatBox,
	closeChatBox,
	sendMessage,
	newMessage,
	handleAckNewMessage,
}) => {
	const [content, setContent] = useState("");
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		setMessages(chatBox.messages);
	}, [chatBox.messages]);

	useEffect(() => {
		if (newMessage.sender_id === chatBox.receiver_id) {
			setMessages((prevMessages) => [...prevMessages, newMessage]);
			handleAckNewMessage();
		}
	}, [newMessage, chatBox.receiver_id, handleAckNewMessage]);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY === 0) {
				console.log("Thanh scroll đã ở đầu trang");
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

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
		setMessages([...messages, message]);

		setContent("");
	};

	return (
		<div className={styles.messageBoxWrap}>
			<div className={styles.miniChatHeader}>
				<div className={styles.miniChatHeaderContent}>
					<div className={styles.avatar}>
						<img
							src={chatBox.avatar ? chatBox.avatar : AvatarDefault}
							alt="avatar"
						/>
					</div>
					<span>{chatBox.username}</span>
				</div>
				<button
					onClick={() => closeChatBox(chatBox.receiver_id)}
					className={styles.closeButton}>
					<CloseIcon />
				</button>
			</div>
			<LazyLoadingMedium>
				<MessageBoxContent
					messages={messages}
					receiver_id={chatBox.receiver_id}
				/>
			</LazyLoadingMedium>
			<div className={styles.miniChatFooter}>
				<input
					onKeyDown={(e) => handleEnterKey(e, chatBox.receiver_id)}
					type="text"
					placeholder="Type a message..."
					className={styles.miniChatInput}
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
				<button
					onClick={() => handleSendMessage(chatBox.receiver_id)}
					className={styles.sendButton}>
					Send
				</button>
			</div>
		</div>
	);
};

export default React.memo(MessageBox);
