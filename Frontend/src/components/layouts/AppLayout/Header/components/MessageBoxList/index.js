import React, { useCallback } from "react";
import styles from "./styles.module.scss";
import LazyLoadingMedium from "components/UI/LazyLoadingMedium";
import { useSelector } from "react-redux";
import { useSocket } from "context/SocketContext";

const MessageBox = React.lazy(() => import("./MessageBox"));

const MessageBoxList = ({ chatBoxList, setChatBoxList }) => {
	const socket = useSocket();

	const { chatHistory, loadingGetChatHistory } = useSelector(
		(state) => state.chat
	);
	if (chatHistory && !loadingGetChatHistory) {
		chatBoxList.map((conversation) => {
			if (conversation.user_id === chatHistory.receiver_id) {
				conversation.messages = chatHistory.messages;
			}
		});
	}

	const closeChatBox = useCallback(
		(user_id) => {
			setChatBoxList((prev) =>
				prev.filter((chatBox) => chatBox.user_id !== user_id)
			);
		},
		[setChatBoxList]
	);

	const sendMessage = useCallback(
		(message) => {
			socket.emit("message", message);
		},
		[socket]
	);

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
						/>
					</LazyLoadingMedium>
				))}
		</div>
	);
};

export default MessageBoxList;
