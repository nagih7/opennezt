import React, { useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";

const MessageBoxContent = ({ messages, receiver_id }) => {
	const chatBoxRef = useRef(null);

	const { authUser } = useSelector((state) => state.auth);

	useEffect(() => {
		const chatBox = chatBoxRef.current;
		// Scroll to bottom
		chatBox.scrollTop = chatBox.scrollHeight;
	}, [messages]);

	return (
		<div className={styles.boxMessageWrap} ref={chatBoxRef}>
			{messages.map((msg, index) => (
				<div
					key={index}
					className={`${styles.messageWrap} ${
						msg.user_id === authUser._id ? styles.sent : styles.received
					}`}>
					<span className={styles.message}>{msg.content}</span>
				</div>
			))}
		</div>
	);
};

export default MessageBoxContent;
