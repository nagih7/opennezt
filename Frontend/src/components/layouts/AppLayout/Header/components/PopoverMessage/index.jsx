import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import styles from "./styles.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import BoxMessage from "./BoxMessage";
import { useSocket } from "components/common/SocketContext";

function ChatsPopover() {
	const socket = useSocket();

	const stepState = useSelector((state) => state.home.steps);
	const [receiverData, setReceiverData] = useState([]);
	const [receivedid, setReceivedid] = useState();
	const [searchQuery, setSearchQuery] = useState("");
	const [openChats, setOpenChats] = useState([]);
	const [minimizedChats, setMinimizedChats] = useState([]);
	// const [socket, setSocket] = useState(null);
	const [receiver_id, setReceiverId] = useState(null);
	const [content, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const token = localStorage.getItem("token");
	const getUserIdFromToken = useCallback(() => {
		const decodedToken = JSON.parse(atob(token.split(".")[1]));
		return decodedToken.data.user_id;
	}, [token]);

	const fetchReceiverData = useCallback(async () => {
		try {
			const response = await axios.get(
				`${
					process.env.REACT_APP_API_URL
				}/chat/receiverIds/${getUserIdFromToken()}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const receivedid = response.data[0].userId;
			setReceivedid(receivedid);
			setReceiverData(response.data);
		} catch (error) {
			console.error("Error fetching receiver data:", error);
		}
	}, [getUserIdFromToken, token]);

	useEffect(() => {
		fetchReceiverData();
	}, [fetchReceiverData]);

	const filteredReceiverData = receiverData.filter((receiver) =>
		receiver.username.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const createChat = async (sender_id, receivedid, messageContent, date) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_API_URL}/chat/create-chat`,
				{
					sender_id,
					receiver_id: receivedid,
					content: messageContent,
					date,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (response.data.success) {
				const chatHistory = response.data.chatHistory || [];
				setMessages(
					chatHistory.map((msg) => ({
						content: msg.content,
						timestamp: msg.date,
						isSender: msg.sender_id === getUserIdFromToken(),
					}))
				);
			}
		} catch (error) {
			console.error("Error creating chat:", error);
		}
	};

	// const url_sock = `ws://localhost:3456/${receivedid}`;
	// console.log("url_sock", url_sock);
	// const initializeWebSocket = (receivedid) => {
	// 	const newSocket = new WebSocket(url_sock);
	// 	setSocket(newSocket);

	// 	newSocket.onmessage = (content) => {
	// 		if (content.data instanceof Blob) {
	// 			const reader = new FileReader();
	// 			reader.onload = function () {
	// 				try {
	// 					const data = JSON.parse(reader.result);
	// 					setMessages((prevMessages) => [
	// 						...prevMessages,
	// 						{
	// 							...data,
	// 							isSender: data.senderId === getUserIdFromToken(),
	// 						},
	// 					]);
	// 				} catch (error) {
	// 					console.error("Error parsing JSON:", error);
	// 				}
	// 			};
	// 			reader.readAsText(content.data);
	// 		} else {
	// 			try {
	// 				const data = JSON.parse(content.data);
	// 				setMessages((prevMessages) => [
	// 					...prevMessages,
	// 					{ ...data, isSender: data.senderId === getUserIdFromToken() },
	// 				]);
	// 			} catch (error) {
	// 				console.error("Error parsing JSON:", error);
	// 			}
	// 		}
	// 	};

	// 	newSocket.onclose = () => {
	// 		console.log("WebSocket connection closed");
	// 	};
	// };

	const sendMessage = () => {
		if (!content) return;

		const sender_id = getUserIdFromToken();
		const date = new Date().toISOString();

		const messagePayload = {
			sender_id,
			receiver_id: receivedid,
			content: content,
			timestamp: date,
		};

		socket.emit("message", messagePayload);

		// if (socket && socket.readyState === WebSocket.OPEN) {
		// 	socket.send(JSON.stringify(messagePayload));
		// }

		setMessages((prevMessages) => [
			...prevMessages,
			{ sender_id, content, timestamp: date, isSender: true },
		]);

		setMessage("");
	};

	const openChatBox = async (receiver) => {
		setReceiverId(receiver.userId);

		if (openChats.some((c) => c.username === receiver.username)) return;

		if (openChats.length >= 1) {
			const [removedChat, ...remainingChats] = openChats;
			setOpenChats([...remainingChats, receiver]);
		} else {
			setOpenChats([...openChats, receiver]);
		}

		// if (!socket) {
		// 	initializeWebSocket(receiver.userId);
		// }

		try {
			const response = await axios.get(
				`${process.env.REACT_APP_API_URL}/chat/get-chat-history/${receiver.userId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const combinedMessages = response.data.chatHistory.map((msg) => ({
				content: msg.content,
				timestamp: msg.date,
				isSender: msg.sender_id === getUserIdFromToken(),
			}));
			setMessages(combinedMessages);
		} catch (error) {
			console.error("Error fetching chat history:", error);
		}
	};

	const closeChatBox = (username) => {
		setOpenChats(openChats.filter((chat) => chat.username !== username));
	};

	const restoreMinimizedChat = (chat) => {
		setMinimizedChats(
			minimizedChats.filter((c) => c.username !== chat.username)
		);
		openChatBox(chat);
	};

	const handleEnterKey = (event) => {
		if (event.key === "Enter") {
			sendMessage();
		}
	};

	const scrollToBottom = () => {
		const element = document.querySelector(".miniChatBody"); // ID của phần tử muốn cuộn
		element.scrollTop = element.scrollHeight;
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
				{filteredReceiverData.length > 0 ? (
					filteredReceiverData.map((receiver, index) => (
						<div
							className={styles.chatItem}
							key={index}
							onClick={() => openChatBox(receiver)}>
							<div
								className={styles.avatar}
								style={{ backgroundColor: receiver.avatarColor }}>
								{receiver.username[0]}
							</div>
							<div className={styles.chatContent}>
								<div className={styles.chatName}>
									{receiver.username}
								</div>
							</div>
						</div>
					))
				) : (
					<div className={styles.noResult}>No chats found</div>
				)}
			</div>
			<div className={styles.miniChatBoxWrap}>
				{openChats.map((chat, index) => (
					<div className={styles.miniChatBox} key={index}>
						<div className={styles.miniChatHeader}>
							<span>{chat.username}</span>
							<button
								onClick={() => closeChatBox(chat.username)}
								className={styles.closeButton}>
								<CloseIcon />
							</button>
						</div>
						<BoxMessage messages={messages} />
						<div className={styles.miniChatFooter}>
							<input
								onClick={scrollToBottom}
								onKeyDown={handleEnterKey}
								type="text"
								placeholder="Type a message..."
								className={styles.miniChatInput}
								value={content}
								onChange={(e) => setMessage(e.target.value)}
							/>
							<button
								onClick={sendMessage}
								className={styles.sendButton}>
								Send
							</button>
						</div>
					</div>
				))}
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
}

export default ChatsPopover;
