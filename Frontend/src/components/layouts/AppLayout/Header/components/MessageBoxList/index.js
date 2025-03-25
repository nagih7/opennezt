import React, { useCallback } from "react";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { useSocket } from "context/SocketContext";
import MessageBox from "./MessageBox";

const MessageBoxList = () => {
	const socket = useSocket();

	const { conversations } = useSelector((state) => state.chat);

	const sendMessage = useCallback(
		(message) => {
			socket.emit("message", message);
		},
		[socket]
	);

	return (
		<div className={styles.messageBoxListWrap}>
			{conversations.map((converse, i) => (
				<MessageBox
					key={converse.conversation?._id}
					converse={converse}
					sendMessage={sendMessage}
				/>
			))}
		</div>
	);
};

export default MessageBoxList;
