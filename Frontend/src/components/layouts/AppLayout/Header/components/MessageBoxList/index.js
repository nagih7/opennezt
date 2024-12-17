import React, { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import LazyLoadingMedium from "components/UI/LazyLoadingMedium";
import { useSelector } from "react-redux";
import { useSocket } from "context/SocketContext";

const MessageBox = React.lazy(() => import("./MessageBox"));

const MessageBoxList = ({ chatBoxList, setChatBoxList }) => {
	const socket = useSocket();

	const [newMessage, setNewMessage] = useState([]);

	useEffect(() => {
		const handleMessage = (message) => {
			setNewMessage(message);
		};
		socket.on("message", handleMessage);

		return () => {
			socket.off("message");
		};
	}, [socket]);

	const { chatHistory, loadingGetChatHistory } = useSelector(
		(state) => state.chat
	);
	if (chatHistory && !loadingGetChatHistory) {
		chatBoxList.map((chatBox) => {
			if (chatBox.receiver_id === chatHistory.receiver_id) {
				chatBox.messages = chatHistory.messages;
			}
		});
	}

	const handleAckNewMessage = useCallback(() => {
		setNewMessage([]);
	}, []);

	const sendMessage = async (message) => {
		await socket.emit("message", message);
	};

	const closeChatBox = (receiver_id) => {
		setChatBoxList(
			chatBoxList.filter((chatBox) => chatBox.receiver_id !== receiver_id)
		);
	};

	return (
		<div className={styles.messageBoxListWrap}>
			{chatBoxList &&
				chatBoxList.length > 0 &&
				chatBoxList.map((chatBox, index) => (
					<LazyLoadingMedium key={index}>
						<MessageBox
							chatBox={chatBox}
							closeChatBox={closeChatBox}
							sendMessage={sendMessage}
							newMessage={newMessage}
							handleAckNewMessage={handleAckNewMessage}
						/>
					</LazyLoadingMedium>
				))}
		</div>
	);
};

export default MessageBoxList;
